import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/utils/apolloClient';
import { AppNavigator } from '@/navigation/AppNavigator';
import { KeyboardDismissView } from '@/components/theme';
import { AnimatedSplashScreen, AppSkeletonLoader } from '@/components/shared';
import { NotificationBanner } from '@/components/NotificationBanner';
import { useAppInit } from '@/hooks/useAppInit';

export default function App() {
  const { splashFinished, isAppReady, handleSplashFinish } = useAppInit();

  const renderContent = () => {
    if (!splashFinished) {
      return <AnimatedSplashScreen onFinish={handleSplashFinish} />;
    }

    if (!isAppReady) {
      return <AppSkeletonLoader />;
    }

    return <AppNavigator />;
  };

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <KeyboardDismissView>{renderContent()}</KeyboardDismissView>
        <NotificationBanner />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
