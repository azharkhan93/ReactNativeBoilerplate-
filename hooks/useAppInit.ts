import { useState, useEffect, useCallback, useRef } from 'react';
import { initApolloCachePersistence } from '@/utils/apolloClient';
import { listenToForegroundNotifications } from '@/utils/notificationService';
import {
  appStorage,
  STORAGE_KEYS,
  hydrateStorageFromAsyncStorage,
  persistCriticalKey,
} from '@/utils/cache';

export interface UseAppInitResult {
  readonly showSplash: boolean;
  readonly isAppReady: boolean;
  readonly handleSplashFinish: () => Promise<void>;
}

/**
 * Synchronously reads MMKV (zero-cost, no async) to determine
 * whether this is a returning user who has already seen the splash screen.
 * MMKV reads are synchronous in-process operations — no I/O involved.
 */
const isReturningUser = (): boolean => {
  try {
    return (
      (appStorage.getBoolean(STORAGE_KEYS.HAS_SEEN_SPLASH) === true) ||
      (appStorage.getBoolean(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING) === true) ||
      Boolean(appStorage.getString(STORAGE_KEYS.USER_ROLE)) ||
      Boolean(appStorage.getString(STORAGE_KEYS.AUTH_TOKEN))
    );
  } catch {
    return false;
  }
};

export const useAppInit = (): UseAppInitResult => {
  /**
   * Evaluate ONCE at module-call time before React renders any frame.
   * Because MMKV is synchronous, this is safe and zero-latency.
   * For returning users this will be `true` on Frame 0, so `showSplash`
   * initialises to `false` and AnimatedSplashScreen NEVER mounts.
   */
  const returning = useRef<boolean>(isReturningUser());

  const [showSplash, setShowSplash] = useState<boolean>(!returning.current);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const prepareApp = async (): Promise<void> => {
      try {
        // Hydrate AsyncStorage → MMKV bridge for keys that were written before
        // MMKV was the primary store (backward compatibility).
        await hydrateStorageFromAsyncStorage();

        // Re-evaluate after hydration in case AsyncStorage had the flag but
        // MMKV didn't (first boot after migration). Only flip showSplash to
        // `false` — never flip it to `true` once it has been `false` already.
        if (!returning.current && isReturningUser() && isMounted) {
          returning.current = true;
          setShowSplash(false);
        }

        await initApolloCachePersistence();
      } catch (error) {
        if (__DEV__) {
          console.warn('[useAppInit] Initialization error:', error);
        }
      } finally {
        if (isMounted) {
          setIsAppReady(true);
        }
      }
    };

    prepareApp();

    const unsubscribe = listenToForegroundNotifications();

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleSplashFinish = useCallback(async (): Promise<void> => {
    returning.current = true;
    await persistCriticalKey(STORAGE_KEYS.HAS_SEEN_SPLASH, true);
    setShowSplash(false);
  }, []);

  return {
    showSplash,
    isAppReady,
    handleSplashFinish,
  };
};
