/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, ReactElement } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { SectionHeader } from '../SectionHeader';
import { ProductCard } from '../ProductCard';
import { cn } from '@/utils/cn';
import { ProductSectionProps, DefaultProductSectionItem } from './types';
import { productSectionStyles } from './styles';

export function ProductSection<T extends { id: string } = DefaultProductSectionItem>({
  title,
  subtitle,
  data = [],
  renderItem: customRenderItem,
  keyExtractor: customKeyExtractor,
  onViewAllPress,
  onProductPress,
  onFavoritePress,
  className,
  cardWidthClassName = productSectionStyles.cardWidth,
}: ProductSectionProps<T>): ReactElement {
  const keyExtractor = useCallback(
    (item: T, index: number) => (customKeyExtractor ? customKeyExtractor(item, index) : item.id),
    [customKeyExtractor],
  );

  const defaultRenderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<T>) => {
      if (customRenderItem) {
        return customRenderItem(item, index);
      }

      const product = item as unknown as DefaultProductSectionItem;
      return (
        <ProductCard
          id={product.id}
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          imageUrl={product.imageUrl}
          discount={product.discount}
          rating={product.rating}
          isFavorite={product.isFavorite}
          onFavoritePress={onFavoritePress ? () => onFavoritePress(product.id) : undefined}
          className={cardWidthClassName}
          onPress={() => onProductPress?.(product.id)}
        />
      );
    },
    [customRenderItem, cardWidthClassName, onFavoritePress, onProductPress],
  );

  return (
    <View className={cn(productSectionStyles.container, className)}>
      <View className="px-4 mb-2">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          showViewAll={!!onViewAllPress}
          onViewAllPress={onViewAllPress}
        />
      </View>

      <FlatList
        data={data as T[]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={defaultRenderItem}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
        maxToRenderPerBatch={6}
        windowSize={5}
        initialNumToRender={4}
        removeClippedSubviews={true}
      />
    </View>
  );
}
