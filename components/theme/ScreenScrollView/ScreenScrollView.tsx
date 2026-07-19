import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { TabBarHeightContext } from '@/utils/tabBar.constants';
import { ScreenScrollViewProps } from './types';

/**
 * A drop-in replacement for React Native's ScrollView that automatically
 * reserves the correct bottom padding to prevent content from being hidden
 * beneath the floating BottomTabNavigator on both Android and iOS.
 *
 * The tab bar height is computed once in AppNavigator and provided via
 * TabBarHeightContext — no hook logic lives here, just a simple useContext read.
 *
 * Callers may still pass `contentContainerStyle` with their own values —
 * the tab bar clearance is merged in as the minimum bottom offset.
 * Use `extraBottomPadding` when a screen also has a floating footer above the nav bar.
 *
 * @example
 * <ScreenScrollView className="flex-1 px-5">
 *   <MyContent />
 * </ScreenScrollView>
 */
export const ScreenScrollView: React.FC<ScreenScrollViewProps> = ({
  contentContainerStyle,
  extraBottomPadding = 0,
  showsVerticalScrollIndicator = false,
  keyboardShouldPersistTaps = 'handled',
  ...props
}) => {
  const tabBarHeight = useContext(TabBarHeightContext);
  const resolvedStyle = StyleSheet.flatten(contentContainerStyle);
  const existingPaddingBottom =
    typeof resolvedStyle?.paddingBottom === 'number' ? resolvedStyle.paddingBottom : 0;

  const mergedContentStyle = StyleSheet.flatten([
    resolvedStyle,
    { paddingBottom: Math.max(existingPaddingBottom, tabBarHeight) + extraBottomPadding },
  ]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      contentContainerStyle={mergedContentStyle}
      {...props}
    />
  );
};
