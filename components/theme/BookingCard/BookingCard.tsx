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
    onReviewPress?: (booking: Booking) => void;
}

const statusColors = {
    pending: { bg: 'bg-yellow-500/10 border border-yellow-500/20', text: 'text-yellow-400' },
    confirmed: { bg: 'bg-blue-500/10 border border-blue-500/20', text: 'text-blue-400' },
    on_the_way: { bg: 'bg-primary-500/10 border border-primary-500/20', text: 'text-primary-400' },
    completed: { bg: 'bg-green-500/10 border border-green-500/20', text: 'text-green-400' },
    cancelled: { bg: 'bg-red-500/10 border border-red-500/20', text: 'text-red-400' },
};

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onPress, onTrackPress, onReviewPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onPress?.(booking)}
            className="bg-gray-900 rounded-[24px] p-4 mb-4 border border-gray-800 shadow-sm"
        >
            <View className="flex-row">
                <Image
                    source={{ uri: booking.provider.imageUrl }}
                    className="w-20 h-20 rounded-2xl bg-gray-800"
                />
                <View className="flex-1 ml-4 justify-between">

                    <View className="flex-row justify-between items-start">
                        <View className="flex-1 mr-2">
                            <Typography variant="body" className="font-body-bold text-white">
                                {booking.provider.name}
                            </Typography>
                            <Typography variant="body-sm" className="text-gray-400 mt-0.5">
                                {booking.serviceName}
                            </Typography>
                        </View>
                        <View className={`px-2.5 py-1 rounded-full ${statusColors[booking.status].bg}`}>
                            <Typography variant="body-sm" className={`text-[9px] font-body-bold uppercase ${statusColors[booking.status].text}`}>
                                {booking.status.replace('_', ' ')}
                            </Typography>
                        </View>
                    </View>

                    <View className="flex-row items-center mt-3">
                        <View className="flex-row items-center mr-4">
                            <Calendar size={13} color="#9ca3af" />
                            <Typography variant="body-sm" className="ml-1 text-gray-400 font-body">
                                {booking.date}
                            </Typography>
                        </View>
                        <View className="flex-row items-center">
                            <Clock size={13} color="#9ca3af" />
                            <Typography variant="body-sm" className="ml-1 text-gray-400 font-body">
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

            {booking.status === 'completed' && (
                <View className="mt-4">
                    <Button
                        variant="outlined"
                        size="sm"
                        onPress={() => onReviewPress?.(booking)}
                        className="w-full border-primary-500/30 bg-primary-500/10 text-primary-400"
                    >
                        Rate Service
                    </Button>
                </View>
            )}
        </TouchableOpacity >
    );
};
