import { VehicleScanResult } from './types';

export const MOCK_SCAN_RESULT: VehicleScanResult = {
  isVehicleDetected: true,
  vehicleType: 'Sedan (Black Paint)',
  estimatedColor: '#1E293B',
  overallConditionScore: 6.2,
  detectedConditions: [
    {
      id: 'cond_1',
      category: 'paint',
      name: 'Moderate Swirl Marks',
      severity: 'moderate',
      confidenceScore: 0.94,
      summary: 'Micro-scratches visible under direct lighting on hood and doors.',
    },
    {
      id: 'cond_2',
      category: 'dirt',
      name: 'Road Grime & Water Spots',
      severity: 'moderate',
      confidenceScore: 0.89,
      summary: 'Dried mineral deposits along lower door panels and bumper.',
    },
    {
      id: 'cond_3',
      category: 'wheels',
      name: 'Heavy Brake Dust',
      severity: 'severe',
      confidenceScore: 0.96,
      summary: 'Corrosive metallic brake dust accumulation on front rims.',
    },
  ],
  recommendedPackage: {
    packageId: 'pkg_deluxe_ceramic',
    title: 'Ceramic Shield & Clay Bar Detailing',
    reason:
      'Recommended to remove mineral water spots, decontaminate rims, and seal swirl marks with hydrophobic ceramic finish.',
    originalPrice: 129.99,
    discountedPrice: 99.99,
    suggestedAddons: ['add_clay_bar', 'add_iron_decon', 'add_rim_shine'],
  },
} as const;

export const SCAN_STEP_GUIDANCE: Record<
  string,
  { readonly title: string; readonly subtitle: string }
> = {
  hood: {
    title: 'Step 1: Front Hood & Paint',
    subtitle: 'Align vehicle hood inside target box to scan for swirl marks',
  },
  side: {
    title: 'Step 2: Side Door Panels',
    subtitle: 'Align side body panels to inspect water spots & scratches',
  },
  wheels: {
    title: 'Step 3: Wheels & Rims',
    subtitle: 'Center front wheel inside target box to check brake dust',
  },
  analyzing: {
    title: 'AI Inspection in Progress',
    subtitle: 'Processing YOLO object detection & Gemini Vision paint analysis...',
  },
} as const;
