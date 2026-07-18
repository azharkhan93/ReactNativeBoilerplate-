import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  withSpring,
  FadeInRight,
  FadeOutRight,
} from 'react-native-reanimated';
import { ChevronsLeft } from 'lucide-react-native';

import { Typography } from '@/components/theme';
import { SwipeIndicatorProps } from './types';
import { swipeIndicatorStyles, swipeIndicatorPosition } from './styles';

export const SwipeIndicator: React.FC<SwipeIndicatorProps> = ({ visible }) => {
  const translateX = useSharedValue<number>(0);
  const ringScale = useSharedValue<number>(1);
  const ringOpacity = useSharedValue<number>(0.6);
  const iconScale = useSharedValue<number>(1);

  // Bouncing icon: nudges left sharply then springs back, looping
  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }),
        withDelay(600, withSpring(-14, { damping: 6, stiffness: 180 })),
        withDelay(100, withSpring(0, { damping: 10, stiffness: 160 })),
      ),
      -1,
      false,
    );
  }, [translateX]);

  // Pulsing outer ring: expands and fades on each pulse cycle
  useEffect(() => {
    ringScale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 0 }),
        withDelay(500, withTiming(1.6, { duration: 800 })),
        withTiming(1, { duration: 0 }),
      ),
      -1,
      false,
    );
    ringOpacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 0 }),
        withDelay(500, withTiming(0, { duration: 800 })),
        withTiming(0.5, { duration: 0 }),
      ),
      -1,
      false,
    );
  }, [ringScale, ringOpacity]);

  // Subtle icon breathe effect — micro scale pulse
  useEffect(() => {
    iconScale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(1.15, { duration: 400 }),
        withTiming(1, { duration: 400 }),
      ),
      -1,
      false,
    );
  }, [iconScale]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scale: iconScale.value },
    ],
  }));

  const pulseRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  if (!visible) {
    return null;
  }

  return (
    // Outer: owns layout entering/exiting — separate node from any animated style
    <Animated.View
      className={swipeIndicatorStyles.outerWrapper}
      style={swipeIndicatorPosition.anchor}
      entering={FadeInRight.duration(500).delay(800).springify()}
      exiting={FadeOutRight.duration(300)}
    >
      {/* Pulsing ring — separate node from the circle to avoid style conflicts */}
      <Animated.View className={swipeIndicatorStyles.pulseRing} style={pulseRingStyle} />

      {/* Main circular button */}
      <View className={swipeIndicatorStyles.circle}>
        <Animated.View style={iconAnimatedStyle}>
          <ChevronsLeft size={24} color="white" strokeWidth={2.5} />
        </Animated.View>
      </View>

      <Typography className={swipeIndicatorStyles.label}>swipe</Typography>
    </Animated.View>
  );
};
