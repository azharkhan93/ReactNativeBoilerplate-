import React from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { ChevronLeft, Info, MoreVertical } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography, TrackingMap, DriverCard } from '@/components/theme';
import { MOCK_TRACKING_SESSION } from '@/data/mockTracking';
import { useTrackingSimulation } from './useTrackingSimulation';

export interface LiveTrackingScreenProps {
    onNavigate?: (route: string) => void;
}

export const LiveTrackingScreen: React.FC<LiveTrackingScreenProps> = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();
    const { currentLocation, eta } = useTrackingSimulation(MOCK_TRACKING_SESSION);

    return (
        <View className="flex-1 bg-white">
            {/* Full Screen Map */}
            <TrackingMap
                driverLocation={currentLocation}
                destination={MOCK_TRACKING_SESSION.destination}
                driverPhotoUrl={MOCK_TRACKING_SESSION.driver.photoUrl}
            />

           
            <View
                className="absolute top-0 left-0 right-0 px-5 flex-row items-center justify-between z-20"
                style={{ paddingTop: Math.max(insets.top, 20) }}
            >
                <TouchableOpacity
                    onPress={() => onNavigate?.('home')}
                    className="bg-white p-3 rounded-2xl shadow-xl border border-gray-100"
                >
                    <ChevronLeft size={24} color="black" />
                </TouchableOpacity>

                <View className="bg-white px-5 py-3 rounded-2xl shadow-xl border border-gray-100 items-center">
                    <Typography variant="body-sm" className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                        ESTIMATED ARRIVAL
                    </Typography>
                    <Typography variant="h3" className="text-primary-600 font-black">
                        {eta} MINS
                    </Typography>
                </View>

                <TouchableOpacity className="bg-white p-3 rounded-2xl shadow-xl border border-gray-100">
                    <MoreVertical size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Bottom Driver Info Overlay */}
            <View className="absolute bottom-10 left-5 right-5 z-20">
                <View className="mb-4 flex-row items-center justify-center">
                    <View className="bg-black/80 px-4 py-2 rounded-full flex-row items-center">
                        <Info size={14} color="white" />
                        <Typography variant="body-sm" className="ml-2 text-white font-medium">
                            Driver is approaching your location
                        </Typography>
                    </View>
                </View>

                <DriverCard driver={MOCK_TRACKING_SESSION.driver} />
            </View>
        </View>
    );
};
