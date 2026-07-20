import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { Typography } from '../theme/Typography';
import { SectionHeader } from '../theme/SectionHeader';
import { ProductCard } from '../theme/ProductCard';
import { cn } from '@/utils/cn';
import { FlashSaleProduct, FlashSaleProps } from './types';
import { flashSaleStyles } from './styles';
import { useCountdown } from './hooks/useCountdown';

export const FlashSale: React.FC<FlashSaleProps> = ({
  title = 'Flash Sale',
  products = [],
  endTime,
  onViewAllPress,
  onProductPress,
  className,
}) => {
  const timeLeft = useCountdown(endTime);

  const formatTime = (value: number): string => String(value).padStart(2, '0');

  const keyExtractor = useCallback((item: FlashSaleProduct) => item.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<FlashSaleProduct>) => {
      const handlePress = () => onProductPress?.(item.id);

      return (
        <ProductCard
          id={item.id}
          name={item.name}
          price={item.price}
          originalPrice={item.originalPrice}
          imageUrl={item.imageUrl}
          discount={item.discount}
          rating={item.rating}
          className={flashSaleStyles.cardWidth}
          onPress={handlePress}
        />
      );
    },
    [onProductPress],
  );

  return (
    <View className={cn(flashSaleStyles.container, className)}>
      <View className={flashSaleStyles.headerRow}>
        <View className={flashSaleStyles.headerContent}>
          <Typography variant="h3" className={flashSaleStyles.title}>
            {title}
          </Typography>
          {endTime && (
            <View className={flashSaleStyles.timerRow}>
              <Typography variant="body-sm" className={flashSaleStyles.timerLabel}>
                Ends in:
              </Typography>
              <View className={flashSaleStyles.timerDigitsRow}>
                <View className={flashSaleStyles.timerBox}>
                  <Typography variant="body-sm" className={flashSaleStyles.timerText}>
                    {formatTime(timeLeft.hours)}
                  </Typography>
                </View>
                <Typography variant="body-sm" className={flashSaleStyles.timerColon}>
                  :
                </Typography>
                <View className={flashSaleStyles.timerBox}>
                  <Typography variant="body-sm" className={flashSaleStyles.timerText}>
                    {formatTime(timeLeft.minutes)}
                  </Typography>
                </View>
                <Typography variant="body-sm" className={flashSaleStyles.timerColon}>
                  :
                </Typography>
                <View className={flashSaleStyles.timerBox}>
                  <Typography variant="body-sm" className={flashSaleStyles.timerText}>
                    {formatTime(timeLeft.seconds)}
                  </Typography>
                </View>
              </View>
            </View>
          )}
        </View>
        {onViewAllPress && (
          <View className="ml-4">
            <SectionHeader title="" showViewAll onViewAllPress={onViewAllPress} />
          </View>
        )}
      </View>

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
