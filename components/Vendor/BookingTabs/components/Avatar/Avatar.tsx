import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';

export const Avatar: React.FC<{ name: string; size?: number }> = ({ name, size = 44 }) => (
    <View
        className="bg-primary-800 rounded-full items-center justify-center"
        style={{ width: size, height: size }}>
        <Typography className="text-primary-200 font-body-bold text-base">
            {name.charAt(0)}
        </Typography>
    </View>
);
