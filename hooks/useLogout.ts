import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useCallback } from 'react';
import { clearAuthData } from '@/utils/store/authStore';
import { apolloClient } from '@/utils/apolloClient';

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logout
  }
`;

export interface UseLogoutResult {
  logout: () => Promise<boolean>;
  loading: boolean;
  error?: Error;
}

export const useLogout = (): UseLogoutResult => {
  const [logoutMutation, { loading, error }] = useMutation<{ logout: boolean }>(
    LOGOUT_USER,
    {
      errorPolicy: 'all',
    }
  );

  const logout = useCallback(async (): Promise<boolean> => {
    try {
      // 1. Call the backend logout mutation
      const { data } = await logoutMutation();
      
      // 2. Clear local auth store (tokens, userIds)
      await clearAuthData();

      // 3. Clear Apollo cache/store safely to avoid leaking session data
      await apolloClient.clearStore();

      return !!data?.logout;
    } catch (err) {
      console.error('Failed to log out from backend:', err);
      // Fail-safe: Always wipe local session data and clear cache
      await clearAuthData();
      await apolloClient.clearStore();
      return false;
    }
  }, [logoutMutation]);

  return {
    logout,
    loading,
    error: error as Error | undefined,
  };
};
