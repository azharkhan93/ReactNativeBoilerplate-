export interface LiveTrackingParams {
  category?: string | null;
  washType?: string | null;
  location?: 'doorstep' | 'workshop' | null;
  price?: number;
  bookingDate?: string;
  vendorName?: string;
}

export type NavigationCallback = (
  route: string,
  params?: Record<string, unknown>,
) => void;
