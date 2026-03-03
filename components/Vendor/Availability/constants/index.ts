import { DaySchedule, BreakTime, AvailabilityException } from '../types';

export const CARD_STYLE = 'bg-gray-900 rounded-2xl px-4 py-4 mb-3 border border-gray-800';

export const DAYS = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
] as const;

export const DEFAULT_SCHEDULE: Record<string, DaySchedule> = {
    Monday:    { enabled: true,  start: '09:00 AM', end: '05:00 PM' },
    Tuesday:   { enabled: true,  start: '09:00 AM', end: '05:00 PM' },
    Wednesday: { enabled: false, start: '09:00 AM', end: '05:00 PM' },
    Thursday:  { enabled: true,  start: '09:00 AM', end: '05:00 PM' },
    Friday:    { enabled: true,  start: '09:00 AM', end: '05:00 PM' },
    Saturday:  { enabled: false, start: '09:00 AM', end: '05:00 PM' },
    Sunday:    { enabled: false, start: '09:00 AM', end: '05:00 PM' },
};

export const DEFAULT_BREAKS: BreakTime[] = [
    { id: 'b1', label: 'Lunch Break', time: '12:30 PM - 01:30 PM', repeat: 'Daily' },
];

export const DEFAULT_EXCEPTIONS: AvailabilityException[] = [
    { id: 'e1', month: 'DEC', day: 25, label: 'Christmas Day',  type: 'blocked'   },
    { id: 'e2', month: 'JAN', day: 1,  label: "New Year's Eve", type: 'shortened' },
];

export const SECTION_CONFIG = {
    weekly: {
        title: 'Weekly Schedule',
        subtitle: 'Set your recurring operating hours',
    },
    breaks: {
        title: 'Break Times',
        addLabel: 'Add Break',
    },
    exceptions: {
        title: 'Exceptions',
        addLabel: 'Add Date',
    }
};
