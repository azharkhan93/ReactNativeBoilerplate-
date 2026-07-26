import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';

import { apolloClient, initApolloCachePersistence } from '@/utils/apolloClient';
import { AppNavigator } from '@/navigation/AppNavigator';
import { KeyboardDismissView } from '@/components/theme';
import { AnimatedSplashScreen } from '@/components/shared/AnimatedSplashScreen';
import { listenToForegroundNotifications } from '@/utils/notificationService';
import { NotificationBanner } from '@/components/NotificationBanner';

export default function App() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [isCacheRestored, setIsCacheRestored] = useState(false);

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

    // Subscribe to foreground messaging listener
    const unsubscribe = listenToForegroundNotifications();

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <KeyboardDismissView>
          {!splashFinished || !isCacheRestored ? (
            <AnimatedSplashScreen onFinish={() => setSplashFinished(true)} />
          ) : (
            <AppNavigator />
          )}
        </KeyboardDismissView>
        <NotificationBanner />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

