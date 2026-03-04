import React from 'react';
import { ScrollView, View } from 'react-native';
import { ProfileHeader, AccountOverviewSection } from '@/components/Profile';
import { VendorProfileScreen } from '@/components/Vendor/VendorProfileScreen';
import {  Container } from '@/components/theme';
import { PROFILE_USER_DATA, ACCOUNT_MENU_ITEMS } from './constants';

export interface ProfileScreenProps {
  userRole?: 'customer' | 'provider' | null;
  onNavigate?: (route: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ userRole, onNavigate }) => {
  const isVendor = userRole === 'provider';

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleEditProfilePress = () => {
    console.log('Edit profile pressed');
  };

  const handleItemPress = (itemId: string) => {
    console.log('Item pressed:', itemId);
  };

  // Vendor Profile View – separate dedicated screen
  if (isVendor) {
    return <VendorProfileScreen onNavigate={onNavigate} />;
  }

  // Default Customer View
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ProfileHeader
          userName={PROFILE_USER_DATA.name}
          userPhone={PROFILE_USER_DATA.phone}
          onMenuPress={handleMenuPress}
          onEditProfilePress={handleEditProfilePress}
        />
        <Container className="px-5">
          <AccountOverviewSection
            items={ACCOUNT_MENU_ITEMS}
            onItemPress={handleItemPress}
          />
        </Container>
      </ScrollView>
    </View>
  );
};
