import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Location } from '@/data/mockTracking';

export interface TrackingMapProps {
    driverLocation: Location;
    destination: Location;
    driverPhotoUrl: string;
}

export const TrackingMap: React.FC<TrackingMapProps> = ({
    driverLocation,
    destination,
    driverPhotoUrl,
}) => {
    const initialRegion = {
        latitude: (driverLocation.latitude + destination.latitude) / 2,
        longitude: (driverLocation.longitude + destination.longitude) / 2,
        latitudeDelta: Math.abs(driverLocation.latitude - destination.latitude) * 2,
        longitudeDelta: Math.abs(driverLocation.longitude - destination.longitude) * 2,
    };

    return (
        <View className="flex-1 overflow-hidden">
            <MapView
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                style={StyleSheet.absoluteFillObject}
                initialRegion={initialRegion}
            >
                {/* Route Line */}
                <Polyline
                    coordinates={[driverLocation, destination]}
                    strokeWidth={4}
                    strokeColor="#3B82F6"
                    lineDashPattern={[0]}
                />

                {/* Destination Marker */}
                <Marker coordinate={destination}>
                    <View className="bg-white p-2 rounded-full border-2 border-primary-500 shadow-xl">
                        <View className="w-3 h-3 rounded-full bg-primary-500" />
                    </View>
                </Marker>

                {/* Driver Marker */}
                <Marker coordinate={driverLocation} flat>
                    <View className="items-center">
                        <View className="bg-primary-500 p-1.5 rounded-full border-2 border-white shadow-2xl">
                            <View className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                {/* Placeholder for driver icon or photo */}
                                <View className="flex-1 bg-primary-600 rounded-full items-center justify-center">
                                    <View className="w-2 h-4 bg-white rounded-t-full mb-0.5" />
                                    <View className="w-4 h-2 bg-white rounded-full" />
                                </View>
                            </View>
                        </View>
                        {/* Direction Arrow Indicator */}
                        <View className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-primary-500 mt-[-2px]" />
                    </View>
                </Marker>
            </MapView>
        </View>
    );
};
