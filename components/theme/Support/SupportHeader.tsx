import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronLeft, Info, Phone } from 'lucide-react-native';
import { Typography } from '../Typography';

export interface SupportHeaderProps {
    onBack?: () => void;
    agentName?: string;
    isOnline?: boolean;
}

export const SupportHeader: React.FC<SupportHeaderProps> = ({
    onBack,
    agentName = "Support Agent",
    isOnline = true
}) => {
    return (
        <View className="flex-row items-center justify-between px-4 pb-4 border-b border-gray-100">
            <View className="flex-row items-center">
                <TouchableOpacity onPress={onBack} className="p-1">
                    <ChevronLeft size={24} color="#111827" />
                </TouchableOpacity>
                <View className="ml-2">
                    <Typography variant="body" className="font-bold">
                        {agentName}
                    </Typography>
                    <View className="flex-row items-center">
                        <View className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <Typography variant="body-sm" className="ml-1 text-gray-400">
                            {isOnline ? 'Online' : 'Offline'}
                        </Typography>
                    </View>
                </View>
            </View>

            <View className="flex-row space-x-4">
                <TouchableOpacity className="p-2 bg-gray-50 rounded-full">
                    <Phone size={20} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 bg-gray-50 rounded-full">
                    <Info size={20} color="#6B7280" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
