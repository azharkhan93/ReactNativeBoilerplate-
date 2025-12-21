import { LucideIcon, User, Package, RefreshCw, Lock, Languages } from 'lucide-react-native';

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
  {
    id: '1',
    label: 'My Profile',
    icon: User,
    iconColor: '#60a5fa', // light blue
  },
  {
    id: '2',
    label: 'My Orders',
    icon: Package,
    iconColor: '#4ade80', // light green
  },
  {
    id: '3',
    label: 'Refund',
    icon: RefreshCw,
    iconColor: '#a855f7', // purple
  },
  {
    id: '4',
    label: 'Change Password',
    icon: Lock,
    iconColor: '#fb923c', // orange
  },
  {
    id: '5',
    label: 'Change Language',
    icon: Languages,
    iconColor: '#ec4899', // pink
  },
];
