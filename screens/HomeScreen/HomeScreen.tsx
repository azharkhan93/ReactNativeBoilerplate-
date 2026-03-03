import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Category,
  HeroSection,
  FlashSale,
  BestSellers,
  NewArrivals,
  TopBar,
  Typography
} from '@/components';
import {
  MOCK_SERVICES,
  SERVICE_CATEGORIES,
  MOCK_BOOKINGS
} from '@/utils/constants';

export interface HomeScreenProps {
  userRole?: 'customer' | 'provider' | null;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ userRole }) => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleServicePress = (serviceId: string) => {
    console.log('Service pressed:', serviceId);
  };

  return (
    <View className="flex-1 bg-white">
      {/* <TopBar
        onSearch={handleSearch}
        onProfilePress={handleProfilePress}
        onFilterPress={handleFilterPress}
      /> */}

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <HeroSection />

        {/* Car Wash Categories */}
        <View className="px-5 pt-6">
          <Typography variant="h3" className="mb-4 text-gray-900 font-heading-semibold">
            Service Categories
          </Typography>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingRight: 20 }}
          >
            {SERVICE_CATEGORIES.map((category) => (
              <Category
                key={category.id}
                name={category.name}
                icon={category.icon}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Services (reusing FlashSale component for now as a horizontal list) */}
        <View className="mt-8">
          <FlashSale
            title="Special Offers"
            products={MOCK_SERVICES.map(s => ({
              id: s.id,
              name: s.name,
              price: s.price,
              originalPrice: s.price * 1.2,
              discount: 20,
              rating: 4.8
            }))}
            onProductPress={handleServicePress}
            onViewAllPress={() => console.log('View all offers')}
          />
        </View>

        {/* Nearby Providers (reusing BestSellers/NewArrivals structure) */}
        <View className="mt-4">
          <BestSellers
            title="Nearby Car Washers"
            products={MOCK_SERVICES.map(s => ({
              id: s.id,
              name: s.name,
              price: s.price,
              rating: 4.9,
              isFavorite: false
            }))}
            onProductPress={handleServicePress}
            onViewAllPress={() => console.log('View all providers')}
          />
        </View>

        {/* Recent Activity / Recommendations */}
        <View className="mt-4">
          <NewArrivals
            title="Recommended for You"
            products={MOCK_SERVICES.slice(0, 2).map(s => ({
              id: s.id,
              name: s.name,
              price: s.price,
              rating: 4.7,
              isFavorite: true
            }))}
            onProductPress={handleServicePress}
            onViewAllPress={() => console.log('View all recommendations')}
          />
        </View>
      </ScrollView>
    </View>
  );
};
