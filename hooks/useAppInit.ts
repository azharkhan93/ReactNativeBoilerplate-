import { useState, useEffect, useCallback } from 'react';
import { initApolloCachePersistence } from '@/utils/apolloClient';
import { listenToForegroundNotifications } from '@/utils/notificationService';
import {
  appStorage,
  STORAGE_KEYS,
  hydrateStorageFromAsyncStorage,
  persistCriticalKey,
} from '@/utils/cache';

export interface UseAppInitResult {
  readonly splashFinished: boolean;
  readonly showSplash: boolean;
  readonly isAppReady: boolean;
  readonly handleSplashFinish: () => Promise<void>;
}

const checkHasSeenSplashSync = (): boolean => {
  try {
    const hasSeenSplash =
      appStorage.getBoolean(STORAGE_KEYS.HAS_SEEN_SPLASH) ?? false;
    const hasCompletedOnboarding =
      appStorage.getBoolean(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING) ?? false;
    const hasRole = Boolean(appStorage.getString(STORAGE_KEYS.USER_ROLE));
    const hasToken = Boolean(appStorage.getString(STORAGE_KEYS.AUTH_TOKEN));
    return hasSeenSplash || hasCompletedOnboarding || hasRole || hasToken;
  } catch {
    return false;
  }
};

export const useAppInit = (): UseAppInitResult => {
  const initialSyncSeen = checkHasSeenSplashSync();

  const [splashFinished, setSplashFinished] = useState<boolean>(initialSyncSeen);
  const [showSplash, setShowSplash] = useState<boolean>(!initialSyncSeen);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const prepareApp = async (): Promise<void> => {
      try {
        await hydrateStorageFromAsyncStorage();

        const postHydrateSeen = checkHasSeenSplashSync();

        if (postHydrateSeen) {
          if (isMounted) {
            setSplashFinished(true);
            setShowSplash(false);
          }
        } else {
          if (isMounted) {
            setShowSplash(true);
            setSplashFinished(false);
          }
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
    await persistCriticalKey(STORAGE_KEYS.HAS_SEEN_SPLASH, true);
    setSplashFinished(true);
    setShowSplash(false);
  }, []);

  return {
    splashFinished: splashFinished || !showSplash,
    showSplash,
    isAppReady,
    handleSplashFinish,
  };
};
