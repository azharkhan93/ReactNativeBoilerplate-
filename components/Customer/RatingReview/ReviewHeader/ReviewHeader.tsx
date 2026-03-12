import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Typography } from '../../../theme';

interface ReviewHeaderProps {
    onClose: () => void;
}

export const ReviewHeader: React.FC<ReviewHeaderProps> = ({ onClose }) => (
    <View className="flex-row items-center px-4 py-4 border-b border-slate-50">
        <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="p-2">
            <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Typography variant="h3" className="flex-1 text-center mr-10 text-slate-900">
            Rate Service
        </Typography>
    </View>
);
