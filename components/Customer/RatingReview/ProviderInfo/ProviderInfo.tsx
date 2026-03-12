import React from 'react';
import { View, Image } from 'react-native';
import { Typography } from '../../../theme';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ProviderInfoProps {
    providerName: string;
}

export const ProviderInfo: React.FC<ProviderInfoProps> = ({ providerName }) => (
    <Animated.View entering={FadeInDown.delay(100)} className="items-center mb-8">
        <View className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden mb-4 border-4 border-slate-50">
            <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1594976612316-9b9070239c44?q=80&w=200&auto=format&fit=crop' }} 
                className="w-full h-full"
            />
        </View>
        <Typography variant="h3" className="text-slate-900 mb-1">{providerName}</Typography>
        <Typography variant="body-sm" className="text-slate-400">Service completed Oct 12, 2:30 PM</Typography>
    </Animated.View>
);
