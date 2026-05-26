import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Clock, Check, X } from 'lucide-react-native';
import { Typography } from '@/components/theme';

export interface BookingRequestProps {
    pendingRequests: any[];
}

export const BookingRequests: React.FC<BookingRequestProps> = ({ pendingRequests }) => (
    <View className="px-5 mb-6">
        <View className="flex-row justify-between items-center mb-4">
            <Typography className="text-slate-900 text-lg font-heading-semibold">
                New Booking Requests
            </Typography>
            {pendingRequests.length > 0 && (
                <View className="bg-primary-500/20 px-3 py-1 rounded-full">
                    <Typography variant="body-sm" className="text-primary-400 font-body-bold">
                        {pendingRequests.length} New
                    </Typography>
                </View>
            )}
        </View>

        {pendingRequests.length === 0 ? (
            <View className="bg-white rounded-3xl p-8 items-center justify-center border border-slate-200">
                <View className="w-16 h-16 bg-[#F1F6FD] rounded-full items-center justify-center mb-4">
                    <Clock size={28} color="#64748b" />
                </View>
                <Typography className="text-slate-500 font-body-medium mb-1">No pending requests</Typography>
                <Typography variant="body-sm" className="text-slate-400">New bookings will appear here</Typography>
            </View>
        ) : (
            pendingRequests.map((booking) => (
                <View key={booking.id} className="bg-white rounded-3xl p-5 mb-4 border border-slate-200">
                    <View className="flex-row items-start mb-4">
                        <View className="w-12 h-12 bg-[#F1F6FD] rounded-full items-center justify-center mr-4">
                            <Typography variant='body'>
                                {booking.customerName.charAt(0)}
                            </Typography>
                        </View>
                        <View className="flex-1">
                            <View className="flex-row justify-between items-start">
                                <Typography variant='body' className="text-slate-900">
                                    {booking.customerName}
                                </Typography>
                                <Typography variant='body' className="text-green-600">
                                    ${booking.price}.00
                                </Typography>
                            </View>
                            <Typography variant="body" className="mt-0.5 text-slate-600">
                                {booking.serviceName}
                            </Typography>
                            <View className="flex-row items-center mt-1">
                                <Clock size={12} color="#64748b" />
                                <Typography variant="body" className="ml-1.5 text-slate-500">
                                    10:30 AM - Today
                                </Typography>
                            </View>
                        </View>
                    </View>

                    <View className="flex-row gap-3">
                        <TouchableOpacity className="flex-1 bg-primary-500 py-3 rounded-2xl flex-row justify-center items-center" activeOpacity={0.7}>
                            <Check size={16} color="white" />
                            <Typography variant='body' className="ml-1.5 text-white font-body-bold">Accept</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-white border border-primary-500/30 py-3 rounded-2xl flex-row justify-center items-center" activeOpacity={0.7}>
                            <X size={16} color="#3b82f6" />
                            <Typography className="text-primary-600 font-body-bold ml-1.5">Decline</Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            ))
        )}
    </View>
);
