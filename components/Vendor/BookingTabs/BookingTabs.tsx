import React, { useState } from 'react';
import { View } from 'react-native';
import { BOOKING_STATUS, MOCK_BOOKINGS } from '@/utils/constants';
import { TABS } from './constants';
import { filterBookingsByStatus } from './helpers/bookingHelpers';
import { BookingList, RecentActivitySection, TabItem } from './components';

export const BookingTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(BOOKING_STATUS.PENDING);
    const bookings = filterBookingsByStatus(MOCK_BOOKINGS, activeTab);

    return (
        <View className="flex-1 px-5">
            <View className="flex-row border-b border-gray-800 mb-6 justify-center">
                {TABS.map(tab => (
                    <TabItem
                        key={tab.id}
                        {...tab}
                        isActive={activeTab === tab.id}
                        onPress={() => setActiveTab(tab.id as any)}
                    />
                ))}
            </View>

            <BookingList
                bookings={bookings}
                isPending={activeTab === BOOKING_STATUS.PENDING}
            />

            <RecentActivitySection />
        </View>
    );
};
