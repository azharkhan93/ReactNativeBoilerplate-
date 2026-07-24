import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_VENDOR_PROFILES, VENDOR_PROFILE_FIELDS } from '@/components/Vendor/vendorQueries';
import { useFragment } from '@/__generated__/fragment-masking';
import { Provider } from '@/data/mockProviders';

export const useNearbyVendors = (searchQuery: string) => {
  const { data, loading, refetch } = useQuery(GET_VENDOR_PROFILES, {
    fetchPolicy: 'cache-and-network',
  });

  const rawVendors = data?.getVendorProfiles ?? [];
  const vendorProfiles = useFragment(VENDOR_PROFILE_FIELDS, rawVendors);

  const providers: Provider[] = useMemo(() => {
    if (!vendorProfiles || vendorProfiles.length === 0) {
      return [];
    }

    return vendorProfiles.map((v, index): Provider => {
      const categoryNames = v.categories?.map(c => c.name) ?? ['Car Washing', 'Detailing'];
      return {
        id: v.id,
        name: v.businessName || 'Car Detailing Provider',
        rating: 4.8,
        distanceKm: 1.2 + (index % 3) * 0.8,
        imageUrl: v.imageUri || 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f',
        latitude: 28.6139 + (index * 0.005),
        longitude: 77.209 + (index * 0.005),
        services: categoryNames,
      };
    });
  }, [vendorProfiles]);

  const filteredProviders = useMemo(() => {
    return providers.filter(
      p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.services?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [providers, searchQuery]);

  return {
    providers: filteredProviders,
    loading,
    refetch,
  };
};
