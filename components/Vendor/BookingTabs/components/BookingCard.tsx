import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';
import { Avatar } from './Avatar';
import { StatusBadge } from './StatusBadge';
import { MOCK_BOOKINGS } from '@/utils/constants';

export const BookingCard: React.FC<{ booking: (typeof MOCK_BOOKINGS)[0] }> = ({ booking }) => (
    <View className="bg-gray-900 rounded-3xl p-5 mb-4 border border-gray-800">
        <View className="flex-row justify-between items-center">
            <View className="flex-row items-center flex-1 mr-3">
                <Avatar name={booking.customerName} />
                <View className="ml-3 flex-1">
                    <Typography className="text-white font-body-bold text-base">
                        {booking.customerName}
                    </Typography>
                    <Typography className="text-gray-500 font-body-bold text-xs tracking-widest mt-0.5">
                        {booking.serviceName}
                    </Typography>
                </View>
            </View>
            <StatusBadge status={booking.status} />
        </View>
        <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-800">
            <Typography className="text-gray-500 text-sm">{booking.date}</Typography>
            <Typography className="text-primary-400 font-heading-bold">${booking.price}.00</Typography>
        </View>
    </View>
);
