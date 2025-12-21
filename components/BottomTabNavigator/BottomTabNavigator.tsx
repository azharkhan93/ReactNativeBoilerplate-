import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideIcon } from 'lucide-react-native';
import { Typography, Container } from '../theme';

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

export const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Container
      variant="row"
      className="bg-white border-t border-gray-200 pt-2"
      style={{
        paddingBottom: Math.max(insets.bottom, 8),
        ...(Platform.OS === 'ios' && {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }),
        ...(Platform.OS === 'android' && {
          elevation: 8,
        }),
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.route;

        return (
          <TouchableOpacity
            key={tab.route}
            className="flex-1"
            onPress={() => onTabPress(tab.route)}
            activeOpacity={0.7}
          >
            <Container variant="column-centered" gap={1} className="py-1">
              <Icon
                size={24}
                color={isActive ? '#3b82f6' : '#6b7280'}
              />
              <Typography
                variant="body-sm"
                className={isActive ? 'text-primary-500 font-body-semibold' : 'text-gray-500'}
              >
                {tab.label}
              </Typography>
            </Container>
          </TouchableOpacity>
        );
      })}
    </Container>
  );
};

