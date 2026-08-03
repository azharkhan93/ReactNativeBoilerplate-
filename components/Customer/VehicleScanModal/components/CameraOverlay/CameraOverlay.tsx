import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Scan, Camera, Sparkles, Image as ImageIcon } from 'lucide-react-native';

import { Typography } from '@/components/theme';
import { CameraOverlayProps } from './types';
import { cameraOverlayStyles } from './styles';
import { SCAN_STEP_GUIDANCE } from '../../constants';

export const CameraOverlay: React.FC<CameraOverlayProps> = React.memo(
  ({
    currentStep,
    isScanning,
    yoloDetection,
    hasPermissionDenied,
    onCapturePress,
    onGalleryPress,
  }) => {
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
      transform: [{ rotate: '0deg' }, { translateY: laserY.value }],
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
              <Scan size={12} color="#047857" />
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

        {/* Permission Warning Toast */}
        {hasPermissionDenied && (
          <View className={cameraOverlayStyles.permissionBox}>
            <Typography className={cameraOverlayStyles.permissionTitle}>
              Camera Access Required
            </Typography>
            <Typography className={cameraOverlayStyles.permissionSubtitle}>
              Please grant camera permission or tap gallery icon below to choose a photo.
            </Typography>
          </View>
        )}

        {/* Action Triggers Row */}
        {currentStep !== 'analyzing' && (
          <View className={cameraOverlayStyles.triggersRow}>
            {onGalleryPress && (
              <TouchableOpacity
                onPress={onGalleryPress}
                activeOpacity={0.8}
                className={cameraOverlayStyles.galleryButton}
              >
                <ImageIcon size={22} color="#2563eb" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={onCapturePress}
              activeOpacity={0.8}
              className={cameraOverlayStyles.captureButtonOuter}
            >
              <View className={cameraOverlayStyles.captureButtonInner}>
                <Camera size={26} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {isScanning && (
          <View className="mt-6 flex-row items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200 shadow-sm">
            <Sparkles size={16} color="#2563eb" />
            <Typography className="text-blue-700 font-mono text-xs font-medium">
              Gemini Vision LLM Analyzing Surface...
            </Typography>
          </View>
        )}
      </View>
    );
  },
);
