import { useMutation } from '@apollo/client/react';
import { gql } from '../../../../__generated__';
import { useState } from 'react';

/**
 * Mutation to request an OTP for a given phone number.
 */
export const REQUEST_OTP = gql(`
  mutation RequestOtp($phone: String!) {
    requestOtp(phoneNumber: $phone) {
      success
      message
      sid
    }
  }
`);

interface UsePhoneVerificationProps {
    onSuccess?: (sid: string) => void;
}

export const usePhoneVerification = ({ onSuccess }: UsePhoneVerificationProps = {}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [requestOtp, { loading, error }] = useMutation(REQUEST_OTP);

    /**
     * Handles the OTP request by prepending the +91 prefix.
     */
    const handleRequestOtp = async () => {
        const fullPhone = `+91${phoneNumber.replace(/\D/g, '')}`;
        
        try {
            const { data } = await requestOtp({
                variables: {
                    phone: fullPhone,
                },
            });

            if (data?.requestOtp?.success) {
                onSuccess?.(data.requestOtp.sid || '');
            }
        } catch (err) {
            // Error is handled by Apollo's error state
        }
    };

    return {
        phoneNumber,
        setPhoneNumber,
        loading,
        error,
        handleRequestOtp,
    };
};
