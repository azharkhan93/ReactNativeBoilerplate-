import { StyleSheet, Dimensions } from 'react-native';

const { width: SW } = Dimensions.get('window');

export const animatedSplashScreenStyles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#EEF4FC',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  glow: {
    position: 'absolute',
    width: SW * 0.85,
    height: 260,
    borderRadius: 160,
    backgroundColor: 'rgba(96, 165, 250, 0.07)',
    top: '28%',
    alignSelf: 'center',
  },
  roadLine: {
    position: 'absolute',
    bottom: '37%',
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  track: {
    width: '100%',
    height: 140,
    justifyContent: 'center',
  },
  suds: {
    position: 'absolute',
    bottom: '38%',
    alignSelf: 'center',
    width: 220,
    height: 22,
    borderRadius: 20,
    backgroundColor: 'rgba(219, 234, 254, 0.8)',
  },
  bubblesLayer: {
    position: 'absolute',
    bottom: '42%',
    left: 0,
    right: 0,
    height: 80,
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(147, 197, 253, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.4)',
  },
  sprayLayer: {
    position: 'absolute',
    bottom: '44%',
    left: 0,
    right: 0,
    height: 40,
  },
  sprayDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(59, 130, 246, 0.6)',
  },
});
