import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Coffee, CalendarX, Trash2, ChevronRight } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { WeekStrip } from '../WeekStrip';
import { DayRow } from '../DayRow';
import { SectionHeader } from '../components/SectionHeader';
import {
    DAYS, DEFAULT_SCHEDULE, DEFAULT_BREAKS, DEFAULT_EXCEPTIONS, CARD_STYLE
} from '../constants';
import { DaySchedule, BreakTime, AvailabilityException } from '../types/types';
import { updateDaySchedule, removeById } from '../helpers/availabilityHelpers';

export const AvailabilityContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [schedule, setSchedule] = useState<Record<string, DaySchedule>>(DEFAULT_SCHEDULE);
    const [breaks, setBreaks] = useState<BreakTime[]>(DEFAULT_BREAKS);
    const [exceptions, setExceptions] = useState<AvailabilityException[]>(DEFAULT_EXCEPTIONS);

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>

            <WeekStrip />

            <Typography className="text-white text-base font-heading-semibold mb-1">Weekly Schedule</Typography>
            <Typography className="text-gray-500 text-[13px] mb-5">Set your recurring operating hours</Typography>

            {DAYS.map(day => (
                <DayRow
                    key={day}
                    day={day}
                    schedule={schedule[day]}
                    onToggle={() => setSchedule(p => updateDaySchedule(p, day, { enabled: !p[day].enabled }))}
                    onChangeStart={v => setSchedule(p => updateDaySchedule(p, day, { start: v }))}
                    onChangeEnd={v => setSchedule(p => updateDaySchedule(p, day, { end: v }))}
                />
            ))}

            <SectionHeader icon={<Coffee size={16} color="#3b82f6" />} title="Break Times" onAdd={() => { }} addLabel="Add Break" />
            {breaks.map(b => (
                <View key={b.id} className={`${CARD_STYLE} flex-row items-center justify-between`}>
                    <View>
                        <Typography className="text-white font-body-semibold">{b.label}</Typography>
                        <Typography className="text-gray-500 text-[12px] mt-0.5">{b.time} • {b.repeat}</Typography>
                    </View>
                    <TouchableOpacity onPress={() => setBreaks(p => removeById(p, b.id))} className="w-8 h-8 bg-gray-800 rounded-xl items-center justify-center">
                        <Trash2 size={14} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            ))}

            <SectionHeader icon={<CalendarX size={16} color="#3b82f6" />} title="Exceptions" onAdd={() => { }} addLabel="Add Date" />
            {exceptions.map(ex => (
                <TouchableOpacity key={ex.id} className={`${CARD_STYLE} flex-row items-center`} activeOpacity={0.8}>
                    <View className="bg-gray-800 rounded-xl px-3 py-2 items-center mr-4">
                        <Typography className="text-primary-400 text-[10px] font-body-bold tracking-wider">{ex.month}</Typography>
                        <Typography className="text-white text-lg font-heading-bold leading-5">{ex.day}</Typography>
                    </View>
                    <View className="flex-1">
                        <Typography className="text-white font-body-semibold">{ex.label}</Typography>
                        <View className={`self-start mt-1 px-2 py-0.5 rounded-full ${ex.type === 'blocked' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
                            <Typography className={`text-[10px] font-body-bold tracking-wider uppercase ${ex.type === 'blocked' ? 'text-red-400' : 'text-yellow-400'}`}>
                                {ex.type === 'blocked' ? 'Blocked Out' : 'Shortened Hours'}
                            </Typography>
                        </View>
                    </View>
                    <ChevronRight size={16} color="#4b5563" />
                </TouchableOpacity>
            ))}

            <TouchableOpacity className="bg-primary-500 py-4 rounded-2xl items-center mt-2" activeOpacity={0.85} onPress={onClose}>
                <Typography className="text-white font-body-bold text-base">Save Availability</Typography>
            </TouchableOpacity>
        </ScrollView>
    );
};
