import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VENDOR_STATS, MOCK_BOOKINGS, BOOKING_STATUS } from '@/utils/constants';
import { ServiceManagement } from '../ServiceManagement';

import {
    WelcomeHeader,
    EarningsCard,
    QuickActions,
    BookingRequests,
} from './components';

export interface VendorDashboardProps {
    onNavigate?: (route: string) => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({ onNavigate }) => {
    const { top } = useSafeAreaInsets();
    const [isAddServiceVisible, setIsAddServiceVisible] = useState(false);

    // Derived state
    const pendingRequests = MOCK_BOOKINGS.filter(b => b.status === BOOKING_STATUS.PENDING);

    const handleQuickActionPress = (id: string) => {
        if (id === '1') setIsAddServiceVisible(true);
        else if (id === '3') onNavigate?.('analytics');
        else if (id === '4') onNavigate?.('profile');
    };

    return (
        <View className="flex-1 bg-gray-950">
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <WelcomeHeader topInset={top} />
                <EarningsCard />
                <QuickActions onActionPress={handleQuickActionPress} />
                <BookingRequests pendingRequests={pendingRequests} />
            </ScrollView>

            <ServiceManagement
                visible={isAddServiceVisible}
                onClose={() => setIsAddServiceVisible(false)}
                onSave={(service: any) => console.log('Saved service:', service)}
            />
        </View>
    );
};
