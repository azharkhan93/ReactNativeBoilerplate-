import React from 'react';
import { ScrollView, View } from 'react-native';
import { ProfileHeader, AccountOverviewSection } from '@/components/Profile';
import { PROFILE_USER_DATA, ACCOUNT_MENU_ITEMS } from './constants';

export const ProfileScreen: React.FC = () => {
  const handleMenuPress = () => {
    // Handle menu press
  };

  const handleEditProfilePress = () => {
    // Handle edit profile press
  };

  const handleItemPress = () => {
    // Handle item press
  };

  return (
    <View className="flex-1">
      <ProfileHeader
        userName={PROFILE_USER_DATA.name}
        userPhone={PROFILE_USER_DATA.phone}
        onMenuPress={handleMenuPress}
        onEditProfilePress={handleEditProfilePress}
      />
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
       
      >
        <AccountOverviewSection
          items={ACCOUNT_MENU_ITEMS}
          onItemPress={handleItemPress}
        />
      </ScrollView>
    </View>
  );
};
