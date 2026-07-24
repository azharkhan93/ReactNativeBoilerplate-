import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_VENDOR_PROFILES, VENDOR_PROFILE_FIELDS } from '@/components/Vendor/vendorQueries';
import { useFragment } from '@/__generated__/fragment-masking';

export const useHome = (searchQuery?: string) => {
  const { data, loading, error } = useQuery(GET_VENDOR_PROFILES, {
    fetchPolicy: 'cache-and-network',
  });

  const rawVendors = data?.getVendorProfiles ?? [];
  const vendorProfiles = useFragment(VENDOR_PROFILE_FIELDS, rawVendors);

  const { featuredServices, nearbyServices, recommendedServices } = useMemo(() => {
    if (!vendorProfiles || vendorProfiles.length === 0) {
      return {
        featuredServices: [],
        nearbyServices: [],
        recommendedServices: [],
      };
    }

    const liveNearby = vendorProfiles.map((v, idx) => ({
      id: v.id,
      name: v.businessName || 'Car Detailing Provider',
      price: 30 + idx * 10,
      rating: 4.8,
      isFavorite: idx % 2 === 0,
      category: v.categories?.[0]?.name ?? 'Car Wash',
      imageUrl: v.imageUri || 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f',
    }));

    const liveFeatured = vendorProfiles.map((v, idx) => ({
      id: v.id,
      name: v.businessName || 'Special Wash Package',
      price: 25 + idx * 5,
      originalPrice: (25 + idx * 5) * 1.25,
      discount: 20,
      rating: 4.9,
      category: v.categories?.[0]?.name ?? 'Exterior',
      imageUrl: v.imageUri || 'https://images.unsplash.com/photo-1605610816744-13c4752fea01',
    }));

    const liveRecommended = vendorProfiles.slice(0, 3).map((v, idx) => ({
      id: v.id,
      name: v.businessName || 'Premium Detailing',
      price: 45 + idx * 15,
      rating: 4.9,
      isFavorite: true,
      category: v.categories?.[0]?.name ?? 'Full Service',
      imageUrl: v.imageUri || 'https://images.unsplash.com/photo-1552930294-6b595f4c2974',
    }));

    return {
      featuredServices: liveFeatured,
      nearbyServices: liveNearby,
      recommendedServices: liveRecommended,
    };
  }, [vendorProfiles]);

  const filteredBySearch = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return { featuredServices, nearbyServices, recommendedServices };
    }
    const q = searchQuery.toLowerCase();
    const filterFn = (items: any[]) =>
      items.filter(
        item =>
          item.name.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q),
      );

    return {
      featuredServices: filterFn(featuredServices),
      nearbyServices: filterFn(nearbyServices),
      recommendedServices: filterFn(recommendedServices),
    };
  }, [searchQuery, featuredServices, nearbyServices, recommendedServices]);

  return {
    ...filteredBySearch,
    loading,
    error,
  };
};
