import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MenuIconProps } from './types';
import { menuIconStyles } from './styles';

export const MenuIcon: React.FC<MenuIconProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={menuIconStyles.button}
      activeOpacity={0.7}
    >
      <View className={menuIconStyles.barsContainer}>
        {[...Array(3)].map((_, i) => (
          <View key={i} className={menuIconStyles.bar} />
        ))}
      </View>
    </TouchableOpacity>
  );
};
