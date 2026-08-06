import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { ScanStep, VehicleScanResult, YoloDetection } from './types';
import { MOCK_SCAN_RESULT } from './constants';
import { SCAN_VEHICLE_MUTATION } from './graphql';

import {
  checkCameraPermission,
  capturePhotoWithCamera,
  selectPhotoFromLibrary,
} from '@/utils/cameraHelper';

interface ScanVehicleMutationData {
  readonly scanVehicleCondition: VehicleScanResult;
}

interface ScanVehicleMutationVars {
  readonly base64Images: readonly string[];
}

export const useVehicleScan = (onClose: () => void) => {
  const [currentStep, setCurrentStep] = useState<ScanStep>('hood');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [hasTorchEnabled, setHasTorchEnabled] = useState<boolean>(false);
  const [isLowLightDetected, setIsLowLightDetected] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<VehicleScanResult | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<readonly string[]>([]);
  const [hasPermissionDenied, setHasPermissionDenied] = useState<boolean>(false);

  const [scanVehicleCondition] = useMutation<
    ScanVehicleMutationData,
    ScanVehicleMutationVars
  >(SCAN_VEHICLE_MUTATION);

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

  const executeAiScan = useCallback(
    async (photos: readonly string[]): Promise<void> => {
      setCurrentStep('analyzing');
      setIsScanning(true);

      try {
        const { data } = await scanVehicleCondition({
          variables: { base64Images: photos },
        });

        if (data?.scanVehicleCondition) {
          setScanResult(data.scanVehicleCondition);
        } else {
          setScanResult(MOCK_SCAN_RESULT);
        }
      } catch (error: unknown) {
        if (__DEV__) {
          const msg = error instanceof Error ? error.message : String(error);
          console.warn('[useVehicleScan] GraphQL AI Scan error:', msg);
        }
        setScanResult(MOCK_SCAN_RESULT);
      } finally {
        setIsScanning(false);
        setCurrentStep('complete');
      }
    },
    [scanVehicleCondition],
  );

  const handleCapturePhoto = useCallback(async (): Promise<void> => {
    try {
      const hasPermission = await checkCameraPermission();
      if (!hasPermission) {
        setHasPermissionDenied(true);
        return;
      }

      setHasPermissionDenied(false);
      const imageUri = await capturePhotoWithCamera();
      const updatedPhotos = imageUri ? [...capturedPhotos, imageUri] : capturedPhotos;

      if (imageUri) {
        setCapturedPhotos(updatedPhotos);
      }

      if (currentStep === 'hood') {
        setCurrentStep('side');
      } else if (currentStep === 'side') {
        setCurrentStep('wheels');
      } else if (currentStep === 'wheels') {
        await executeAiScan(updatedPhotos);
      }
    } catch (error: unknown) {
      if (__DEV__) {
        const msg = error instanceof Error ? error.message : String(error);
        console.warn('[useVehicleScan] Capture error:', msg);
      }
    }
  }, [currentStep, capturedPhotos, executeAiScan]);

  const handlePickFromGallery = useCallback(async (): Promise<void> => {
    try {
      const imageUri = await selectPhotoFromLibrary();
      if (imageUri) {
        setHasPermissionDenied(false);
        const updatedPhotos = [...capturedPhotos, imageUri];
        setCapturedPhotos(updatedPhotos);

        if (currentStep === 'hood') {
          setCurrentStep('side');
        } else if (currentStep === 'side') {
          setCurrentStep('wheels');
        } else if (currentStep === 'wheels') {
          await executeAiScan(updatedPhotos);
        }
      }
    } catch (error: unknown) {
      if (__DEV__) {
        const msg = error instanceof Error ? error.message : String(error);
        console.warn('[useVehicleScan] Gallery pick error:', msg);
      }
    }
  }, [currentStep, capturedPhotos, executeAiScan]);

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

