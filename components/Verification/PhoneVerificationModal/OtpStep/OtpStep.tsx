import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { OtpInput } from '../../OtpInput';
import { OtpTimer } from '../../OtpTimer';

interface OtpStepProps {
    phoneNumber: string;
    onBack: () => void;
    onVerify: (code: string) => void;
    onResend: () => void;
    requestingSms: boolean;
    verifyingOtp: boolean;
    otpError: any;
}

export const OtpStep: React.FC<OtpStepProps> = ({
    phoneNumber,
    onBack,
    onVerify,
    onResend,
    requestingSms,
    verifyingOtp,
    otpError,
}) => (
    <>
        <TouchableOpacity onPress={onBack} className="flex-row items-center mb-6">
            <ArrowLeft size={20} color="#94a3b8" />
            <Typography variant="body" className="ml-2 text-gray-400">Back</Typography>
        </TouchableOpacity>

        <View className="w-16 h-16 bg-primary-500/10 rounded-full items-center justify-center mb-6 self-center">
            <ShieldCheck size={32} color="#3b82f6" />
        </View>

        <Typography variant="body" className="mb-8 text-center text-gray-400">
            We've sent a 6-digit verification code to {' '}
            <Typography variant="body" className="text-white font-body-bold">+91 {phoneNumber}</Typography>
        </Typography>

        <OtpInput length={6} onFullEntry={onVerify} />

        {otpError && (
            <Typography variant="body" className="text-red-500 text-center mb-4 text-xs font-body-medium">
                Invalid OTP code. Please check and try again.
            </Typography>
        )}

        <OtpTimer initialSeconds={120} />

        {verifyingOtp && (
            <Typography variant="body" className="text-primary-500 text-center mt-4 text-xs font-body-medium">
                Verifying...
            </Typography>
        )}

        <View className="mt-10 flex-row justify-center items-center">
            <Typography variant="body" className="text-gray-400 mr-2">Didn't receive a code?</Typography>
            <TouchableOpacity onPress={onResend} disabled={requestingSms}>
                <Typography variant="body" className="text-primary-500 font-body-bold">Resend</Typography>
            </TouchableOpacity>
        </View>
    </>
);
