import { useState, useCallback } from 'react';
import { ScanStep, VehicleScanResult, YoloDetection } from './types';
import { MOCK_SCAN_RESULT } from './constants';

export const useVehicleScan = (onClose: () => void) => {
  const [currentStep, setCurrentStep] = useState<ScanStep>('hood');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [hasTorchEnabled, setHasTorchEnabled] = useState<boolean>(false);
  const [isLowLightDetected, setIsLowLightDetected] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<VehicleScanResult | null>(null);

  const [yoloDetection] = useState<YoloDetection>({
    isVehicleDetected: true,
    confidence: 0.96,
    boundingBox: { x: 40, y: 120, width: 280, height: 220 },
    isLowLight: false,
    isBlurry: false,
  });

  const toggleTorch = useCallback((): void => {
    setHasTorchEnabled(prev => !prev);
  }, []);

  const simulateStepAdvance = useCallback((): void => {
    if (currentStep === 'hood') {
      setCurrentStep('side');
    } else if (currentStep === 'side') {
      setCurrentStep('wheels');
    } else if (currentStep === 'wheels') {
      setCurrentStep('analyzing');
      setIsScanning(true);

      // Simulate AI analysis delay
      setTimeout(() => {
        setIsScanning(false);
        setScanResult(MOCK_SCAN_RESULT);
        setCurrentStep('complete');
      }, 2500);
    }
  }, [currentStep]);

  const resetScan = useCallback((): void => {
    setCurrentStep('hood');
    setIsScanning(false);
    setScanResult(null);
    setIsLowLightDetected(false);
  }, []);

  const handleClose = useCallback((): void => {
    resetScan();
    onClose();
  }, [resetScan, onClose]);

  return {
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
    setIsLowLightDetected,
  };
};
