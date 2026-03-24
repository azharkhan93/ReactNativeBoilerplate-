import { useMutation } from '@apollo/client/react';
import { gql } from '../../../../__generated__';
import { useState } from 'react';


export const VERIFY_OTP = gql(`
  mutation VerifyOtp($phone: String!, $code: String!) {
    verifyOtp(phoneNumber: $phone, code: $code) {
      success
      message
    }
  }
`);

interface UseOtpVerificationProps {
    onSuccess?: () => void;
    phone: string;
}

export const useOtpVerification = ({ onSuccess, phone }: UseOtpVerificationProps) => {
    const [verifyOtp, { loading, error }] = useMutation(VERIFY_OTP);

    /**
     * Handles the OTP verification by sending the phone and code.
     */
    const handleVerify = async (code: string) => {
        if (code.length !== 6) return;

        try {
            const { data } = await verifyOtp({
                variables: {
                    phone,
                    code,
                },
            });

            if (data?.verifyOtp?.success) {
                onSuccess?.();
            }
        } catch (err) {
            // Error is handled by Apollo's error state
        }
    };

    return {
        loading,
        error,
        handleVerify,
    };
};
