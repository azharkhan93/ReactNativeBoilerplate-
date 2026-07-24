import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_CUSTOMER_BOOKINGS } from '@/components/Customer/bookingQueries';
import { getUserId } from '@/utils/store/authStore';
import { Booking } from '@/data/mockBookings';

export type BookingTab = 'active' | 'past' | 'cancelled';

const STATUS_MAP: Record<BookingTab, string[]> = {
  active: ['pending', 'confirmed', 'on_the_way'],
  past: ['completed'],
  cancelled: ['cancelled'],
};

export const useCustomerBookings = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<BookingTab>('active');

  useEffect(() => {
    getUserId().then(id => {
      if (id) setUserId(id);
    });
  }, []);

  const { data, loading, refetch } = useQuery(GET_CUSTOMER_BOOKINGS, {
    variables: { userId: userId ?? '' },
    skip: !userId,
    fetchPolicy: 'cache-and-network',
  });

  const formattedBookings: Booking[] = useMemo(() => {
    if (!data?.customerBookings || data.customerBookings.length === 0) {
      return [];
    }

    return data.customerBookings.map((b): Booking => {
      const scheduledDate = new Date(b.scheduledAt);
      const statusLower = b.status.toLowerCase() as Booking['status'];
      return {
        id: b.id,
        provider: {
          id: b.vendorProfile?.id ?? 'v1',
          name: b.vendorProfile?.businessName ?? 'Car Wash Center',
          imageUrl: b.vendorProfile?.imageUri ?? 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f',
          rating: 4.9,
          latitude: 28.6139,
          longitude: 77.209,
        },
        serviceName: b.service?.name ?? 'Car Wash Service',
        date: scheduledDate.toLocaleDateString(),
        time: scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: statusLower,
        price: b.totalPrice ?? b.service?.price ?? 0,
        hasTracking: statusLower === 'on_the_way',
      };
    });
  }, [data]);

  const filteredBookings = useMemo(() => {
    return formattedBookings.filter(b => STATUS_MAP[activeTab].includes(b.status));
  }, [formattedBookings, activeTab]);

  return {
    activeTab,
    setActiveTab,
    bookings: filteredBookings,
    loading,
    refetch,
  };
};
