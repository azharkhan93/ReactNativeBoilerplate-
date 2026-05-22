import { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client/react';
import { gql } from '@/__generated__';
import { Location } from '@/data/mockTracking';

const GET_DRIVER_LOCATION = gql(`
  query GetDriverLocation($bookingId: ID!) {
    driverLocation(bookingId: $bookingId) {
      bookingId
      latitude
      longitude
      status
      eta
      updatedAt
    }
  }
`);

const DRIVER_LOCATION_UPDATED = gql(`
  subscription OnDriverLocationUpdated($bookingId: ID!) {
    driverLocationUpdated(bookingId: $bookingId) {
      bookingId
      latitude
      longitude
      status
      eta
      updatedAt
    }
  }
`);

export const useLiveTracking = (bookingId: string, initialLocation: Location, initialEta: number) => {
  const [currentLocation, setCurrentLocation] = useState<Location>(initialLocation);
  const [eta, setEta] = useState<number>(initialEta);
  const [status, setStatus] = useState<string>('on_the_way');

  // 1. Query initial location
  const { data: queryData, loading } = useQuery(GET_DRIVER_LOCATION, {
    variables: { bookingId },
    skip: !bookingId,
  });

  // Update state when initial query loads
  useEffect(() => {
    if (queryData?.driverLocation) {
      setCurrentLocation({
        latitude: queryData.driverLocation.latitude,
        longitude: queryData.driverLocation.longitude,
      });
      setEta(queryData.driverLocation.eta);
      setStatus(queryData.driverLocation.status);
    }
  }, [queryData]);

  // 2. Subscribe to live updates
  const { data: subscriptionData } = useSubscription(DRIVER_LOCATION_UPDATED, {
    variables: { bookingId },
    skip: !bookingId,
  });

  // Update state when subscription updates
  useEffect(() => {
    if (subscriptionData?.driverLocationUpdated) {
      const update = subscriptionData.driverLocationUpdated;
      setCurrentLocation({
        latitude: update.latitude,
        longitude: update.longitude,
      });
      setEta(update.eta);
      setStatus(update.status);
    }
  }, [subscriptionData]);

  return {
    currentLocation,
    eta,
    status,
    loading,
  };
};
