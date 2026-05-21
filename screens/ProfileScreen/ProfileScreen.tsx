import React, { ReactNode, useState } from 'react';
import { ScrollView, View, DimensionValue } from 'react-native';
import {
  ProfileHeader,
  ProfileMenuSection,
  ProfileStats,
  ProfileUserInfo,
  ProfileMenuItemData,
} from '@/components/Profile';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { AvailabilityContent } from '@/components/Vendor/Availability';
import { BankAccountDetails } from '@/components/Vendor/BankAccountDetails';
import { BusinessProfile } from '@/components/Vendor/BusinessProfile';
import { ManageServices } from '@/components/Vendor/ManageServices';
import { UserRole } from '../../__generated__/graphql';
import { ACCOUNT_MENU_ITEMS, MODAL_ITEMS, ModalConfigItem } from './constants';
import {
  VENDOR_STATS,
  MANAGEMENT_LINKS,
} from '@/components/Vendor/vendorProfileConstants';
import { useProfile } from './hooks/useProfile';
import { Typography } from '@/components/theme';

export interface ProfileScreenProps {
  userRole?: UserRole | null;
  onNavigate?: (route: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userRole,
  onNavigate,
}) => {
  const { userData, isVendor, handleEditAvatar, handleEditProfile } =
    useProfile(userRole);
  const [modalType, setModalType] = useState<string | null>(null);

  const MODAL_CONFIG = MODAL_ITEMS.reduce(
    (
      acc: Record<
        string,
        {
          title: string;
          content: React.ReactNode;
          height?: DimensionValue;
          scrollable?: boolean;
        }
      >,
      item: ModalConfigItem,
    ) => {
      let content: ReactNode = null;

      // Assign specific components based on ID
      if (item.id === 'availability')
        content = <AvailabilityContent onClose={() => setModalType(null)} />;
      else if (item.id === 'bank') content = <BankAccountDetails />;
      else if (item.id === 'business') content = <BusinessProfile />;
      else if (item.id === 'services') content = <ManageServices />;
      else if (item.isPlaceholder) {
        content = (
          <View className="p-10">
            <Typography className="text-white text-center">
              {item.placeholderText}
            </Typography>
          </View>
        );
      }

      acc[item.id] = {
        title: item.title,
        content,
        height: item.height,
        scrollable: item.scrollable,
      };
      return acc;
    },
    {},
  );

  const handleMenuPress = (id: string) => {
    if (MODAL_CONFIG[id]) return setModalType(id);
    onNavigate?.(id);
  };

  const config = modalType ? MODAL_CONFIG[modalType] : null;

  return (
    <View className="flex-1 bg-gray-950">
      <ProfileHeader
        title={isVendor ? 'Provider Profile' : 'My Profile'}
        onRightActionPress={() => {}}
        rightIcon="settings"
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ProfileUserInfo
          name={userData.name}
          subtitle={userData.phone}
          location={userData.location}
          isVerified={userData.isVerified}
          onEditAvatar={handleEditAvatar}
          onEditProfile={handleEditProfile}
        />
        {isVendor && <ProfileStats stats={VENDOR_STATS} />}
        <View className="px-5">
          <ProfileMenuSection
            title={isVendor ? 'Business Management' : 'Account Settings'}
            items={
              (isVendor
                ? MANAGEMENT_LINKS
                : ACCOUNT_MENU_ITEMS) as ProfileMenuItemData[]
            }
            onItemPress={handleMenuPress}
          />
        </View>
      </ScrollView>
      <BottomSheetModal
        visible={!!modalType}
        onClose={() => setModalType(null)}
        title={config?.title || ''}
        height={config?.height || '100%'}
        scrollable={config?.scrollable}
      >
        {config?.content}
      </BottomSheetModal>
    </View>
  );
};
