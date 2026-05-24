import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { UserRole } from '../../../__generated__/graphql';
import {
  GET_VENDOR_PROFILE,
  UPDATE_VENDOR_PROFILE,
  VENDOR_PROFILE_FIELDS,
} from '../../../components/Vendor/vendorQueries';
import {
  GET_CUSTOMER_PROFILE,
  DELETE_CUSTOMER_PROFILE,
  UPDATE_USER_AVATAR,
  GET_USER_AVATAR,
} from '../../../components/Customer/customerQueries';
import { getUserId } from '@/utils/store/authStore';
import { useFragment } from '@/__generated__/fragment-masking';

export const useProfile = (userRole?: UserRole | null) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUserId().then(id => {
      if (id) setUserId(id);
    });
  }, []);

  const isVendor = userRole === UserRole.Provider;

  // 1. Query vendor profile if Provider
  const { data: vendorData, loading: loadingVendor } = useQuery(
    GET_VENDOR_PROFILE,
    {
      variables: { userId: userId ?? '' },
      skip: !userId || !isVendor,
      errorPolicy: 'all',
    },
  );

  const [updateVendorProfile, { loading: updating }] = useMutation(
    UPDATE_VENDOR_PROFILE,
  );
  const vendorProfile = useFragment(
    VENDOR_PROFILE_FIELDS,
    vendorData?.getVendorProfile,
  );

  // 2. Query customer profile if Customer
  const { data: customerData, loading: loadingCustomer } = useQuery(
    GET_CUSTOMER_PROFILE,
    {
      variables: { userId: userId ?? '' },
      skip: !userId || isVendor,
      errorPolicy: 'all',
    },
  );

  const [deleteCustomerProfile, { loading: deletingCustomer }] = useMutation(
    DELETE_CUSTOMER_PROFILE,
  );

  // 3. Query user avatar (applicable for both, mostly used by customer)
  const { data: avatarData, loading: loadingAvatar } = useQuery(
    GET_USER_AVATAR,
    {
      variables: { id: userId ?? '' },
      skip: !userId,
      errorPolicy: 'all',
    },
  );

  const [updateUserAvatar, { loading: updatingUserAvatar }] =
    useMutation(UPDATE_USER_AVATAR);

  const customerProfile = customerData?.getCustomerProfile;
  const hasCustomerProfile = !!customerProfile;

  const userData = {
    id: isVendor ? vendorProfile?.id : customerProfile?.id,
    name: isVendor
      ? vendorProfile?.businessName || 'Set Up Your Business'
      : customerProfile?.name || 'Set Up Your Profile',
    phone: isVendor
      ? vendorProfile?.contactNumber || 'Contact Number'
      : customerProfile?.phone || 'Contact Number',
    location: isVendor
      ? vendorProfile?.address || 'Location not configured'
      : customerProfile?.location || 'Location not configured',
    isVerified: isVendor ? !!vendorProfile : hasCustomerProfile,
    avatarUrl: isVendor ? vendorProfile?.imageUri : avatarData?.user?.avatarUrl,
  };

  const handleSaveAvatar = useCallback(
    async (imageUrl: string | null) => {
      if (isVendor) {
        if (!vendorProfile?.id) return;
        try {
          await updateVendorProfile({
            variables: {
              id: vendorProfile.id,
              input: {
                imageUri: imageUrl,
              },
            },
            refetchQueries: [
              {
                query: GET_VENDOR_PROFILE,
                variables: { userId: userId ?? '' },
              },
            ],
          });
        } catch (err) {
          console.error('Error updating vendor avatar:', err);
        }
      } else {
        if (!userId) return;
        try {
          await updateUserAvatar({
            variables: {
              id: userId,
              avatarUrl: imageUrl || '',
            },
            refetchQueries: [
              { query: GET_USER_AVATAR, variables: { id: userId } },
            ],
          });
        } catch (err) {
          console.error('Error updating user avatar:', err);
        }
      }
    },
    [
      isVendor,
      vendorProfile?.id,
      userId,
      updateVendorProfile,
      updateUserAvatar,
    ],
  );

  const handleDeleteProfile = useCallback(async () => {
    if (isVendor || !customerProfile?.id) return;
    try {
      await deleteCustomerProfile({
        variables: { id: customerProfile.id },
        refetchQueries: [
          { query: GET_CUSTOMER_PROFILE, variables: { userId: userId ?? '' } },
        ],
      });
    } catch (err) {
      console.error('Error deleting customer profile:', err);
    }
  }, [isVendor, customerProfile?.id, userId, deleteCustomerProfile]);

  return {
    userData,
    isVendor,
    hasProfile: isVendor ? !!vendorProfile : hasCustomerProfile,
    loading:
      loadingVendor ||
      updating ||
      loadingCustomer ||
      loadingAvatar ||
      updatingUserAvatar ||
      deletingCustomer,
    handleSaveAvatar,
    handleDeleteProfile,
  };
};
