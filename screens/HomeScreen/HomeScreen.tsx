import React, { useMemo, useCallback } from 'react';
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
import { NavigationCallback } from '@/navigation/navigation.types';

import { homeStyles } from './styles';

export interface HomeScreenProps {
  userRole?: UserRole | null;
  onNavigate?: NavigationCallback;
  activeFilters?: FilterValues | null;
  onSelectCategory?: (categoryId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  activeFilters,
  onSelectCategory,
}) => {
  const { featuredServices, nearbyServices, recommendedServices } = useHome();

  const handleViewAllProviders = useCallback(() => {
    onNavigate?.('nearbyProviders');
  }, [onNavigate]);

  const handleVendorPress = useCallback(
    (vendorId: string) => {
      onNavigate?.('vendorDetails', { vendorId });
    },
    [onNavigate],
  );

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
    <View className={homeStyles.container}>
      <ScreenScrollView className={homeStyles.scrollContainer}>
        <HeroSection />

        <View className={homeStyles.categorySection}>
          <Typography variant="body-lg" className={homeStyles.categoryHeader}>
            Service Categories
          </Typography>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={homeStyles.categoryListContent}
          >
            {SERVICE_CATEGORIES.map(category => {
              const isSelected = activeFilters?.categoryId === category.id;
              const handleCategoryPress = () => onSelectCategory?.(category.id);
              return (
                <Category
                  key={category.id}
                  name={category.name}
                  icon={category.icon}
                  variant={isSelected ? 'primary' : 'default'}
                  onPress={handleCategoryPress}
                />
              );
            })}
          </ScrollView>
        </View>

        <View className={homeStyles.recentlyAddedSection}>
          <RecentlyAdded
            title="Latest Added Providers"
            onVendorPress={handleVendorPress}
            activeCategoryId={activeFilters?.categoryId}
          />
        </View>

        <View className={homeStyles.newArrivalsSection}>
          <NewArrivals
            title="Recommended for You"
            products={filteredRecommended}
            onProductPress={handleVendorPress}
            onViewAllPress={handleViewAllProviders}
          />
        </View>

        <View className={homeStyles.flashSaleSection}>
          <FlashSale
            title="Special Offers"
            products={filteredFeatured}
            onProductPress={handleVendorPress}
            onViewAllPress={handleViewAllProviders}
          />
        </View>

        <View className={homeStyles.bestSellersSection}>
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
