import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

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
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`, {
            headers: { 'User-Agent': 'NativeApp/1.0' },
        });
        const data = await res.json();
        if (data.address) {
            const { neighborhood, suburb, city, town, village, country } = data.address;
            const area = neighborhood || suburb || city || '';
            const mainCity = city || town || village || '';
            return {
                address: [area, mainCity, country].filter(Boolean).join(', '),
                full: data.display_name,
                details: { area, city: mainCity, country }
            };
        }
    } catch (e) {
        console.error('Geocode Error:', e);
    }
    return null;
};
