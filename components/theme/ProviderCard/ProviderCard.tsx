import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Star, MapPin, Clock, ChevronRight } from 'lucide-react-native';
import { Typography } from '../Typography';
import { Provider } from '@/data/mockProviders';

export interface ProviderCardProps {
    provider: Provider;
    onPress?: (id: string) => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onPress }) => (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress?.(provider.id)}
        className="bg-white rounded-[20px] p-2.5 mb-3 flex-row items-center shadow-sm border border-gray-100"
    >
        <Image
            source={{ uri: provider.imageUrl }}
            className="w-16 h-16 rounded-xl bg-gray-100"
            resizeMode="cover"
        />

        <View className="flex-1 ml-3 h-16 justify-center">
            <Typography variant="body" className="font-semibold leading-tight" numberOfLines={1}>
                {provider.name}
            </Typography>

            <View className="flex-row items-center mt-1">
                <Star size={12} color="#FBBF24" fill="#FBBF24" />
                <Typography variant="body-sm" className="ml-1 font-medium text-[11px]">
                    {provider.rating}
                </Typography>
                <View className="w-0.5 h-0.5 rounded-full bg-gray-300 mx-1.5" />
                <View className="flex-row items-center">
                    <MapPin size={10} color="#9CA3AF" />
                    <Typography variant="body-sm" className="ml-0.5 text-gray-500 text-[11px]">
                        {provider.distanceKm} km
                    </Typography>
                </View>
            </View>

            {provider.services?.[0] && (
                <View className="flex-row items-center mt-1">
                    <View className="bg-primary-50 px-2 py-0.5 rounded-md">
                        <Typography variant="body-sm" className="text-primary-700 text-[10px] font-medium">
                            {provider.services[0]}
                        </Typography>
                    </View>
                </View>
            )}
        </View>

        <View className="bg-gray-50 p-2 rounded-full mr-1">
            <ChevronRight size={16} color="#9CA3AF" />
        </View>
    </TouchableOpacity>
);



