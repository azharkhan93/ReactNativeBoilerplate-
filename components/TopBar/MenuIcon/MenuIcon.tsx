import React from 'react';
import { View, TouchableOpacity } from 'react-native';

interface MenuIconProps {
  onPress?: () => void;
}

export const MenuIcon: React.FC<MenuIconProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-10 h-10 items-center justify-center mr-2"
      activeOpacity={0.7}
    >
      <View className="w-6 h-5 justify-between">
        {[...Array(3)].map((_, i) => (
          <View key={i} className="w-full h-0.5 bg-gray-800 rounded" />
        ))}
      </View>
    </TouchableOpacity>
  );
};

