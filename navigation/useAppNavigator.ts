import { useCallback } from 'react';
import { UserRole } from '../__generated__/graphql';
import { LocationData } from '@/utils/locationHelper';
import {
  useAppSession,
  useAppLocation,
  useAppNavigationState,
} from './hooks';

export type { LocationData };


export const useAppNavigator = () => {
  const session = useAppSession();
  const location = useAppLocation();
  const navigationState = useAppNavigationState(session.userRole);

  const handleOnboardingFinish = useCallback(
    async (role: UserRole): Promise<void> => {
      await session.handleOnboardingFinish(role);
      const dest = role === UserRole.Customer ? 'home' : 'dashboard';
      navigationState.setActiveTab(dest);
    },
    [session, navigationState],
  );

  const handleLogout = useCallback(async (): Promise<void> => {
    await session.handleLogout();
    navigationState.setActiveTab('home');
  }, [session, navigationState]);

  return {
    ...session,
    ...location,
    ...navigationState,
    handleOnboardingFinish,
    handleLogout,
  };
};
