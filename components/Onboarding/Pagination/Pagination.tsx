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
      width: withSpring(isActive ? 28 : 8, { damping: 15, stiffness: 120 }),
      height: 6,
      opacity: withSpring(isActive ? 1 : 0.35, { damping: 15 }),
      transform: [
        { scale: withSpring(isActive ? 1.1 : 0.9, { damping: 15 }) },
      ],
      backgroundColor: withSpring(isActive ? '#3b82f6' : '#9ca3af'),
    };
  });

  return <Animated.View className="rounded-full" style={animatedStyle} />;
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
