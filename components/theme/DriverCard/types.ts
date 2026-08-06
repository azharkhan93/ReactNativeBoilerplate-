export interface DriverVehicle {
  model: string;
  plateNumber: string;
  color: string;
}

export interface Driver {
  id: string;
  name: string;
  photoUrl: string;
  rating: number;
  phone: string;
  vehicle: DriverVehicle;
}

export interface DriverCardProps {
  driver: Driver;
}
