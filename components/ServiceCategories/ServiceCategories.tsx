/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Typography } from '../theme/Typography';
import { Category } from '../theme/Category';
import { SERVICE_CATEGORIES } from '@/utils/constants';
import { cn } from '@/utils/cn';
import { ServiceCategoriesProps } from './types';
import { serviceCategoriesStyles } from './styles';

export const ServiceCategories: React.FC<ServiceCategoriesProps> = ({
  title = 'Service Categories',
  categories = SERVICE_CATEGORIES,
  selectedCategoryId,
  onSelectCategory,
  className,
}) => {
  return (
    <View className={cn(serviceCategoriesStyles.container, className)}>
      <Typography variant="body-lg" className={serviceCategoriesStyles.header}>
        {title}
      </Typography>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
      >
        {categories.map(category => {
          const isSelected = selectedCategoryId === category.id;
          return (
            <Category
              key={category.id}
              name={category.name}
              icon={category.icon}
              variant={isSelected ? 'primary' : 'default'}
              onPress={() => onSelectCategory?.(category.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
