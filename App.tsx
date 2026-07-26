import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';

import { apolloClient, initApolloCachePersistence } from '@/utils/apolloClient';
import { AppNavigator } from '@/navigation/AppNavigator';
import { KeyboardDismissView } from '@/components/theme';
import { AnimatedSplashScreen } from '@/components/shared/AnimatedSplashScreen';
import { listenToForegroundNotifications } from '@/utils/notificationService';
import { NotificationBanner } from '@/components/NotificationBanner';
import {
  STORAGE_KEYS,
  hydrateStorageFromAsyncStorage,
  persistCriticalKey,
} from '@/utils/cache';

export default function App() {
  const [splashFinished, setSplashFinished] = useState<boolean>(false);
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
          console.warn('[App] App initialization error:', error);
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

  const handleSplashFinish = useCallback(async () => {
    await persistCriticalKey(STORAGE_KEYS.HAS_SEEN_SPLASH, true);
    setSplashFinished(true);
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <KeyboardDismissView>
          {!splashFinished || !isAppReady ? (
            <AnimatedSplashScreen onFinish={handleSplashFinish} />
          ) : (
            <AppNavigator />
          )}
        </KeyboardDismissView>
        <NotificationBanner />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
