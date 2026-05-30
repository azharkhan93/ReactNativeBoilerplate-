import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';

import { OtpInputProps } from './types';
import { otpInputStyles } from './styles';

export const OtpInput: React.FC<OtpInputProps> = ({ onFullEntry, length = 6 }) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleUpdate = (val: string, i: number) => {
        const next = [...otp];
        next[i] = val.slice(-1);
        setOtp(next);
        if (val && i < length - 1) inputs.current[i + 1]?.focus();
        if (next.join('').length === length) onFullEntry(next.join(''));
    };

    return (
        <View className={otpInputStyles.container}>
            {otp.map((digit, i) => (
                <TextInput
                    key={i}
                    ref={ref => { inputs.current[i] = ref; }}
                    className={otpInputStyles.input}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={v => handleUpdate(v, i)}
                    onKeyPress={({ nativeEvent: { key } }) => key === 'Backspace' && !otp[i] && i > 0 && inputs.current[i - 1]?.focus()}
                    selectionColor="#3b82f6"
                    placeholderTextColor="#94a3b8"
                />
            ))}
        </View>
    );
};
