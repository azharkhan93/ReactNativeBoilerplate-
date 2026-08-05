import { FormattedBooking } from '../types';

export const filterBookingsByStatus = (
  bookings: readonly FormattedBooking[],
  status: string,
): FormattedBooking[] => {
  return bookings.filter(b => b.status === status);
};

