/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { SectionHeader } from '../theme/SectionHeader';
import { ProductCard } from '../theme/ProductCard';
import { cn } from '@/utils/cn';
import { NewArrivalProduct, NewArrivalsProps } from './types';
import { newArrivalsStyles } from './styles';

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  title = 'New Arrivals',
  products = [],
  onViewAllPress,
  onProductPress,
  onFavoritePress,
  className,
}) => {
  const keyExtractor = useCallback((item: NewArrivalProduct) => item.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<NewArrivalProduct>) => {
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
          className={newArrivalsStyles.cardWidth}
          onPress={handlePress}
        />
      );
    },
    [onFavoritePress, onProductPress],
  );

  return (
    <View className={cn(newArrivalsStyles.container, className)}>
      <SectionHeader
        title={title}
        subtitle="Latest products just for you"
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
