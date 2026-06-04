import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronLeft, Info, MoreVertical } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Typography,
  TrackingMap,
  DriverCard,
  Button,
} from '@/components/theme';
import { MOCK_TRACKING_SESSION } from '@/data/mockTracking';
import { useLiveTracking } from './useLiveTracking';
import { useTrackingSimulation } from './useTrackingSimulation';
import { LiveTrackingScreenProps } from './types';
import { liveTrackingStyles } from './styles';

export const LiveTrackingScreen: React.FC<LiveTrackingScreenProps> = ({
  onNavigate,
  bookingId = 'bk_1',
  initialLocation = MOCK_TRACKING_SESSION.currentLocation,
  initialEta = MOCK_TRACKING_SESSION.estimatedArrivalMinutes,
  destination = MOCK_TRACKING_SESSION.destination,
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

  // 2. Fetch driver location and subscribe to real-time updates from backend
  const { currentLocation, eta, status } = useLiveTracking(
    bookingId,
    initialLocation,
    initialEta,
  );

  const displayEta = typeof eta === 'number' ? eta : 0;

  return (
    <View className={liveTrackingStyles.container}>
      <TrackingMap
        driverLocation={currentLocation}
        destination={destination}
        driverPhotoUrl={MOCK_TRACKING_SESSION.driver.photoUrl}
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

        <DriverCard driver={MOCK_TRACKING_SESSION.driver} />

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
