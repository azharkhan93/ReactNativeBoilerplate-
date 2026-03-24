import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';
import { formatSecondsToMinutes } from '@/utils/timeHelper';

interface OtpTimerProps {
    onExpire?: () => void;
    initialSeconds?: number;
}

export const OtpTimer: React.FC<OtpTimerProps> = ({ 
    onExpire, 
    initialSeconds = 120 
}) => {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

    useEffect(() => {
        if (secondsLeft <= 0) {
            onExpire?.();
            return;
        }

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft, onExpire]);

    return (
        <View className="items-center mt-4">
            <Typography variant="body" className="text-gray-400 text-xs font-body-medium">
                Your OTP expires in{' '}
                <Typography variant="body" className="text-primary-500 font-body-bold">
                    {formatSecondsToMinutes(secondsLeft)}
                </Typography>
            </Typography>
        </View>
    );
};
