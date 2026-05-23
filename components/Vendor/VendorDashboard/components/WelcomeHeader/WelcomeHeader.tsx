import React from 'react';
import { View, Image } from 'react-native';
import { User } from 'lucide-react-native';
import { Typography } from '@/components/theme';

export interface WelcomeHeaderProps {
    topInset: number;
    userName?: string;
    avatarUrl?: string | null;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ topInset, userName, avatarUrl }) => (
    <View className="px-5 pb-4" style={{ paddingTop: Math.max(topInset, 20) + 10 }}>
        <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
                <View className="w-12 h-12 bg-green-500 rounded-full items-center justify-center mr-3 border-2 border-green-400 overflow-hidden">
                    {avatarUrl ? (
                        <Image source={{ uri: avatarUrl }} className="w-full h-full" resizeMode="cover" />
                    ) : (
                        <User size={22} color="white" />
                    )}
                </View>
                <View>
                    <Typography variant="body-sm" className="text-gray-400 font-body-medium">
                        WELCOME BACK
                    </Typography>
                    <Typography className="text-white text-xl font-heading-bold">
                        Good Morning, {userName || 'Alex'}
                    </Typography>
                </View>
            </View>
            <View className="flex-row items-center bg-green-500/20 px-3 py-1.5 rounded-full">
                <View className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                <Typography variant="body-sm" className="text-green-400 font-body-bold text-xs">
                    ONLINE
                </Typography>
            </View>
        </View>
    </View>
);

