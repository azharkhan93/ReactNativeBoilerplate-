 
import React from 'react';
import {
  TouchableOpacity,
  Platform,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import {
  TAB_BAR_ANDROID_BOTTOM_OFFSET,
  TAB_BAR_IOS_MIN_BOTTOM_OFFSET,
} from '@/utils/tabBar.constants';
import { TabItem, BottomTabNavigatorProps } from './types';
import { bottomTabNavigatorStyles, nativeStyles } from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const barWidth = SCREEN_WIDTH - 24;
const barHeight = 72;

export const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const { bottom } = useSafeAreaInsets();

  const centerTab =
    tabs.find(t => t.route === 'nearbyProviders' || t.route === 'analytics') ||
    tabs[Math.floor(tabs.length / 2)];

  const remainingTabs = tabs.filter(t => t.route !== centerTab?.route);
  const midPoint = Math.floor(remainingTabs.length / 2);
  const leftTabs = remainingTabs.slice(0, midPoint);
  const rightTabs = remainingTabs.slice(midPoint);

  const getPath = (w: number, h: number) => {
    const center = w / 2;
    return `
      M 0 32
      A 32 32 0 0 1 32 0
      L ${center - 42} 0
      C ${center - 26} 0, ${center - 26} 28, ${center} 28
      C ${center + 26} 28, ${center + 26} 0, ${center + 42} 0
      L ${w - 32} 0
      A 32 32 0 0 1 ${w} 32
      L ${w} ${h - 24}
      A 24 24 0 0 1 ${w - 24} ${h}
      L 24 ${h}
      A 24 24 0 0 1 0 ${h - 24}
      Z
    `;
  };

  const renderTabItem = (tab: TabItem) => {
    if (!tab) return null;
    const { icon: Icon, route } = tab;
    const isActive = activeTab === route;

    return (
      <TouchableOpacity
        key={route}
        className={bottomTabNavigatorStyles.tabItem}
        onPress={() => onTabPress(route)}
        activeOpacity={0.7}
      >
        <View className={bottomTabNavigatorStyles.iconWrapper}>
          <Icon
            size={25}
            color={isActive ? '#3b82f6' : '#64748b'}
            strokeWidth={isActive ? 2.5 : 2}
          />
          {isActive && (
            <View className={bottomTabNavigatorStyles.indicator} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      className={bottomTabNavigatorStyles.container}
      style={{ bottom: Platform.OS === 'ios' ? Math.max(bottom, TAB_BAR_IOS_MIN_BOTTOM_OFFSET) : TAB_BAR_ANDROID_BOTTOM_OFFSET }}
    >
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <Svg width={barWidth} height={barHeight} className={bottomTabNavigatorStyles.svgBg}>
          <Path
            d={getPath(barWidth, barHeight)}
            fill="#D7E4F7"
            stroke="#c1d2eb"
            strokeWidth={1.5}
          />
        </Svg>
      </View>

      {centerTab ? (
        <TouchableOpacity
          onPress={() => onTabPress(centerTab.route)}
          activeOpacity={0.8}
          style={nativeStyles.centerButton}
          className={bottomTabNavigatorStyles.centerButton}
        >
          <centerTab.icon size={28} color="white" strokeWidth={2.5} />
        </TouchableOpacity>
      ) : null}

      <View
        className={bottomTabNavigatorStyles.row}
        style={{ width: barWidth }}
      >
        <View className={bottomTabNavigatorStyles.sideContainer}>
          {leftTabs.map(renderTabItem)}
        </View>

        <View className="w-[72px]" />

        <View className={bottomTabNavigatorStyles.sideContainer}>
          {rightTabs.map(renderTabItem)}
        </View>
      </View>
    </View>
  );
};



