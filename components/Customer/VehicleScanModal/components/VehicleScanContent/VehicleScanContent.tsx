import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Zap, ZapOff, AlertTriangle } from 'lucide-react-native';

import { Typography } from '@/components/theme';
import { CameraOverlay } from '../CameraOverlay';
import { AnalysisResultCard } from '../AnalysisResultCard';
import { VehicleScanContentProps } from './types';
import { vehicleScanContentStyles } from './styles';
import { vehicleScanStyles } from '../../styles';

export const VehicleScanContent: React.FC<VehicleScanContentProps> = React.memo(
  ({
    currentStep,
    isScanning,
    hasTorchEnabled,
    isLowLightDetected,
    scanResult,
    yoloDetection,
    hasPermissionDenied,
    onToggleTorch,
    onCapturePhoto,
    onResetScan,
    onSelectRecommendedPackage,
  }) => (
    <View className={vehicleScanContentStyles.container}>
      {/* Torch Toggle Button Header Overlay */}
      <View className={vehicleScanContentStyles.torchContainer}>
        <TouchableOpacity
          onPress={onToggleTorch}
          activeOpacity={0.8}
          className={
            hasTorchEnabled
              ? vehicleScanStyles.torchButtonActive
              : vehicleScanStyles.torchButton
          }
        >
          {hasTorchEnabled ? (
            <Zap size={20} color="white" />
          ) : (
            <ZapOff size={20} color="#64748b" />
          )}
        </TouchableOpacity>
      </View>

    
      {isLowLightDetected && (
        <View className={vehicleScanStyles.warningToast}>
          <AlertTriangle size={20} color="#d97706" />
          <View className={vehicleScanStyles.warningTextCol}>
            <Typography className={vehicleScanStyles.warningTitle}>
              Low Light Detected
            </Typography>
            <Typography className={vehicleScanStyles.warningSubtitle}>
              Please turn on your flashlight for best paint analysis.
            </Typography>
          </View>
        </View>
      )}

      {/* Camera Reticle / Inspection Results Card */}
      <View className={vehicleScanContentStyles.bodyContainer}>
        {!scanResult ? (
          <CameraOverlay
            currentStep={currentStep}
            isScanning={isScanning}
            yoloDetection={yoloDetection}
            hasPermissionDenied={hasPermissionDenied}
            onCapturePress={onCapturePhoto}
          />
        ) : (
          <View className={vehicleScanContentStyles.resultBox}>
            <AnalysisResultCard
              result={scanResult}
              onRescanPress={onResetScan}
              onBookPackagePress={(pkgId, addons) =>
                onSelectRecommendedPackage(pkgId, addons)
              }
            />
          </View>
        )}
      </View>

      {/* Step Progress Indicator Bar */}
      {!scanResult && (
        <View className={vehicleScanStyles.stepBar}>
          <View
            className={
              currentStep === 'hood'
                ? vehicleScanStyles.stepPillActive
                : vehicleScanStyles.stepPillCompleted
            }
          />
          <View
            className={
              currentStep === 'side'
                ? vehicleScanStyles.stepPillActive
                : currentStep === 'wheels' || currentStep === 'analyzing'
                ? vehicleScanStyles.stepPillCompleted
                : vehicleScanStyles.stepPill
            }
          />
          <View
            className={
              currentStep === 'wheels' || currentStep === 'analyzing'
                ? vehicleScanStyles.stepPillActive
                : vehicleScanStyles.stepPill
            }
          />
        </View>
      )}
    </View>
  ),
);
