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
} from 'react-native';
import { MapPin } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  checkLocationPermission,
  getCurrentLocation,
  reverseGeocode,
  LOC_PERMISSION,
} from '../../../utils/locationHelper';
import { RESULTS, check } from 'react-native-permissions';
import { Typography } from '../../theme/Typography';
import { Button } from '../../theme/Button';
import { FormInput } from '../../theme/FormInput';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const DEFAULT_LOC = { latitude: 25.2048, longitude: 55.2708 };
const DELTAS = { latitudeDelta: 0.0122, longitudeDelta: 0.0121 };

export const LocationStep: React.FC<{ onBack: () => void }> = () => {
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
      }
    } catch (e) {
      console.error('Location Error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const handleQueryChange = useCallback((text: string) => {
    setQuery(text);
  }, []);

  useEffect(() => {
    check(LOC_PERMISSION).then(s => {
      if (s === RESULTS.GRANTED) handleLocation();
    });
  }, [handleLocation]);

  // Memoized values and sub-renders to avoid inline JSX/Ternaries
  const buttonText = useMemo(
    () => (loading ? 'Locating...' : 'Use Current Location'),
    [loading],
  );

  const addressLabel = useMemo(
    () =>
      address || (loading ? 'Locating...' : 'Search or use current location'),
    [address, loading],
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
         
          <View className="h-1 w-full bg-slate-200 rounded-full mb-10 overflow-hidden">
            <View className="h-full bg-primary-500 rounded-full w-full" />
          </View>

          <Typography
            variant="h2"
            className="text-slate-900 mb-3 font-heading-bold"
          >
            Set Your Location
          </Typography>
          <Typography variant="body" className="text-slate-600 mb-8 leading-6">
            We'll use this to find the best car wash service providers near you
            and ensure precise delivery.
          </Typography>

          <FormInput
            placeholder="Enter your street address"
            value={query}
            onChangeText={handleQueryChange}
            blurOnSubmit={true}
            returnKeyType="search"
            onSubmitEditing={handleDismissKeyboard}
            containerClassName="mb-4"
            multiline={true}
          />

          <Button
            variant="outlined"
            size="sm"
            onPress={handleLocation}
            loading={loading}
          >
            {buttonText}
          </Button>

          <View className="flex-1 mt-6 rounded-3xl overflow-hidden border border-slate-200 relative shadow-sm bg-white">
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

            <View className="absolute bottom-4 left-4 right-4 bg-white/95 p-3 rounded-2xl border border-slate-200 flex-row items-center shadow-lg shadow-slate-100">
              <MapPin size={18} color="#3b82f6" />
              <Typography
                variant="body"
                className="text-slate-800 ml-2 flex-1"
                numberOfLines={1}
              >
                {addressLabel}
              </Typography>
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
