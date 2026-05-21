import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { UserRole } from '../../../__generated__/graphql';
import { GET_VENDOR_PROFILE } from '../../../components/Vendor/vendorQueries';
import { getUserId } from '@/utils/store/authStore';

// Mock data - in a real app, this would come from a global state or API
const MOCK_USER = {
  name: 'Md Abu Ubayda',
  phone: '+88001712346789',
  location: 'Greater Seattle Area, WA',
  isVerified: true,
  avatarUrl: null,
};

export const useProfile = (userRole?: UserRole | null) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUserId().then(id => {
      if (id) setUserId(id);
    });
  }, []);

  const isVendor = userRole === UserRole.Provider;

  // Query vendor profile if they are a vendor
  const { data: vendorData, loading: loadingVendor } = useQuery(GET_VENDOR_PROFILE, {
    variables: { userId: userId ?? '' },
    skip: !userId || !isVendor,
    errorPolicy: 'all',
  });

  const vendorProfile = vendorData?.getVendorProfile;

  const userData = {
    name: isVendor 
      ? (vendorProfile?.businessName || 'Set Up Your Business') 
      : MOCK_USER.name,
    phone: isVendor 
      ? (vendorProfile?.contactNumber || MOCK_USER.phone) 
      : MOCK_USER.phone,
    location: isVendor 
      ? (vendorProfile?.address || 'Location not configured') 
      : MOCK_USER.location,
    isVerified: isVendor && !!vendorProfile,
    avatarUrl: isVendor ? vendorProfile?.imageUri : null,
  };

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
    loading: loadingVendor,
    handleLogout,
    handleEditProfile,
    handleEditAvatar,
  };
};

