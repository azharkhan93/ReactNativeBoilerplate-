import React, { useMemo, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShieldAlert, Car, Shield } from 'lucide-react-native';
import { Typography } from '@/components/theme/Typography';
import { Button } from '@/components/theme/Button';
import { VENDOR_DETAIL_DEFAULT_IMAGE, VENDOR_DETAIL_STATS } from '@/utils/constants';
import { useVendorDetail } from './hooks/useVendorDetail';
import { useCarousel } from './hooks/useCarousel';

import { VendorHeader } from './components/VendorHeader';
import { VendorInfo } from './components/VendorInfo';
import { VendorAbout } from './components/VendorAbout';
import { VendorBookingOptions } from './components/VendorBookingOptions';
import { VendorContact } from './components/VendorContact';
import { VendorBookingBar } from './components/VendorBookingBar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PRICE_MATRIX: Record<string, Record<string, number>> = {
  hatchback: { normal: 299, foam: 449, ceramic: 1299 },
  sedan: { normal: 399, foam: 549, ceramic: 1599 },
  suv: { normal: 499, foam: 699, ceramic: 1999 },
  luxury: { normal: 699, foam: 999, ceramic: 2999 },
};

const VEHICLE_CATEGORIES = [
  { id: 'hatchback', name: 'Hatchback', icon: Car },
  { id: 'sedan', name: 'Sedan', icon: Car },
  { id: 'suv', name: 'SUV', icon: Car },
  { id: 'luxury', name: 'Luxury', icon: Shield },
];

const WASH_TYPES = [
  { id: 'normal', name: 'Normal Wash', duration: '30 mins', description: 'Exterior eco-pressure wash & dry' },
  { id: 'foam', name: 'Foam Wash', duration: '45 mins', description: 'Deep foam, tire glaze & window polish' },
  { id: 'ceramic', name: 'Ceramic Wax', duration: '90 mins', description: 'Foam wash + hand clay bar & premium wax' },
];

export interface VendorDetailScreenProps {
  vendorId: string | null;
  onNavigate: (route: string, params?: any) => void;
}

export const VendorDetailScreen: React.FC<VendorDetailScreenProps> = ({
  vendorId,
  onNavigate,
}) => {
  const insets = useSafeAreaInsets();
  const { vendor, loading, error } = useVendorDetail(vendorId);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWashType, setSelectedWashType] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<'doorstep' | 'workshop' | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const imageList = useMemo(() => {
    if (!vendor) return [];
    const list = [vendor.imageUri, ...(vendor.images || [])].filter(
      (img): img is string => !!img?.trim(),
    );
    return list.length ? list : [VENDOR_DETAIL_DEFAULT_IMAGE];
  }, [vendor]);

  const {
    scrollViewRef,
    activeIndex,
    handleScroll,
    handleScrollBeginDrag,
    handleScrollEndDrag,
  } = useCarousel({ itemCount: imageList.length });

  const resolvedPrice = useMemo(() => {
    if (!selectedCategory || !selectedWashType) {
      return VENDOR_DETAIL_STATS.startingPrice;
    }
    const base = PRICE_MATRIX[selectedCategory]?.[selectedWashType] ?? VENDOR_DETAIL_STATS.startingPrice;
    return base + (selectedLocation === 'doorstep' ? 99 : 0);
  }, [selectedCategory, selectedWashType, selectedLocation]);

  const isSelectionComplete = !!(selectedCategory && selectedWashType && selectedLocation && selectedDate);

  if (loading) {
    return (
      <View className="flex-1 bg-notchLight items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Typography variant="body" className="text-slate-600 mt-4 font-body-semibold">
          Fetching expert details...
        </Typography>
      </View>
    );
  }

  if (error || !vendor) {
    return (
      <View className="flex-1 bg-notchLight px-6 justify-center items-center">
        <ShieldAlert size={48} color="#ef4444" />
        <Typography variant="h3" className="text-slate-900 font-heading-bold text-center mt-4">
          Failed to load vendor details
        </Typography>
        <Typography variant="body" className="text-slate-600 text-center mt-2 font-body mb-6">
          The requested provider profile could not be retrieved at this time.
        </Typography>
        <Button
          variant="outlined"
          onPress={() => onNavigate('home')}
          className="w-full border-slate-300 text-slate-700 bg-white"
        >
          Back to Home
        </Button>
      </View>
    );
  }

  const { rating, reviewCount, startingPrice } = VENDOR_DETAIL_STATS;

  return (
    <View className="flex-1 bg-notchLight">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
        <VendorHeader
          imageList={imageList}
          activeIndex={activeIndex}
          SCREEN_WIDTH={SCREEN_WIDTH}
          scrollViewRef={scrollViewRef}
          insets={insets}
          onBack={() => onNavigate('home')}
          handleScroll={handleScroll}
          handleScrollBeginDrag={handleScrollBeginDrag}
          handleScrollEndDrag={handleScrollEndDrag}
        />

        <View className="px-5 pt-6 flex-col">
          <VendorInfo
            businessName={vendor.businessName}
            startingPrice={startingPrice}
            rating={rating}
            reviewCount={reviewCount}
            serviceRadius={vendor.serviceRadius}
            operatingHours={vendor.operatingHours}
          />

          <VendorAbout
            description={vendor.description}
            whyChooseMe={vendor.whyChooseMe}
          />

          <VendorBookingOptions
            vendorId={vendor.id}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedWashType={selectedWashType}
            setSelectedWashType={setSelectedWashType}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            priceMatrix={PRICE_MATRIX}
            vehicleCategories={VEHICLE_CATEGORIES}
            washTypes={WASH_TYPES}
          />

          <VendorContact
            address={vendor.address}
            contactNumber={vendor.contactNumber}
          />
        </View>
      </ScrollView>

      <VendorBookingBar
        resolvedPrice={resolvedPrice}
        isSelectionComplete={isSelectionComplete}
        insets={insets}
        onBookNow={() => {
          if (isSelectionComplete) {
            onNavigate('liveTracking', {
              category: selectedCategory,
              washType: selectedWashType,
              location: selectedLocation,
              price: resolvedPrice,
              bookingDate: selectedDate?.toISOString(),
              vendorName: vendor.businessName,
            });
          }
        }}
      />
    </View>
  );
};
