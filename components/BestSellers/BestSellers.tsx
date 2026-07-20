/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { SectionHeader } from '../theme/SectionHeader';
import { ProductCard } from '../theme/ProductCard';
import { cn } from '@/utils/cn';
import { BestSellerProduct, BestSellersProps } from './types';
import { bestSellersStyles } from './styles';

export const BestSellers: React.FC<BestSellersProps> = ({
  title = 'Best Sellers',
  products = [],
  onViewAllPress,
  onProductPress,
  onFavoritePress,
  className,
}) => {
  const keyExtractor = useCallback((item: BestSellerProduct) => item.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<BestSellerProduct>) => {
      const handlePress = () => onProductPress?.(item.id);
      const handleFavoritePress = () => onFavoritePress?.(item.id);

      return (
        <ProductCard
          id={item.id}
          name={item.name}
          price={item.price}
          originalPrice={item.originalPrice}
          imageUrl={item.imageUrl}
          discount={item.discount}
          rating={item.rating}
          isFavorite={item.isFavorite}
          onFavoritePress={handleFavoritePress}
          className={bestSellersStyles.cardWidth}
          onPress={handlePress}
        />
      );
    },
    [onFavoritePress, onProductPress],
  );

  return (
    <View className={cn(bestSellersStyles.container, className)}>
      <SectionHeader
        title={title}
        subtitle="Top rated products"
        showViewAll={!!onViewAllPress}
        onViewAllPress={onViewAllPress}
      />

      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 12 }}
      />
    </View>
  );
};
