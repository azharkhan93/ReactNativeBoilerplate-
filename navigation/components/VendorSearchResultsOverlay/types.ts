export interface VendorItem {
  id: string;
  businessName: string;
}

export interface VendorSearchResultsOverlayProps {
  vendors: readonly VendorItem[];
  onSelectVendor: (id: string) => void;
}
