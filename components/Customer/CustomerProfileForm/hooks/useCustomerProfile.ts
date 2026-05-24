import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_CUSTOMER_PROFILE,
  UPSERT_CUSTOMER_PROFILE,
  DELETE_CUSTOMER_PROFILE,
  GET_USER_AVATAR,
} from '../../customerQueries';
import { getUserId } from '@/utils/store/authStore';

export interface CustomerProfileData {
  name: string;
  phone: string;
  email: string;
  location: string;
}

const DEFAULT_PROFILE: CustomerProfileData = {
  name: '',
  phone: '',
  email: '',
  location: '',
};

export const useCustomerProfile = (onSaveCallback?: () => void) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<CustomerProfileData>(DEFAULT_PROFILE);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerProfileData, string>>>({});

  // 1. Get current user ID
  useEffect(() => {
    getUserId().then(id => {
      if (id) setUserId(id);
    });
  }, []);

  // 2. Query customer profile
  const { data, loading: loadingQuery } = useQuery(GET_CUSTOMER_PROFILE, {
    variables: { userId: userId ?? '' },
    skip: !userId,
  });

  // 3. Populate state when query data is loaded
  useEffect(() => {
    if (data?.getCustomerProfile) {
      const cp = data.getCustomerProfile;
      setProfile({
        name: cp.name || '',
        phone: cp.phone || '',
        email: cp.email || '',
        location: cp.location || '',
      });
    }
  }, [data]);

  // 4. Mutation to upsert profile
  const [upsertProfile, { loading: saving }] = useMutation(UPSERT_CUSTOMER_PROFILE, {
    refetchQueries: userId ? [
      { query: GET_CUSTOMER_PROFILE, variables: { userId } },
      { query: GET_USER_AVATAR, variables: { id: userId } }
    ] : [],
  });

  // 5. Mutation to delete profile
  const [deleteCustomerProfile, { loading: deleting }] = useMutation(DELETE_CUSTOMER_PROFILE, {
    refetchQueries: userId ? [
      { query: GET_CUSTOMER_PROFILE, variables: { userId } },
      { query: GET_USER_AVATAR, variables: { id: userId } }
    ] : [],
  });

  const handleChange = useCallback((field: keyof CustomerProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);

  const handleSave = useCallback(async () => {
    const newErrors: Partial<Record<keyof CustomerProfileData, string>> = {};
    if (!profile.name.trim()) newErrors.name = 'Name is required';
    if (!profile.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await upsertProfile({
        variables: {
          input: {
            name: profile.name,
            phone: profile.phone,
            email: profile.email,
            location: profile.location,
          },
        },
      });
      onSaveCallback?.();
    } catch (err) {
      console.error('Error saving customer profile:', err);
    }
  }, [profile, upsertProfile, onSaveCallback]);

  const handleDelete = useCallback(async () => {
    const profileId = data?.getCustomerProfile?.id;
    if (!profileId) return;
    try {
      await deleteCustomerProfile({
        variables: { id: profileId },
      });
      setProfile(DEFAULT_PROFILE);
      onSaveCallback?.();
    } catch (err) {
      console.error('Error deleting customer profile:', err);
    }
  }, [data?.getCustomerProfile?.id, deleteCustomerProfile, onSaveCallback]);

  const hasProfile = !!data?.getCustomerProfile;

  return {
    profile,
    loading: loadingQuery || saving || deleting,
    hasProfile,
    errors,
    handleChange,
    handleSave,
    handleDelete,
  };
};
