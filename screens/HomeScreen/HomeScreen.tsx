import React, { useMemo, useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Category,
  HeroSection,
  ProductSection,
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
  searchQuery?: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  activeFilters,
  onSelectCategory,
  searchQuery,
}) => {
  const { featuredServices, nearbyServices, recommendedServices } =
    useHome(searchQuery);

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
            {SERVICE_CATEGORIES.map(category => (
              <Category
                key={category.id}
                name={category.name}
                icon={category.icon}
                variant={activeFilters?.categoryId === category.id ? 'primary' : 'default'}
                onPress={() => onSelectCategory?.(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View className={homeStyles.recentlyAddedSection}>
          <RecentlyAdded
            title="Latest Added Providers"
            onVendorPress={handleVendorPress}
            activeCategoryId={activeFilters?.categoryId}
          />
        </View>

        <ProductSection
          title="Recommended for You"
          subtitle="Top rated packages for your car"
          data={filteredRecommended}
          onProductPress={handleVendorPress}
          onViewAllPress={handleViewAllProviders}
        />

        <ProductSection
          title="Special Offers"
          subtitle="Discounted car detailing deals"
          data={filteredFeatured}
          onProductPress={handleVendorPress}
          onViewAllPress={handleViewAllProviders}
        />

        <ProductSection
          title="Nearby Car Washers"
          subtitle="Washers available near your location"
          data={filteredNearby}
          onProductPress={handleVendorPress}
          onViewAllPress={handleViewAllProviders}
        />
      </ScreenScrollView>
    </View>
  );
};
