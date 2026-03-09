import { Home, User, LayoutDashboard, CalendarDays, BarChart3, MapPin, Navigation } from 'lucide-react-native';
import { TabItem } from '@/components/BottomTabNavigator';

export const VENDOR_TABS: TabItem[] = [
    { label: 'Home', icon: Home, route: 'home' },
    { label: 'Dashboard', icon: LayoutDashboard, route: 'dashboard' },
    { label: 'Bookings', icon: CalendarDays, route: 'bookings' },
    { label: 'Analytics', icon: BarChart3, route: 'analytics' },
    { label: 'Profile', icon: User, route: 'profile' },
];

export const CUSTOMER_TABS: TabItem[] = [
    { label: 'Home', icon: Home, route: 'home' },
    { label: 'Nearby', icon: MapPin, route: 'nearbyProviders' },
    { label: 'Tracking', icon: Navigation, route: 'liveTracking' },
    { label: 'Profile', icon: User, route: 'profile' },
];



export const HIDDEN_TOPBAR_ROUTES = ['profile', 'dashboard', 'bookings', 'analytics', 'nearbyProviders', 'liveTracking'];



