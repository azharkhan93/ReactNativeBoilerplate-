/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from '@apollo/client/react';
import { gql } from '../../../../__generated__';

import { UserRole } from '../../../../__generated__/graphql';

export const VERIFY_OTP = gql(`
  mutation VerifyOtp($phone: String!, $code: String!) {
    verifyOtp(phoneNumber: $phone, code: $code) {
      success
      message
    }
  }
`);

export const LOGIN_BY_PHONE = gql(`
  mutation LoginByPhone($phone: String!, $code: String!, $role: UserRole!) {
    loginByPhone(phoneNumber: $phone, code: $code, role: $role) {
      token
      user {
        id
        phoneNumber
        role {
          id
          name
        }
      }
    }
  }
`);

interface UseOtpVerificationProps {
    onSuccess?: (token?: string, userId?: string) => void;
    phone: string;
    role?: UserRole | null;
}

export const useOtpVerification = ({ onSuccess, phone, role }: UseOtpVerificationProps) => {
    const [verifyOtp, { loading: loadingVerify, error: errorVerify }] = useMutation(VERIFY_OTP);
    const [loginByPhone, { loading: loadingLogin, error: errorLogin }] = useMutation(LOGIN_BY_PHONE);

    /**
     * Handles the OTP verification or phone login.
     */
    const handleVerify = async (code: string) => {
        if (code.length !== 6) return;

        try {
            if (role) {
                const { data } = await loginByPhone({
                    variables: {
                        phone,
                        code,
                        role,
                    },
                });

                if (data?.loginByPhone?.token) {
                    onSuccess?.(data.loginByPhone.token, data.loginByPhone.user.id);
                }
            } else {
                const { data } = await verifyOtp({
                    variables: {
                        phone,
                        code,
                    },
                });

                if (data?.verifyOtp?.success) {
                    onSuccess?.();
                }
            }
        } catch (err) {
            // Error is handled by Apollo's error state
        }
    };

    return {
        loading: loadingVerify || loadingLogin,
        error: errorVerify || errorLogin,
        handleVerify,
    };
};

