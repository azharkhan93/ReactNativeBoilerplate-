import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { MapPin, LocateFixed, Check, Search } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  checkLocationPermission,
  getCurrentLocation,
  reverseGeocode,
  LOC_PERMISSION,
} from '../../../utils/locationHelper';
import { RESULTS, check } from 'react-native-permissions';
import { Typography } from '../../theme/Typography';
import { FormInput } from '../../theme/FormInput';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const DEFAULT_LOC = { latitude: 25.2048, longitude: 55.2708 };
const DELTAS = { latitudeDelta: 0.0122, longitudeDelta: 0.0121 };

export interface LocationStepProps {
  onLocationSelect?: (data: {
    address: string;
    coords: { latitude: number; longitude: number };
  }) => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({
  onLocationSelect,
}) => {
  const mapRef = useRef<MapView>(null);
  const [pos, setPos] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Handlers defined at the top
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
        onLocationSelect?.({
          address: geoData.address,
          coords: { latitude, longitude },
        });
      }
    } catch (e) {
      console.error('Location Error:', e);
    } finally {
      setLoading(false);
    }
  }, [onLocationSelect]);

  const handleDismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const handleQueryChange = useCallback((text: string) => {
    setQuery(text);
    if (text.trim()) {
      onLocationSelect?.({
        address: text,
        coords: pos || DEFAULT_LOC,
      });
    }
  }, [onLocationSelect, pos]);

  useEffect(() => {
    check(LOC_PERMISSION).then(s => {
      if (s === RESULTS.GRANTED) handleLocation();
    });
  }, [handleLocation]);

  const addressLabel = useMemo(
    () =>
      address || query || (loading ? 'Detecting your location...' : 'Search address or tap Use My Current Location'),
    [address, query, loading],
  );

  const mapMarker = useMemo(() => {
    if (!pos) return null;
    return (
      <Marker coordinate={pos}>
        <View className="w-10 h-10 bg-primary-500/20 rounded-full items-center justify-center">
          <View className="w-4 h-4 bg-primary-500 rounded-full border-2 border-white shadow-lg" />
        </View>
      </Marker>
    );
  }, [pos]);

  return (
    <TouchableWithoutFeedback
      onPress={handleDismissKeyboard}
      accessible={false}
    >
      <View style={styles.container} className="flex-1 bg-[#F1F6FD] px-6 pt-10">
        <Animated.View entering={FadeIn.duration(500)} className="flex-1">
          <Typography
            variant="h2"
            className="text-slate-900 mb-2 font-heading-bold"
          >
            Set Your Location
          </Typography>
          <Typography variant="body" className="text-slate-600 mb-6 leading-6 font-body-medium">
            Find the best car wash service providers near you and ensure precise delivery.
          </Typography>

          <FormInput
            placeholder="Enter your street address"
            value={query}
            onChangeText={handleQueryChange}
            blurOnSubmit={true}
            returnKeyType="search"
            onSubmitEditing={handleDismissKeyboard}
            containerClassName="mb-3"
            icon={<Search size={18} color="#64748b" />}
          />

          <TouchableOpacity
            onPress={handleLocation}
            disabled={loading}
            className="mb-4 p-3.5 bg-blue-50/90 border border-blue-200/80 rounded-2xl flex-row items-center justify-center shadow-sm shadow-blue-100/40"
            activeOpacity={0.7}
          >
            <LocateFixed size={20} color="#3b82f6" />
            <Typography variant="body" className="font-heading-semibold text-primary-600 ml-2.5 text-sm">
              {loading ? 'Detecting location...' : 'Use My Current Location'}
            </Typography>
          </TouchableOpacity>

          <View className="flex-1 mt-2 rounded-3xl overflow-hidden border border-slate-200/80 relative shadow-sm bg-white">
            <MapView
              ref={mapRef}
              className="absolute inset-0"
              initialRegion={{
                ...DEFAULT_LOC,
                ...DELTAS,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              showsUserLocation
            >
              {mapMarker}
            </MapView>

            <View className="absolute bottom-4 left-4 right-4 bg-white/95 p-3.5 rounded-2xl border border-slate-200/80 flex-row items-center shadow-lg shadow-slate-100">
              <View className={`w-8 h-8 rounded-full items-center justify-center ${pos || query ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                <MapPin size={18} color={pos || query ? '#16a34a' : '#3b82f6'} />
              </View>
              <View className="ml-3 flex-1">
                <Typography variant="body-sm" className="text-slate-400 text-[10px] uppercase tracking-wider font-body-bold">
                  Selected Location
                </Typography>
                <Typography
                  variant="body"
                  className="text-slate-900 font-body-bold text-sm"
                  numberOfLines={1}
                >
                  {addressLabel}
                </Typography>
              </View>
              {(pos || query.trim()) && (
                <View className="w-6 h-6 rounded-full bg-emerald-500 items-center justify-center ml-2 shadow-sm shadow-emerald-200">
                  <Check size={14} color="white" />
                </View>
              )}
            </View>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
  },
});
