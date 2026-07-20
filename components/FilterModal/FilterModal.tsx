/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Typography, Button } from '../theme';
import { BottomSheetModal } from '../shared/BottomSheetModal';
import { SERVICE_CATEGORIES } from '@/utils/constants';
import { Check, Star, ArrowUpDown } from 'lucide-react-native';

import { FilterValues, FilterModalProps } from './types';


const PRICE_RANGES = [
  { label: 'Under ₹500', value: 'under-500' },
  { label: '₹500 - ₹1,000', value: '500-1000' },
  { label: '₹1,000 - ₹2,000', value: '1000-2000' },
  { label: '₹2,000+', value: '2000-above' },
];

const SORT_OPTIONS = [
  { label: 'Price: Low to High', value: 'price-asc', icon: ArrowUpDown },
  { label: 'Price: High to Low', value: 'price-desc', icon: ArrowUpDown },
  { label: 'Top Rated first', value: 'rating-desc', icon: Star },
];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    categoryId: null,
    priceRange: null,
    sortBy: null,
  });

  useEffect(() => {
    if (visible) {
      setFilters(currentFilters);
    }
  }, [visible, currentFilters]);

  const toggleFilter = (key: keyof FilterValues, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const handleClearAll = () => {
    setFilters({
      categoryId: null,
      priceRange: null,
      sortBy: null,
    });
  };

  return (
    <BottomSheetModal
      visible={visible}
      title="Filter & Sort"
      onClose={onClose}
      height={'75%'}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-4 pb-12">
          {/* SECTION: Category */}
          <View className="mb-6">
            <Typography
              variant="body"
              className="text-slate-600 font-body-semibold mb-3 ml-1"
            >
              Vehicle Category
            </Typography>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10, paddingVertical: 4 }}
            >
              {SERVICE_CATEGORIES.map(cat => {
                const isSelected = filters.categoryId === cat.id;
                const IconComp = cat.icon;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => toggleFilter('categoryId', cat.id)}
                    className={`flex-row items-center px-4 py-2.5 rounded-full border ${
                      isSelected
                        ? 'bg-primary-500/10 border-primary-500'
                        : 'bg-white border-slate-200/70'
                    }`}
                  >
                    <IconComp
                      size={16}
                      color={isSelected ? '#3b82f6' : '#64748b'}
                    />
                    <Typography
                      className={`font-body-medium ml-2 ${
                        isSelected ? 'text-primary-500' : 'text-slate-600'
                      }`}
                    >
                      {cat.name}
                    </Typography>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* SECTION: Price Range */}
          <View className="mb-6">
            <Typography
              variant="body"
              className="text-slate-600 font-body-semibold mb-3 ml-1"
            >
              Price Range
            </Typography>
            <View className="flex-row flex-wrap gap-2.5">
              {PRICE_RANGES.map(range => {
                const isSelected = filters.priceRange === range.value;
                return (
                  <TouchableOpacity
                    key={range.value}
                    onPress={() => toggleFilter('priceRange', range.value)}
                    className={`px-4 py-3 rounded-2xl border ${
                      isSelected
                        ? 'bg-primary-500/10 border-primary-500'
                        : 'bg-white border-slate-200/70'
                    }`}
                    style={{ width: '47%' }}
                  >
                    <Typography
                      className={`text-center font-body-medium ${
                        isSelected ? 'text-primary-500' : 'text-slate-600'
                      }`}
                    >
                      {range.label}
                    </Typography>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* SECTION: Sort By */}
          <View className="mb-8">
            <Typography
              variant="body"
              className="text-slate-600 font-body-semibold mb-3 ml-1"
            >
              Sort Results By
            </Typography>
            <View className="bg-white border border-slate-200/70 rounded-3xl overflow-hidden">
              {SORT_OPTIONS.map((opt, idx) => {
                const isSelected = filters.sortBy === opt.value;
                const Icon = opt.icon;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => toggleFilter('sortBy', opt.value)}
                    className={`flex-row justify-between items-center px-5 py-4 border-b border-slate-100 ${
                      isSelected ? 'bg-primary-500/5' : ''
                    } ${idx === SORT_OPTIONS.length - 1 ? 'border-b-0' : ''}`}
                  >
                    <View className="flex-row items-center">
                      <Icon
                        size={18}
                        color={isSelected ? '#3b82f6' : '#64748b'}
                      />
                      <Typography
                        className={`font-body-medium ml-3 ${
                          isSelected ? 'text-slate-900 font-body-bold' : 'text-slate-600'
                        }`}
                      >
                        {opt.label}
                      </Typography>
                    </View>
                    {isSelected && <Check size={18} color="#3b82f6" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* FOOTER ACTIONS */}
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Button variant="outlined" onPress={handleClearAll}>
                Clear All
              </Button>
            </View>
            <View className="flex-1">
              <Button variant="primary" onPress={() => onApply(filters)}>
                Apply Filters
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};
