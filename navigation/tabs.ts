import { Home, User, LayoutDashboard, CalendarDays, BarChart3, MapPin } from 'lucide-react-native';
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
    { label: 'Profile', icon: User, route: 'profile' },
];

/** Routes where the top TopBar should be hidden */
export const HIDDEN_TOPBAR_ROUTES = ['profile', 'dashboard', 'bookings', 'analytics', 'nearbyProviders'];


