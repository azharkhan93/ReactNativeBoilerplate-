import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { Alert, View, DimensionValue } from 'react-native';
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
import { Typography, ScreenScrollView } from '@/components/theme';
import { useLogout } from '@/hooks/useLogout';
import { AvatarUploadContent } from './components/AvatarUploadContent';

export interface ProfileScreenProps {
  userRole?: UserRole | null;
  onNavigate?: (route: string) => void;
  onLogout?: () => void;
}


export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userRole,
  onNavigate,
  onLogout,
}) => {
  const { userData, isVendor, handleSaveAvatar } = useProfile(userRole);
  const { logout } = useLogout();
  const [modalType, setModalType] = useState<string | null>(null);

  const closeModal = useCallback(() => setModalType(null), []);

  const handleLogoutPress = useCallback(async (): Promise<void> => {
    try {
      await logout();
      onLogout?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      Alert.alert('Logout Failed', message);
    }
  }, [logout, onLogout]);

  const handleAvatarEditPress = useCallback(() => setModalType('avatar_upload'), []);

  const MODAL_CONFIG = useMemo(() => {
    const handleAvatarSave = async (url: string | null): Promise<void> => {
      await handleSaveAvatar(url);
      closeModal();
    };

    const contentMap: Record<string, ReactNode> = {
      availability: <AvailabilityContent onClose={closeModal} />,
      bank: <BankAccountDetails />,
      business: <BusinessProfile />,
      services: <ManageServices />,
      profile: <CustomerProfileModalContent onClose={closeModal} />,
      addresses: <CustomerAddressDetails />,
      avatar_upload: (
        <AvatarUploadContent
          avatarUrl={userData.avatarUrl ?? null}
          onSave={handleAvatarSave}
          onClose={closeModal}
        />
      ),
    };

    const allItems: ModalConfigItem[] = [
      ...MODAL_ITEMS,
      { id: 'avatar_upload', title: 'Upload Profile Picture', height: '60%', scrollable: false },
    ];

    return Object.fromEntries(
      allItems.map((item) => [
        item.id,
        {
          title: item.title,
          content: contentMap[item.id] ?? (item.isPlaceholder ? (
            <View className="p-10 bg-notch">
              <Typography className="text-slate-800 text-center font-medium">
                {item.placeholderText}
              </Typography>
            </View>
          ) : null),
          height: item.height,
          scrollable: item.scrollable,
        },
      ])
    ) as Record<string, { title: string; content: ReactNode; height?: DimensionValue; scrollable?: boolean }>;
  }, [closeModal, userData.avatarUrl, handleSaveAvatar]);

  const handleMenuPress = useCallback(
    (id: string) => {
      if (MODAL_CONFIG[id]) return setModalType(id);
      onNavigate?.(id);
    },
    [MODAL_CONFIG, onNavigate],
  );

  const config = modalType ? MODAL_CONFIG[modalType] : null;
  const headerTitle = isVendor ? 'Provider Profile' : 'My Profile';
  const sectionTitle = isVendor ? 'Business Management' : 'Account Settings';
  const menuItems = (isVendor ? MANAGEMENT_LINKS : ACCOUNT_MENU_ITEMS) as ProfileMenuItemData[];
  const modalTitle = config?.title ?? '';
  const modalHeight = config?.height ?? '100%';

  return (
    <View className="flex-1 bg-notchLight">
      <ProfileHeader
        title={headerTitle}
        onRightActionPress={handleLogoutPress}
        rightIcon="logout"
      />
      <ScreenScrollView className="flex-1">
        <ProfileUserInfo
          name={userData.name}
          avatarUrl={userData.avatarUrl ?? undefined}
          subtitle={userData.phone}
          location={userData.location}
          isVerified={userData.isVerified}
          showEditButton={false}
          onEditAvatar={handleAvatarEditPress}
        />
        {isVendor && <ProfileStats stats={VENDOR_STATS} />}
        <View className="px-5">
          <ProfileMenuSection
            title={sectionTitle}
            items={menuItems}
            onItemPress={handleMenuPress}
          />
        </View>
      </ScreenScrollView>
      <BottomSheetModal
        visible={!!modalType}
        onClose={closeModal}
        title={modalTitle}
        height={modalHeight}
        scrollable={config?.scrollable}
      >
        {config?.content}
      </BottomSheetModal>
    </View>
  );
};

