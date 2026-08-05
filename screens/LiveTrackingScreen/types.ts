export interface Location {
  latitude: number;
  longitude: number;
}

export interface LiveTrackingScreenProps {
  onNavigate?: (route: string, params?: Record<string, unknown>) => void;
  bookingId?: string;
  initialLocation?: Location;
  initialEta?: number;
  destination?: Location;
  vendorName?: string;
}
