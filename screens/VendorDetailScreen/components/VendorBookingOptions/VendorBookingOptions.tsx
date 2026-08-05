import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Typography } from '@/components/theme/Typography';
import { VendorCalendar } from '@/components/Vendor/Calendar';

import { LOCATION_OPTIONS } from './constants';
import { vendorBookingOptionsStyles as styles } from './styles';
import { VendorBookingOptionsProps, ServiceLocation } from './types';

export const VendorBookingOptions: React.FC<VendorBookingOptionsProps> = ({
  vendorId,
  selectedCategory,
  setSelectedCategory,
  selectedWashType,
  setSelectedWashType,
  selectedLocation,
  setSelectedLocation,
  selectedDate,
  setSelectedDate,
  priceMatrix,
  vehicleCategories,
  washTypes,
}) => {
  const getCardStyle = useCallback(
    (isSelected: boolean, extraClasses = '') =>
      `${styles.cardBase} ${isSelected ? styles.cardActive : styles.cardInactive} ${extraClasses}`,
    [],
  );

  return (
    <View className={styles.container}>
      <Typography variant="subheading" className="text-slate-900 font-body-semibold mb-1">
        Customize Your Booking
      </Typography>
      <Typography variant="body-sm" className="text-slate-500 mb-5 font-body">
        Select vehicle size and service preferences for instant pricing
      </Typography>

      {/* 1. Vehicle Size Selector */}
      <View className="mb-6">
        <Typography variant="body-sm" className={styles.sectionTitle}>
          1. Select Vehicle Size
        </Typography>
        <View className="flex-row flex-wrap gap-2.5">
          {vehicleCategories.map(({ id, name, icon: IconComp }) => {
            const isSelected = selectedCategory === id;
            return (
              <TouchableOpacity
                key={id}
                activeOpacity={0.7}
                onPress={() => setSelectedCategory(id)}
                className={getCardStyle(isSelected, 'flex-row items-center px-4 py-3')}
              >
                <IconComp size={15} color={isSelected ? styles.activeColor : styles.inactiveColor} />
                <Typography
                  className={`font-body-bold ml-2 text-sm ${
                    isSelected ? styles.cardSelectedText : styles.cardUnselectedText
                  }`}
                >
                  {name}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 2. Wash Type Selector */}
      <View className="mb-6">
        <Typography variant="body-sm" className={styles.sectionTitle}>
          2. Select Wash Type
        </Typography>
        <View className="flex-col gap-3">
          {washTypes.map(({ id, name, duration, description }) => {
            const isSelected = selectedWashType === id;
            const pricePreview = selectedCategory ? priceMatrix[selectedCategory]?.[id] : null;

            return (
              <TouchableOpacity
                key={id}
                activeOpacity={0.7}
                onPress={() => setSelectedWashType(id)}
                className={getCardStyle(isSelected, 'p-4 flex-row justify-between items-center')}
              >
                <View className="flex-1 mr-3">
                  <View className="flex-row items-center flex-wrap">
                    <Typography
                      className={`font-body-bold text-sm ${
                        isSelected ? styles.cardSelectedText : 'text-slate-900'
                      }`}
                    >
                      {name}
                    </Typography>
                    <View className="w-1 h-1 rounded-full bg-slate-300 mx-2" />
                    <Typography variant="body-sm" className="text-slate-500 font-body-medium">
                      {duration}
                    </Typography>
                  </View>
                  <Typography variant="body-sm" className="text-slate-600 mt-1 font-body">
                    {description}
                  </Typography>
                </View>
                <View className="items-end">
                  {pricePreview ? (
                    <Typography className="text-primary-600 font-body-bold text-base">
                      ₹{pricePreview}
                    </Typography>
                  ) : (
                    <Typography variant="body-sm" className="text-slate-400 font-body">
                      Select Size
                    </Typography>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 3. Location Selector */}
      <View className="mb-4">
        <Typography variant="body-sm" className={styles.sectionTitle}>
          3. Choose Service Location
        </Typography>
        <View className="flex-row gap-3">
          {LOCATION_OPTIONS.map(({ id, title, badge, badgeStyle, Icon }) => {
            const isSelected = selectedLocation === id;
            return (
              <TouchableOpacity
                key={id}
                activeOpacity={0.7}
                onPress={() => setSelectedLocation(id as ServiceLocation)}
                className={getCardStyle(
                  isSelected,
                  'flex-1 p-4 items-center justify-center shadow-sm shadow-slate-100',
                )}
              >
                <Icon size={18} color={isSelected ? styles.activeColor : styles.inactiveColor} />
                <Typography
                  className={`font-body-bold mt-2 text-sm text-center ${
                    isSelected ? styles.cardSelectedText : styles.cardUnselectedText
                  }`}
                >
                  {title}
                </Typography>
                <Typography
                  variant="body-sm"
                  className={`mt-1 text-[11px] font-body-medium text-center ${badgeStyle}`}
                >
                  {badge}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 4. Booking Date */}
      <View className="mb-4 mt-6">
        <Typography variant="body-sm" className={styles.sectionTitle}>
          4. Select Booking Date
        </Typography>
        <VendorCalendar
          vendorProfileId={vendorId}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </View>
    </View>
  );
};
