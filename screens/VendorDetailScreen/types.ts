export interface VendorDetailScreenProps {
  vendorId: string | null;
  onNavigate: (route: string, params?: Record<string, unknown>) => void;
  onRequestAuth?: (onSuccessCallback?: () => void) => void;
}
