import { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client/react';
import { gql } from '@/__generated__';
import { Location } from './types';

const GET_BOOKING_DETAILS_TRACKING = gql(`
  query GetBookingDetailsTracking($id: ID!) {
    bookingById(id: $id) {
      id
      status
      service {
        id
        name
      }
      vendorProfile {
        id
        businessName
      }
    }
  }
`);

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

export const useLiveTracking = (
  bookingId: string,
  initialLocation: Location,
  initialEta: number,
) => {
  const [currentLocation, setCurrentLocation] =
    useState<Location>(initialLocation);
  const [eta, setEta] = useState<number>(initialEta);
  const [status, setStatus] = useState<string>('on_the_way');

  // 1. Query booking metadata (vendor profile, status)
  const { data: bookingData } = useQuery(GET_BOOKING_DETAILS_TRACKING, {
    variables: { id: bookingId },
    skip: !bookingId,
  });

  // 2. Query initial driver location
  const { data: queryData, loading } = useQuery(GET_DRIVER_LOCATION, {
    variables: { bookingId },
    skip: !bookingId,
  });

  // Update state when initial location query loads
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

  // 3. Subscribe to live location updates
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

  const vendorName = bookingData?.bookingById?.vendorProfile?.businessName;

  return {
    currentLocation,
    eta,
    status,
    vendorName,
    loading,
  };
};
