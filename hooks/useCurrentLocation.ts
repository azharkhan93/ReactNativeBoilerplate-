import { useState, useCallback } from 'react';
import {
  checkLocationPermission,
  getCurrentLocation,
  reverseGeocode,
  LocationCoords,
  GeocodeResult,
} from '@/utils/locationHelper';

export interface UseCurrentLocationState {
  coords: LocationCoords | null;
  geocode: GeocodeResult | null;
  isLoading: boolean;
  error: string | null;
  fetchLocation: () => Promise<LocationCoords | null>;
}

export const useCurrentLocation = (
  googleApiKey?: string,
): UseCurrentLocationState => {
  const [coords, setCoords] = useState<LocationCoords | null>(null);
  const [geocode, setGeocode] = useState<GeocodeResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async (): Promise<LocationCoords | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const hasPermission = await checkLocationPermission();
      if (!hasPermission) {
        setError('Location permission denied');
        setIsLoading(false);
        return null;
      }

      const locationCoords = await getCurrentLocation();
      setCoords(locationCoords);
      setIsLoading(false);

      // Fetch address reverse geocoding asynchronously
      reverseGeocode(
        locationCoords.latitude,
        locationCoords.longitude,
        googleApiKey,
      )
        .then(geoResult => {
          setGeocode(geoResult);
        })
        .catch(geoErr => {
          console.warn('Reverse geocode failed:', geoErr);
        });

      return locationCoords;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to get location';
      setError(message);
      setIsLoading(false);
      return null;
    }
  }, [googleApiKey]);

  return {
    coords,
    geocode,
    isLoading,
    error,
    fetchLocation,
  };
};
