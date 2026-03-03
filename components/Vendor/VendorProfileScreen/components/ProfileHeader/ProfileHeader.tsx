import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronLeft, Settings } from 'lucide-react-native';
import { Typography } from '@/components/theme';

interface ProfileHeaderProps {
    topInset: number;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ topInset }) => (
    <View
        className="px-5 pb-2"
        style={{ paddingTop: Math.max(topInset, 20) + 10 }}
    >
        <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity className="w-10 h-10 items-center justify-center">
                <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <Typography className="text-white text-lg font-heading-semibold">
                Provider Profile
            </Typography>
            <TouchableOpacity className="w-10 h-10 items-center justify-center">
                <Settings size={22} color="white" />
            </TouchableOpacity>
        </View>
    </View>
);
