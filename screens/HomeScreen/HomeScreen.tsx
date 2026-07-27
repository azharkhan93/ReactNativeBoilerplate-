import React from 'react';
import { View } from 'react-native';
import {
  HeroSection,
  ServiceCategories,
  ProductSection,
  RecentlyAdded,
  ScreenScrollView,
} from '@/components';
import { AppSkeletonLoader } from '@/components/shared';
import { UserRole } from '../../__generated__/graphql';
import { useHome } from './hooks/useHome';
import { FilterValues } from './helpers/homeHelpers';
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
  const {
    loading,
    featuredServices,
    nearbyServices,
    recommendedServices,
    handleViewAllProviders,
    handleVendorPress,
  } = useHome({ searchQuery, activeFilters, onNavigate });

  const hasData =
    featuredServices.length > 0 ||
    nearbyServices.length > 0 ||
    recommendedServices.length > 0;

  return (
    <View className={homeStyles.container}>
      <ScreenScrollView className={homeStyles.scrollContainer}>
        <HeroSection />

        <ServiceCategories
          selectedCategoryId={activeFilters?.categoryId}
          onSelectCategory={onSelectCategory}
        />

        {loading && !hasData ? (
          <AppSkeletonLoader />
        ) : (
          <>
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
              data={recommendedServices}
              onProductPress={handleVendorPress}
              onViewAllPress={handleViewAllProviders}
            />

            <ProductSection
              title="Special Offers"
              subtitle="Discounted car detailing deals"
              data={featuredServices}
              onProductPress={handleVendorPress}
              onViewAllPress={handleViewAllProviders}
            />

            <ProductSection
              title="Nearby Car Washers"
              subtitle="Washers available near your location"
              data={nearbyServices}
              onProductPress={handleVendorPress}
              onViewAllPress={handleViewAllProviders}
            />
          </>
        )}
      </ScreenScrollView>
    </View>
  );
};
