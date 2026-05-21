import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import type { GetCustomerAddressesQuery } from '@/__generated__/graphql';
import {
  GET_CUSTOMER_PROFILE,
  GET_CUSTOMER_ADDRESSES,
  CREATE_CUSTOMER_ADDRESS,
  UPDATE_CUSTOMER_ADDRESS,
  DELETE_CUSTOMER_ADDRESS,
} from '../../customerQueries';
import { getUserId } from '@/utils/store/authStore';

export interface AddressData {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'home' | 'work' | 'office';
}

export const useCustomerAddresses = () => {
  const [userId, setUserId] = useState<string | null>(null);

  // 1. Fetch current logged-in user ID
  useEffect(() => {
    getUserId().then(id => {
      if (id) setUserId(id);
    });
  }, []);

  // 2. Fetch customer profile to retrieve customerProfileId
  const { data: profileData, loading: loadingProfile } = useQuery(GET_CUSTOMER_PROFILE, {
    variables: { userId: userId ?? '' },
    skip: !userId,
  });

  const customerProfileId = profileData?.getCustomerProfile?.id;

  // 3. Fetch customer addresses scoped to this customerProfileId
  const { data: addressData, loading: loadingAddresses } = useQuery(GET_CUSTOMER_ADDRESSES, {
    variables: { customerProfileId: customerProfileId ?? '' },
    skip: !customerProfileId,
  });

  // 4. Mutations with automatic refetching of GET_CUSTOMER_ADDRESSES query
  const refetchQueries = customerProfileId
    ? [{ query: GET_CUSTOMER_ADDRESSES, variables: { customerProfileId } }]
    : [];

  const [createAddress, { loading: creating }] = useMutation(CREATE_CUSTOMER_ADDRESS, {
    refetchQueries,
  });

  const [updateAddress, { loading: updating }] = useMutation(UPDATE_CUSTOMER_ADDRESS, {
    refetchQueries,
  });

  const [deleteAddress, { loading: deleting }] = useMutation(DELETE_CUSTOMER_ADDRESS, {
    refetchQueries,
  });

  // 5. Handlers
  const handleAddAddress = useCallback(
    async (data: Omit<AddressData, 'id'>) => {
      if (!customerProfileId) return;
      try {
        await createAddress({
          variables: {
            customerProfileId,
            input: {
              label: data.label,
              street: data.street,
              city: data.city,
              state: data.state,
              zipCode: data.zipCode,
              type: data.type,
            },
          },
        });
      } catch (err) {
        console.error('Error adding customer address:', err);
      }
    },
    [customerProfileId, createAddress]
  );

  const handleUpdateAddress = useCallback(
    async (id: string, data: Omit<AddressData, 'id'>) => {
      try {
        await updateAddress({
          variables: {
            id,
            input: {
              label: data.label,
              street: data.street,
              city: data.city,
              state: data.state,
              zipCode: data.zipCode,
              type: data.type,
            },
          },
        });
      } catch (err) {
        console.error('Error updating customer address:', err);
      }
    },
    [updateAddress]
  );

  const handleRemoveAddress = useCallback(
    async (id: string) => {
      try {
        await deleteAddress({
          variables: {
            id,
          },
        });
      } catch (err) {
        console.error('Error removing customer address:', err);
      }
    },
    [deleteAddress]
  );

  // 6. Map GraphQL response to UI AddressData format
  const addresses: AddressData[] = (addressData?.getCustomerAddresses ?? []).map(
    (addr: GetCustomerAddressesQuery['getCustomerAddresses'][number]) => ({
      id: addr.id,
      label: addr.label,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zipCode: addr.zipCode,
      type: (addr.type as 'home' | 'work' | 'office') || 'home',
    })
  );

  const loading = loadingProfile || loadingAddresses || creating || updating || deleting;

  return {
    addresses,
    loading,
    handleAddAddress,
    handleUpdateAddress,
    handleRemoveAddress,
  };
};
