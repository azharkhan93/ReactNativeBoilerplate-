import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/utils/apolloClient';
import { AppNavigator } from '@/navigation/AppNavigator';
import { KeyboardDismissView } from '@/components/theme';
import { AnimatedSplashScreen } from '@/components/shared/AnimatedSplashScreen';

export default function App() {
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    // Other boot effects can go here
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
