import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Calendar, Clock } from 'lucide-react-native';

import { Typography } from '../Typography';
import { Button } from '../Button';

import { Booking } from '@/data/mockBookings';

export interface BookingCardProps {
    booking: Booking;
    onPress?: (booking: Booking) => void;
    onTrackPress?: (booking: Booking) => void;
}

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    on_the_way: 'bg-primary-100 text-primary-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onPress, onTrackPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onPress?.(booking)}
            className="bg-white rounded-[24px] p-4 mb-4 border border-gray-100 shadow-sm"
        >
            <View className="flex-row">
                <Image
                    source={{ uri: booking.provider.imageUrl }}
                    className="w-20 h-20 rounded-2xl bg-gray-100"
                />
                <View className="flex-1 ml-4 justify-between">

                    <View className="flex-row justify-between items-start">
                        <View>
                            <Typography variant="body" className="font-bold">
                                {booking.provider.name}
                            </Typography>
                            <Typography variant="body-sm" className="text-gray-500">
                                {booking.serviceName}
                            </Typography>
                        </View>
                        <View className={`px-2 py-1 rounded-full ${statusColors[booking.status]}`}>
                            <Typography variant="body-sm" className="text-[10px] font-bold uppercase">
                                {booking.status.replace('_', ' ')}
                            </Typography>
                        </View>
                    </View>

                    <View className="flex-row items-center mt-2">
                        <View className="flex-row items-center mr-4">
                            <Calendar size={14} color="#6B7280" />
                            <Typography variant="body-sm" className="ml-1 text-gray-500">
                                {booking.date}
                            </Typography>
                        </View>
                        <View className="flex-row items-center">
                            <Clock size={14} color="#6B7280" />
                            <Typography variant="body-sm" className="ml-1 text-gray-500">
                                {booking.time}
                            </Typography>
                        </View>
                    </View>
                </View>
            </View>

            {booking.hasTracking && (
                <View className="mt-4">
                    <Button
                        variant="primary"
                        size="sm"
                        onPress={() => onTrackPress?.(booking)}
                        className="w-full"
                    >
                        Track Provider
                    </Button>
                </View>
            )}
        </TouchableOpacity >
    );
};
