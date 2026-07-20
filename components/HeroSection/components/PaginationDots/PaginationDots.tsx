import React from 'react';
import { View } from 'react-native';
import { cn } from '@/utils/cn';
import { PaginationDotsProps } from './types';
import { paginationDotsStyles } from './styles';

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  total,
  activeIndex,
  className,
}) => {
  return (
    <View className={cn(paginationDotsStyles.container, className)}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={cn(
            paginationDotsStyles.dotBase,
            index === activeIndex
              ? paginationDotsStyles.activeDot
              : paginationDotsStyles.inactiveDot
          )}
        />
      ))}
    </View>
  );
};
