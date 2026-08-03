import { useState, useCallback } from 'react';
import { ScanStep, VehicleScanResult, YoloDetection } from './types';
import { MOCK_SCAN_RESULT } from './constants';
import {
  checkCameraPermission,
  capturePhotoWithCamera,
  selectPhotoFromLibrary,
} from '@/utils/cameraHelper';

export const useVehicleScan = (onClose: () => void) => {
  const [currentStep, setCurrentStep] = useState<ScanStep>('hood');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [hasTorchEnabled, setHasTorchEnabled] = useState<boolean>(false);
  const [isLowLightDetected, setIsLowLightDetected] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<VehicleScanResult | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<readonly string[]>([]);
  const [hasPermissionDenied, setHasPermissionDenied] = useState<boolean>(false);

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

  const handleCapturePhoto = useCallback(async (): Promise<void> => {
    try {
      const hasPermission = await checkCameraPermission();
      if (!hasPermission) {
        setHasPermissionDenied(true);
        return;
      }

      setHasPermissionDenied(false);
      const imageUri = await capturePhotoWithCamera();

      if (imageUri) {
        setCapturedPhotos(prev => [...prev, imageUri]);
      }

      if (currentStep === 'hood') {
        setCurrentStep('side');
      } else if (currentStep === 'side') {
        setCurrentStep('wheels');
      } else if (currentStep === 'wheels') {
        setCurrentStep('analyzing');
        setIsScanning(true);

        setTimeout(() => {
          setIsScanning(false);
          setScanResult(MOCK_SCAN_RESULT);
          setCurrentStep('complete');
        }, 2200);
      }
    } catch (error) {
      if (__DEV__) console.warn('[useVehicleScan] Capture error:', error);
    }
  }, [currentStep]);

  const handlePickFromGallery = useCallback(async (): Promise<void> => {
    try {
      const imageUri = await selectPhotoFromLibrary();
      if (imageUri) {
        setHasPermissionDenied(false);
        setCapturedPhotos(prev => [...prev, imageUri]);

        if (currentStep === 'hood') {
          setCurrentStep('side');
        } else if (currentStep === 'side') {
          setCurrentStep('wheels');
        } else if (currentStep === 'wheels') {
          setCurrentStep('analyzing');
          setIsScanning(true);

          setTimeout(() => {
            setIsScanning(false);
            setScanResult(MOCK_SCAN_RESULT);
            setCurrentStep('complete');
          }, 2200);
        }
      }
    } catch (error) {
      if (__DEV__) console.warn('[useVehicleScan] Gallery pick error:', error);
    }
  }, [currentStep]);

  const resetScan = useCallback((): void => {
    setCurrentStep('hood');
    setIsScanning(false);
    setScanResult(null);
    setIsLowLightDetected(false);
    setCapturedPhotos([]);
    setHasPermissionDenied(false);
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
    capturedPhotos,
    hasPermissionDenied,
    toggleTorch,
    handleCapturePhoto,
    handlePickFromGallery,
    resetScan,
    handleClose,
    setIsLowLightDetected,
  };
};
