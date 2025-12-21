import React from 'react';
import { View} from 'react-native';
import { ProductCard } from '../theme/ProductCard';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface ProductGridProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  discount?: number;
  rating?: number;
  isFavorite?: boolean;
}

export interface ProductGridProps {
  products?: ProductGridProduct[];
  columns?: 2 | 3;
  onProductPress?: (productId: string) => void;
  onFavoritePress?: (productId: string) => void;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  columns = 2,
  onProductPress,
  onFavoritePress,
  className,
}) => {
  return (
    <View className={cn('px-4', className)}>
      <View
        className={cn(
          'flex-row flex-wrap',
          columns === 2 ? 'gap-3' : 'gap-2'
        )}
      >
        {products.map((product) => (
          <View
            key={product.id}
            className={cn(
              columns === 2 ? 'w-[calc(50%-6px)]' : 'w-[calc(33.333%-5.33px)]'
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

