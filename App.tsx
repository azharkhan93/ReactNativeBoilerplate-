/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, useColorScheme,  View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react-native';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/utils/apolloClient';
import { TopBar } from './components/TopBar';
import { BottomTabNavigator } from './components/BottomTabNavigator';
import { HomeScreen, FavoritesScreen, ProfileScreen, CartScreen } from './screens';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { label: 'Home', icon: Home, route: 'home' },
    { label: 'Search', icon: Search, route: 'search' },
    { label: 'Favorites', icon: Heart, route: 'favorites' },
    { label: 'Cart', icon: ShoppingBag, route: 'cart' },
    { label: 'Profile', icon: User, route: 'profile' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      // case 'search':
      //   return <SearchScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'cart':
        return <CartScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {activeTab !== 'profile' ? (
        <TopBar placeholder="Search products, brands..." />
      ): null}
      <View className="flex-1">{renderContent()}</View>
      <BottomTabNavigator
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </View>
  );
}


export default App;
