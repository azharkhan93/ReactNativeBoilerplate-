export interface Location {
  latitude: number;
  longitude: number;
}

export interface TrackingMapProps {
  driverLocation: Location;
  destination: Location;
  driverPhotoUrl?: string;
}
