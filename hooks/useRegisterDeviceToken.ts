import { useCallback } from 'react';
import { Platform } from 'react-native';
import { useMutation } from '@apollo/client/react';
import { gql } from '@/__generated__';
import { getFCMToken } from '@/utils/notificationService';

const REGISTER_DEVICE_TOKEN = gql(`
  mutation RegisterDeviceToken($input: RegisterDeviceTokenInput!) {
    registerDeviceToken(input: $input) {
      id
      fcmToken
    }
  }
`);

export interface UseRegisterDeviceTokenResult {
  registerToken: (userId: string | null) => Promise<void>;
  loading: boolean;
  error?: Error;
}

export const useRegisterDeviceToken = (): UseRegisterDeviceTokenResult => {
  const [registerDeviceToken, { loading, error }] = useMutation(
    REGISTER_DEVICE_TOKEN,
  );

  const registerToken = useCallback(
    async (userId: string | null): Promise<void> => {
      if (!userId) return;
      try {
        const token = await getFCMToken();
        if (token) {
          await registerDeviceToken({
            variables: {
              input: {
                fcmToken: token,
                deviceType: Platform.OS,
              },
            },
          });
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // Silently skip token registration when unauthenticated or session is pending
      }
    },
    [registerDeviceToken],
  );

  return {
    registerToken,
    loading,
    error: error as Error | undefined,
  };
};
