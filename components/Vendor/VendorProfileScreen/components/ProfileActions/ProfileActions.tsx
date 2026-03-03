import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LogOut, ChevronRight } from 'lucide-react-native';
import { Typography } from '@/components/theme';

export const ProfileActions: React.FC = () => (
    <View className="px-5 mb-4">
        <View className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
            <TouchableOpacity
                onPress={() => console.log('Log out')}
                className="flex-row items-center px-5 py-4"
                activeOpacity={0.7}
            >
                <View className="w-10 h-10 rounded-xl items-center justify-center mr-4 bg-red-500/10">
                    <LogOut size={20} color="#ef4444" />
                </View>
                <Typography className="text-red-400 font-body-semibold flex-1">Log Out</Typography>
                <ChevronRight size={18} color="#4b5563" />
            </TouchableOpacity>
        </View>
    </View>
);
