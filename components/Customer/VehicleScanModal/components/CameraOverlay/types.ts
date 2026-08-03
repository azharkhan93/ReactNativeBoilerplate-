import { ScanStep, YoloDetection } from '../../types';

export interface CameraOverlayProps {
  readonly currentStep: ScanStep;
  readonly isScanning: boolean;
  readonly yoloDetection: YoloDetection;
  readonly onCapturePress: () => void;
}
