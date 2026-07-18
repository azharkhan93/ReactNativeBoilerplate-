export interface UseDriverLocationPublisherProps {
  readonly bookingId: string | null;
  readonly isTrackingEnabled: boolean;
  readonly status?: string;
  readonly eta?: number;
}
