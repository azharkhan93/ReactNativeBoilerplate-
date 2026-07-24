import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

export const LOC_PERMISSION = Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
})!;

export const checkLocationPermission = async () => {
    const status = await check(LOC_PERMISSION);
    if (status === RESULTS.GRANTED) return true;
    const result = await request(LOC_PERMISSION);
    return result === RESULTS.GRANTED;
};

export const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
            (err) => reject(err),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    });
};

export const reverseGeocode = async (lat: number, lon: number) => {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
            {
                headers: {
                    'User-Agent': 'Tab2WashMobileApp/1.0 (https://tab2wash.com)',
                    'Accept': 'application/json',
                },
            }
        );

        if (!res.ok) {
            return {
                address: `Downtown, Dubai, UAE`,
                full: `Downtown, Dubai, UAE`,
                details: { area: 'Downtown', city: 'Dubai', country: 'UAE' },
            };
        }

        const data = await res.json();
        if (data && data.address) {
            const { neighborhood, suburb, city, town, village, state, country } = data.address;
            const area = neighborhood || suburb || state || 'Downtown';
            const mainCity = city || town || village || 'Dubai';
            const formatted = [area, mainCity, country].filter(Boolean).join(', ');
            return {
                address: formatted || data.display_name || `Downtown, ${mainCity}`,
                full: data.display_name || `Downtown, ${mainCity}, UAE`,
                details: { area, city: mainCity, country: country || 'UAE' },
            };
        }
    } catch (e) {
        console.warn('Geocode Exception caught cleanly:', e);
    }
    return {
        address: `Downtown, Dubai, UAE`,
        full: `Downtown, Dubai, UAE`,
        details: { area: 'Downtown', city: 'Dubai', country: 'UAE' },
    };
};

