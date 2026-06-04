import { useQuery } from '@apollo/client/react';
import { useFragment } from '@/__generated__/fragment-masking';
import type { GetVendorProfilesQuery } from '@/__generated__/graphql';

import {
  GET_VENDOR_PROFILES,
  VENDOR_PROFILE_FIELDS,
} from '../../vendorQueries';

export const useRecentlyAdded = () => {
  const { data, loading, error, refetch } =
    useQuery<GetVendorProfilesQuery>(GET_VENDOR_PROFILES);

  const unmaskedVendors = useFragment(
    VENDOR_PROFILE_FIELDS,
    data?.getVendorProfiles,
  );

  console.log('[GraphQL] useRecentlyAdded Query Status:', {
    loading,
    hasError: !!error,
    errorMessage: error?.message,
    hasRawData: !!data?.getVendorProfiles,
    unmaskedCount: unmaskedVendors?.length || 0,
    unmaskedData: unmaskedVendors || null,
  });

  return {
    vendors: unmaskedVendors ?? [],
    loading,
    error,
    refetch,
  };
};

