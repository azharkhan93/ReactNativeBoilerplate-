import { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client/react';
import Geolocation from 'react-native-geolocation-service';

import { gql } from '@/__generated__';
import { checkLocationPermission } from '@/utils/locationHelper';

import { UseDriverLocationPublisherProps } from './types';

const UPDATE_DRIVER_LOCATION = gql(`
  mutation UpdateDriverLocation($bookingId: ID!, $latitude: Float!, $longitude: Float!, $status: String!, $eta: Int!) {
    updateDriverLocation(bookingId: $bookingId, latitude: $latitude, longitude: $longitude, status: $status, eta: $eta) {
      bookingId
      latitude
      longitude
      status
      eta
    }
  }
`);

export const useDriverLocationPublisher = ({
  bookingId,
  isTrackingEnabled,
  status = 'on_the_way',
  eta = 5,
}: UseDriverLocationPublisherProps): { readonly isTracking: boolean } => {
  const [updateDriverLocation] = useMutation(UPDATE_DRIVER_LOCATION);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    const startTracking = async (): Promise<void> => {
      try {
        if (!bookingId || !isTrackingEnabled) {
          return;
        }

        const hasPermission = await checkLocationPermission();
        if (!hasPermission || !isSubscribed) {
          return;
        }

        // Start watching position
        watchIdRef.current = Geolocation.watchPosition(
          async (position) => {
            if (!isSubscribed) {
              return;
            }
            try {
              const { latitude, longitude } = position.coords;
              await updateDriverLocation({
                variables: {
                  bookingId,
                  latitude,
                  longitude,
                  status,
                  eta,
                },
              });
            } catch {
              // Fail silently in background
            }
          },
          () => {
            // Handle location error silently or use logs in development
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 10, // Update location every 10 meters to avoid API spamming
            interval: 5000,     // Update location every 5 seconds
            fastestInterval: 2000,
          }
        );
      } catch {
        // Handle background initialization errors safely
      }
    };

    startTracking();

    return () => {
      isSubscribed = false;
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [bookingId, isTrackingEnabled, status, eta, updateDriverLocation]);

  return {
    isTracking: isTrackingEnabled && watchIdRef.current !== null,
  };
};
