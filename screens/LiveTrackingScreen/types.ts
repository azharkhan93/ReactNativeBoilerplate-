export interface Location {
  latitude: number;
  longitude: number;
}

export interface LiveTrackingScreenProps {
  onNavigate?: (route: string, params?: any) => void;
  bookingId?: string;
  initialLocation?: Location;
  initialEta?: number;
  destination?: Location;
  vendorName?: string;
}
