import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Calendar, BarChart3, User, Wrench } from 'lucide-react-native';
import { Typography } from '@/components/theme';

const QUICK_ACTIONS = [
    { id: '1', label: 'Services', icon: Wrench, color: '#3b82f6', bg: '#1e3a5f' },
    { id: '2', label: 'Schedule', icon: Calendar, color: '#a855f7', bg: '#3b1f5e' },
    { id: '3', label: 'Insights', icon: BarChart3, color: '#22c55e', bg: '#1a3d2b' },
    { id: '4', label: 'Profile', icon: User, color: '#f59e0b', bg: '#3d2e0f' },
];

export const QuickActions: React.FC<{ onActionPress: (id: string) => void }> = ({ onActionPress }) => (
    <View className="px-5 mb-8">
        <Typography className="text-gray-400 font-body-bold text-xs mb-4 tracking-widest uppercase">
            Quick Actions
        </Typography>
        <View className="flex-row justify-between">
            {QUICK_ACTIONS.map(({ id, label, icon: Icon, color, bg }) => (
                <TouchableOpacity
                    key={id}
                    onPress={() => onActionPress(id)}
                    className="items-center"
                    style={{ width: '22%' }}
                    activeOpacity={0.7}
                >
                    <View
                        className="w-16 h-16 rounded-2xl items-center justify-center mb-2 border border-gray-800"
                        style={{ backgroundColor: bg }}
                    >
                        <Icon size={24} color={color} />
                    </View>
                    <Typography variant="body-sm" className="text-gray-300 font-body-medium text-center">
                        {label}
                    </Typography>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);
