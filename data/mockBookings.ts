import { Provider } from './mockProviders';

export interface Booking {
    id: string;
    provider: Provider;
    serviceName: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'on_the_way' | 'completed' | 'cancelled';
    price: number;
    hasTracking?: boolean;
}

export const MOCK_BOOKINGS: Booking[] = [
    {
        id: 'bk_1',
        provider: {
            id: '1',
            name: 'Elite Car Wash',
            rating: 4.8,
            distanceKm: 1.2,
            imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=400&h=300&auto=format&fit=crop',
            latitude: 25.276987,
            longitude: 55.296249,
            services: ['Premium Exterior Wash']
        },
        serviceName: 'Premium Exterior Wash',
        date: 'Today',
        time: '14:30',
        status: 'on_the_way',
        price: 85.00,
        hasTracking: true
    },
    {
        id: 'bk_2',
        provider: {
            id: '2',
            name: 'Quick Shine Stop',
            rating: 4.5,
            distanceKm: 2.5,
            imageUrl: 'https://images.unsplash.com/photo-1605610816748-61d00693def5?q=80&w=400&h=300&auto=format&fit=crop',
            latitude: 25.266987,
            longitude: 55.306249,
            services: ['Full Interior Cleaning']
        },
        serviceName: 'Full Interior Cleaning',
        date: 'Tomorrow',
        time: '10:00',
        status: 'confirmed',
        price: 120.00
    },
    {
        id: 'bk_3',
        provider: {
            id: '3',
            name: 'Sparkle Auto Spa',
            rating: 4.9,
            distanceKm: 0.8,
            imageUrl: 'https://images.unsplash.com/photo-1552933529-e359b2477262?q=80&w=400&h=300&auto=format&fit=crop',
            latitude: 25.286987,
            longitude: 55.286249,
            services: ['Ceramic Coating']
        },
        serviceName: 'Ceramic Coating',
        date: 'Mar 15, 2024',
        time: '16:45',
        status: 'pending',
        price: 450.00
    },
    {
        id: 'bk_h1',
        provider: {
            id: '4',
            name: 'Glow Car Care',
            rating: 4.7,
            distanceKm: 3.1,
            imageUrl: 'https://images.unsplash.com/photo-1599256621730-535414529fe0?q=80&w=400&h=300&auto=format&fit=crop',
            latitude: 25.256987,
            longitude: 55.316249,
            services: ['Basic Wash']
        },
        serviceName: 'Basic Wash',
        date: 'Mar 5, 2024',
        time: '11:00',
        status: 'completed',
        price: 45.00
    },
    {
        id: 'bk_c1',
        provider: {
            id: '2',
            name: 'Quick Shine Stop',
            rating: 4.5,
            distanceKm: 2.5,
            imageUrl: 'https://images.unsplash.com/photo-1605610816748-61d00693def5?q=80&w=400&h=300&auto=format&fit=crop',
            latitude: 25.266987,
            longitude: 55.306249,
            services: ['Full Interior Cleaning']
        },
        serviceName: 'Full Interior Cleaning',
        date: 'Mar 1, 2024',
        time: '09:00',
        status: 'cancelled',
        price: 120.00
    }
];

