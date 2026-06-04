import { useMutation } from '@apollo/client/react';
import { gql } from '@/__generated__';

const SEND_BOOKING_NOTIFICATION = gql(`
  mutation SendBookingNotification($bookingId: ID!, $type: String!) {
    sendBookingNotification(bookingId: $bookingId, type: $type)
  }
`);

export const useSendBookingNotification = () => {
  const [sendBookingNotificationMutation, { loading, error }] = useMutation(
    SEND_BOOKING_NOTIFICATION,
  );

  const sendBookingNotification = async (
    bookingId: string,
    type: 'JOURNEY_START' | 'JOURNEY_HALFWAY',
  ) => {
    try {
      await sendBookingNotificationMutation({
        variables: {
          bookingId,
          type,
        },
      });
    } catch (err) {
      console.error('[FCM Backend] Notification trigger failed:', err);
    }
  };

  return { sendBookingNotification, loading, error };
};
