import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  FadeOut,
} from 'react-native-reanimated';
import { ChevronsLeft } from 'lucide-react-native';

import { Typography } from '@/components/theme';
import { SwipeIndicatorProps } from './types';
import { swipeIndicatorStyles } from './styles';

export const SwipeIndicator: React.FC<SwipeIndicatorProps> = ({ visible }) => {
  const translateX = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(1);

  // Looping right-to-left swipe hint — resets to origin, slides left, pauses, then repeats
  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }),
        withDelay(400, withTiming(-20, { duration: 500 })),
        withDelay(200, withTiming(0, { duration: 300 })),
      ),
      -1,
      false,
    );
  }, [translateX]);

  // Fade out gracefully when dismissed after user's first swipe
  useEffect(() => {
    if (!visible) {
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible, opacity]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Opacity lives on a separate inner wrapper — Reanimated forbids combining
  // useAnimatedStyle(opacity) with exiting on the same node
  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!visible) {
    return null;
  }

  return (
    // Outer: owns the layout exit animation only
    <Animated.View
      className={swipeIndicatorStyles.container}
      exiting={FadeOut.duration(300)}
    >
      {/* Inner: owns the opacity shared value — kept separate to avoid Reanimated conflict */}
      <Animated.View style={fadeStyle}>
        <View className={swipeIndicatorStyles.pill}>
          <Animated.View style={iconAnimatedStyle}>
            <ChevronsLeft size={18} color="#64748b" strokeWidth={2} />
          </Animated.View>
          <Typography className={swipeIndicatorStyles.label}>
            Swipe to explore
          </Typography>
        </View>
      </Animated.View>
    </Animated.View>
  );
};
