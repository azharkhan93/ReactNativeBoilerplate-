import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { UserRole } from '../../../__generated__/graphql';
import { GET_VENDOR_PROFILE, UPDATE_VENDOR_PROFILE, VENDOR_PROFILE_FIELDS } from '../../../components/Vendor/vendorQueries';
import { getUserId } from '@/utils/store/authStore';
import { useFragment } from '@/__generated__/fragment-masking';

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

  const [updateVendorProfile, { loading: updating }] = useMutation(UPDATE_VENDOR_PROFILE);

  const vendorProfile = useFragment(VENDOR_PROFILE_FIELDS, vendorData?.getVendorProfile);

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

  const handleSaveAvatar = useCallback(async (imageUrl: string | null) => {
    if (!vendorProfile?.id) return;
    try {
      await updateVendorProfile({
        variables: {
          id: vendorProfile.id,
          input: {
            imageUri: imageUrl,
          },
        },
        refetchQueries: [{ query: GET_VENDOR_PROFILE, variables: { userId: userId ?? '' } }],
      });
    } catch (err) {
      console.error('Error updating vendor avatar:', err);
    }
  }, [vendorProfile?.id, userId, updateVendorProfile]);

  const handleLogout = useCallback(() => {
    console.log('Logging out...');
  }, []);

  const handleEditProfile = useCallback(() => {
    console.log('Navigating to edit profile...');
  }, []);

  return {
    userData,
    isVendor,
    loading: loadingVendor || updating,
    handleLogout,
    handleEditProfile,
    handleSaveAvatar,
  };
};


