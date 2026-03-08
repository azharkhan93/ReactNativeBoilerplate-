import React from 'react';
import { TouchableOpacity, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideIcon } from 'lucide-react-native';
import { Typography } from '../theme';

export interface TabItem {
  label: string;
  icon: LucideIcon;
  route: string;
}

export interface BottomTabNavigatorProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (route: string) => void;
}

const SHADOW_STYLE = Platform.select({
  ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.15, shadowRadius: 10 },
  android: { elevation: 16 },
});

export const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ tabs, activeTab, onTabPress }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className="bg-gray-950 border-t border-white/5 pt-2"
      style={[SHADOW_STYLE, { paddingBottom: Math.max(bottom, 12) }]}
    >
      <View className="flex-row items-center px-2">
        {tabs.map(({ label, icon: Icon, route }) => {
          const isActive = activeTab === route;
          return (
            <TouchableOpacity
              key={route}
              className="flex-1 items-center justify-center py-2"
              onPress={() => onTabPress(route)}
              activeOpacity={0.7}
            >
              <Icon size={22} color={isActive ? '#3b82f6' : '#9ca3af'} strokeWidth={isActive ? 2.5 : 2} />
              <Typography
                variant="body-sm"
                className={`mt-1 ${isActive ? 'text-primary-500 font-body-bold' : 'text-gray-500'}`}
              >
                {label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

