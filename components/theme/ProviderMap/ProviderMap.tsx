import React from 'react';
import { View, StyleSheet, Platform, Image } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Provider } from '@/data/mockProviders';
import { Typography } from '../Typography';
import { Star } from 'lucide-react-native';

export interface ProviderMapProps {
    providers: Provider[];
    onProviderPress?: (id: string) => void;
    initialRegion?: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
}

export const ProviderMap: React.FC<ProviderMapProps> = ({
    providers,
    onProviderPress,
    initialRegion = {
        latitude: 25.276987,
        longitude: 55.296249,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    },
}) => {
    return (
        <View className="flex-1 overflow-hidden rounded-[32px] border border-gray-100">
            <MapView
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                style={StyleSheet.absoluteFillObject}
                initialRegion={initialRegion}
                showsUserLocation
                showsMyLocationButton={false}
            >
                {providers.map((provider) => (
                    <Marker
                        key={provider.id}
                        coordinate={{
                            latitude: provider.latitude,
                            longitude: provider.longitude,
                        }}
                        onPress={() => onProviderPress?.(provider.id)}
                    >
                        <View className="bg-primary-500 p-2 rounded-full border-2 border-white shadow-lg">
                            <Image
                                source={{ uri: provider.imageUrl }}
                                className="w-8 h-8 rounded-full"
                            />
                        </View>
                        <Callout tooltip onPress={() => onProviderPress?.(provider.id)}>
                            <View className="bg-white p-3 rounded-2xl shadow-xl w-48 border border-gray-100">
                                <Typography variant="body-sm" numberOfLines={1}>
                                    {provider.name}
                                </Typography>
                                <View className="flex-row items-center mt-1">
                                    <Star size={12} color="#FBBF24" fill="#FBBF24" />
                                    <Typography variant="body-sm">
                                        {provider.rating}
                                    </Typography>
                                    <Typography variant="body-sm">
                                        {provider.distanceKm} km
                                    </Typography>
                                </View>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};
