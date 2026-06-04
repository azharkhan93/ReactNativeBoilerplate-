import { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client/react';
import { gql } from '@/__generated__';
import { Location } from './types';

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

export const useTrackingSimulation = (
  bookingId: string,
  startLocation: Location,
  destination: Location,
  initialEta: number,
  enabled: boolean = __DEV__,
) => {
  const [updateDriverLocation] = useMutation(UPDATE_DRIVER_LOCATION);
  const locationRef = useRef<Location>(startLocation);
  const etaRef = useRef<number>(initialEta);

  useEffect(() => {
    if (!enabled || !bookingId) return;

    // Reset/initialize location on backend
    updateDriverLocation({
      variables: {
        bookingId,
        latitude: startLocation.latitude,
        longitude: startLocation.longitude,
        status: 'on_the_way',
        eta: initialEta,
      },
    }).catch(err => console.error('[Sim] Initialization failed:', err));

    const interval = setInterval(() => {
      const current = locationRef.current;
      const latDiff = destination.latitude - current.latitude;
      const lngDiff = destination.longitude - current.longitude;

      if (Math.abs(latDiff) < 0.0001 && Math.abs(lngDiff) < 0.0001) {
        clearInterval(interval);
        updateDriverLocation({
          variables: {
            bookingId,
            latitude: destination.latitude,
            longitude: destination.longitude,
            status: 'arrived',
            eta: 0,
          },
        }).catch(err => console.error('[Sim] Arrive update failed:', err));
        return;
      }

      const nextLoc = {
        latitude: current.latitude + latDiff * 0.1,
        longitude: current.longitude + lngDiff * 0.1,
      };
      const nextEta = Math.max(1, etaRef.current - 1);

      locationRef.current = nextLoc;
      etaRef.current = nextEta;

      updateDriverLocation({
        variables: {
          bookingId,
          latitude: nextLoc.latitude,
          longitude: nextLoc.longitude,
          status: 'on_the_way',
          eta: nextEta,
        },
      }).catch(err => console.error('[Sim] Update failed:', err));
    }, 4000);

    return () => clearInterval(interval);
  }, [bookingId, startLocation, destination, initialEta, enabled, updateDriverLocation]);
};
