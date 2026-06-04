import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';

import { apolloClient } from '@/utils/apolloClient';
import { AppNavigator } from '@/navigation/AppNavigator';
import { KeyboardDismissView } from '@/components/theme';
import { AnimatedSplashScreen } from '@/components/shared/AnimatedSplashScreen';
import { listenToForegroundNotifications } from '@/utils/notificationService';
import { NotificationBanner } from '@/components/NotificationBanner';

export default function App() {
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
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
        <NotificationBanner />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
