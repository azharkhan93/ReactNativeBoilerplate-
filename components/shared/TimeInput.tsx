import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronUp, ChevronDown } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { parseTime, formatTime } from '@/helpers/dateHelpers';

// ─── Stepper ────────────────────────────────────────────────────
const Stepper: React.FC<{
    value: string;
    onInc: () => void;
    onDec: () => void;
}> = ({ value, onInc, onDec }) => (
    <View className="items-center mx-1">
        <TouchableOpacity onPress={onInc} className="p-1" activeOpacity={0.7}>
            <ChevronUp size={16} color="#6b7280" />
        </TouchableOpacity>
        <Typography className="text-white font-heading-bold text-base mx-1">{value}</Typography>
        <TouchableOpacity onPress={onDec} className="p-1" activeOpacity={0.7}>
            <ChevronDown size={16} color="#6b7280" />
        </TouchableOpacity>
    </View>
);

// ─── TimeInput ──────────────────────────────────────────────────
export interface TimeInputProps {
    value: string; // "09:00 AM"
    onChange: (value: string) => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
    const [editing, setEditing] = useState(false);
    const { hours, minutes, period } = parseTime(value);

    const update = (h: number, m: number, p: 'AM' | 'PM') =>
        onChange(formatTime(h, m, p));

    const incH = () => update(hours === 12 ? 1 : hours + 1, minutes, period);
    const decH = () => update(hours === 1 ? 12 : hours - 1, minutes, period);
    const incM = () => update(hours, minutes === 59 ? 0 : minutes + 1, period);
    const decM = () => update(hours, minutes === 0 ? 59 : minutes - 1, period);
    const toggleP = () => update(hours, minutes, period === 'AM' ? 'PM' : 'AM');

    if (editing) {
        return (
            <View className="flex-1 bg-gray-800 border border-primary-500 rounded-xl px-2 py-2 items-center">
                <View className="flex-row items-center">
                    <Stepper value={String(hours).padStart(2, '0')} onInc={incH} onDec={decH} />
                    <Typography className="text-gray-400 font-heading-bold text-base">:</Typography>
                    <Stepper value={String(minutes).padStart(2, '0')} onInc={incM} onDec={decM} />
                    <TouchableOpacity
                        onPress={toggleP}
                        className="bg-primary-500 px-2 py-1 rounded-lg ml-2"
                        activeOpacity={0.8}>
                        <Typography className="text-white font-body-bold text-xs">{period}</Typography>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setEditing(false)} className="mt-1.5">
                    <Typography className="text-primary-400 text-[11px] font-body-semibold">Done</Typography>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <TouchableOpacity
            onPress={() => setEditing(true)}
            activeOpacity={0.8}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 flex-row items-center justify-between">
            <Typography className="text-white text-[13px] font-body-medium">{value}</Typography>
            <View className="w-2 h-2 bg-gray-600 rounded-full" />
        </TouchableOpacity>
    );
};
