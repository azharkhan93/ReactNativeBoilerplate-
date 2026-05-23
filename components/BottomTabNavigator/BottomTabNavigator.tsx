/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, Platform, View } from 'react-native';
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
  ios: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  android: {
    elevation: 24,
  },
});

export const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  return (
    <View
      className="absolute bottom-5 left-3 right-3 bg-gray-900/90 border border-white/10 rounded-[28px] py-2.5 px-1 z-50 flex-row items-center justify-between"
      style={[SHADOW_STYLE]}
    >
      {tabs.map(({ label, icon: Icon, route }) => {
        const isActive = activeTab === route;
        return (
          <TouchableOpacity
            key={route}
            className={`flex-1 items-center justify-center py-1.5 rounded-[18px] relative ${
              isActive
                ? 'bg-primary-500/10 border border-primary-500/20'
                : 'border border-transparent'
            }`}
            onPress={() => onTabPress(route)}
            activeOpacity={0.75}
            style={{ marginHorizontal: 2 }}
          >
            <Icon
              size={17}
              color={isActive ? '#3b82f6' : '#9ca3af'}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <Typography
              variant="body-sm"
              className={`mt-0.5 text-[8px] uppercase tracking-widest font-body-semibold ${
                isActive ? 'text-primary-400 font-body-bold' : 'text-gray-400'
              }`}
              numberOfLines={1}
            >
              {label}
            </Typography>
            {isActive && (
              <View className="absolute bottom-0.5 w-1 h-1 rounded-full bg-primary-400 shadow shadow-primary-400/50" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
