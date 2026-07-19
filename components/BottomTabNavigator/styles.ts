import { StyleSheet, Platform } from 'react-native';

export const bottomTabNavigatorStyles = {
  container: 'absolute left-3 right-3 z-50 flex-row items-end h-[97px]',
  svgBg: 'mt-[25px]',
  centerButton: 'items-center justify-center w-14 h-14 bg-primary-500 border border-primary-400/20 rounded-full mb-3',
  row: 'flex-row items-center justify-between h-[72px] px-2',
  sideContainer: 'flex-row flex-1 items-center h-full',
  tabItem: 'flex-1 items-center justify-center relative h-full',
  iconWrapper: 'items-center justify-center',
  indicator: 'w-6 h-1 mt-1.5 bg-primary-500 rounded-full shadow shadow-primary-400',
};

export const nativeStyles = StyleSheet.create({
  centerButton: {
    position: 'absolute',
    left: '50%',
    marginLeft: -28,
    top: -6,
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



