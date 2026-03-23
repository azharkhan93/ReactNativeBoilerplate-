import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Category,
  HeroSection,
  FlashSale,
  BestSellers,
  NewArrivals,
  Typography
} from '@/components';
import { SERVICE_CATEGORIES } from '@/utils/constants';
import { UserRole } from '../../__generated__/graphql';
import { useHome } from './hooks/useHome';

export interface HomeScreenProps {
  userRole?: UserRole | null;
  onNavigate?: (route: string) => void;
}


export const HomeScreen: React.FC<HomeScreenProps> = ({ userRole, onNavigate }) => {
  const { featuredServices, nearbyServices, recommendedServices } = useHome();
  
  // Navigation & Action Handlers
  const handleServicePress = (serviceId: string) => console.log('Service:', serviceId);
  const handleViewAllProviders = () => onNavigate?.('nearbyProviders');

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <HeroSection />

        <View className="px-5 pt-6">
          <Typography variant="body-lg" className="mb-4 font-bold text-black">
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

       
        <View className="mt-8">
          <FlashSale
            title="Special Offers"
            products={featuredServices}
            onProductPress={handleServicePress}
            onViewAllPress={() => console.log('View all offers')}
          />
        </View>

       
        <View className="mt-4">
          <BestSellers
            title="Nearby Car Washers"
            products={nearbyServices}
            onProductPress={handleServicePress}
            onViewAllPress={handleViewAllProviders}
          />
        </View>

        {/* Section: Recommended for You */}
        <View className="mt-4">
          <NewArrivals
            title="Recommended for You"
            products={recommendedServices}
            onProductPress={handleServicePress}
            onViewAllPress={() => console.log('View all recommendations')}
          />
        </View>
      </ScrollView>
    </View>
  );
};
