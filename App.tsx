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
import { appStorage, STORAGE_KEYS } from '@/utils/cache';

export default function App() {
  const [hasSeenSplash] = useState<boolean>(() => {
    return appStorage.getBoolean(STORAGE_KEYS.HAS_SEEN_SPLASH) ?? false;
  });

  const [splashFinished, setSplashFinished] = useState<boolean>(hasSeenSplash);
  const [isCacheRestored, setIsCacheRestored] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const prepareApp = async (): Promise<void> => {
      try {
        await initApolloCachePersistence();
      } catch (error) {
        if (__DEV__) {
          console.warn('[App] Cache persistence initialization error:', error);
        }
      } finally {
        if (isMounted) {
          setIsCacheRestored(true);
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

  const handleSplashFinish = useCallback(() => {
    appStorage.set(STORAGE_KEYS.HAS_SEEN_SPLASH, true);
    setSplashFinished(true);
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <KeyboardDismissView>
          {!splashFinished || !isCacheRestored ? (
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
