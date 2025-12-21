import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';

export const CartScreen: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Typography variant="h2" className="text-gray-900">
        Cart Screen
      </Typography>
    </View>
  );
};
