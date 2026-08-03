import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Scan, Camera, Sparkles } from 'lucide-react-native';

import { Typography } from '@/components/theme';
import { CameraOverlayProps } from './types';
import { cameraOverlayStyles } from './styles';
import { SCAN_STEP_GUIDANCE } from '../../constants';

export const CameraOverlay: React.FC<CameraOverlayProps> = React.memo(
  ({ currentStep, isScanning, yoloDetection, onCapturePress }) => {
    const laserY = useSharedValue(0);

    useEffect(() => {
      laserY.value = withRepeat(
        withTiming(270, {
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      );
    }, [laserY]);

    const laserAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: laserY.value }],
    }));

    const guidance = SCAN_STEP_GUIDANCE[currentStep] ?? {
      title: 'Scan Car Surface',
      subtitle: 'Align vehicle section inside target box',
    };

    return (
      <View className={cameraOverlayStyles.container}>
        {/* Reticle Target Area */}
        <View className={cameraOverlayStyles.reticleBox}>
          <View className={cameraOverlayStyles.cornerTL} />
          <View className={cameraOverlayStyles.cornerTR} />
          <View className={cameraOverlayStyles.cornerBL} />
          <View className={cameraOverlayStyles.cornerBR} />

          {/* YOLO On-Device Detection Badge */}
          {yoloDetection.isVehicleDetected && (
            <View className={cameraOverlayStyles.yoloBadge}>
              <Scan size={12} color="#10b981" />
              <Typography className={cameraOverlayStyles.yoloText}>
                YOLOv8: Car ({Math.round(yoloDetection.confidence * 100)}%)
              </Typography>
            </View>
          )}

          {/* Scanning Laser Beam */}
          {isScanning && (
            <Animated.View
              style={laserAnimatedStyle}
              className={cameraOverlayStyles.laserBeam}
            />
          )}
        </View>

        {/* Guidance Info Box */}
        <View className={cameraOverlayStyles.guidanceBox}>
          <Typography className={cameraOverlayStyles.guidanceTitle}>
            {guidance.title}
          </Typography>
          <Typography className={cameraOverlayStyles.guidanceSubtitle}>
            {guidance.subtitle}
          </Typography>
        </View>

        {/* Shutter Capture Button */}
        {currentStep !== 'analyzing' && (
          <TouchableOpacity
            onPress={onCapturePress}
            activeOpacity={0.8}
            className={cameraOverlayStyles.captureButtonOuter}
          >
            <View className={cameraOverlayStyles.captureButtonInner}>
              <Camera size={26} color="white" />
            </View>
          </TouchableOpacity>
        )}

        {isScanning && (
          <View className="mt-6 flex-row items-center gap-2 px-4 py-2 bg-blue-950/80 rounded-full border border-blue-500/40">
            <Sparkles size={16} color="#60a5fa" />
            <Typography className="text-blue-300 font-mono text-xs">
              Gemini Vision LLM Analyzing Surface...
            </Typography>
          </View>
        )}
      </View>
    );
  },
);
