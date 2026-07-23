import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { usePhoneVerification } from './hooks/usePhoneVerification';
import { useOtpVerification } from './hooks/useOtpVerification';
import { isValidIndianPhoneNumber } from '@/utils/validationHelper';
import { PhoneStep } from './PhoneStep';
import { OtpStep } from './OtpStep';

import { UserRole } from '../../../__generated__/graphql';

type PhoneVerificationModalProps = {
    visible: boolean;
    role?: UserRole | null;
    onClose: () => void;
    onSuccess?: (status: string, token?: string, userId?: string, phone?: string) => void;
}

export const PhoneVerificationModal: React.FC<PhoneVerificationModalProps> = ({ visible, role, onClose, onSuccess }) => {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const { phoneNumber, setPhoneNumber, loading: requestingSms, handleRequestOtp, error: phoneError } = usePhoneVerification({
        onSuccess: (sid) => {
            console.log('OTP Sent. SID:', sid);
            setStep('otp');
        }
    });

    const { loading: verifyingOtp, error: otpError, handleVerify } = useOtpVerification({
        phone: `+91${phoneNumber}`,
        role,
        onSuccess: (token, userId) => {
            onSuccess?.('verified', token, userId, `+91${phoneNumber}`);
            onClose();
        }
    });

    const isValid = isValidIndianPhoneNumber(phoneNumber);
    const isInputLengthValid = phoneNumber.length === 10;

    return (
        <BottomSheetModal visible={visible} title="Secure Your Account" onClose={onClose} height={480} scrollable={false}>
            <View className="p-6">
                {step === 'phone' ? (
                    <PhoneStep 
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        handleRequestOtp={handleRequestOtp}
                        requestingSms={requestingSms}
                        phoneError={phoneError}
                        isValid={isValid}
                        isInputLengthValid={isInputLengthValid}
                    />
                ) : (
                    <OtpStep 
                        phoneNumber={phoneNumber}
                        onBack={() => setStep('phone')}
                        onVerify={handleVerify}
                        onResend={handleRequestOtp}
                        requestingSms={requestingSms}
                        verifyingOtp={verifyingOtp}
                        otpError={otpError}
                    />
                )}
            </View>
        </BottomSheetModal>
    );
};
