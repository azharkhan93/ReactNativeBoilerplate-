import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { appStorage, STORAGE_KEYS, persistCriticalKey } from '@/utils/cache';

export const LOC_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
})!;

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface GeocodeResult {
  address: string;
  full: string;
  details: { area: string; city: string; country: string };
}

export interface LocationData {
  address: string;
  coords: LocationCoords;
}

export const checkLocationPermission = async (): Promise<boolean> => {
  const status = await check(LOC_PERMISSION);
  if (status === RESULTS.GRANTED) return true;
  return (await request(LOC_PERMISSION)) === RESULTS.GRANTED;
};

export const isLocationPermissionGranted = async (): Promise<boolean> => {
  try {
    return (await check(LOC_PERMISSION)) === RESULTS.GRANTED;
  } catch {
    return false;
  }
};

export const getStoredLocation = (): LocationData | null => {
  try {
    const raw = appStorage.getString(STORAGE_KEYS.LAST_LOCATION);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LocationData;
    return parsed?.address && typeof parsed.coords?.latitude === 'number' && typeof parsed.coords?.longitude === 'number'
      ? parsed
      : null;
  } catch {
    return null;
  }
};

export const setStoredLocation = async (location: LocationData): Promise<void> => {
  try {
    await persistCriticalKey(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(location));
  } catch (error) {
    if (__DEV__) console.warn('[LocationHelper] Persist error:', error);
  }
};

export const getCurrentLocation = (
  options?: Geolocation.GeoOptions,
): Promise<LocationCoords> =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
        ...options,
      },
    );
  });

export const reverseGeocode = async (
  lat: number,
  lon: number,
  googleApiKey?: string,
): Promise<GeocodeResult> => {
  const fallback = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;

  try {
    const url = googleApiKey
      ? `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleApiKey}`
      : `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

    const res = await fetch(url, {
      headers: { 'User-Agent': 'Tab2WashMobileApp/1.0', Accept: 'application/json' },
    });
    const data = await res.json();

    if (googleApiKey && data.results?.[0]?.formatted_address) {
      const full = data.results[0].formatted_address;
      return { address: full, full, details: { area: '', city: '', country: '' } };
    }

    const addr = data?.address;
    if (addr) {
      const area = addr.neighbourhood ?? addr.neighborhood ?? addr.suburb ?? addr.road ?? addr.quarter ?? addr.residential ?? '';
      const city = addr.city ?? addr.town ?? addr.village ?? addr.municipality ?? addr.county ?? addr.state_district ?? addr.state ?? '';
      const country = addr.country ?? '';

      const parts = [area, city, country].filter(Boolean);
      const display = parts.length ? parts.join(', ') : (data.display_name ?? fallback);

      return {
        address: display,
        full: data.display_name ?? display,
        details: { area, city, country },
      };
    }

    if (data?.display_name) {
      return { address: data.display_name, full: data.display_name, details: { area: '', city: '', country: '' } };
    }
  } catch (error) {
    if (__DEV__) console.warn('[LocationHelper] Reverse geocode error:', error);
  }

  return { address: fallback, full: `Lat: ${lat}, Lon: ${lon}`, details: { area: '', city: '', country: '' } };
};
