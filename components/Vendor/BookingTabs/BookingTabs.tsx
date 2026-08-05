import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { AppSkeletonLoader } from '@/components/shared';
import { useQuery } from '@apollo/client/react';
import { BOOKING_STATUS } from '@/utils/constants';
import { TABS } from './constants';
import { filterBookingsByStatus } from './helpers/bookingHelpers';
import { BookingList, RecentActivitySection, TabItem } from './components';
import { GET_VENDOR_BOOKINGS } from '@/components/Customer/bookingQueries';
import {
  GET_VENDOR_PROFILE,
  VENDOR_PROFILE_FIELDS,
} from '@/components/Vendor/vendorQueries';
import { useFragment } from '@/__generated__/fragment-masking';
import { GetVendorBookingsQuery } from '@/__generated__/graphql';
import { getUserId } from '@/utils/store/authStore';
import { FormattedBooking } from './types';

export const BookingTabs: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(BOOKING_STATUS.PENDING);

  useEffect(() => {
    getUserId().then(id => {
      if (id) setUserId(id);
    });
  }, []);

  const { data: profileData } = useQuery(GET_VENDOR_PROFILE, {
    variables: { userId: userId ?? '' },
    skip: !userId,
  });

  const vendorProfile = useFragment(
    VENDOR_PROFILE_FIELDS,
    profileData?.getVendorProfile,
  );
  const vendorProfileId = vendorProfile?.id;

  const { data: bookingsData, loading } = useQuery(GET_VENDOR_BOOKINGS, {
    variables: { vendorProfileId: vendorProfileId ?? '' },
    skip: !vendorProfileId,
  });

  type RawBooking = GetVendorBookingsQuery['vendorBookings'][number];

  const allBookings: FormattedBooking[] = useMemo(() => {
    if (
      !bookingsData?.vendorBookings ||
      bookingsData.vendorBookings.length === 0
    ) {
      return [];
    }

    return bookingsData.vendorBookings.map((b: RawBooking) => ({
      id: b.id,
      customerName: b.user?.name ?? 'Customer',
      customerPhone: b.user?.phoneNumber ?? '',
      serviceName: b.service?.name ?? 'Car Wash Service',
      date: new Date(b.scheduledAt).toLocaleDateString(),
      time: new Date(b.scheduledAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      price: Number(b.totalPrice ?? b.service?.price ?? 0),
      status: (['pending', 'accepted', 'completed', 'cancelled'].includes(
        b.status.toLowerCase(),
      )
        ? b.status.toLowerCase()
        : 'pending') as FormattedBooking['status'],
      address: 'Customer Location',
    }));
  }, [bookingsData]);

  const bookings = useMemo(() => {
    return filterBookingsByStatus(allBookings, activeTab);
  }, [allBookings, activeTab]);

  return (
    <View className="flex-1 px-5">
      <View className="flex-row border-b border-gray-800 mb-6 justify-center">
        {TABS.map(tab => (
          <TabItem
            key={tab.id}
            {...tab}
            isActive={activeTab === tab.id}
            onPress={() => setActiveTab(tab.id)}
          />
        ))}
      </View>

      {loading ? (
        <AppSkeletonLoader />
      ) : (
        <BookingList
          bookings={bookings}
          isPending={activeTab === BOOKING_STATUS.PENDING}
        />
      )}

      <RecentActivitySection />
    </View>
  );
};
