import { VehicleScanResult } from '../../types';

export interface AnalysisResultCardProps {
  readonly result: VehicleScanResult;
  readonly onBookPackagePress: (
    packageId: string,
    addons: readonly string[],
  ) => void;
  readonly onRescanPress: () => void;
}
