import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import {
    getWeekStart, getWeekDays, formatMonthYear, shortDay, addWeeks,
} from '@/helpers/dateHelpers';

interface WeekStripProps {
    selectedDate?: Date;
    onSelectDate?: (date: Date) => void;
}

export const WeekStrip: React.FC<WeekStripProps> = ({
    selectedDate: externalSelected,
    onSelectDate,
}) => {
    const today = new Date();
    const [weekStart, setWeekStart] = useState(getWeekStart(today));
    const [selected, setSelected] = useState(externalSelected ?? today);

    const days = getWeekDays(weekStart);

    const handleSelect = (d: Date) => {
        setSelected(d);
        onSelectDate?.(d);
    };

    return (
        <View className="mb-6">
            {/* Month header */}
            <View className="flex-row justify-between items-center mb-3">
                <Typography className="text-gray-400 text-xs font-body-bold tracking-widest uppercase">
                    {formatMonthYear(weekStart)}
                </Typography>
                <View className="flex-row gap-2">
                    <TouchableOpacity
                        onPress={() => setWeekStart(prev => addWeeks(prev, -1))}
                        className="w-7 h-7 bg-gray-800 rounded-full items-center justify-center">
                        <ChevronLeft size={14} color="#9ca3af" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setWeekStart(prev => addWeeks(prev, 1))}
                        className="w-7 h-7 bg-gray-800 rounded-full items-center justify-center">
                        <ChevronRight size={14} color="#9ca3af" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Scrollable day strip */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 6 }}>
                {days.map((d, i) => {
                    const isSelected =
                        d.toDateString() === selected.toDateString();
                    const isToday = d.toDateString() === today.toDateString();
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => handleSelect(d)}
                            className={`items-center px-3 py-2.5 rounded-2xl ${isSelected ? 'bg-primary-500' : 'bg-gray-900'}`}
                            activeOpacity={0.8}>
                            <Typography
                                className={`text-[10px] font-body-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                                {shortDay(d)}
                            </Typography>
                            <Typography
                                className={`font-heading-bold text-base ${isSelected ? 'text-white' : isToday ? 'text-primary-400' : 'text-gray-300'}`}>
                                {d.getDate()}
                            </Typography>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};
