/** Returns the Monday of the week containing `date` */
export const getWeekStart = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay(); // 0 = Sun
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
};

/** Returns 7 Date objects for the week starting on `monday` */
export const getWeekDays = (monday: Date): Date[] =>
    Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });

/** "MARCH 2025" */
export const formatMonthYear = (date: Date): string =>
    date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();

/** "MON", "TUE" … */
export const shortDay = (date: Date): string =>
    date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase().slice(0, 3);

/** Adds `weeks` weeks to a date */
export const addWeeks = (date: Date, weeks: number): Date => {
    const d = new Date(date);
    d.setDate(d.getDate() + weeks * 7);
    return d;
};

/** "09:00 AM" → { hours: 9, minutes: 0, period: 'AM' } */
export const parseTime = (value: string) => {
    const [hm, period] = value.split(' ');
    const [h, m] = hm.split(':').map(Number);
    return { hours: h, minutes: m, period: period as 'AM' | 'PM' };
};

/** { hours, minutes, period } → "09:00 AM" */
export const formatTime = (h: number, m: number, period: 'AM' | 'PM'): string =>
    `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
