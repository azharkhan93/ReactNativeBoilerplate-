import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography, BookingCard } from '@/components/theme';
import { MOCK_BOOKINGS, Booking } from '@/data/mockBookings';

export interface CustomerBookingsScreenProps {
    onNavigate?: (route: string) => void;
}

type BookingTab = 'active' | 'past' | 'cancelled';

const TABS: { id: BookingTab; label: string; activeBg: string }[] = [
    { id: 'active', label: 'Active', activeBg: 'bg-primary-500 shadow-primary-500/30' },
    { id: 'past', label: 'Past', activeBg: 'bg-primary-500 shadow-primary-500/30' },
    { id: 'cancelled', label: 'Cancelled', activeBg: 'bg-red-500 shadow-red-500/30' },
];

const STATUS_MAP: Record<BookingTab, string[]> = {
    active: ['pending', 'confirmed', 'on_the_way'],
    past: ['completed'],
    cancelled: ['cancelled'],
};

const useBookingsFilter = () => {
    const [activeTab, setActiveTab] = React.useState<BookingTab>('active');
    const bookings = React.useMemo(() =>
        MOCK_BOOKINGS.filter(b => STATUS_MAP[activeTab].includes(b.status)),
        [activeTab]);
    return { activeTab, setActiveTab, bookings };
};

export const CustomerBookingsScreen: React.FC<CustomerBookingsScreenProps> = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();
    const { activeTab, setActiveTab, bookings } = useBookingsFilter();


    return (
        <View className="flex-1 bg-white">
            <View className="px-5 pb-4" style={{ paddingTop: Math.max(insets.top, 20) }}>
                <Typography variant="h3" className="font-black text-black">My Bookings</Typography>
            </View>

            <View className="flex-row px-5 mb-6 space-x-2">
                {TABS.map(tab => (
                    <TouchableOpacity
                        key={tab.id}
                        onPress={() => setActiveTab(tab.id)}
                        className={`flex-1 items-center py-3 rounded-2xl ${activeTab === tab.id ? `${tab.activeBg} shadow-lg` : 'bg-gray-50'}`}
                    >
                        <Typography className={`text-[13px] font-bold ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}>
                            {tab.label}
                        </Typography>
                    </TouchableOpacity>
                ))}
            </View>


            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {bookings.length > 0 ? (
                    bookings.map(b => <BookingCard key={b.id} booking={b} onTrackPress={() => onNavigate?.('liveTracking')} />)
                ) : (
                    <View className="flex-1 items-center justify-center py-20">
                        <Typography className="text-gray-400 italic">No {activeTab} bookings found</Typography>
                    </View>
                )}
            </ScrollView>

        </View>
    );
};

