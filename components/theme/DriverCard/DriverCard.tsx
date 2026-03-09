import React from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import { Phone, MessageCircle, Star, ShieldCheck } from 'lucide-react-native';
import { Typography } from '../Typography';
import { Driver } from '@/data/mockTracking';

export interface DriverCardProps {
    driver: Driver;
}

export const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
    return (
        <View className="bg-white rounded-[32px] p-5 shadow-2xl border border-gray-100">
            {/* Header Info */}
            <View className="flex-row items-center mb-6">
                <Image
                    source={{ uri: driver.photoUrl }}
                    className="w-16 h-16 rounded-2xl bg-gray-100"
                />
                <View className="flex-1 ml-4">
                    <View className="flex-row items-center">
                        <Typography variant="body" className="font-bold text-lg">
                            {driver.name}
                        </Typography>
                        <View className="ml-2 bg-green-50 px-2 py-0.5 rounded-full flex-row items-center">
                            <ShieldCheck size={12} color="#10B981" />
                            <Typography variant="body-sm" className="ml-1 text-green-700 text-[10px] font-bold">
                                VERIFIED
                            </Typography>
                        </View>
                    </View>
                    <View className="flex-row items-center mt-1">
                        <Star size={14} color="#FBBF24" fill="#FBBF24" />
                        <Typography variant="body-sm" className="ml-1 font-semibold">
                            {driver.rating}
                        </Typography>
                        <View className="w-1 h-1 rounded-full bg-gray-300 mx-2" />
                        <Typography variant="body-sm" className="text-gray-500">
                            {driver.vehicle.model} • {driver.vehicle.color}
                        </Typography>
                    </View>
                </View>
            </View>

            {/* Vehicle Details & Actions */}
            <View className="flex-row items-center justify-between border-t border-gray-100 pt-5">
                <View>
                    <Typography variant="body-sm" className="text-gray-400 mb-1">
                        PLATE NUMBER
                    </Typography>
                    <Typography variant="body" className="font-black text-gray-900 tracking-widest bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                        {driver.vehicle.plateNumber}
                    </Typography>
                </View>

                <View className="flex-row items-center space-x-3">
                    <TouchableOpacity
                        onPress={() => Linking.openURL(`tel:${driver.phone}`)}
                        className="bg-primary-500 p-4 rounded-2xl shadow-lg border border-primary-600"
                    >
                        <Phone size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200"
                    >
                        <MessageCircle size={20} color="#3B82F6" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
