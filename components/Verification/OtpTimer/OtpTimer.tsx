import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';
import { formatSecondsToMinutes } from '@/utils/timeHelper';

export const OtpTimer: React.FC<{ onExpire?: () => void; initialSeconds?: number }> = ({ onExpire, initialSeconds = 120 }) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds <= 0) return onExpire?.();
        const t = setInterval(() => setSeconds(s => s - 1), 1000);
        return () => clearInterval(t);
    }, [seconds, onExpire]);

    return (
        <View className="items-center mt-4">
            <Typography variant="body" className="text-gray-400 text-xs font-body-medium">
                Your OTP expires in{' '}
                <Typography variant="body" className="text-primary-500 font-body-bold">
                    {formatSecondsToMinutes(seconds)}
                </Typography>
            </Typography>
        </View>
    );
};
