/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_BOOKINGS, BOOKING_STATUS } from '@/utils/constants';
import { ServiceManagement } from '../ServiceManagement';
import { useProfile } from '@/screens/ProfileScreen/hooks/useProfile';
import { UserRole } from '@/__generated__/graphql';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { AvailabilityContent } from '../Availability';

import {
  WelcomeHeader,
  EarningsCard,
  QuickActions,
  BookingRequests,
} from './components';

export interface VendorDashboardProps {
  onNavigate?: (route: string) => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({
  onNavigate,
}) => {
  const { top } = useSafeAreaInsets();
  const [isAddServiceVisible, setIsAddServiceVisible] = useState(false);
  const [isAvailabilityVisible, setIsAvailabilityVisible] = useState(false);

  const { userData } = useProfile(UserRole.Provider);

  const pendingRequests = MOCK_BOOKINGS.filter(
    b => b.status === BOOKING_STATUS.PENDING,
  );

  const handleQuickActionPress = (id: string) => {
    const actionMap: Record<string, () => void> = {
      '1': () => setIsAddServiceVisible(true),
      '2': () => setIsAvailabilityVisible(true),
      '3': () => onNavigate?.('analytics'),
      '4': () => onNavigate?.('profile'),
    };
    actionMap[id]?.();
  };

  return (
    <View className="flex-1 bg-notchLight">
      <WelcomeHeader
        topInset={top}
        userName={userData.name}
        avatarUrl={userData.avatarUrl}
      />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="mt-4">
          <EarningsCard />
          <QuickActions onActionPress={handleQuickActionPress} />
          <BookingRequests pendingRequests={pendingRequests} />
        </View>
      </ScrollView>

      <ServiceManagement
        visible={isAddServiceVisible}
        onClose={() => setIsAddServiceVisible(false)}
        onSave={(service: any) => console.log('Saved service:', service)}
      />

      <BottomSheetModal
        visible={isAvailabilityVisible}
        title="Manage Availability"
        onClose={() => setIsAvailabilityVisible(false)}
        height="85%"
      >
        <AvailabilityContent onClose={() => setIsAvailabilityVisible(false)} />
      </BottomSheetModal>
    </View>
  );
};
