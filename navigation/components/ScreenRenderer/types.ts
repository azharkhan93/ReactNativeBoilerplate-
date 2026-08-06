import { UserRole } from '@/__generated__/graphql';
import { LocationData } from '@/utils/locationHelper';
import { FilterValues } from '@/components/FilterModal/types';

export interface ScreenRendererProps {
  activeTab: string;
  userRole: UserRole | null;
  userLocation: LocationData;
  selectedVendorId: string | null;
  trackingParams: Record<string, unknown> | null;
  activeFilters: FilterValues;
  searchValue?: string;
  onNavigate: (route: string, params?: Record<string, unknown>) => void;
  onLogout?: () => Promise<void>;
  onRequestAuth?: () => void;
  setActiveFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
}
