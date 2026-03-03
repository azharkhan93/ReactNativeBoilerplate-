import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Typography } from '../theme/Typography';
import { SectionHeader } from '../theme/SectionHeader';
import { ProductCard } from '../theme/ProductCard';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface FlashSaleProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  imageUrl?: string;
  discount: number;
  rating?: number;
}

export interface FlashSaleProps {
  title?: string;
  products?: FlashSaleProduct[];
  endTime?: Date;
  onViewAllPress?: () => void;
  onProductPress?: (productId: string) => void;
  className?: string;
}

export const FlashSale: React.FC<FlashSaleProps> = ({
  title = 'Flash Sale',
  products = [],
  endTime,
  onViewAllPress,
  onProductPress,
  className,
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // ... (useEffect remains same)

  const formatTime = (value: number) => String(value).padStart(2, '0');

  return (
    <View className={cn('px-4 py-4', className)}>
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1">
          <Typography variant="h3" className="text-gray-900 font-heading-semibold mb-1">
            {title}
          </Typography>
          {endTime && (
            <View className="flex-row items-center mt-1">
              <Typography variant="body-sm" className="text-gray-700 mr-2">
                Ends in:
              </Typography>
              <View className="flex-row items-center gap-1">
                <View className="bg-red-600 px-2 py-1 rounded">
                  <Typography variant="body-sm" className="text-white font-body-semibold">
                    {formatTime(timeLeft.hours)}
                  </Typography>
                </View>
                <Typography variant="body-sm" className="text-red-600 font-body-semibold">
                  :
                </Typography>
                <View className="bg-red-600 px-2 py-1 rounded">
                  <Typography variant="body-sm" className="text-white font-body-semibold">
                    {formatTime(timeLeft.minutes)}
                  </Typography>
                </View>
                <Typography variant="body-sm" className="text-red-600 font-body-semibold">
                  :
                </Typography>
                <View className="bg-red-600 px-2 py-1 rounded">
                  <Typography variant="body-sm" className="text-white font-body-semibold">
                    {formatTime(timeLeft.seconds)}
                  </Typography>
                </View>
              </View>
            </View>
          )}
        </View>
        {onViewAllPress && (
          <View className="ml-4">
            <SectionHeader
              title=""
              showViewAll
              onViewAllPress={onViewAllPress}
            />
          </View>
        )}
      </View>

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
            className="w-40"
            onPress={() => onProductPress?.(product.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

