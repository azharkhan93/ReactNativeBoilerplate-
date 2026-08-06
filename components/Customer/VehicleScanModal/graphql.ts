import { gql, TypedDocumentNode } from '@apollo/client';
import { VehicleScanResult } from './types';

export interface ScanVehicleMutationData {
  readonly scanVehicleCondition: VehicleScanResult;
}

export interface ScanVehicleMutationVars {
  readonly base64Images: readonly string[];
}

export const SCAN_VEHICLE_MUTATION: TypedDocumentNode<
  ScanVehicleMutationData,
  ScanVehicleMutationVars
> = gql`
  mutation ScanVehicleCondition($base64Images: [String!]!) {
    scanVehicleCondition(base64Images: $base64Images) {
      isVehicleDetected
      overallConditionScore
      retakeGuidance
      detectedConditions {
        id
        category
        name
        severity
        confidenceScore
        summary
      }
      recommendedPackage {
        packageId
        title
        reason
        suggestedAddons
      }
    }
  }
`;
