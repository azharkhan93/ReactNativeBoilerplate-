import React from 'react';
import { View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Typography } from '../Typography';
import { ChevronRight } from 'lucide-react-native';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface SectionHeaderProps extends Omit<TouchableOpacityProps, 'children'> {
  title: string;
  subtitle?: string;
  showViewAll?: boolean;
  onViewAllPress?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  showViewAll = false,
  onViewAllPress,
  className,
  ...props
}) => {
  return (
    <View className={cn('flex-row items-center justify-between mb-4', className)}>
      <View className="flex-1">
        <Typography variant="h3" className="text-gray-900 font-heading-semibold">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body-sm" className="text-gray-500 mt-1">
            {subtitle}
          </Typography>
        )}
      </View>
      {showViewAll && (
        <TouchableOpacity
          onPress={onViewAllPress}
          activeOpacity={0.7}
          className="flex-row items-center"
          {...props}
        >
          <Typography variant="body-sm" className="text-primary-600 font-body-semibold mr-1">
            View All
          </Typography>
          <ChevronRight size={16} color="#2563eb" />
        </TouchableOpacity>
      )}
    </View>
  );
};

