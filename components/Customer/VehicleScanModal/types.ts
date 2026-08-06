export type ScanStep = 'hood' | 'side' | 'wheels' | 'analyzing' | 'complete';

export type ConditionCategory = 'dirt' | 'paint' | 'wheels' | 'interior';
export type ConditionSeverity = 'light' | 'moderate' | 'severe';

export interface DetectedCondition {
  readonly id: string;
  readonly category: ConditionCategory;
  readonly name: string;
  readonly severity: ConditionSeverity;
  readonly confidenceScore: number;
  readonly summary: string;
}

export interface RecommendedPackage {
  readonly packageId: string;
  readonly title: string;
  readonly reason: string;
  readonly originalPrice?: number;
  readonly discountedPrice?: number;
  readonly suggestedAddons: readonly string[];
}

export interface VehicleScanResult {
  readonly isVehicleDetected: boolean;
  readonly vehicleType?: string;
  readonly estimatedColor?: string;
  readonly overallConditionScore: number; // 1 (worst) to 10 (pristine)
  readonly detectedConditions: readonly DetectedCondition[];
  readonly recommendedPackage: RecommendedPackage;
  readonly retakeGuidance?: string;
}


export interface YoloDetection {
  readonly isVehicleDetected: boolean;
  readonly confidence: number;
  readonly boundingBox: {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  };
  readonly isLowLight: boolean;
  readonly isBlurry: boolean;
}

export interface VehicleScanModalProps {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly onSelectRecommendedPackage?: (
    packageId: string,
    addons: readonly string[],
  ) => void;
}
