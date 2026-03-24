import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';

export const OtpInput: React.FC<{ onFullEntry: (code: string) => void; length?: number }> = ({ onFullEntry, length = 6 }) => {
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
        <View className="flex-row justify-between w-full px-2 mb-6 gap-2">
            {otp.map((digit, i) => (
                <TextInput
                    key={i}
                    ref={ref => { inputs.current[i] = ref; }}
                    className="w-12 h-14 bg-gray-800/50 border border-gray-700 rounded-xl text-center text-white text-xl font-body-semibold"
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={v => handleUpdate(v, i)}
                    onKeyPress={({ nativeEvent: { key } }) => key === 'Backspace' && !otp[i] && i > 0 && inputs.current[i - 1]?.focus()}
                    selectionColor="#3b82f6"
                    placeholderTextColor="#4b5563"
                />
            ))}
        </View>
    );
};
