import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { Typography, Button } from '@/components/theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { SERVICE_CATEGORIES } from '@/utils/constants';
import { FilterModalProps } from './types';
import { PRICE_RANGES, SORT_OPTIONS } from './constants';
import { useFilterModal } from './hooks';
import { filterModalStyles as s } from './styles';

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters,
}) => {
  const { filters, toggleFilter, handleClearAll, handleApply } = useFilterModal(
    visible,
    currentFilters,
    onApply,
  );

  return (
    <BottomSheetModal
      visible={visible}
      title="Filter & Sort"
      onClose={onClose}
      height="75%"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={s.container}>
          {/* Category Section */}
          <View className={s.section}>
            <Typography variant="body" className={s.sectionTitle}>
              Vehicle Category
            </Typography>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.categoryScrollContent}
            >
              {SERVICE_CATEGORIES.map(cat => {
                const isSelected = filters.categoryId === cat.id;
                const IconComp = cat.icon;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => toggleFilter('categoryId', cat.id)}
                    className={`${s.categoryItem} ${isSelected ? s.categorySelected : s.categoryDefault}`}
                  >
                    <IconComp size={16} color={isSelected ? '#3b82f6' : '#64748b'} />
                    <Typography className={`${s.categoryText} ${isSelected ? s.categoryTextSelected : s.categoryTextDefault}`}>
                      {cat.name}
                    </Typography>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Price Range Section */}
          <View className={s.section}>
            <Typography variant="body" className={s.sectionTitle}>
              Price Range
            </Typography>
            <View className={s.gridContainer}>
              {PRICE_RANGES.map(range => {
                const isSelected = filters.priceRange === range.value;
                return (
                  <TouchableOpacity
                    key={range.value}
                    onPress={() => toggleFilter('priceRange', range.value)}
                    className={`${s.priceItem} ${isSelected ? s.priceSelected : s.priceDefault}`}
                  >
                    <Typography className={`${s.priceText} ${isSelected ? s.priceTextSelected : s.priceTextDefault}`}>
                      {range.label}
                    </Typography>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Sort By Section */}
          <View className={s.lastSection}>
            <Typography variant="body" className={s.sectionTitle}>
              Sort Results By
            </Typography>
            <View className={s.sortContainer}>
              {SORT_OPTIONS.map((opt, idx) => {
                const isSelected = filters.sortBy === opt.value;
                const Icon = opt.icon;
                const isLast = idx === SORT_OPTIONS.length - 1;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => toggleFilter('sortBy', opt.value)}
                    className={`${s.sortItem} ${isSelected ? s.sortSelected : ''} ${isLast ? s.noBorderBottom : ''}`}
                  >
                    <View className={s.sortLeft}>
                      <Icon size={18} color={isSelected ? '#3b82f6' : '#64748b'} />
                      <Typography className={`${s.sortText} ${isSelected ? s.sortTextSelected : s.sortTextDefault}`}>
                        {opt.label}
                      </Typography>
                    </View>
                    {isSelected && <Check size={18} color="#3b82f6" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Footer Actions */}
          <View className={s.footerRow}>
            <View className={s.flexOne}>
              <Button variant="outlined" size="md" onPress={handleClearAll}>
                Clear All
              </Button>
            </View>
            <View className={s.flexOne}>
              <Button variant="primary" size="md" onPress={handleApply}>
                Apply Filters
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};
