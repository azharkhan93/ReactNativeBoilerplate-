import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_VENDOR_PROFILE,
  GET_VENDOR_AVAILABILITY,
  SAVE_FULL_AVAILABILITY,
} from '../../vendorQueries';
import { DaySchedule, BreakTime, AvailabilityException } from '../types/types';
import { DAYS } from '../constants';
import { getUserId } from '@/utils/store/authStore';

const DAY_TO_NUMBER: Record<string, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

const MONTH_NAMES = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

export const useVendorAvailability = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUserId().then(id => {
      if (id) setUserId(id);
    });
  }, []);

  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>({});
  const [breaks, setBreaks] = useState<BreakTime[]>([]);
  const [exceptions, setExceptions] = useState<AvailabilityException[]>([]);

  // 1. Fetch Vendor Profile to get vendorProfileId
  const { data: profileData, loading: loadingProfile } = useQuery(
    GET_VENDOR_PROFILE,
    {
      variables: { userId: userId ?? '' },
      skip: !userId,
    },
  );

  const vendorProfileId = profileData?.getVendorProfile?.id;

  // 2. Fetch Availability once vendorProfileId is loaded
  const {
    data: availData,
    loading: loadingAvail,
    refetch: refetchAvail,
  } = useQuery(GET_VENDOR_AVAILABILITY, {
    variables: { vendorProfileId: vendorProfileId || '' },
    skip: !vendorProfileId,
  });

  const [saveFullAvailability, { loading: saving }] = useMutation(
    SAVE_FULL_AVAILABILITY,
  );

  // Sync GQL availability payload with local React state
  useEffect(() => {
    if (availData?.getVendorAvailability) {
      const avail = availData.getVendorAvailability;

      // 1. Map schedules
      const newSchedule: Record<string, DaySchedule> = {};
      DAYS.forEach(day => {
        const num = DAY_TO_NUMBER[day];
        const match = avail.schedule.find(s => s.dayOfWeek === num);
        newSchedule[day] = {
          enabled: match ? match.isActive : false,
          start: match ? match.startTime : '09:00 AM',
          end: match ? match.endTime : '06:00 PM',
        };
      });
      setSchedule(newSchedule);

      // 2. Map breaks
      setBreaks(
        avail.breaks.map(b => ({
          id: b.id,
          label: b.name,
          time: `${b.startTime} - ${b.endTime}`,
          repeat: 'Daily',
        })),
      );

      // 3. Map exceptions
      setExceptions(
        avail.exceptions.map(ex => {
          const dateObj = new Date(ex.date);
          return {
            id: ex.id,
            month: MONTH_NAMES[dateObj.getMonth()] || 'MAY',
            day: dateObj.getDate() || 1,
            label: ex.description || 'Custom Exception',
            type: (ex.type as any) === 'BLOCKED' ? 'blocked' : 'shortened',
          };
        }),
      );
    }
  }, [availData]);

  const handleToggleDay = useCallback((day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day]?.enabled,
      },
    }));
  }, []);

  const handleChangeStart = useCallback((day: string, value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        start: value,
      },
    }));
  }, []);

  const handleChangeEnd = useCallback((day: string, value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        end: value,
      },
    }));
  }, []);

  const handleRemoveBreak = useCallback((id: string) => {
    setBreaks(prev => prev.filter(b => b.id !== id));
  }, []);

  const handleAddBreak = useCallback(
    (label: string, startTime: string, endTime: string) => {
      setBreaks(prev => [
        ...prev,
        {
          id: `temp-${Date.now()}`,
          label,
          time: `${startTime} - ${endTime}`,
          repeat: 'Daily',
        },
      ]);
    },
    [],
  );

  const handleAddException = useCallback(
    (
      label: string,
      month: string,
      day: number,
      type: 'blocked' | 'shortened',
    ) => {
      setExceptions(prev => [
        ...prev,
        {
          id: `temp-${Date.now()}`,
          month,
          day,
          label,
          type,
        },
      ]);
    },
    [],
  );

  const handleSave = useCallback(async () => {
    if (!vendorProfileId) return;

    const mappedScheduleInput = Object.keys(schedule).map(day => ({
      dayOfWeek: DAY_TO_NUMBER[day],
      startTime: schedule[day].start,
      endTime: schedule[day].end,
      isActive: schedule[day].enabled,
    }));

    const mappedBreaksInput = breaks.map(b => {
      const parts = b.time.split(' - ');
      return {
        name: b.label,
        startTime: parts[0] || '12:00 PM',
        endTime: parts[1] || '01:00 PM',
      };
    });

    const mappedExceptionsInput = exceptions.map(ex => {
      // Form date string safely for current year
      const currentYear = new Date().getFullYear();
      const monthIdx = MONTH_NAMES.indexOf(ex.month);
      const dateVal = new Date(
        currentYear,
        monthIdx !== -1 ? monthIdx : 4,
        ex.day,
      );

      return {
        date: dateVal,
        description: ex.label,
        type: ex.type === 'blocked' ? ('BLOCKED' as any) : ('SHORTENED' as any),
        startTime: '10:00 AM',
        endTime: '02:00 PM',
      };
    });

    try {
      await saveFullAvailability({
        variables: {
          vendorProfileId,
          input: {
            schedule: mappedScheduleInput,
            breaks: mappedBreaksInput,
            exceptions: mappedExceptionsInput,
          },
        },
      });
      refetchAvail();
    } catch (err) {
      console.error('Failed to save availability:', err);
    }
  }, [
    vendorProfileId,
    schedule,
    breaks,
    exceptions,
    saveFullAvailability,
    refetchAvail,
  ]);

  return {
    schedule,
    breaks,
    exceptions,
    loading: loadingProfile || loadingAvail || saving,
    handleToggleDay,
    handleChangeStart,
    handleChangeEnd,
    handleRemoveBreak,
    handleAddBreak,
    handleAddException,
    handleSave,
  };
};
