import { DimensionValue } from 'react-native';
import {
  LucideIcon,
  User,
  Package,
  RefreshCw,
  Lock,
  MapPin,
} from 'lucide-react-native';

export interface AccountMenuItemData {
  id: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
}

export const PROFILE_USER_DATA = {
  name: 'Md Abu Ubayda',
  phone: '+88001712346789',
};

export const ACCOUNT_MENU_ITEMS: AccountMenuItemData[] = [
  { id: 'profile', label: 'My Profile', icon: User, iconColor: '#60a5fa' },
  { id: 'orders', label: 'My Orders', icon: Package, iconColor: '#4ade80' },
  { id: 'refund', label: 'Refund', icon: RefreshCw, iconColor: '#a855f7' },
  {
    id: 'password',
    label: 'Change Password',
    icon: Lock,
    iconColor: '#fb923c',
  },
  { id: 'addresses', label: 'Addresses', icon: MapPin, iconColor: '#ec4899' },
];

export interface ModalConfigItem {
  id: string;
  title: string;
  height?: DimensionValue;
  scrollable?: boolean;
  isPlaceholder?: boolean;
  placeholderText?: string;
}

export const MODAL_ITEMS: ModalConfigItem[] = [
  { id: 'availability', title: 'Availability' },
  { id: 'bank', title: 'Bank Account Details' },
  {
    id: 'business',
    title: 'Business Profile',
    height: '85%',
    scrollable: false,
  },
  { id: 'services', title: 'Manage Services' },
  { id: 'profile', title: 'Edit My Profile', height: '85%', scrollable: false },
  { id: 'addresses', title: 'Manage Addresses', height: '85%' },
  {
    id: 'orders',
    title: 'My Orders',
    isPlaceholder: true,
    placeholderText: 'My Orders Content',
  },
  {
    id: 'refund',
    title: 'Refund Status',
    isPlaceholder: true,
    placeholderText: 'Refund History',
  },
];
