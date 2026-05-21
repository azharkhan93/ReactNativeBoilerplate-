import { useState, useCallback } from 'react';
import { UserRole } from '../../../__generated__/graphql';

// Mock data - in a real app, this would come from a global state or API
const MOCK_USER = {
  name: 'Md Abu Ubayda',
  phone: '+88001712346789',
  location: 'Greater Seattle Area, WA',
  isVerified: true,
  avatarUrl: null,
};

export const useProfile = (userRole?: UserRole | null) => {
  const [userData, ] = useState(MOCK_USER);
  const isVendor = userRole === UserRole.Provider;

  const handleLogout = useCallback(() => {
    console.log('Logging out...');
  }, []);

  const handleEditProfile = useCallback(() => {
    console.log('Navigating to edit profile...');
  }, []);

  const handleEditAvatar = useCallback(() => {
    console.log('Opening avatar picker...');
  }, []);

  return {
    userData,
    isVendor,
    handleLogout,
    handleEditProfile,
    handleEditAvatar,
  };
};
