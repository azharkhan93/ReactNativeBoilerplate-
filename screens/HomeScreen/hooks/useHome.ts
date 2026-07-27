import { useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_VENDOR_PROFILES, VENDOR_PROFILE_FIELDS } from '@/components/Vendor/vendorQueries';
import { useFragment } from '@/__generated__/fragment-masking';
import { filterAndSortServices, FilterValues } from '../helpers/homeHelpers';
import { NavigationCallback } from '@/navigation/navigation.types';
import { SERVICE_CATEGORIES } from '@/utils/constants';

export interface UseHomeOptions {
  searchQuery?: string;
  activeFilters?: FilterValues | null;
  onNavigate?: NavigationCallback;
}

export interface ServiceProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  isFavorite?: boolean;
  category?: string;
  imageUrl?: string;
}

export const useHome = ({ searchQuery, activeFilters, onNavigate }: UseHomeOptions = {}) => {
  const { data, loading, error } = useQuery(GET_VENDOR_PROFILES);

  const rawVendors = data?.getVendorProfiles ?? [];
  const vendorProfiles = useFragment(VENDOR_PROFILE_FIELDS, rawVendors);

  const { featuredServices, nearbyServices, recommendedServices } = useMemo(() => {
    if (!vendorProfiles || vendorProfiles.length === 0) {
      return {
        featuredServices: [] as ServiceProductItem[],
        nearbyServices: [] as ServiceProductItem[],
        recommendedServices: [] as ServiceProductItem[],
      };
    }

    const categoryNames = SERVICE_CATEGORIES.map(c => c.name);

    const liveNearby: ServiceProductItem[] = vendorProfiles.map((v, idx) => ({
      id: v.id,
      name: v.businessName || 'Car Detailing Provider',
      price: 30 + idx * 10,
      rating: 4.8,
      isFavorite: idx % 2 === 0,
      category: v.categories?.[0]?.name ?? categoryNames[idx % categoryNames.length],
      imageUrl: v.imageUri || 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f',
    }));

    const liveFeatured: ServiceProductItem[] = vendorProfiles.map((v, idx) => ({
      id: v.id,
      name: v.businessName || 'Special Wash Package',
      price: 25 + idx * 5,
      originalPrice: (25 + idx * 5) * 1.25,
      discount: 20,
      rating: 4.9,
      category: v.categories?.[0]?.name ?? categoryNames[(idx + 1) % categoryNames.length],
      imageUrl: v.imageUri || 'https://images.unsplash.com/photo-1605610816744-13c4752fea01',
    }));

    const liveRecommended: ServiceProductItem[] = vendorProfiles.slice(0, 3).map((v, idx) => ({
      id: v.id,
      name: v.businessName || 'Premium Detailing',
      price: 45 + idx * 15,
      rating: 4.9,
      isFavorite: true,
      category: v.categories?.[0]?.name ?? categoryNames[(idx + 2) % categoryNames.length],
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
    const filterFn = (items: ServiceProductItem[]) =>
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

  const filteredFeatured = useMemo(
    () => filterAndSortServices(filteredBySearch.featuredServices, activeFilters),
    [filteredBySearch.featuredServices, activeFilters],
  );

  const filteredNearby = useMemo(
    () => filterAndSortServices(filteredBySearch.nearbyServices, activeFilters),
    [filteredBySearch.nearbyServices, activeFilters],
  );

  const filteredRecommended = useMemo(
    () => filterAndSortServices(filteredBySearch.recommendedServices, activeFilters),
    [filteredBySearch.recommendedServices, activeFilters],
  );

  const handleViewAllProviders = useCallback(() => {
    onNavigate?.('nearbyProviders');
  }, [onNavigate]);

  const handleVendorPress = useCallback(
    (vendorId: string) => {
      onNavigate?.('vendorDetails', { vendorId });
    },
    [onNavigate],
  );

  return {
    featuredServices: filteredFeatured,
    nearbyServices: filteredNearby,
    recommendedServices: filteredRecommended,
    handleViewAllProviders,
    handleVendorPress,
    loading,
    error,
  };
};
