import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Star, MapPin, ChevronRight } from 'lucide-react-native';
import { Typography } from '../Typography';
import { Provider } from '@/data/mockProviders';

export interface ProviderCardProps {
    provider: Provider;
    onPress?: (id: string) => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onPress?.(provider.id)}
            className="bg-white rounded-[24px] p-4 mb-4 flex-row items-center shadow-sm border border-gray-50"
        >
            <Image
                source={{ uri: provider.imageUrl }}
                className="w-20 h-20 rounded-2xl bg-gray-100"
                resizeMode="cover"
            />

            <View className="flex-1 ml-4 justify-between py-1">
                <View>
                    <Typography variant="body"  numberOfLines={1}>
                        {provider.name}
                    </Typography>

                    <View className="flex-row items-center mt-1">
                        <Star size={14} color="#FBBF24" fill="#FBBF24" />
                        <Typography variant="body-sm" className="ml-1">
                            {provider.rating}
                        </Typography>
                        <View className="w-1 h-1 rounded-full bg-gray-300 mx-2" />
                        {provider.distanceKm !== undefined && (
                            <View className="flex-row items-center">
                                <MapPin size={12} color="#9CA3AF" />
                                <Typography variant="body-sm" className="ml-0.5">
                                    {provider.distanceKm} km
                                </Typography>
                            </View>
                        )}
                    </View>
                </View>

                <View className="flex-row items-center mt-2">
                    {provider.services?.slice(0, 2).map((service, index) => (
                        <View key={index} className="bg-primary-50 px-2.5 py-1 rounded-lg mr-2">
                            <Typography variant="body-sm">
                                {service}
                            </Typography>
                        </View>
                    ))}
                </View>
            </View>

            <View className="bg-gray-50 p-2 rounded-full">
                <ChevronRight size={20} color="#9CA3AF" />
            </View>
        </TouchableOpacity>
    );
};
