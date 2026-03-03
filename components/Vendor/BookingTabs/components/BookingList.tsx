import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';
import { BookingCard } from './BookingCard';
import { PendingCard } from './PendingCard';

interface BookingListProps {
    bookings: any[];
    isPending: boolean;
}

export const BookingList: React.FC<BookingListProps> = ({ bookings, isPending }) => {
    if (bookings.length === 0) {
        return (
            <View className="items-center justify-center py-16">
                <Typography className="text-gray-600 font-body italic">No bookings found</Typography>
            </View>
        );
    }

    return (
        <>
            {bookings.map(booking => (
                isPending
                    ? <PendingCard key={booking.id} booking={booking} />
                    : <BookingCard key={booking.id} booking={booking} />
            ))}
        </>
    );
};
