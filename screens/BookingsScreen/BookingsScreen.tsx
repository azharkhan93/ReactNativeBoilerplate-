import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@/components/theme';
import { BookingTabs } from '@/components/Vendor/BookingTabs';

export const BookingsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-gray-950">

            <View
                className="px-5 pb-5"
                style={{ paddingTop: Math.max(insets.top, 20) + 10 }}>
                <Typography variant="subheading" className="text-white">Bookings</Typography>
            </View>

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}>
                <BookingTabs />
            </ScrollView>
        </View>
    );
};
