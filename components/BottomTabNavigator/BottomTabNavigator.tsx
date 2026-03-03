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

/**
 * Global Bottom Tab Navigator
 * Styled with the project's Midnight Blue (bg-gray-950) theme.
 */
export const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-gray-950 border-t border-white/5 pt-2"
      style={{
        paddingBottom: Math.max(insets.bottom, 12),
        ...(Platform.OS === 'ios' && {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        }),
        ...(Platform.OS === 'android' && {
          elevation: 12,
        }),
      }}
    >
      <View className="flex-row items-center px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.route;

          return (
            <TouchableOpacity
              key={tab.route}
              className="flex-1 items-center justify-center py-2"
              onPress={() => onTabPress(tab.route)}
              activeOpacity={0.7}
            >
              <Icon
                size={22}
                color={isActive ? '#3b82f6' : '#9ca3af'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <Typography
                variant="body-sm"
                className={isActive ? 'text-primary-500 font-body-bold mt-1' : 'text-gray-500 mt-1'}
              >
                {tab.label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

