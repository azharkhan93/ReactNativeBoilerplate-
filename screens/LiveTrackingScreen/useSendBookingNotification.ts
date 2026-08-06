import { useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { gql } from '@/__generated__';
import { BookingNotificationType } from '@/__generated__/graphql';

const SEND_BOOKING_NOTIFICATION = gql(`
  mutation SendBookingNotification($bookingId: ID!, $type: BookingNotificationType!) {
    sendBookingNotification(bookingId: $bookingId, type: $type)
  }
`);

export const useSendBookingNotification = () => {
  const [sendBookingNotificationMutation, { loading, error }] = useMutation(
    SEND_BOOKING_NOTIFICATION,
  );

  const sendBookingNotification = useCallback(
    async (
      bookingId: string,
      type: BookingNotificationType,
    ): Promise<void> => {
      try {
        await sendBookingNotificationMutation({
          variables: {
            bookingId,
            type,
          },
        });
      } catch (err) {
        if (__DEV__) {
          console.warn(
            '[FCM Backend] Notification trigger skipped (Unauthenticated or session expired):',
            err,
          );
        }
      }
    },
    [sendBookingNotificationMutation],
  );

  return { sendBookingNotification, loading, error };
};

