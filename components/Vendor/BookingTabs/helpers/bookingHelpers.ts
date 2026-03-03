import { MOCK_BOOKINGS } from '@/utils/constants';

export const filterBookingsByStatus = (bookings: typeof MOCK_BOOKINGS, status: string) => {
    return bookings.filter(b => b.status === status);
};
