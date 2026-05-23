import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LucideIcon, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Typography } from '../../theme/Typography';

export interface RoleOptionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onPress: () => void;
  delay: number;
}

export const RoleOption: React.FC<RoleOptionProps> = ({
  title,
  description,
  icon: Icon,
  isSelected,
  onPress,
  delay,
}) => (
  <Animated.View entering={FadeInDown.delay(delay)}>
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-row items-center p-6 rounded-3xl border-2 transition-all ${
        isSelected
          ? 'border-primary-500 bg-primary-950/40'
          : 'border-gray-800 bg-gray-900/50'
      }`}
    >
      <View
        className={`w-14 h-14 rounded-2xl items-center justify-center mr-4  ${
          isSelected ? 'bg-primary-500' : 'bg-gray-800'
        }`}
      >
        <Icon size={28} color={isSelected ? 'white' : '#9ca3af'} />
      </View>
      <View className="flex-1">
        <Typography
          variant="body-lg"
          className={`font-heading-semibold ${
            isSelected ? 'text-white' : 'text-gray-200'
          }`}
        >
          {title}
        </Typography>
        <Typography
          variant="body-sm"
          className={isSelected ? 'text-primary-300/80' : 'text-gray-400'}
        >
          {description}
        </Typography>
      </View>
      {isSelected && <ChevronRight size={20} color="#3b82f6" />}
    </TouchableOpacity>
  </Animated.View>
);
