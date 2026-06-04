import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';

import { ExceptionType } from '@/__generated__/graphql';
import { useFragment } from '@/__generated__/fragment-masking';
import { getUserId } from '@/utils/store/authStore';

import { DaySchedule, BreakTime, AvailabilityException } from '../types/types';
import { DAYS, DAY_TO_NUMBER, MONTH_NAMES } from '../constants';
import {
  GET_VENDOR_PROFILE,
  GET_VENDOR_AVAILABILITY,
  SAVE_FULL_AVAILABILITY,
  VENDOR_PROFILE_FIELDS,
} from '../../vendorQueries';

export const useVendorAvailability = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>({});
  const [breaks, setBreaks] = useState<BreakTime[]>([]);
  const [exceptions, setExceptions] = useState<AvailabilityException[]>([]);

  useEffect(() => {
    getUserId().then(id => id && setUserId(id));
  }, []);

  const { data: profileData, loading: loadingProfile } = useQuery(
    GET_VENDOR_PROFILE,
    {
      variables: { userId: userId ?? '' },
      skip: !userId,
    },
  );

  const profile = useFragment(
    VENDOR_PROFILE_FIELDS,
    profileData?.getVendorProfile,
  );
  const vendorProfileId = profile?.id;

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

  useEffect(() => {
    if (availData?.getVendorAvailability) {
      const avail = availData.getVendorAvailability;
      const newSchedule = Object.fromEntries(
        DAYS.map(day => {
          const match = avail.schedule.find(
            s => s.dayOfWeek === DAY_TO_NUMBER[day],
          );
          return [
            day,
            {
              enabled: match?.isActive ?? false,
              start: match?.startTime ?? '09:00 AM',
              end: match?.endTime ?? '06:00 PM',
            },
          ];
        }),
      );
      setSchedule(newSchedule);

      setBreaks(
        avail.breaks.map(b => ({
          id: b.id,
          label: b.name,
          time: `${b.startTime} - ${b.endTime}`,
          repeat: 'Daily',
        })),
      );

      setExceptions(
        avail.exceptions.map(ex => {
          const dateObj = new Date(ex.date);
          return {
            id: ex.id,
            month: MONTH_NAMES[dateObj.getMonth()] || 'MAY',
            day: dateObj.getDate() || 1,
            label: ex.description || 'Custom Exception',
            type:
              ex.type === ExceptionType.BlockedOut ? 'blocked' : 'shortened',
          };
        }),
      );
    }
  }, [availData]);

  const handleToggleDay = useCallback((day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        enabled: !prev[day]?.enabled,
        start: prev[day]?.start ?? '09:00 AM',
        end: prev[day]?.end ?? '06:00 PM',
      },
    }));
  }, []);

  const handleChangeTime = useCallback(
    (day: string, field: 'start' | 'end', value: string) => {
      setSchedule(prev => ({
        ...prev,
        [day]: {
          enabled: prev[day]?.enabled ?? false,
          start: prev[day]?.start ?? '09:00 AM',
          end: prev[day]?.end ?? '06:00 PM',
          [field]: value,
        },
      }));
    },
    [],
  );

  const handleChangeStart = useCallback(
    (day: string, value: string) => handleChangeTime(day, 'start', value),
    [handleChangeTime],
  );
  const handleChangeEnd = useCallback(
    (day: string, value: string) => handleChangeTime(day, 'end', value),
    [handleChangeTime],
  );

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

  const handleUpdateBreak = useCallback(
    (id: string, label: string, startTime: string, endTime: string) => {
      setBreaks(prev =>
        prev.map(b =>
          b.id === id ? { ...b, label, time: `${startTime} - ${endTime}` } : b,
        ),
      );
    },
    [],
  );

  const handleRemoveException = useCallback((id: string) => {
    setExceptions(prev => prev.filter(ex => ex.id !== id));
  }, []);

  const handleAddException = useCallback(
    (
      label: string,
      month: string,
      day: number,
      type: 'blocked' | 'shortened',
    ) => {
      setExceptions(prev => [
        ...prev,
        { id: `temp-${Date.now()}`, month, day, label, type },
      ]);
    },
    [],
  );

  const handleUpdateException = useCallback(
    (
      id: string,
      label: string,
      month: string,
      day: number,
      type: 'blocked' | 'shortened',
    ) => {
      setExceptions(prev =>
        prev.map(ex =>
          ex.id === id ? { ...ex, label, month, day, type } : ex,
        ),
      );
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
      const parts = (b.time ?? '').split(' - ');
      return {
        name: b.label,
        startTime: parts[0] || '12:00 PM',
        endTime: parts[1] || '01:00 PM',
      };
    });

    const mappedExceptionsInput = exceptions.map(ex => {
      const currentYear = new Date().getFullYear();
      const monthIdx = MONTH_NAMES.indexOf(ex.month);
      const dateVal = new Date(
        Date.UTC(currentYear, monthIdx !== -1 ? monthIdx : 4, ex.day, 12, 0, 0),
      );

      return {
        date: dateVal.toISOString(),
        description: ex.label,
        type:
          ex.type === 'blocked'
            ? ExceptionType.BlockedOut
            : ExceptionType.ShortenedHours,
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
    handleUpdateBreak,
    handleRemoveException,
    handleAddException,
    handleUpdateException,
    handleSave,
  };
};
