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
  readonly isAppReady: boolean;
  readonly handleSplashFinish: () => Promise<void>;
}

export const useAppInit = (): UseAppInitResult => {
  const [splashFinished, setSplashFinished] = useState<boolean>(() => {
    return appStorage.getBoolean(STORAGE_KEYS.HAS_SEEN_SPLASH) ?? false;
  });
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const prepareApp = async (): Promise<void> => {
      try {
        await Promise.all([
          hydrateStorageFromAsyncStorage(),
          initApolloCachePersistence(),
        ]);
      } catch (error) {
        if (__DEV__) {
          console.warn('[useAppInit] App initialization error:', error);
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
  }, []);

  return {
    splashFinished,
    isAppReady,
    handleSplashFinish,
  };
};
