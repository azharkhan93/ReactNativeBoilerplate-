import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Dimensions, StyleSheet, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Search, MapPin, ChevronLeft, Navigation } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';
import { checkLocationPermission, getCurrentLocation, reverseGeocode, LOC_PERMISSION } from '../../../utils/locationHelper';
import { RESULTS, check } from 'react-native-permissions';
import { Typography } from '../../theme/Typography';
import { Container } from '../../theme/Container';
import { Button } from '../../theme/Button';
import { FormInput } from '../../theme/FormInput';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const DEFAULT_LOC = { latitude: 25.2048, longitude: 55.2708 };
const DELTAS = { latitudeDelta: 0.0122, longitudeDelta: 0.0121 };

export const LocationStep: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const mapRef = useRef<MapView>(null);
    const [pos, setPos] = useState<{ latitude: number; longitude: number } | null>(null);
    const [address, setAddress] = useState('');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLocation = useCallback(async () => {
        setLoading(true);
        try {
            const hasPermission = await checkLocationPermission();
            if (!hasPermission) return setLoading(false);

            const { latitude, longitude } = await getCurrentLocation();
            setPos({ latitude, longitude });
            mapRef.current?.animateToRegion({ latitude, longitude, ...DELTAS }, 1000);

            const geoData = await reverseGeocode(latitude, longitude);
            if (geoData) {
                setAddress(geoData.address);
                setQuery(geoData.full);
                console.log('Position Details:', geoData.details);
            }
        } catch (e) {
            console.error('Location Error:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        check(LOC_PERMISSION).then((s) => {
            if (s === RESULTS.GRANTED) handleLocation();
        });
    }, [handleLocation]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ width }} className="flex-1 bg-[#030712] px-6 pt-4">
                <Animated.View entering={FadeIn.duration(500)} className="flex-1">
                    <Container variant="between" className="mb-8">
                        <TouchableOpacity onPress={onBack} className="p-2 -ml-2"><ChevronLeft color="#ffffff" size={28} /></TouchableOpacity>
                        <Typography variant="subheading" className="text-white font-heading-bold">Location Access</Typography>
                        <View className="w-8" />
                    </Container>

                    <Typography variant="body" className="text-primary-500 uppercase font-body-bold">Final Step</Typography>
                    <View className="h-1.5 w-full bg-gray-800 rounded-full mb-10 overflow-hidden">
                        <View className="h-full bg-primary-500" style={{ width: '100%' }} />
                    </View>

                    <Typography variant="h2" className="text-white mb-3 font-heading-bold">Set Your Location</Typography>
                    <Typography variant="body" className="text-gray-400 mb-8 leading-6">
                        We'll use this to find the best car wash service providers near you and ensure precise delivery.
                    </Typography>

                    <FormInput
                        placeholder="Enter your street address"
                        value={query}
                        onChangeText={setQuery}
                        blurOnSubmit={true}
                        returnKeyType="search"
                        onSubmitEditing={Keyboard.dismiss}
                        containerClassName="mb-4"
                     
                    />

                    <Button variant="outlined" size="sm" onPress={handleLocation} loading={loading}>
                        {loading ? 'Locating...' : 'Use Current Location'}
                    </Button>

                    <View className="flex-1 mt-6 rounded-3xl overflow-hidden border border-gray-800 relative shadow-sm bg-gray-900">
                        <MapView
                            ref={mapRef}
                            style={StyleSheet.absoluteFillObject}
                            initialRegion={{ ...DEFAULT_LOC, ...DELTAS, latitudeDelta: 0.1, longitudeDelta: 0.1 }}
                            showsUserLocation
                        >
                            {pos && (
                                <Marker coordinate={pos}>
                                    <View className="w-10 h-10 bg-primary-500/20 rounded-full items-center justify-center">
                                        <View className="w-4 h-4 bg-primary-500 rounded-full border-2 border-white shadow-lg" />
                                    </View>
                                </Marker>
                            )}
                        </MapView>

                        <View className="absolute bottom-4 left-4 right-4 bg-gray-900/90 p-3 rounded-2xl border border-gray-800 flex-row items-center">
                            <MapPin size={18} color="#FF7A51" />
                            <Typography variant="body" className="text-white ml-2 flex-1" numberOfLines={1}>
                                {address || (loading ? 'Locating...' : 'Search or use current location')}
                            </Typography>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};
