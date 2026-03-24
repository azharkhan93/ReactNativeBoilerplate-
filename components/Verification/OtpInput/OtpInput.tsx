import React, { useRef, useState } from 'react';
import { View, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

interface OtpInputProps {
    onFullEntry: (code: string) => void;
    length?: number;
}

export const OtpInput: React.FC<OtpInputProps> = ({ 
    onFullEntry, 
    length = 6 
}) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleChangeText = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text.slice(-1); 
        setOtp(newOtp);

        // Move to next input if text is entered
        if (text && index < length - 1) {
            inputs.current[index + 1]?.focus();
        }

        // Check if all fields are filled
        const combinedCode = newOtp.join('');
        if (combinedCode.length === length) {
            onFullEntry(combinedCode);
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        // Move to previous input on backspace if current field is empty
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View className="flex-row justify-between w-full px-2 mb-6 gap-2">
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => { inputs.current[index] = ref; }}
                    className="w-12 h-14 bg-gray-800/50 border border-gray-700 rounded-xl text-center text-white text-xl font-body-semibold"
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    selectionColor="#3b82f6"
                    placeholderTextColor="#4b5563"
                />
            ))}
        </View>
    );
};
