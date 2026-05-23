import React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface PaginationProps {
  total: number;
  current: number;
}

interface PaginationDotProps {
  index: number;
  current: number;
}

const PaginationDot: React.FC<PaginationDotProps> = ({ index, current }) => {
  const isActive = index === current;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(isActive ? 32 : 10, { damping: 15 }),
      backgroundColor: withSpring(isActive ? '#3b82f6' : '#374151'),
    };
  });

  return <Animated.View className="h-1.5 rounded-full" style={animatedStyle} />;
};

export const Pagination: React.FC<PaginationProps> = ({ total, current }) => {
  return (
    <View className="flex-row gap-2 items-center">
      {Array.from({ length: total }).map((_, index) => (
        <PaginationDot key={index} index={index} current={current} />
      ))}
    </View>
  );
};
