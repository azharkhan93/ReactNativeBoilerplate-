import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { Typography } from '@/components/theme';

interface SectionHeaderProps {
    icon: React.ReactNode;
    title: string;
    onAdd: () => void;
    addLabel: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, onAdd, addLabel }) => (
    <View className="flex-row justify-between items-center mb-4 mt-2">
        <View className="flex-row items-center">
            {icon}
            <Typography className="text-white font-heading-semibold ml-2">{title}</Typography>
        </View>
        <TouchableOpacity onPress={onAdd} className="flex-row items-center">
            <Plus size={14} color="#3b82f6" />
            <Typography className="text-primary-400 text-[13px] font-body-semibold ml-1">{addLabel}</Typography>
        </TouchableOpacity>
    </View>
);
