import React from 'react';
import { ScrollView, View } from 'react-native';

import { 
  Category, 
  HeroSection, 
  FlashSale, 
  BestSellers, 
  NewArrivals 
} from '@/components';
import { 
  Smartphone, 
  Shirt, 
  Dumbbell, 
  Book, 
  Home, 
  Sparkles, 
  Car, 
  Gamepad2,
  Utensils,
  Baby
} from 'lucide-react-native';


export const HomeScreen: React.FC = () => {
  const categories = [
    { name: 'Electronics', icon: Smartphone },
    { name: 'Fashion', icon: Shirt },
    { name: 'Sports', icon: Dumbbell },
    { name: 'Books', icon: Book },
    { name: 'Home & Garden', icon: Home },
    { name: 'Beauty', icon: Sparkles },
    { name: 'Automotive', icon: Car },
    { name: 'Toys', icon: Gamepad2 },
    { name: 'Food & Drink', icon: Utensils },
    { name: 'Baby & Kids', icon: Baby },
  ];

  // Sample data - replace with your actual data
  const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  const flashSaleProducts = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 79.99,
      originalPrice: 129.99,
      discount: 38,
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      originalPrice: 299.99,
      discount: 33,
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Laptop Stand',
      price: 29.99,
      originalPrice: 49.99,
      discount: 40,
      rating: 4.3,
    },
  ];

  const bestSellers = [
    {
      id: '4',
      name: 'Premium T-Shirt',
      price: 24.99,
      originalPrice: 39.99,
      discount: 37,
      rating: 4.7,
      isFavorite: false,
    },
    {
      id: '5',
      name: 'Running Shoes',
      price: 89.99,
      originalPrice: 129.99,
      discount: 31,
      rating: 4.9,
      isFavorite: true,
    },
    {
      id: '6',
      name: 'Backpack',
      price: 49.99,
      originalPrice: 79.99,
      discount: 37,
      rating: 4.6,
      isFavorite: false,
    },
  ];

  const newArrivals = [
    {
      id: '7',
      name: 'Designer Sunglasses',
      price: 149.99,
      rating: 4.4,
      isFavorite: false,
    },
    {
      id: '8',
      name: 'Wireless Mouse',
      price: 34.99,
      originalPrice: 49.99,
      discount: 30,
      rating: 4.5,
      isFavorite: true,
    },
    {
      id: '9',
      name: 'Phone Case',
      price: 19.99,
      rating: 4.2,
      isFavorite: false,
    },
  ];

  const handleProductPress = (productId: string) => {
    // Navigate to product detail screen
    console.log('Product pressed:', productId);
  };

  const handleFavoritePress = (productId: string) => {
    // Toggle favorite
    console.log('Favorite toggled:', productId);
  };

  return (
    <ScrollView 
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <HeroSection />
      
      {/* Categories */}
      <View className="px-4 pt-4">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
          nestedScrollEnabled={true}
        >
          {categories.map((category, index) => (
            <Category 
              key={index}
              name={category.name} 
              icon={category.icon}
              className="mr-0"
            />
          ))}
        </ScrollView>
      </View>

      {/* Flash Sale */}
      <FlashSale
        products={flashSaleProducts}
        endTime={flashSaleEndTime}
        onProductPress={handleProductPress}
        onViewAllPress={() => console.log('View all flash sales')}
      />

      {/* Best Sellers */}
      <BestSellers
        products={bestSellers}
        onProductPress={handleProductPress}
        onFavoritePress={handleFavoritePress}
        onViewAllPress={() => console.log('View all best sellers')}
      />

      {/* New Arrivals */}
      <NewArrivals
        products={newArrivals}
        onProductPress={handleProductPress}
        onFavoritePress={handleFavoritePress}
        onViewAllPress={() => console.log('View all new arrivals')}
      />
    </ScrollView>
  );
};
