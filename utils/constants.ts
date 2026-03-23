import { LucideIcon, Shield, Zap, Star, Clock, Car } from 'lucide-react-native';

export const USER_ROLES = {
    CUSTOMER: 'customer',
    PROVIDER: 'provider',
} as const;

import { GRAPHQL_API_URL } from './api';
export { GRAPHQL_API_URL };

export const BOOKING_STATUS = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
} as const;

export const SERVICE_CATEGORIES = [
    { id: '1', name: 'Sedan', icon: Car },
    { id: '2', name: 'SUV', icon: Zap },
    { id: '3', name: 'Luxury', icon: Shield },
    { id: '4', name: 'Hatchback', icon: Star },
    { id: '5', name: 'Bike', icon: Clock },
];

export const MOCK_SERVICES = [
    {
        id: '1',
        name: 'Premium SUV Wash',
        category: 'SUV',
        price: 45,
        rating: 4.8,
        reviews: 124,
        duration: '45 mins',
        image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80',
        provider: 'Quick Shine Co.',
    },
    {
        id: '2',
        name: 'Eco Sedan Detail',
        category: 'Sedan',
        price: 35,
        rating: 4.9,
        reviews: 89,
        duration: '60 mins',
        image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?w=800&q=80',
        provider: 'Green Wash',
    },
    {
        id: '3',
        name: 'Luxury Wax & Polish',
        category: 'Luxury',
        price: 120,
        rating: 5.0,
        reviews: 45,
        duration: '120 mins',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
        provider: 'Elite Detailers',
    },
];

export const MOCK_BOOKINGS = [
    {
        id: 'b1',
        serviceName: 'DELUXE INTERIOR CLEAN',
        customerName: 'Marcus Sterling',
        date: 'Today, Oct 24',
        time: '02:30 PM',
        address: '742 Evergreen Terrace, Springfield',
        price: 45,
        status: BOOKING_STATUS.PENDING,
    },
    {
        id: 'b2',
        serviceName: 'FULL EXTERIOR WAX',
        customerName: 'Helena Hills',
        date: 'Tomorrow, Oct 25',
        time: '09:00 AM',
        address: '123 Maple Avenue, Downtown',
        price: 65,
        status: BOOKING_STATUS.PENDING,
    },
    {
        id: 'b3',
        serviceName: 'Eco Sedan Detail',
        customerName: 'Sarah Smith',
        date: 'Oct 23, 2023',
        time: '11:00 AM',
        address: '456 Oak Street, Midtown',
        price: 35,
        status: BOOKING_STATUS.ACCEPTED,
    },
    {
        id: 'b4',
        serviceName: 'Luxury Wax & Polish',
        customerName: 'Mike Ross',
        date: 'Oct 22, 2023',
        time: '10:00 AM',
        address: '789 Pine Road, Uptown',
        price: 120,
        status: BOOKING_STATUS.COMPLETED,
    },
    {
        id: 'b5',
        serviceName: 'Basic Exterior Wash',
        customerName: 'Tom Hardy',
        date: 'Oct 20, 2023',
        time: '08:00 AM',
        address: '321 Elm Street, Westside',
        price: 25,
        status: BOOKING_STATUS.CANCELLED,
    },
];

export const MOCK_RECENT_ACTIVITY = [
    {
        id: 'r1',
        customerName: 'David Miller',
        serviceName: 'STANDARD EXPRESS',
        subtitle: 'Scheduled for Friday',
        status: BOOKING_STATUS.ACCEPTED,
        action: 'View Details',
    },
    {
        id: 'r2',
        customerName: 'Sarah Chen',
        serviceName: 'CERAMIC COATING',
        subtitle: 'Finished Yesterday',
        status: BOOKING_STATUS.COMPLETED,
        rating: 5.0,
    },
];

export const MOCK_USER = {
    id: 'u1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'Downtown, New York',
    role: USER_ROLES.CUSTOMER,
};

export const VENDOR_STATS = {
    totalEarnings: '2450.00',
    completedBookings: 84,
    rating: 4.9,
    activeBookings: 12,
};
