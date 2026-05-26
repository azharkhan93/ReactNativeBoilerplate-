import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../theme';

export interface StatItem {
  label: string;
  value: string;
}

export interface ProfileStatsProps {
  stats: StatItem[];
  className?: string;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats, className = '' }) => (
    <View className={`flex-row mb-8 ${className}`}>
        {stats.map((stat, index) => (
            <View
                key={stat.label}
                className={`flex-1 items-center py-2 ${index < stats.length - 1 ? 'border-r border-slate-200' : ''}`}
            >
                <Typography variant="h2" className="text-slate-900 text-2xl mb-1">
                    {stat.value}
                </Typography>
                <Typography variant="body-sm" className="text-slate-500 font-body-bold text-[10px] tracking-wider uppercase">
                    {stat.label}
                </Typography>
            </View>
        ))}
    </View>
);
