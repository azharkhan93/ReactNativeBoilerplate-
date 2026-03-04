import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Dimensions, StyleSheet, Platform } from 'react-native';
import { Search, MapPin, ChevronLeft, Navigation } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';
import { checkLocationPermission, getCurrentLocation, reverseGeocode, LOC_PERMISSION } from '../../../utils/locationHelper';
import { RESULTS, check } from 'react-native-permissions';
import { Typography } from '../../theme/Typography';
import { Container } from '../../theme/Container';
import { Button } from '../../theme/Button';
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
        <View style={{ width }} className="flex-1 bg-white px-6 pt-4">
            <Animated.View entering={FadeIn.duration(500)} className="flex-1">
                <Container variant="between" className="mb-8">
                    <TouchableOpacity onPress={onBack} className="p-2 -ml-2"><ChevronLeft color="#1e293b" size={28} /></TouchableOpacity>
                    <Typography variant="subheading" className="text-slate-900">Location Access</Typography>
                    <View className="w-8" />
                </Container>

                <Typography variant="body-sm" className="uppercase">Final Step</Typography>
                <View className="h-1.5 w-full bg-slate-100 rounded-full mb-10 overflow-hidden">
                    <View className="h-full bg-blue-500" style={{ width: '100%' }} />
                </View>

                <Typography variant="h2" className="text-black mb-3">Set Your Location</Typography>
                <Typography variant="body" className="text-black mb-8 leading-6">
                    We'll use this to find the best car wash service providers near you and ensure precise delivery.
                </Typography>

                <View className="flex-row items-center px-4 py-4 rounded-2xl mb-4 border bg-gray-50 border-gray-100">
                    <Search size={20} color="#64748B" className="mr-3" />
                    <TextInput
                        placeholder="Enter your street address"
                        placeholderTextColor="#64748B"
                        className="flex-1 text-slate-900 font-body"
                        value={query}
                        onChangeText={setQuery}
                    />
                </View>

                <Button variant="outlined" size="md" className="border-blue-100 bg-blue-50/50" onPress={handleLocation} disabled={loading}>
                    <View className="flex-row items-center justify-center">
                        <Navigation size={18} color="#3b82f6" fill={loading ? "transparent" : "#3b82f6"} />
                        <Typography className="ml-2 text-blue-600 font-body-bold">{loading ? 'Locating...' : 'Use Current Location'}</Typography>
                    </View>
                </Button>

                <View className="flex-1 mt-6 rounded-3xl overflow-hidden border border-slate-100 relative shadow-sm">
                    <MapView
                        ref={mapRef}
                        style={StyleSheet.absoluteFillObject}
                        initialRegion={{ ...DEFAULT_LOC, ...DELTAS, latitudeDelta: 0.1, longitudeDelta: 0.1 }}
                        showsUserLocation
                    >
                        {pos && (
                            <Marker coordinate={pos}>
                                <View className="w-10 h-10 bg-blue-500/20 rounded-full items-center justify-center">
                                    <View className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
                                </View>
                            </Marker>
                        )}
                    </MapView>

                    <View className="absolute bottom-4 left-4 right-4 bg-white/90 p-3 rounded-2xl border border-slate-100 flex-row items-center">
                        <MapPin size={18} color="#3b82f6" />
                        <Typography variant="body-sm" className="ml-2 text-slate-600 flex-1" numberOfLines={1}>
                            {address || (loading ? 'Locating...' : 'Search or use current location')}
                        </Typography>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};
