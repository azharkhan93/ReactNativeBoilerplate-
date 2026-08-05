import { useState, useEffect, useCallback, useRef } from 'react';
import { initApolloCachePersistence } from '@/utils/apolloClient';
import { listenToForegroundNotifications } from '@/utils/notificationService';
import {
  appStorage,
  STORAGE_KEYS,
  hydrateStorageFromAsyncStorage,
  persistCriticalKey,
  ensureStorageEncrypted,
} from '@/utils/cache';

export interface UseAppInitResult {
  readonly showSplash: boolean;
  readonly isAppReady: boolean;
  readonly handleSplashFinish: () => Promise<void>;
}


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
 
  const returning = useRef<boolean>(isReturningUser());

  const [showSplash, setShowSplash] = useState<boolean>(!returning.current);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const prepareApp = async (): Promise<void> => {
      try {
       
        await ensureStorageEncrypted();
        await hydrateStorageFromAsyncStorage();

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
