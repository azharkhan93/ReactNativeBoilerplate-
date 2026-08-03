import { ScanStep, VehicleScanResult, YoloDetection } from '../../types';

export interface VehicleScanContentProps {
  readonly currentStep: ScanStep;
  readonly isScanning: boolean;
  readonly hasTorchEnabled: boolean;
  readonly isLowLightDetected: boolean;
  readonly scanResult: VehicleScanResult | null;
  readonly yoloDetection: YoloDetection;
  readonly hasPermissionDenied?: boolean;
  readonly onToggleTorch: () => void;
  readonly onCapturePhoto: () => void;
  readonly onResetScan: () => void;
  readonly onSelectRecommendedPackage: (
    packageId: string,
    addons: readonly string[],
  ) => void;
}
