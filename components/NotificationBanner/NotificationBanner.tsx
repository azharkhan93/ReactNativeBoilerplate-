import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { Typography } from '../theme';
import { notificationSubject } from '@/utils/notificationService';
import { InAppNotification } from './types';
import { bannerStyles } from './styles';

export const NotificationBanner: React.FC = () => {
  const [notification, setNotification] = useState<InAppNotification | null>(
    null,
  );
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(-150);

  const hideBanner = useCallback(() => {
    translateY.value = withTiming(-150, { duration: 300 }, finished => {
      if (finished) {
        runOnJS(setNotification)(null);
      }
    });
  }, [translateY]);

  useEffect(() => {
    const sub = notificationSubject.subscribe(notif => {
      setNotification(notif);
      translateY.value = withSpring(insets.top + 10, { damping: 15 });

      // Automatically hide after 4 seconds
      const timer = setTimeout(() => {
        hideBanner();
      }, 4000);

      return () => clearTimeout(timer);
    });

    return () => sub.unsubscribe();
  }, [insets.top, translateY, hideBanner]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!notification) return null;

  return (
    <Animated.View style={[animatedStyle]} className={bannerStyles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={hideBanner}
        className="flex-row items-center flex-1"
      >
        <View className={bannerStyles.iconWrapper}>
          <Bell size={20} color="#3b82f6" />
        </View>
        <View className={bannerStyles.contentWrapper}>
          <Typography variant="body" className={bannerStyles.title}>
            {notification.title}
          </Typography>
          <Typography variant="body-sm" className={bannerStyles.body}>
            {notification.body}
          </Typography>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
