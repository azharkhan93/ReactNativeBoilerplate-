import React from 'react';
import { View } from 'react-native';
import { ProductCard } from '@/components/theme/ProductCard';
import { cn } from '@/utils/cn';
import { ProductGridProps } from './types';
import { productGridStyles } from './styles';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  columns = 2,
  onProductPress,
  onFavoritePress,
  className,
}) => {
  return (
    <View className={cn(productGridStyles.container, className)}>
      <View
        className={cn(
          productGridStyles.gridContainer,
          columns === 2 ? productGridStyles.gapTwo : productGridStyles.gapThree
        )}
      >
        {products.map((product) => (
          <View
            key={product.id}
            className={cn(
              columns === 2 ? productGridStyles.colTwo : productGridStyles.colThree
            )}
          >
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              imageUrl={product.imageUrl}
              discount={product.discount}
              rating={product.rating}
              isFavorite={product.isFavorite}
              onFavoritePress={() => onFavoritePress?.(product.id)}
              onPress={() => onProductPress?.(product.id)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
