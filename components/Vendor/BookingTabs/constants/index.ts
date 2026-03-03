import { BOOKING_STATUS } from '@/utils/constants';

export const TABS = [
    { id: BOOKING_STATUS.PENDING, label: 'Pending' },
    { id: BOOKING_STATUS.ACCEPTED, label: 'Accepted' },
    { id: BOOKING_STATUS.COMPLETED, label: 'Completed' },
    { id: BOOKING_STATUS.CANCELLED, label: 'Cancelled' },
];

export const STATUS_CONFIG = {
    [BOOKING_STATUS.PENDING]: { label: 'PENDING', color: '#f59e0b', bg: '#f59e0b20' },
    [BOOKING_STATUS.ACCEPTED]: { label: 'ACCEPTED', color: '#3b82f6', bg: '#3b82f620' },
    [BOOKING_STATUS.COMPLETED]: { label: 'COMPLETED', color: '#22c55e', bg: '#22c55e20' },
    [BOOKING_STATUS.CANCELLED]: { label: 'CANCELLED', color: '#ef4444', bg: '#ef444420' },
};
