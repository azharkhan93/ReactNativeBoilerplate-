import React from 'react';

export interface BookingOptionItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}

export interface WashTypeItem {
  id: string;
  name: string;
  duration: string;
  description: string;
}

export type ServiceLocation = 'doorstep' | 'workshop';

export interface LocationOption {
  id: ServiceLocation;
  title: string;
  badge: string;
  badgeStyle: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
}

export interface VendorBookingOptionsProps {
  vendorId: string;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string) => void;
  selectedWashType: string | null;
  setSelectedWashType: (type: string) => void;
  selectedLocation: ServiceLocation | null;
  setSelectedLocation: (loc: ServiceLocation) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  priceMatrix: Record<string, Record<string, number>>;
  vehicleCategories: BookingOptionItem[];
  washTypes: WashTypeItem[];
}
