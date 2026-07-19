import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography, ScreenScrollView } from '@/components/theme';
import { BookingTabs } from '@/components/Vendor/BookingTabs';

export const BookingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-notchLight">
      <View
        className="bg-notch px-5 pb-4 border-b border-blue-200/50 rounded-b-2xl z-50 mb-6"
        style={{ paddingTop: Math.max(insets.top, 20) + 10 }}
      >
        <Typography
          variant="h3"
          className="text-slate-900 text-lg font-heading-bold"
        >
          Bookings
        </Typography>
      </View>

      <ScreenScrollView className="flex-1 px-5">
        <BookingTabs />
      </ScreenScrollView>
    </View>
  );
};
