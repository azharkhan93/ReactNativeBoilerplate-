import { useMutation } from '@apollo/client/react';
import { Platform } from 'react-native';
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

export const useRegisterDeviceToken = () => {
  const [registerDeviceToken, { loading, error }] = useMutation(
    REGISTER_DEVICE_TOKEN,
  );

  const registerToken = async (userId: string | null) => {
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
        console.log('[FCM] Token registered to backend successfully');
      }
    } catch (err) {
      console.error('[FCM] Failed to register token to backend:', err);
    }
  };

  return { registerToken, loading, error };
};
