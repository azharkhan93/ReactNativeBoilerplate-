import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Zap, ZapOff, AlertTriangle } from 'lucide-react-native';

import { Typography } from '@/components/theme';
import { CameraOverlay } from './components/CameraOverlay';
import { AnalysisResultCard } from './components/AnalysisResultCard';
import { useVehicleScan } from './hooks';
import { vehicleScanStyles } from './styles';
import { VehicleScanModalProps } from './types';

export const VehicleScanModal: React.FC<VehicleScanModalProps> = React.memo(
  ({ visible, onClose, onSelectRecommendedPackage }) => {
    const {
      currentStep,
      isScanning,
      hasTorchEnabled,
      isLowLightDetected,
      scanResult,
      yoloDetection,
      toggleTorch,
      simulateStepAdvance,
      resetScan,
      handleClose,
    } = useVehicleScan(onClose);

    if (!visible) return null;

    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={false}
        onRequestClose={handleClose}
      >
        <View className={vehicleScanStyles.modalContainer}>
          <SafeAreaView className={vehicleScanStyles.safeArea}>
            {/* Top Bar Header Controls */}
            <View className={vehicleScanStyles.headerRow}>
              <TouchableOpacity
                onPress={handleClose}
                activeOpacity={0.8}
                className={vehicleScanStyles.closeButton}
              >
                <X size={20} color="white" />
              </TouchableOpacity>

              <View className="flex-row items-center gap-2">
                <Typography className="text-white font-heading-semibold text-base">
                  AI Vehicle Inspector
                </Typography>
              </View>

              <TouchableOpacity
                onPress={toggleTorch}
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
                  <ZapOff size={20} color="#cbd5e1" />
                )}
              </TouchableOpacity>
            </View>

            {/* Low Light Alert Toast */}
            {isLowLightDetected && (
              <View className={vehicleScanStyles.warningToast}>
                <AlertTriangle size={20} color="#f59e0b" />
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

            {/* Camera Reticle & Guidance Layer */}
            <View className={vehicleScanStyles.scannerBody}>
              {!scanResult ? (
                <CameraOverlay
                  currentStep={currentStep}
                  isScanning={isScanning}
                  yoloDetection={yoloDetection}
                  onCapturePress={simulateStepAdvance}
                />
              ) : (
                <View className={vehicleScanStyles.resultsSheetContainer}>
                  <AnalysisResultCard
                    result={scanResult}
                    onRescanPress={resetScan}
                    onBookPackagePress={(pkgId, addons) => {
                      onSelectRecommendedPackage?.(pkgId, addons);
                      handleClose();
                    }}
                  />
                </View>
              )}
            </View>

            {/* Step Pills Bar */}
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
          </SafeAreaView>
        </View>
      </Modal>
    );
  },
);
