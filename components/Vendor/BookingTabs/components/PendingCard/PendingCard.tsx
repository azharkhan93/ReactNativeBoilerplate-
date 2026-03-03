import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { Avatar } from '../Avatar';
import { StatusBadge } from '../StatusBadge';
import { MOCK_BOOKINGS } from '@/utils/constants';

export const PendingCard: React.FC<{ booking: (typeof MOCK_BOOKINGS)[0] }> = ({ booking }) => (
    <View className="bg-gray-900 rounded-3xl p-5 mb-4 border border-gray-800">
        <View className="flex-row justify-between items-center mb-4">
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

        <View className="flex-row items-center mb-2">
            <Calendar size={13} color="#6b7280" />
            <Typography className="text-gray-400 text-[13px] ml-2">
                {booking.date} • {booking.time}
            </Typography>
        </View>
        <View className="flex-row items-center mb-5">
            <MapPin size={13} color="#6b7280" />
            <Typography className="text-gray-400 text-[13px] ml-2">{booking.address}</Typography>
        </View>

        <View className="flex-row justify-between items-center">
            <Typography className="text-primary-400 text-xl font-heading-bold">
                ${booking.price}.00
            </Typography>
            <View className="flex-row gap-3">
                <TouchableOpacity
                    className="bg-primary-500 px-5 py-2.5 rounded-xl"
                    activeOpacity={0.8}>
                    <Typography className="text-white font-body-bold text-sm">Accept</Typography>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-gray-800 border border-gray-700 px-5 py-2.5 rounded-xl"
                    activeOpacity={0.8}>
                    <Typography className="text-gray-300 font-body-bold text-sm">Details</Typography>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);
