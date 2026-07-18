import { StyleSheet } from 'react-native';

export const swipeIndicatorStyles = {
  
  outerWrapper: 'absolute right-0 z-50 items-center',
  pulseRing:
    'absolute w-20 h-20 rounded-full bg-white/20 border border-white/30',
  circle: 'w-14 h-14 rounded-full bg-black/40 items-center justify-center',
  label:
    'text-white/80 text-[9px] font-body-bold mt-2 tracking-widest uppercase',
} as const;


export const swipeIndicatorPosition = StyleSheet.create({
  anchor: {
    top: '42%',
  },
});
