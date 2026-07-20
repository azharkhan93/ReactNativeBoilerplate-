import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const slideStyles = {
  container: 'relative overflow-hidden',
  image: 'w-full h-full',
  defaultHeight: 200,
  defaultWidth: SCREEN_WIDTH,
  getContainerStyle: (width = SCREEN_WIDTH) =>
    StyleSheet.create({
      slide: {
        width,
        height: 200,
      },
    }).slide,
};
