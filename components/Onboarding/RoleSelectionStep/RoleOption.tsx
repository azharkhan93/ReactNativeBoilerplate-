import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Typography } from '../../theme/Typography';

export interface RoleOptionProps {
    title: string;
    description: string;
    icon: any;
    isSelected: boolean;
    onPress: () => void;
    delay: number;
}

export const RoleOption: React.FC<RoleOptionProps> = ({
    title,
    description,
    icon: Icon,
    isSelected,
    onPress,
    delay
}) => (
    <Animated.View entering={FadeInDown.delay(delay)}>
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className={`flex-row items-center p-6 rounded-3xl border-2 transition-all ${isSelected
                ? 'border-primary-500 bg-primary-50/50'
                : 'border-slate-100 bg-white'
                }`}
        >
            <View className={`w-14 h-14 rounded-2xl items-center justify-center mr-4  ${isSelected ? 'bg-primary-500' : 'bg-slate-50'
                }`}>
                <Icon size={28} color={isSelected ? 'white' : '#64748B'} />
            </View>
            <View className="flex-1">
                <Typography
                    variant="body-lg"
                    className={`font-heading-semibold ${isSelected ? 'text-primary-700' : 'text-slate-900'
                        }`}
                >
                    {title}
                </Typography>
                <Typography variant="body-sm" className="text-slate-500">
                    {description}
                </Typography>
            </View>
            {isSelected && <ChevronRight size={20} color="#3b82f6" />}
        </TouchableOpacity>
    </Animated.View>
);
