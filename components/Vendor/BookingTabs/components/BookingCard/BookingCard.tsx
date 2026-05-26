import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';
import { Avatar } from '../Avatar';
import { StatusBadge } from '../StatusBadge';
import { MOCK_BOOKINGS } from '@/utils/constants';

export const BookingCard: React.FC<{ booking: (typeof MOCK_BOOKINGS)[0] }> = ({ booking }) => (
    <View className="bg-white rounded-3xl p-5 mb-4 border border-slate-200">
        <View className="flex-row justify-between items-center">
            <View className="flex-row items-center flex-1 mr-3">
                <Avatar name={booking.customerName} />
                <View className="ml-3 flex-1">
                    <Typography className="text-slate-900 font-body-bold text-base">
                        {booking.customerName}
                    </Typography>
                    <Typography className="text-slate-500 font-body-bold text-xs tracking-widest mt-0.5">
                        {booking.serviceName}
                    </Typography>
                </View>
            </View>
            <StatusBadge status={booking.status} />
        </View>
        <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-slate-100">
            <Typography className="text-slate-400 text-[13px]">{booking.date} • {booking.time}</Typography>
            <Typography className="text-primary-400 font-heading-bold text-lg">${booking.price}.00</Typography>
        </View>
    </View>
);
