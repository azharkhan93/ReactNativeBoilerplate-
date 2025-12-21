import React from 'react';
import { View, TouchableOpacity, TouchableOpacityProps, Image } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Typography } from '../Typography';
import { Heart } from 'lucide-react-native';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface ProductCardProps extends Omit<TouchableOpacityProps, 'children'> {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  discount?: number;
  rating?: number;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  imageUrl,
  discount,
  rating,
  isFavorite = false,
  onFavoritePress,
  className,
  activeOpacity = 0.8,
  ...props
}) => {
  const discountPercentage = discount || (originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);

  return (
    <TouchableOpacity
      className={cn('bg-white rounded-lg overflow-hidden shadow-sm', className)}
      activeOpacity={activeOpacity}
      {...props}
    >
      <View className="relative">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-40 bg-gray-100"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-40 bg-gray-200 items-center justify-center">
            <Typography variant="body-sm" className="text-gray-400">
              No Image
            </Typography>
          </View>
        )}
        
        {discountPercentage > 0 && (
          <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded">
            <Typography variant="body-sm" className="text-white font-body-semibold">
              -{discountPercentage}%
            </Typography>
          </View>
        )}

        {onFavoritePress && (
          <TouchableOpacity
            onPress={onFavoritePress}
            className="absolute top-2 right-2 bg-white/90 p-2 rounded-full"
            activeOpacity={0.7}
          >
            <Heart
              size={18}
              color={isFavorite ? '#ef4444' : '#6b7280'}
              fill={isFavorite ? '#ef4444' : 'none'}
            />
          </TouchableOpacity>
        )}
      </View>

      <View className="p-3">
        <Typography
          variant="body-sm"
          className="text-gray-900 font-body-medium mb-1"
          numberOfLines={2}
        >
          {name}
        </Typography>

        {rating !== undefined && (
          <View className="flex-row items-center mb-2">
            <Typography variant="body-sm" className="text-yellow-500 mr-1">
              ★
            </Typography>
            <Typography variant="body-sm" className="text-gray-600">
              {rating.toFixed(1)}
            </Typography>
          </View>
        )}

        <View className="flex-row items-center">
          <Typography variant="body" className="text-gray-900 font-body-semibold">
            ${price.toFixed(2)}
          </Typography>
          {originalPrice && originalPrice > price && (
            <Typography
              variant="body-sm"
              className="text-gray-400 line-through ml-2"
            >
              ${originalPrice.toFixed(2)}
            </Typography>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

