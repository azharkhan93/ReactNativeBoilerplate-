import { useState, useEffect, useCallback } from 'react';
import {
  getStoredLocation,
  setStoredLocation,
  isLocationPermissionGranted,
  getCurrentLocation,
  reverseGeocode,
  LocationData,
} from '@/utils/locationHelper';

const DEFAULT_FALLBACK_LOCATION: LocationData = {
  address: 'Location not set',
  coords: { latitude: 0, longitude: 0 },
};

export const useAppLocation = () => {
  const [userLocation, setUserLocationState] = useState<LocationData>(() => {
    const stored = getStoredLocation();
    return stored ?? DEFAULT_FALLBACK_LOCATION;
  });

  const handleSetUserLocation = useCallback((location: LocationData): void => {
    setUserLocationState(location);
    setStoredLocation(location);
  }, []);

  
  useEffect(() => {
    let isMounted = true;

    const refreshRealLocation = async (): Promise<void> => {
      try {
        const hasGranted = await isLocationPermissionGranted();
        if (!hasGranted || !isMounted) {
          return;
        }

        const coords = await getCurrentLocation();
        if (!isMounted) {
          return;
        }

        const geoResult = await reverseGeocode(
          coords.latitude,
          coords.longitude,
        );
        if (!isMounted) {
          return;
        }

        const freshLocation: LocationData = {
          address: geoResult.address,
          coords,
        };

        setUserLocationState(freshLocation);
        await setStoredLocation(freshLocation);
      } catch (error) {
        if (__DEV__) {
          console.warn('[useAppLocation] Location refresh error:', error);
        }
      }
    };

    refreshRealLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    userLocation,
    setUserLocation: handleSetUserLocation,
  };
};
