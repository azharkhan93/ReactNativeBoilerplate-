import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  FadeInRight,
  FadeOutRight,
} from 'react-native-reanimated';
import { Pointer, MoveHorizontal } from 'lucide-react-native';

import { Typography } from '@/components/theme';
import { SwipeIndicatorProps } from './types';
import { swipeIndicatorStyles, swipeIndicatorPosition } from './styles';

export const SwipeIndicator: React.FC<SwipeIndicatorProps> = ({ visible }) => {
  const translateX = useSharedValue<number>(12);
  const handOpacity = useSharedValue<number>(0);
  const ringScale = useSharedValue<number>(1);
  const ringOpacity = useSharedValue<number>(0.6);

  // Swipe gesture animation: slides hand left and fades in/out in a loop
  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(12, { duration: 0 }),
        withTiming(-12, { duration: 1000 }),
        withDelay(200, withTiming(-12, { duration: 0 })),
      ),
      -1,
      false,
    );

    handOpacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1, { duration: 200 }),
        withDelay(600, withTiming(1, { duration: 0 })),
        withTiming(0, { duration: 200 }),
      ),
      -1,
      false,
    );
  }, [translateX, handOpacity]);

  // Pulsing outer ring to simulate concentric touch waves (as seen in references)
  useEffect(() => {
    ringScale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 0 }),
        withDelay(400, withTiming(1.5, { duration: 800 })),
        withTiming(1, { duration: 0 }),
      ),
      -1,
      false,
    );
    ringOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 0 }),
        withDelay(400, withTiming(0, { duration: 800 })),
        withTiming(0.6, { duration: 0 }),
      ),
      -1,
      false,
    );
  }, [ringScale, ringOpacity]);

  const handAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: '-12deg' }, // Natural pointing hand angle
    ],
    opacity: handOpacity.value,
  }));

  const pulseRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View
      className={swipeIndicatorStyles.outerWrapper}
      style={swipeIndicatorPosition.anchor}
      entering={FadeInRight.duration(500).delay(800).springify()}
      exiting={FadeOutRight.duration(300)}
    >
      {/* Pulsing concentric ring */}
      <Animated.View
        className={swipeIndicatorStyles.pulseRing}
        style={pulseRingStyle}
      />

      {/* Main interaction circle */}
      <View className={swipeIndicatorStyles.circle}>
        {/* Double-headed horizontal arrow */}
        <MoveHorizontal
          size={18}
          color="white"
          style={swipeIndicatorPosition.arrow}
        />

        {/* Pointing hand gesture */}
        <Animated.View
          style={[handAnimatedStyle, swipeIndicatorPosition.handContainer]}
        >
          <Pointer size={22} color="white" />
        </Animated.View>
      </View>

      <Typography className={swipeIndicatorStyles.label}>swipe</Typography>
    </Animated.View>
  );
};
