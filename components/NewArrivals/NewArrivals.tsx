import React from 'react';
import { View, ScrollView } from 'react-native';
import { SectionHeader } from '../theme/SectionHeader';
import { ProductCard } from '../theme/ProductCard';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface NewArrivalProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  discount?: number;
  rating?: number;
  isFavorite?: boolean;
}

export interface NewArrivalsProps {
  products?: NewArrivalProduct[];
  onViewAllPress?: () => void;
  onProductPress?: (productId: string) => void;
  onFavoritePress?: (productId: string) => void;
  className?: string;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products = [],
  onViewAllPress,
  onProductPress,
  onFavoritePress,
  className,
}) => {
  return (
    <View className={cn('px-4 py-4', className)}>
      <SectionHeader
        title="New Arrivals"
        subtitle="Latest products just for you"
        showViewAll={!!onViewAllPress}
        onViewAllPress={onViewAllPress}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            imageUrl={product.imageUrl}
            discount={product.discount}
            rating={product.rating}
            isFavorite={product.isFavorite}
            onFavoritePress={() => onFavoritePress?.(product.id)}
            className="w-40"
            onPress={() => onProductPress?.(product.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

