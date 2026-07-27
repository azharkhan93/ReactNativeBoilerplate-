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
    const hasSeenSplash =
      appStorage.getBoolean(STORAGE_KEYS.HAS_SEEN_SPLASH) ?? false;
    const hasCompletedOnboarding =
      appStorage.getBoolean(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING) ?? false;
    return hasSeenSplash || hasCompletedOnboarding;
  });
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const prepareApp = async (): Promise<void> => {
      try {
        await hydrateStorageFromAsyncStorage();

        // Re-check splash status post-hydration
        const hasSeenSplash =
          appStorage.getBoolean(STORAGE_KEYS.HAS_SEEN_SPLASH) ?? false;
        const hasCompletedOnboarding =
          appStorage.getBoolean(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING) ?? false;

        if ((hasSeenSplash || hasCompletedOnboarding) && isMounted) {
          setSplashFinished(true);
        }

        // Hydrate Apollo Cache persistence from MMKV BEFORE app navigator mounts
        await initApolloCachePersistence();
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
