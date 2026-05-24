import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/utils/apolloClient';
import { AppNavigator } from '@/navigation/AppNavigator';
import { KeyboardDismissView } from '@/components/theme';
import {
  getFCMToken,
  listenToForegroundNotifications,
} from '@/utils/notificationService';

export default function App() {
  useEffect(() => {
    // Retrieve and log the device FCM token for testing
    getFCMToken();

    // Listen for foreground notifications during active app state
    const unsubscribe = listenToForegroundNotifications();
    return unsubscribe;
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <KeyboardDismissView>
          <AppNavigator />
        </KeyboardDismissView>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
