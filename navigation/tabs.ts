import { Home, Search, Heart, ShoppingBag, User, LayoutDashboard, CalendarDays, BarChart3 } from 'lucide-react-native';
import { TabItem } from '@/components/BottomTabNavigator';

export const VENDOR_TABS: TabItem[] = [
    { label: 'Home',      icon: Home,            route: 'home'       },
    { label: 'Dashboard', icon: LayoutDashboard, route: 'dashboard' },
    { label: 'Bookings',  icon: CalendarDays,    route: 'bookings'   },
    { label: 'Analytics', icon: BarChart3,        route: 'analytics'  },
    { label: 'Profile',   icon: User,             route: 'profile'    },
];

export const CUSTOMER_TABS: TabItem[] = [
    { label: 'Home',      icon: Home,        route: 'home'      },
    { label: 'Search',    icon: Search,      route: 'search'    },
    { label: 'Favorites', icon: Heart,       route: 'favorites' },
    { label: 'Cart',      icon: ShoppingBag, route: 'cart'      },
    { label: 'Profile',   icon: User,        route: 'profile'   },
];

/** Routes where the top TopBar should be hidden */
export const HIDDEN_TOPBAR_ROUTES = ['profile', 'dashboard', 'bookings', 'analytics'];
