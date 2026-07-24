import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

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

const DEFAULT_GEOCODE: GeocodeResult = {
  address: 'Downtown, Dubai, UAE',
  full: 'Downtown, Dubai, UAE',
  details: { area: 'Downtown', city: 'Dubai', country: 'UAE' },
};

export const checkLocationPermission = async (): Promise<boolean> => {
  const status = await check(LOC_PERMISSION);
  return (
    status === RESULTS.GRANTED ||
    (await request(LOC_PERMISSION)) === RESULTS.GRANTED
  );
};

export const getCurrentLocation = (
  options?: Geolocation.GeoOptions,
): Promise<LocationCoords> =>
  new Promise((resolve, reject) => {
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
      const full = data.results[0].formatted_address ?? DEFAULT_GEOCODE.full;
      return { ...DEFAULT_GEOCODE, address: full, full };
    }

    if (data?.address) {
      const { neighborhood, suburb, city, town, village, country } =
        data.address;
      const area = neighborhood ?? suburb ?? 'Downtown';
      const mainCity = city ?? town ?? village ?? 'Dubai';
      const countryName = country ?? 'UAE';
      const formatted = [area, mainCity, countryName]
        .filter(Boolean)
        .join(', ');
      const display =
        formatted || data.display_name || DEFAULT_GEOCODE.address;

      return {
        address: display,
        full: data.display_name ?? display,
        details: { area, city: mainCity, country: countryName },
      };
    }
  } catch (e) {
    console.warn('Geocode error:', e);
  }

  return DEFAULT_GEOCODE;
};
