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
    pending: { bg: 'bg-yellow-500/10 border border-yellow-500/25', text: 'text-yellow-700' },
    confirmed: { bg: 'bg-blue-500/10 border border-blue-500/25', text: 'text-blue-700' },
    on_the_way: { bg: 'bg-primary-500/15 border border-primary-500/30', text: 'text-primary-700' },
    completed: { bg: 'bg-green-500/15 border border-green-500/30', text: 'text-green-700' },
    cancelled: { bg: 'bg-red-500/15 border border-red-500/30', text: 'text-red-700' },
};

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onPress, onTrackPress, onReviewPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onPress?.(booking)}
            className="bg-notch rounded-[24px] p-4 mb-4 border border-blue-200/50 shadow-sm shadow-slate-100"
        >
            <View className="flex-row">
                <Image
                    source={{ uri: booking.provider.imageUrl }}
                    className="w-20 h-20 rounded-2xl bg-white/40 border border-slate-200/40"
                />
                <View className="flex-1 ml-4 justify-between">

                    <View className="flex-row justify-between items-start">
                        <View className="flex-1 mr-2">
                            <Typography variant="body" className="font-body-bold text-slate-900">
                                {booking.provider.name}
                            </Typography>
                            <Typography variant="body-sm" className="text-slate-700 mt-0.5 font-medium">
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
                            <Calendar size={13} color="#475569" />
                            <Typography variant="body-sm" className="ml-1 text-slate-600 font-body-medium">
                                {booking.date}
                            </Typography>
                        </View>
                        <View className="flex-row items-center">
                            <Clock size={13} color="#475569" />
                            <Typography variant="body-sm" className="ml-1 text-slate-600 font-body-medium">
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
                        className="w-full shadow shadow-primary-200"
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
                        className="w-full border-primary-500/30 bg-white/70 text-primary-600"
                    >
                        Rate Service
                    </Button>
                </View>
            )}
        </TouchableOpacity >
    );
};
