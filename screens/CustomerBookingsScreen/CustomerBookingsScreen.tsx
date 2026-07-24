import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography, BookingCard, ScreenScrollView } from '@/components/theme';
import { useCustomerBookings, BookingTab } from './hooks/useCustomerBookings';

export interface CustomerBookingsScreenProps {
  onNavigate?: (route: string, params?: any) => void;
}

const TABS: { id: BookingTab; label: string; activeBg: string }[] = [
  {
    id: 'active',
    label: 'Active',
    activeBg: 'bg-primary-500 shadow-primary-500/30',
  },
  {
    id: 'past',
    label: 'Past',
    activeBg: 'bg-primary-500 shadow-primary-500/30',
  },
  {
    id: 'cancelled',
    label: 'Cancelled',
    activeBg: 'bg-red-500 shadow-red-500/30',
  },
];

export const CustomerBookingsScreen: React.FC<CustomerBookingsScreenProps> = ({
  onNavigate,
}) => {
  const insets = useSafeAreaInsets();
  const { activeTab, setActiveTab, bookings, loading } = useCustomerBookings();

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
          My Bookings
        </Typography>
      </View>

      <View className="flex-row px-5 mb-6 space-x-2">
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            className={`flex-1 items-center py-3 rounded-2xl ${
              activeTab === tab.id
                ? `${tab.activeBg} shadow-lg`
                : 'bg-white border border-slate-200/60'
            }`}
          >
            <Typography
              className={`text-[13px] font-body-bold ${
                activeTab === tab.id ? 'text-white' : 'text-slate-600'
              }`}
            >
              {tab.label}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>

      <ScreenScrollView className="flex-1 px-5">
        {loading ? (
          <View className="py-10 items-center justify-center">
            <ActivityIndicator size="large" color="#0284c7" />
          </View>
        ) : bookings.length > 0 ? (
          bookings.map(b => (
            <BookingCard
              key={b.id}
              booking={b}
              onTrackPress={booking =>
                onNavigate?.('liveTracking', {
                  bookingId: booking.id,
                  initialLocation: {
                    latitude: booking.provider.latitude,
                    longitude: booking.provider.longitude,
                  },
                  initialEta: booking.status === 'on_the_way' ? 8 : 12,
                  vendorName: booking.provider.name,
                })
              }
              onReviewPress={booking =>
                onNavigate?.('ratingReview', { bookingId: booking.id })
              }
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <Typography className="text-gray-500 italic font-body">
              No {activeTab} bookings found
            </Typography>
          </View>
        )}
      </ScreenScrollView>
    </View>
  );
};
