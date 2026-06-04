import { useEffect, useRef } from 'react';
import { showLocalNotification } from '@/utils/notificationService';
import { getDistance } from '@/utils/distanceHelper';
import { Location } from './types';
import { useSendBookingNotification } from './useSendBookingNotification';

export const useTrackingNotifications = (
  bookingId: string | undefined,
  vendorName: string,
  currentLocation: Location,
  destination: Location,
) => {
  const { sendBookingNotification } = useSendBookingNotification();
  const initialDistance = useRef<number | null>(null);
  const didSendOnTheWay = useRef(false);
  const didSendHalfway = useRef(false);

  useEffect(() => {
    // Reset notification flags when bookingId changes
    initialDistance.current = null;
    didSendOnTheWay.current = false;
    didSendHalfway.current = false;
  }, [bookingId]);

  useEffect(() => {
    if (!bookingId || !currentLocation || !destination) return;

    const dist = getDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      destination.latitude,
      destination.longitude,
    );

    
    if (initialDistance.current === null) {
      initialDistance.current = dist;
      if (!didSendOnTheWay.current && dist > 0.02) {
        sendBookingNotification(bookingId, 'JOURNEY_START');

        showLocalNotification(
          vendorName,
          `${vendorName} is on the way to your location (within 5 minutes)`,
        );
        didSendOnTheWay.current = true;
      }
    } else {
      // 2. Trigger "Halfway" when current distance <= 50% of the initial distance
      const halfDist = initialDistance.current * 0.5;
      if (dist <= halfDist && !didSendHalfway.current && dist > 0.01) {
        sendBookingNotification(bookingId, 'JOURNEY_HALFWAY');

        showLocalNotification(
          vendorName,
          `${vendorName} is halfway to your location`,
        );
        didSendHalfway.current = true;
      }
    }
  }, [
    bookingId,
    currentLocation,
    destination,
    vendorName,
    sendBookingNotification,
  ]);
};
