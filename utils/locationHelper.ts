import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

export const LOC_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
})!;

export const checkLocationPermission = async (): Promise<boolean> => {
  const status = await check(LOC_PERMISSION);
  return (
    status === RESULTS.GRANTED ||
    (await request(LOC_PERMISSION)) === RESULTS.GRANTED
  );
};

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface GeocodeResult {
  address: string;
  full: string;
  details: { area: string; city: string; country: string };
}

export const getCurrentLocation = (
  options?: Geolocation.GeoOptions,
): Promise<LocationCoords> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      ({ coords }) =>
        resolve({ latitude: coords.latitude, longitude: coords.longitude }),
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
};

export const reverseGeocode = async (
  lat: number,
  lon: number,
  googleApiKey?: string,
): Promise<GeocodeResult> => {
  try {
    const url = googleApiKey
      ? `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleApiKey}`
      : `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Tab2WashMobileApp/1.0',
        Accept: 'application/json',
      },
    });
    const data = await res.json();

    if (googleApiKey && data.results?.[0]) {
      const full = data.results[0].formatted_address;
      return {
        address: full,
        full,
        details: { area: 'Downtown', city: 'Dubai', country: 'UAE' },
      };
    }

    if (data?.address) {
      const { neighborhood, suburb, city, town, village, country } =
        data.address;
      const area = neighborhood || suburb || 'Downtown';
      const mainCity = city || town || village || 'Dubai';
      const formatted = [area, mainCity, country || 'UAE']
        .filter(Boolean)
        .join(', ');
      return {
        address: formatted || data.display_name,
        full: data.display_name || formatted,
        details: { area, city: mainCity, country: country || 'UAE' },
      };
    }
  } catch (e) {
    console.warn('Geocode error:', e);
  }

  return {
    address: 'Downtown, Dubai, UAE',
    full: 'Downtown, Dubai, UAE',
    details: { area: 'Downtown', city: 'Dubai', country: 'UAE' },
  };
};
