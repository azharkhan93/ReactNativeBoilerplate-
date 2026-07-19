import { ScrollViewProps } from 'react-native';

export interface ScreenScrollViewProps extends ScrollViewProps {
  /**
   * Additional bottom padding stacked on top of the tab bar clearance.
   * Use this when a screen has a sticky footer bar (e.g. a booking action bar)
   * that sits above the tab navigator.
   * @default 0
   */
  extraBottomPadding?: number;
}
