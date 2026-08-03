import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
} from 'react-native-reanimated';
import { Scan, Camera, Sparkles, Activity } from 'lucide-react-native';

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
  }) => {
    const laserY = useSharedValue(0);
    const cornerScale = useSharedValue(1);
    const pulseOpacity = useSharedValue(0.7);

    useEffect(() => {
      // Smooth laser vertical sweep within reticle bounds (165px)
      laserY.value = withRepeat(
        withTiming(165, {
          duration: 1600,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        true,
      );

      // Pulsing reticle corners
      cornerScale.value = withRepeat(
        withSequence(
          withTiming(1.04, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );

      // HUD crosshair opacity pulse
      pulseOpacity.value = withRepeat(
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
    }, [laserY, cornerScale, pulseOpacity]);

    const laserAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: laserY.value }],
    }));

    const cornerAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: cornerScale.value }],
      opacity: pulseOpacity.value,
    }));

    const guidance = SCAN_STEP_GUIDANCE[currentStep] ?? {
      title: 'Scan Car Surface',
      subtitle: 'Align vehicle section inside target box',
    };

    return (
      <View className={cameraOverlayStyles.container}>
        {/* 1st Div: Reticle Target Area */}
        <Animated.View
          style={cornerAnimatedStyle}
          className={cameraOverlayStyles.reticleBox}
        >
          {/* 4 Pulsing Corner Brackets */}
          <View className={cameraOverlayStyles.cornerTL} />
          <View className={cameraOverlayStyles.cornerTR} />
          <View className={cameraOverlayStyles.cornerBL} />
          <View className={cameraOverlayStyles.cornerBR} />

          {/* HUD Target Crosshairs Grid */}
          <View className={cameraOverlayStyles.hudGridCrosshairH} />
          <View className={cameraOverlayStyles.hudGridCrosshairV} />

          {/* YOLO On-Device Detection Status Badge */}
          {yoloDetection.isVehicleDetected && (
            <View className={cameraOverlayStyles.yoloBadge}>
              <Scan size={12} color="#047857" />
              <Typography className={cameraOverlayStyles.yoloText}>
                YOLOv8: Car ({Math.round(yoloDetection.confidence * 100)}%)
              </Typography>
            </View>
          )}

          {/* Scanning Laser Beam with Tail Sweep */}
          {isScanning && (
            <Animated.View
              style={laserAnimatedStyle}
              className={cameraOverlayStyles.laserContainer}
            >
              <View className={cameraOverlayStyles.laserGlowTail} />
              <View className={cameraOverlayStyles.laserBeam} />
            </Animated.View>
          )}

          {/* HUD Telemetry Bottom Badge */}
          <View className={cameraOverlayStyles.hudTelemetryBadge}>
            <Activity size={10} color="#60a5fa" />
            <Typography className={cameraOverlayStyles.hudTelemetryText}>
              AI Surface Mapping • 60 FPS
            </Typography>
          </View>
        </Animated.View>

        {/* 2nd Div: Guidance Info Card */}
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
              Please grant camera permission in your device settings to continue.
            </Typography>
          </View>
        )}

        {/* 3rd Div: Camera Action Trigger Row */}
        {currentStep !== 'analyzing' && (
          <View className={cameraOverlayStyles.triggersRow}>
            <TouchableOpacity
              onPress={onCapturePress}
              activeOpacity={0.8}
              className={cameraOverlayStyles.captureButtonOuter}
            >
              <View className={cameraOverlayStyles.captureButtonInner}>
                <Camera size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Scanning Spinner Badge */}
        {isScanning && (
          <View className="flex-row items-center gap-2 px-4 py-2 bg-blue-50/90 rounded-full border border-blue-200 shadow-sm">
            <Sparkles size={15} color="#2563eb" />
            <Typography className="text-blue-700 font-mono text-xs font-medium">
              Gemini Vision LLM Analyzing Surface...
            </Typography>
          </View>
        )}
      </View>
    );
  },
);
