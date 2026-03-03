import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';
import { VENDOR_STATS } from '../../constants';

export const StatsRow: React.FC = () => (
    <View className="flex-row mx-5 mb-8">
        {VENDOR_STATS.map((stat, index) => (
            <View
                key={stat.label}
                className={`flex-1 items-center py-4 ${index < VENDOR_STATS.length - 1 ? 'border-r border-gray-800' : ''}`}
            >
                <Typography variant="h2" className="text-white text-2xl mb-1">
                    {stat.value}
                </Typography>
                <Typography variant="body-sm" className="text-gray-500 font-body-bold text-xs tracking-wider uppercase">
                    {stat.label}
                </Typography>
            </View>
        ))}
    </View>
);
