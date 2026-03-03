import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';
import { Avatar } from '../Avatar';
import { StatusBadge } from '../StatusBadge';
import { MOCK_BOOKINGS } from '@/utils/constants';

export const BookingCard: React.FC<{ booking: (typeof MOCK_BOOKINGS)[0] }> = ({ booking }) => (
    <View className="bg-gray-900 rounded-3xl p-5 mb-4 border border-gray-800">
        <View className="flex-row justify-between items-center">
            <View className="flex-row items-center flex-1 mr-3">
                <Avatar name={booking.customerName} />
                <View className="ml-3 flex-1">
                    <Typography variant='body'>
                        {booking.customerName}
                    </Typography>
                    <Typography variant='body' className=" tracking-widest mt-0.5">
                        {booking.serviceName}
                    </Typography>
                </View>
            </View>
            <StatusBadge status={booking.status} />
        </View>
        <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-800">
            <Typography variant='body'>{booking.date}</Typography>
            <Typography variant='body'>${booking.price}.00</Typography>
        </View>
    </View>
);
