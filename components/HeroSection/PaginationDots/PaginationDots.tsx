import React from 'react';
import { View } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

interface PaginationDotsProps {
  total: number;
  activeIndex: number;
  className?: string;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  total,
  activeIndex,
  className,
}) => {
  return (
    <View className={cn('flex-row items-center justify-center gap-2', className)}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={cn(
            'h-2 rounded-md transition-all',
            index === activeIndex
              ? 'w-8 bg-primary-500'
              : 'w-2 bg-white/50'
          )}
        />
      ))}
    </View>
  );
};

