import { DaySchedule } from '../types/types';

/**
 * Updates a specific day's schedule while preserving the rest of the week's state.
 */
export const updateDaySchedule = (
    prevSchedule: Record<string, DaySchedule>,
    day: string,
    patch: Partial<DaySchedule>
): Record<string, DaySchedule> => {
    return {
        ...prevSchedule,
        [day]: { ...prevSchedule[day], ...patch }
    };
};

/**
 * Filter items from a list by ID.
 */
export const removeById = <T extends { id: string }>(list: T[], id: string): T[] => {
    return list.filter(item => item.id !== id);
};
