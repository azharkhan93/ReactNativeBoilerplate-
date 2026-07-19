import { createContext } from 'react';

/**
 * Shared tab bar dimension constants.
 * Centralised here so BottomTabNavigator, AppNavigator, and ScreenScrollView
 * always stay in sync — no magic numbers duplicated across files.
 */

/** Total rendered height of the floating tab bar component (SVG bar + top gap). */
export const TAB_BAR_TOTAL_HEIGHT = 97 as const;

/** Bottom offset from the safe-area boundary on Android. */
export const TAB_BAR_ANDROID_BOTTOM_OFFSET = 16 as const;

/** Minimum bottom offset from the safe-area boundary on iOS. */
export const TAB_BAR_IOS_MIN_BOTTOM_OFFSET = 12 as const;

/**
 * Context that carries the computed tab bar height from AppNavigator (layout level)
 * down to any ScreenScrollView without prop drilling or custom hooks.
 * Default value covers a baseline Android device with no home bar.
 */
export const TabBarHeightContext = createContext<number>(
  TAB_BAR_TOTAL_HEIGHT + TAB_BAR_ANDROID_BOTTOM_OFFSET,
);
