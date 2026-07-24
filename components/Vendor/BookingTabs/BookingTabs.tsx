import React, { useState, useEffect, useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { BOOKING_STATUS } from '@/utils/constants';
import { TABS } from './constants';
import { filterBookingsByStatus } from './helpers/bookingHelpers';
import { BookingList, RecentActivitySection, TabItem } from './components';
import { GET_VENDOR_BOOKINGS } from '@/components/Customer/bookingQueries';
import { GET_VENDOR_PROFILE, VENDOR_PROFILE_FIELDS } from '@/components/Vendor/vendorQueries';
import { useFragment } from '@/__generated__/fragment-masking';
import { getUserId } from '@/utils/store/authStore';

export const BookingTabs: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState(BOOKING_STATUS.PENDING);

    useEffect(() => {
        getUserId().then(id => {
            if (id) setUserId(id);
        });
    }, []);

    const { data: profileData } = useQuery(GET_VENDOR_PROFILE, {
        variables: { userId: userId ?? '' },
        skip: !userId,
    });

    const vendorProfile = useFragment(VENDOR_PROFILE_FIELDS, profileData?.getVendorProfile);
    const vendorProfileId = vendorProfile?.id;

    const { data: bookingsData, loading } = useQuery(GET_VENDOR_BOOKINGS, {
        variables: { vendorProfileId: vendorProfileId ?? '' },
        skip: !vendorProfileId,
        fetchPolicy: 'cache-and-network',
    });

    const allBookings = useMemo(() => {
        if (!bookingsData?.vendorBookings || bookingsData.vendorBookings.length === 0) {
            return [];
        }

        return bookingsData.vendorBookings.map((b: any) => ({
            id: b.id,
            customerName: b.user?.name ?? 'Customer',
            customerPhone: b.user?.phoneNumber ?? '',
            serviceName: b.service?.name ?? 'Car Wash Service',
            date: new Date(b.scheduledAt).toLocaleDateString(),
            time: new Date(b.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            price: `$${b.totalPrice ?? b.service?.price ?? 0}`,
            status: b.status.toLowerCase(),
            address: 'Customer Location',
        }));
    }, [bookingsData]);

    const bookings = useMemo(() => {
        return filterBookingsByStatus(allBookings as any, activeTab);
    }, [allBookings, activeTab]);

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

            {loading ? (
                <View className="py-10 items-center justify-center">
                    <ActivityIndicator size="large" color="#0284c7" />
                </View>
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
