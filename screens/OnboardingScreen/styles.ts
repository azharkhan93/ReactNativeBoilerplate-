import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// StyleSheet is used only for slideItem because the width value is a JS runtime constant
// that cannot be expressed as a static NativeWind class
export const slideItemStyle = StyleSheet.create({
  slide: {
    width,
    flex: 1,
  },
});

export const onboardingStyles = {
  safeArea: 'flex-1 bg-[#F1F6FD]',
  contentContainer: 'flex-1',
  list: 'flex-1',
  skipButtonWrapper: 'absolute top-[60px] right-5 z-20',
  footer: 'px-8 pb-10 bg-[#F1F6FD] z-10',
  navRow: 'flex-row items-center justify-between h-12 mb-4',
  backWrapper: 'w-20',
  backButton: 'py-2',
  nextWrapper: 'w-20 items-end',
  nextButton: 'py-2',
  submitButtonInner: 'flex-row items-center justify-center',
} as const;
