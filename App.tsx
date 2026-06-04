import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';

import { apolloClient } from '@/utils/apolloClient';
import { AppNavigator } from '@/navigation/AppNavigator';
import { KeyboardDismissView } from '@/components/theme';
import { AnimatedSplashScreen } from '@/components/shared/AnimatedSplashScreen';
import { getFCMToken, listenToForegroundNotifications } from '@/utils/notificationService';

export default function App() {
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    // Register FCM for push notifications
    const setupFCM = async () => {
      try {
        const token = await getFCMToken();
        if (token) {
          console.log('[FCM] Registered token successfully:', token);
        }
      } catch (err) {
        console.error('[FCM] Setup failed:', err);
      }
    };
    setupFCM();

    // Subscribe to foreground messaging listener
    const unsubscribe = listenToForegroundNotifications();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <KeyboardDismissView>
          {!splashFinished ? (
            <AnimatedSplashScreen onFinish={() => setSplashFinished(true)} />
          ) : (
            <AppNavigator />
          )}
        </KeyboardDismissView>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
