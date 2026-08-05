import React from 'react';
import { View } from 'react-native';
import {
  HeroSection,
  ServiceCategories,
  ProductSection,
  RecentlyAdded,
  ScreenScrollView,
} from '@/components';
import { Typography } from '@/components/theme';
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
        <HeroSection onSelectRecommendedPackage={handleViewAllProviders} />

        <ServiceCategories
          selectedCategoryId={activeFilters?.categoryId}
          onSelectCategory={onSelectCategory}
        />

        {loading && !hasData ? (
          <AppSkeletonLoader showHeader={false} />
        ) : (
          <>
            <View className={homeStyles.recentlyAddedSection}>
              <RecentlyAdded
                title="Latest Added Providers"
                onVendorPress={handleVendorPress}
                activeCategoryId={activeFilters?.categoryId}
              />
            </View>

            {recommendedServices.length > 0 && (
              <ProductSection
                title="Recommended for You"
                subtitle="Top rated packages for your car"
                data={recommendedServices}
                onProductPress={handleVendorPress}
                onViewAllPress={handleViewAllProviders}
              />
            )}

            {featuredServices.length > 0 && (
              <ProductSection
                title="Special Offers"
                subtitle="Discounted car detailing deals"
                data={featuredServices}
                onProductPress={handleVendorPress}
                onViewAllPress={handleViewAllProviders}
              />
            )}

            {nearbyServices.length > 0 && (
              <ProductSection
                title="Nearby Car Washers"
                subtitle="Washers available near your location"
                data={nearbyServices}
                onProductPress={handleVendorPress}
                onViewAllPress={handleViewAllProviders}
              />
            )}

            {!loading && !hasData && (
              <View className="py-12 px-6 items-center justify-center">
                <Typography variant="body" className="text-slate-400 text-center font-body-medium">
                  No active providers or services found.
                </Typography>
              </View>
            )}
          </>
        )}
      </ScreenScrollView>
    </View>
  );
};


