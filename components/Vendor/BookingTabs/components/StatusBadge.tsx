import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';
import { STATUS_CONFIG } from '../constants';

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
    return (
        <View className="px-3 py-1 rounded-full" style={{ backgroundColor: cfg?.bg }}>
            <Typography className="text-[10px] font-body-bold" style={{ color: cfg?.color }}>
                {cfg?.label}
            </Typography>
        </View>
    );
};
