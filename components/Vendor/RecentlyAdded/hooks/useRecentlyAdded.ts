import { useQuery } from '@apollo/client/react';
import { useFragment } from '@/__generated__/fragment-masking';
import type { GetVendorProfilesQuery } from '@/__generated__/graphql';

import {
  GET_VENDOR_PROFILES,
  VENDOR_PROFILE_FIELDS,
} from '../../vendorQueries';

export const MOCK_FALLBACK_VENDORS = [
  {
    id: 'v-mock-1',
    userId: 'u-mock-1',
    businessName: 'Sparkle Car Wash',
    imageUri:
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80',
    address: 'Downtown, 1.2 km away',
    serviceRadius: '5 km radius',
    categories: [
      { id: 'category-sedan', name: 'Sedan', icon: 'Car' },
      { id: 'category-suv', name: 'SUV', icon: 'Zap' },
    ],
  },
  {
    id: 'v-mock-2',
    userId: 'u-mock-2',
    businessName: 'Shine & Go Detailing',
    imageUri:
      'https://images.unsplash.com/photo-1605610816744-13c4752fea01?w=800&q=80',
    address: 'Northside, 2.0 km away',
    serviceRadius: '10 km radius',
    categories: [
      { id: 'category-luxury', name: 'Luxury', icon: 'Shield' },
      { id: 'category-hatchback', name: 'Hatchback', icon: 'Star' },
    ],
  },
  {
    id: 'v-mock-3',
    userId: 'u-mock-3',
    businessName: 'Elite Auto Spa',
    imageUri:
      'https://images.unsplash.com/photo-1552930294-6b595f4c2974?w=800&q=80',
    address: 'Eastside, 0.8 km away',
    serviceRadius: '8 km radius',
    categories: [
      { id: 'category-sedan', name: 'Sedan', icon: 'Car' },
      { id: 'category-bike', name: 'Bike', icon: 'Clock' },
    ],
  },
];

export const useRecentlyAdded = () => {
  const { data, loading, error, refetch } =
    useQuery<GetVendorProfilesQuery>(GET_VENDOR_PROFILES, {
      errorPolicy: 'all',
    });

  const unmaskedVendors = useFragment(
    VENDOR_PROFILE_FIELDS,
    data?.getVendorProfiles,
  );

  const vendors =
    unmaskedVendors && unmaskedVendors.length > 0
      ? unmaskedVendors
      : MOCK_FALLBACK_VENDORS;

  return {
    vendors,
    loading,
    error,
    refetch,
  };
};
