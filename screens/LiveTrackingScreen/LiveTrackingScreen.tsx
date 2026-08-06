import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronLeft, Info, MoreVertical } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Typography,
  TrackingMap,
  DriverCard,
  Button,
} from '@/components/theme';
import { Driver } from '@/components/theme/DriverCard/types';
import { useLiveTracking } from './useLiveTracking';
import { useTrackingSimulation } from './useTrackingSimulation';
import { useTrackingNotifications } from './hooks';
import { LiveTrackingScreenProps, Location } from './types';
import { liveTrackingStyles } from './styles';

const DEFAULT_START_LOCATION: Location = {
  latitude: 25.280000,
  longitude: 55.300000,
};

const DEFAULT_DESTINATION_LOCATION: Location = {
  latitude: 25.276987,
  longitude: 55.296249,
};

const DEFAULT_DRIVER_INFO: Driver = {
  id: 'driver_1',
  name: 'Ahmed Hassan',
  photoUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&h=200&auto=format&fit=crop',
  rating: 4.8,
  phone: '+971 50 123 4567',
  vehicle: {
    model: 'Toyota Prius',
    plateNumber: 'DXB 12345',
    color: 'White',
  },
};

export const LiveTrackingScreen: React.FC<LiveTrackingScreenProps> = ({
  onNavigate,
  bookingId = 'bk_1',
  initialLocation = DEFAULT_START_LOCATION,
  initialEta = 8,
  destination = DEFAULT_DESTINATION_LOCATION,
  vendorName: initialVendorName,
  driver,
}) => {
  const insets = useSafeAreaInsets();

  // 1. Run simulator to push location updates to backend in dev mode
  useTrackingSimulation(
    bookingId,
    initialLocation,
    destination,
    initialEta,
    __DEV__,
  );

  // 2. Fetch driver location, vendor info, and subscribe to real-time updates from backend
  const { currentLocation, eta, status, vendorName: backendVendorName } = useLiveTracking(
    bookingId,
    initialLocation,
    initialEta,
  );

  const activeVendorName = backendVendorName ?? initialVendorName ?? 'Elite Car Wash';

  // 3. Monitor driver progress and trigger in-app notifications
  useTrackingNotifications(
    bookingId,
    activeVendorName,
    currentLocation,
    destination,
  );

  const displayEta = typeof eta === 'number' ? eta : 0;
  const activeDriver = useMemo(() => driver ?? DEFAULT_DRIVER_INFO, [driver]);

  return (
    <View className={liveTrackingStyles.container}>
      <TrackingMap
        driverLocation={currentLocation}
        destination={destination}
        driverPhotoUrl={activeDriver.photoUrl}
      />

      <View
        className={liveTrackingStyles.topBarContainer}
        style={{ paddingTop: Math.max(insets.top, 20) }}
      >
        <TouchableOpacity
          onPress={() => onNavigate?.('home')}
          className={liveTrackingStyles.iconButton}
        >
          <ChevronLeft size={24} color="black" />
        </TouchableOpacity>

        <View className={liveTrackingStyles.etaCard}>
          <Typography
            variant="body-sm"
            className={liveTrackingStyles.etaLabel}
          >
            ESTIMATED ARRIVAL
          </Typography>
          <Typography variant="h3" className={liveTrackingStyles.etaValue}>
            {displayEta} MINS
          </Typography>
        </View>

        <TouchableOpacity className={liveTrackingStyles.iconButton}>
          <MoreVertical size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View className={liveTrackingStyles.bottomContainer}>
        <View className={liveTrackingStyles.statusWrapper}>
          <View className={liveTrackingStyles.statusBadge}>
            <Info size={14} color="white" />
            <Typography
              variant="body-sm"
              className={liveTrackingStyles.statusText}
            >
              {status === 'completed' || displayEta === 0
                ? 'Wash service completed successfully!'
                : status === 'arrived'
                ? 'Driver has arrived at your location'
                : 'Driver is approaching your location'}
            </Typography>
          </View>
        </View>

        <DriverCard driver={activeDriver} />

        <Button
          variant="primary"
          className={liveTrackingStyles.button}
          onPress={() => onNavigate?.('ratingReview')}
        >
          {displayEta === 0
            ? 'Complete & Rate Wash →'
            : 'Proceed to Rating & Review →'}
        </Button>
      </View>
    </View>
  );
};
