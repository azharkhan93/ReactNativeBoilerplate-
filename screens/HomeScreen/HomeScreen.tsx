import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Category,
  HeroSection,
  FlashSale,
  BestSellers,
  NewArrivals,
  Typography,
  RecentlyAdded,
  ScreenScrollView,
} from '@/components';
import { SERVICE_CATEGORIES } from '@/utils/constants';
import { UserRole } from '../../__generated__/graphql';
import { useHome } from './hooks/useHome';
import { filterAndSortServices, FilterValues } from './helpers/homeHelpers';

export interface HomeScreenProps {
  userRole?: UserRole | null;
  onNavigate?: (route: string, params?: any) => void;
  activeFilters?: FilterValues | null;
  onSelectCategory?: (categoryId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  activeFilters,
  onSelectCategory,
}) => {
  const { featuredServices, nearbyServices, recommendedServices } = useHome();

  const handleViewAllProviders = () => onNavigate?.('nearbyProviders');
  const handleVendorPress = (vendorId: string) =>
    onNavigate?.('vendorDetails', { vendorId });

  const filteredFeatured = useMemo(
    () => filterAndSortServices(featuredServices, activeFilters),
    [featuredServices, activeFilters],
  );
  const filteredNearby = useMemo(
    () => filterAndSortServices(nearbyServices, activeFilters),
    [nearbyServices, activeFilters],
  );
  const filteredRecommended = useMemo(
    () => filterAndSortServices(recommendedServices, activeFilters),
    [recommendedServices, activeFilters],
  );

  return (
    <View className="flex-1 bg-[#F1F6FD]">
      <ScreenScrollView className="flex-1">
        <HeroSection />

        <View className="px-5 pt-6">
          <Typography variant="body-lg" className="mb-4 font-bold text-slate-900">
            Service Categories
          </Typography>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            // eslint-disable-next-line react-native/no-inline-styles
            contentContainerStyle={{ gap: 16, paddingRight: 20 }}
          >
            {SERVICE_CATEGORIES.map(category => {
              const isSelected = activeFilters?.categoryId === category.id;
              return (
                <Category
                  key={category.id}
                  name={category.name}
                  icon={category.icon}
                  variant={isSelected ? 'primary' : 'default'}
                  onPress={() => onSelectCategory?.(category.id)}
                />
              );
            })}
          </ScrollView>
        </View>

        <View className="mt-4">
          <RecentlyAdded
            title="Latest Added Providers"
            onVendorPress={handleVendorPress}
            activeCategoryId={activeFilters?.categoryId}
          />
        </View>

        <View className="mt-4">
          <NewArrivals
            title="Recommended for You"
            products={filteredRecommended}
            onProductPress={handleVendorPress}
            onViewAllPress={handleViewAllProviders}
          />
        </View>

        <View className="mt-8">
          <FlashSale
            title="Special Offers"
            products={filteredFeatured}
            onProductPress={handleVendorPress}
            onViewAllPress={handleViewAllProviders}
          />
        </View>

        <View className="mt-4">
          <BestSellers
            title="Nearby Car Washers"
            products={filteredNearby}
            onProductPress={handleVendorPress}
            onViewAllPress={handleViewAllProviders}
          />
        </View>
      </ScreenScrollView>
    </View>
  );
};
