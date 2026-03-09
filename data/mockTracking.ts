export interface Location {
    latitude: number;
    longitude: number;
}

export interface Driver {
    id: string;
    name: string;
    photoUrl: string;
    rating: number;
    phone: string;
    vehicle: {
        model: string;
        plateNumber: string;
        color: string;
    };
}

export interface TrackingSession {
    id: string;
    driver: Driver;
    currentLocation: Location;
    destination: Location;
    status: 'on_the_way' | 'arrived' | 'picked_up';
    estimatedArrivalMinutes: number;
}

export const MOCK_TRACKING_SESSION: TrackingSession = {
    id: 'track_123',
    driver: {
        id: 'driver_1',
        name: 'Ahmed Hassan',
        photoUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&h=200&auto=format&fit=crop',
        rating: 4.8,
        phone: '+971 50 123 4567',
        vehicle: {
            model: 'Toyota Prius',
            plateNumber: 'DXB 12345',
            color: 'White',
        },
    },
    currentLocation: {
        latitude: 25.280000,
        longitude: 55.300000,
    },
    destination: {
        latitude: 25.276987,
        longitude: 55.296249,
    },
    status: 'on_the_way',
    estimatedArrivalMinutes: 8,
};
