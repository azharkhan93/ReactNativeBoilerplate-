import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/theme';
import { MOCK_BOOKINGS, BOOKING_STATUS } from '@/utils/constants';
import { TABS } from './constants';
import { PendingCard } from './components/PendingCard';
import { BookingCard } from './components/BookingCard';
import { RecentActivitySection } from './components/RecentActivitySection';
import { filterBookingsByStatus } from './helpers/bookingHelpers';

export const BookingTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(BOOKING_STATUS.PENDING);
    const filtered = filterBookingsByStatus(MOCK_BOOKINGS, activeTab);

    return (
        <View className="flex-1">
            <View className="flex-row border-b border-gray-800 mb-6">
                {TABS.map(tab => {
                    const isActive = activeTab === tab.id;
                    return (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => setActiveTab(tab.id as any)}
                            className="mr-5 pb-3"
                            style={isActive ? { borderBottomWidth: 2, borderBottomColor: '#3b82f6' } : {}}>
                            <Typography
                                className={`font-body-semibold text-[14px] ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                {tab.label}
                            </Typography>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Cards */}
            {filtered.length > 0
                ? filtered.map(b =>
                    activeTab === BOOKING_STATUS.PENDING
                        ? <PendingCard key={b.id} booking={b} />
                        : <BookingCard key={b.id} booking={b} />
                )
                : (
                    <View className="items-center justify-center py-16">
                        <Typography className="text-gray-600 font-body italic">No bookings found</Typography>
                    </View>
                )
            }

            <RecentActivitySection />
        </View>
    );
};
