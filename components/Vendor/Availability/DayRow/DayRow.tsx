import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';
import { ToggleSwitch } from '@/components/shared/ToggleSwitch';
import { TimeInput } from '@/components/shared/TimeInput';
import { DaySchedule } from '@/components/Vendor/Availability/types';

interface DayRowProps {
    day: string;
    schedule: DaySchedule;
    onToggle: () => void;
    onChangeStart: (v: string) => void;
    onChangeEnd: (v: string) => void;
}

export const DayRow: React.FC<DayRowProps> = ({
    day, schedule, onToggle, onChangeStart, onChangeEnd,
}) => (
    <View className="mb-5">
        <View className="flex-row justify-between items-center mb-4">
            <Typography >{day}</Typography>
            <ToggleSwitch value={schedule.enabled} onValueChange={onToggle} />
        </View>
        {schedule.enabled ? (
            <View className="flex-row items-center gap-3">
                <TimeInput value={schedule.start} onChange={onChangeStart} />
                <Typography className="text-gray-500 font-body-bold">—</Typography>
                <TimeInput value={schedule.end} onChange={onChangeEnd} />
            </View>
        ) : (
            <Typography className="text-gray-600 text-[13px] font-body">Unavailable</Typography>
        )}
    </View>
);
