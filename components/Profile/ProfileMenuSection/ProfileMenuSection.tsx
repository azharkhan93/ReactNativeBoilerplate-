import React from 'react';
import { View } from 'react-native';
import { Container, Typography } from '../../theme';
import { AccountMenuItem } from '../AccountMenuItem';
import { LucideIcon } from 'lucide-react-native';

export interface ProfileMenuItemData {
  id: string;
  label: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor: string;
}

export interface ProfileMenuSectionProps {
  title?: string;
  items: ProfileMenuItemData[];
  onItemPress?: (itemId: string) => void;
  className?: string;
}

export const ProfileMenuSection: React.FC<ProfileMenuSectionProps> = ({
  title,
  items,
  onItemPress,
  className = '',
}) => {
  return (
    <View className={`mb-6 ${className}`}>
      {title && (
        <Typography 
          variant="body-sm" 
          className="text-gray-500 font-body-bold text-xs mb-3 tracking-widest uppercase px-1"
        >
          {title}
        </Typography>
      )}
      <Container 
        className="bg-gray-900/50 rounded-3xl border border-gray-800/50 overflow-hidden px-4"
      >
        {items.map((item, index) => (
          <View key={item.id}>
            <AccountMenuItem
              label={item.label}
              subtitle={item.subtitle}
              icon={item.icon}
              iconColor={item.iconColor}
              onPress={() => onItemPress?.(item.id)}
            />
            {index < items.length - 1 && (
              <View className="h-px bg-gray-800/50 ml-14" />
            )}
          </View>
        ))}
      </Container>
    </View>
  );
};
