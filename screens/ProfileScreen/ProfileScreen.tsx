/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode, useState } from 'react';
import {
  ScrollView,
  View,
  DimensionValue,
  TouchableOpacity,
} from 'react-native';
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
import {
  CustomerProfileModalContent,
  CustomerAddressDetails,
} from '@/components/Customer';
import { UserRole } from '../../__generated__/graphql';
import { ACCOUNT_MENU_ITEMS, MODAL_ITEMS, ModalConfigItem } from './constants';
import {
  VENDOR_STATS,
  MANAGEMENT_LINKS,
} from '@/components/Vendor/vendorProfileConstants';
import { useProfile } from './hooks/useProfile';
import { Typography } from '@/components/theme';
import { Dropzone } from '@/components/shared/Dropzone';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useLogout } from '@/hooks/useLogout';

export interface ProfileScreenProps {
  userRole?: UserRole | null;
  onNavigate?: (route: string) => void;
  onLogout?: () => void;
}

interface AvatarUploadContentProps {
  avatarUrl: string | null;
  onSave: (url: string | null) => Promise<void>;
  onClose: () => void;
}

const AvatarUploadContent: React.FC<AvatarUploadContentProps> = ({
  avatarUrl,
  onSave,
  onClose,
}) => {
  const [currentUri, setCurrentUri] = useState<string | null>(avatarUrl);

  const { triggerUpload, uploading } = useImageUpload({
    fileName: 'profile_avatar.jpg',
    onSuccess: setCurrentUri,
  });

  return (
    <View className="px-5 pt-2 pb-8 bg-gray-950">
      <Typography variant="subheading" className="text-white mb-4 text-center">
        Upload Profile Picture
      </Typography>

      <Dropzone
        label="Avatar Image"
        onUpload={triggerUpload}
        onRemove={() => setCurrentUri(null)}
        imageUri={currentUri}
      />

      <View className="flex-row gap-3 mt-4">
        <TouchableOpacity
          onPress={onClose}
          className="flex-1 py-3.5 rounded-2xl items-center bg-gray-900 border border-gray-800"
        >
          <Typography className="text-gray-400 font-body-semibold">
            Cancel
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSave(currentUri)}
          disabled={uploading}
          className={`flex-1 py-3.5 rounded-2xl items-center bg-primary-600 ${
            uploading ? 'opacity-55' : ''
          }`}
        >
          <Typography className="text-white font-body-semibold">
            {uploading ? 'Uploading...' : 'Save Image'}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userRole,
  onNavigate,
  onLogout,
}) => {
  const { userData, isVendor, handleSaveAvatar } = useProfile(userRole);
  const { logout } = useLogout();

  const handleLogoutPress = async () => {
    await logout();
    onLogout?.();
  };
  const [modalType, setModalType] = useState<string | null>(null);

  const MODAL_CONFIG = [
    ...MODAL_ITEMS,
    {
      id: 'avatar_upload',
      title: 'Upload Profile Picture',
      height: '60%',
      scrollable: false,
    } as ModalConfigItem,
  ].reduce(
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
      else if (item.id === 'profile')
        content = <CustomerProfileModalContent onClose={() => setModalType(null)} />;
      else if (item.id === 'addresses') content = <CustomerAddressDetails />;
      else if (item.id === 'avatar_upload') {
        content = (
          <AvatarUploadContent
            avatarUrl={userData.avatarUrl ?? null}
            onSave={async (url: string | null) => {
              await handleSaveAvatar(url);
              setModalType(null);
            }}
            onClose={() => setModalType(null)}
          />
        );
      } else if (item.isPlaceholder) {
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
        onRightActionPress={handleLogoutPress}
        rightIcon="logout"
      />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <ProfileUserInfo
          name={userData.name}
          avatarUrl={userData.avatarUrl ?? undefined}
          subtitle={userData.phone}
          location={userData.location}
          isVerified={userData.isVerified}
          showEditButton={false}
          onEditAvatar={() => setModalType('avatar_upload')}
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
