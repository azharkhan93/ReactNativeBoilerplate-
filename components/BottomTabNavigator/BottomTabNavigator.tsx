/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableOpacity,
  Platform,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideIcon } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

export interface TabItem {
  label: string;
  icon: LucideIcon;
  route: string;
}

export interface BottomTabNavigatorProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (route: string) => void;
}

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
      L ${center - 55} 0
      C ${center - 35} 0, ${center - 35} 32, ${center} 32
      C ${center + 35} 32, ${center + 35} 0, ${center + 55} 0
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
        className="flex-1 items-center justify-center h-full relative"
        onPress={() => onTabPress(route)}
        activeOpacity={0.7}
      >
        <View className="items-center justify-center">
          <Icon
            size={22}
            color={isActive ? '#3b82f6' : '#64748b'}
            strokeWidth={isActive ? 2.5 : 2}
          />
          {isActive && (
            <View className="w-5 h-1 rounded-full bg-primary-500 mt-2 shadow shadow-primary-400" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      className="absolute left-3 right-3 z-50 flex-row items-end h-[97px]"
      style={{ bottom: Platform.OS === 'ios' ? Math.max(bottom, 12) : 16 }}
    >
     
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <Svg width={barWidth} height={barHeight} className="mt-[25px] ">
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
          style={styles.centerButton}
          className=" w-14 h-14 rounded-full items-center justify-center bg-primary-500 border border-primary-400/20"
        >
          <centerTab.icon size={24} color="white" strokeWidth={2.5}  />
        </TouchableOpacity>
      ): null}

      
      <View
        className="flex-row items-center justify-between px-2 h-[72px]"
        style={{ width: barWidth }}
      >
        
        <View className="flex-row flex-1 h-full items-center">
          {leftTabs.map(renderTabItem)}
        </View>

     
        <View className="w-1" />

     
        <View className="flex-row flex-1 h-full items-center">
          {rightTabs.map(renderTabItem)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerButton: {
    position: 'absolute',
    left: '50%',
    marginLeft: -28,
    top: 0,
    zIndex: 60,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.45,
        shadowRadius: 18,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});
