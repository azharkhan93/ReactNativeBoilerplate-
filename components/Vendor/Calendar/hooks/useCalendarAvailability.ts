/* eslint-disable @typescript-eslint/no-shadow */
import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_VENDOR_AVAILABILITY } from '../../vendorQueries';
import { ExceptionType } from '@/__generated__/graphql';

export const useCalendarAvailability = ({
  vendorProfileId,
}: {
  vendorProfileId: string;
}) => {
  const { data, loading } = useQuery(GET_VENDOR_AVAILABILITY, {
    variables: { vendorProfileId },
    skip: !vendorProfileId,
  });

  const { activeDays, blockedDates } = useMemo(() => {
    const schedule = data?.getVendorAvailability?.schedule || [];
    const exceptions = data?.getVendorAvailability?.exceptions || [];

    const activeDays = new Set(
      schedule.some(s => s.isActive)
        ? schedule.filter(s => s.isActive).map(s => s.dayOfWeek)
        : [1, 2, 3, 4, 5, 6]
    );

    const formatDate = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate(),
      ).padStart(2, '0')}`;

    const blockedDates = new Set(
      exceptions
        .filter(ex => ex.type === ExceptionType.BlockedOut && ex.date)
        .map(ex => formatDate(new Date(ex.date))),
    );

    return { activeDays, blockedDates };
  }, [data]);

  const isDateAvailable = useMemo(() => {
    return (date: Date): boolean => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const target = new Date(date);
      target.setHours(0, 0, 0, 0);
      if (target < today) return false;

      const dateKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      if (blockedDates.has(dateKey)) return false;

      const jsDay = date.getDay();
      const backendDay = jsDay === 0 ? 7 : jsDay;
      return activeDays.has(backendDay);
    };
  }, [activeDays, blockedDates]);

  return { loading, isDateAvailable };
};
