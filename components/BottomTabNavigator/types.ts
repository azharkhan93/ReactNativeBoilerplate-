import { LucideIcon } from 'lucide-react-native';

export interface TabItem {
  label: string;
  icon: LucideIcon;
  route: string;
}

export interface BottomTabNavigatorProps {
  tabs: readonly TabItem[];
  activeTab: string;
  onTabPress: (route: string) => void;
}
