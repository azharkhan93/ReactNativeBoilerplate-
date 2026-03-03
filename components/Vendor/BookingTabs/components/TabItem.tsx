import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Typography } from '@/components/theme';

interface TabItemProps {
    id: string;
    label: string;
    isActive: boolean;
    onPress: () => void;
}

export const TabItem: React.FC<TabItemProps> = ({ label, isActive, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        className={`px-4 pb-3 border-b-2 ${isActive ? 'border-primary-500' : 'border-transparent'}`}
    >
        <Typography
            className={`font-body-semibold text-[14px] ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
            {label}
        </Typography>
    </TouchableOpacity>
);
