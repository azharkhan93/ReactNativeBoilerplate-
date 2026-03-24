import React from 'react';
import { View } from 'react-native';
import { Phone } from 'lucide-react-native';
import { Typography, Button, FormInput } from '@/components/theme';

interface PhoneStepProps {
    phoneNumber: string;
    setPhoneNumber: (text: string) => void;
    handleRequestOtp: () => void;
    requestingSms: boolean;
    phoneError: any;
    isValid: boolean;
    isInputLengthValid: boolean;
}

export const PhoneStep: React.FC<PhoneStepProps> = ({
    phoneNumber,
    setPhoneNumber,
    handleRequestOtp,
    requestingSms,
    phoneError,
    isValid,
    isInputLengthValid,
}) => (
    <>
        <View className="w-16 h-16 bg-primary-500/10 rounded-full items-center justify-center mb-6 self-center">
            <Phone size={32} color="#3b82f6" />
        </View>

        <Typography variant="body" className="mb-6 text-center text-gray-400">
            Enter your mobile number to receive a verification code.
        </Typography>

        <FormInput
            label="Mobile Number"
            placeholder="XXXXXXXXXX"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={v => setPhoneNumber(v.replace(/\D/g, '').slice(0, 10))}
            maxLength={10}
            icon={
                <View className="flex-row items-center border-r border-gray-700 pr-3 mr-1">
                    <Typography variant="body" className="text-white font-body-bold">+91</Typography>
                </View>
            }
            containerClassName="mb-10"
        />

        {phoneError && (
            <Typography variant="body" className="text-red-500 text-center mb-4 text-xs font-body-medium">
                Failed to send verification code. Please try again.
            </Typography>
        )}

        <Button
            onPress={handleRequestOtp}
            variant={isValid ? 'primary' : 'disabled'}
            loading={requestingSms}
            className="w-full shadow-lg shadow-primary-500/30"
        >
            Get Verification Code
        </Button>

        {!isValid && isInputLengthValid && (
            <Typography variant="body" className="text-amber-500 text-center mt-3 text-xs font-body-medium">
                Please enter a valid Indian number starting with 6-9
            </Typography>
        )}
    </>
);
