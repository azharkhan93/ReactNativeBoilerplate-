import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Calendar, BarChart3, User, Wrench } from 'lucide-react-native';
import { Typography } from '@/components/theme';

const QUICK_ACTIONS = [
    { id: '1', label: 'Services', icon: Wrench, color: '#3b82f6' },
    { id: '2', label: 'Schedule', icon: Calendar, color: '#a855f7' },
    { id: '3', label: 'Insights', icon: BarChart3, color: '#22c55e' },
    { id: '4', label: 'Profile', icon: User, color: '#f59e0b' },
];

export const QuickActions: React.FC<{ onActionPress: (id: string) => void }> = ({ onActionPress }) => (
    <View className="px-5 mb-8">
        <Typography className="text-slate-500 font-body-bold text-xs mb-4 tracking-widest uppercase">
            Quick Actions
        </Typography>
        <View className="flex-row justify-between">
            {QUICK_ACTIONS.map(({ id, label, icon: Icon, color }) => (
                <TouchableOpacity
                    key={id}
                    onPress={() => onActionPress(id)}
                    className="items-center"
                    style={{ width: '22%' }}
                    activeOpacity={0.7}
                >
                    <View className="w-16 h-16 bg-notchLight rounded-2xl items-center justify-center mb-2 border border-blue-200/40 shadow-sm shadow-slate-100">
                        <Icon size={24} color={color} />
                    </View>
                    <Typography variant="body-sm" className="text-slate-800 font-body-medium text-center">
                        {label}
                    </Typography>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);
