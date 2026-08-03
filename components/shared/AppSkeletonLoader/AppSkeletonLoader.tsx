import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Loader2 } from 'lucide-react-native';
import { AppSkeletonLoaderProps } from './types';
import { appSkeletonStyles } from './styles';

export const AppLoadingSpinner: React.FC<AppSkeletonLoaderProps & { label?: string }> = React.memo(
  () => {
    const rotation = useSharedValue(0);

    useEffect(() => {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 1100,
          easing: Easing.linear,
        }),
        -1,
        false,
      );
    }, [rotation]);

    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
      <View className={appSkeletonStyles.spinnerContainer}>
        <Animated.View style={animatedIconStyle}>
          <Loader2 size={25} color="#2563eb" strokeWidth={2.2} />
        </Animated.View>
      </View>
    );
  },
);

export const AppSkeletonLoader = AppLoadingSpinner;
