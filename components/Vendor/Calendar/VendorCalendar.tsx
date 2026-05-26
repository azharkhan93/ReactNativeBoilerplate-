import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react-native';
import { Typography } from '../../theme/Typography';
import { useCalendarAvailability } from './hooks/useCalendarAvailability';

export interface VendorCalendarProps {
  vendorProfileId: string;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  containerClassName?: string;
}

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const VendorCalendar: React.FC<VendorCalendarProps> = ({
  vendorProfileId,
  selectedDate,
  onSelectDate,
  containerClassName = '',
}) => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  
  const { loading, isDateAvailable } = useCalendarAvailability({ vendorProfileId });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Calendar math
  const days = useMemo(() => {
    const totalDays = new Date(year, month + 1, 0).getDate();
    // JS getDay() returns 0 for Sunday, 1 for Monday...
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Adjust firstDayIndex so Monday is 0 index and Sunday is 6 index
    const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const items = [];
    
    // Fill empty offset slots
    for (let i = 0; i < startOffset; i++) {
      items.push(null);
    }

    // Fill days of current month
    for (let day = 1; day <= totalDays; day++) {
      items.push(new Date(year, month, day));
    }

    return items;
  }, [year, month]);

  const handlePrevMonth = () => {
    const today = new Date();
    // Prevent going to past months
    if (year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth())) {
      setCurrentMonth(new Date(year, month - 1, 1));
    }
  };

  const handleNextMonth = () => {
    // Limit to next 12 months for sanity and compact scope
    const limitDate = new Date();
    limitDate.setMonth(limitDate.getMonth() + 12);
    if (year < limitDate.getFullYear() || (year === limitDate.getFullYear() && month < limitDate.getMonth())) {
      setCurrentMonth(new Date(year, month + 1, 1));
    }
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPrevDisabled = useMemo(() => {
    const today = new Date();
    return year === today.getFullYear() && month === today.getMonth();
  }, [year, month]);

  return (
    <View className={`bg-white border border-slate-200 rounded-3xl p-5 shadow-sm ${containerClassName}`}>
      {/* Month & Nav Controls */}
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-row items-center gap-2">
          <CalendarIcon size={18} className="text-blue-500" />
          <Typography className="text-slate-900 font-heading-semibold text-base">
            {MONTHS[month]} {year}
          </Typography>
        </View>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={handlePrevMonth}
            disabled={isPrevDisabled}
            className={`p-2 rounded-xl border border-slate-200 justify-center items-center ${
              isPrevDisabled ? 'opacity-40' : 'active:bg-slate-50'
            }`}
          >
            <ChevronLeft size={16} className="text-slate-700" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNextMonth}
            className="p-2 rounded-xl border border-slate-200 justify-center items-center active:bg-slate-50"
          >
            <ChevronRight size={16} className="text-slate-700" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading Overlay */}
      {loading ? (
        <View className="h-[210px] items-center justify-center">
          <ActivityIndicator size="small" color="#3b82f6" />
          <Typography className="text-slate-400 font-body-medium text-xs mt-3">
            Loading availability...
          </Typography>
        </View>
      ) : (
        <View>
          {/* Weekday Labels Header */}
          <View className="flex-row justify-between mb-3">
            {WEEKDAYS.map((day, idx) => (
              <View key={idx} className="w-[38px] items-center">
                <Typography className="text-slate-400 font-body-semibold text-[11px] uppercase tracking-wider">
                  {day}
                </Typography>
              </View>
            ))}
          </View>

          {/* Days Grid */}
          <View className="flex-row flex-wrap justify-start">
            {days.map((date, idx) => {
              if (!date) {
                return <View key={`empty-${idx}`} className="w-[38px] h-[38px] mb-1.5" />;
              }

              const available = isDateAvailable(date);
              const selected = isSelected(date);

              return (
                <TouchableOpacity
                  key={date.toISOString()}
                  disabled={!available}
                  onPress={() => onSelectDate(date)}
                  className={`w-[38px] h-[38px] rounded-xl items-center justify-center mb-1.5 ${
                    selected
                      ? 'bg-blue-500 shadow-sm'
                      : available
                      ? 'bg-slate-50 active:bg-slate-100 border border-slate-100'
                      : 'bg-transparent border border-transparent opacity-25'
                  }`}
                >
                  <Typography
                    className={`font-body-semibold text-sm ${
                      selected ? 'text-white' : available ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {date.getDate()}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};
