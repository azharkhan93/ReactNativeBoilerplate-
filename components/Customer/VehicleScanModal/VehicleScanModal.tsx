import React from 'react';
import { Modal } from '@/components/theme';
import { VehicleScanContent } from './components/VehicleScanContent';
import { useVehicleScan } from './hooks';
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
      hasPermissionDenied,
      toggleTorch,
      handleCapturePhoto,
      handlePickFromGallery,
      resetScan,
      handleClose,
    } = useVehicleScan(onClose);

    if (!visible) return null;

    return (
      <Modal
        visible={visible}
        title="AI Vehicle Inspector"
        onRequestClose={handleClose}
        animationType="slide"
        height="100%"
        scrollable={false}
      >
        <VehicleScanContent
          currentStep={currentStep}
          isScanning={isScanning}
          hasTorchEnabled={hasTorchEnabled}
          isLowLightDetected={isLowLightDetected}
          scanResult={scanResult}
          yoloDetection={yoloDetection}
          hasPermissionDenied={hasPermissionDenied}
          onToggleTorch={toggleTorch}
          onCapturePhoto={handleCapturePhoto}
          onPickFromGallery={handlePickFromGallery}
          onResetScan={resetScan}
          onSelectRecommendedPackage={(pkgId, addons) => {
            onSelectRecommendedPackage?.(pkgId, addons);
            handleClose();
          }}
        />
      </Modal>
    );
  },
);
