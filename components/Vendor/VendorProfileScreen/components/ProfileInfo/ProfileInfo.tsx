import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MapPin, BadgeCheck, Pencil } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { ProfileAvatar } from '@/components/Profile/ProfileAvatar';

export const ProfileInfo: React.FC = () => (
    <View className="items-center px-5 mb-6">
        <View className="mb-4">
            <ProfileAvatar size={100} onEditPress={() => console.log('Edit avatar')} />
        </View>
        <Typography variant="h2" className="text-white text-2xl mb-1">
            Sparkle Detailing Co.
        </Typography>
        <View className="flex-row items-center mb-2">
            <MapPin size={14} color="#94a3b8" />
            <Typography variant="body-sm" className="text-gray-400 ml-1">
                Greater Seattle Area, WA
            </Typography>
        </View>
        <View className="flex-row items-center mb-6">
            <BadgeCheck size={14} color="#22c55e" />
            <Typography variant="body-sm" className="text-green-400 ml-1 font-body-medium">
                Verified Provider
            </Typography>
        </View>

        <TouchableOpacity
            className="w-full bg-primary-600 py-3.5 rounded-full flex-row items-center justify-center"
            activeOpacity={0.8}
        >
            <Pencil size={16} color="white" />
            <Typography className="text-white font-body-bold ml-2">Edit Profile</Typography>
        </TouchableOpacity>
    </View>
);
