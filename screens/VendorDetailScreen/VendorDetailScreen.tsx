import React from 'react';
import { View, ScrollView } from 'react-native';
import { AppSkeletonLoader } from '@/components/shared';
import { PaymentModal } from '@/components/Customer';
import {
  VendorHeader,
  VendorInfo,
  VendorAbout,
  VendorBookingOptions,
  VendorContact,
  VendorBookingBar,
  VendorErrorView,
  BookingOptionItem,
  WashTypeItem,
} from './components';

import {
  SCREEN_WIDTH,
  PRICE_MATRIX,
  VEHICLE_CATEGORIES,
  WASH_TYPES,
  VENDOR_DETAIL_STATS,
} from './constants';

import { useVendorDetailScreen } from './hooks';
import { VendorDetailScreenProps } from './types';
import { vendorDetailStyles } from './styles';

export const VendorDetailScreen: React.FC<VendorDetailScreenProps> = ({
  vendorId,
  onNavigate,
  onRequestAuth,
}) => {
  const {
    vendor,
    loading,
    error,
    insets,
    selectedCategory,
    setSelectedCategory,
    selectedWashType,
    setSelectedWashType,
    selectedLocation,
    setSelectedLocation,
    selectedDate,
    setSelectedDate,
    showPaymentModal,
    setShowPaymentModal,
    imageList,
    carouselState,
    resolvedPrice,
    isSelectionComplete,
    handleBookNow,
    handlePaymentSuccess,
    selectedWashTypeName,
  } = useVendorDetailScreen({ vendorId, onNavigate, onRequestAuth });

  if (loading) {
    return <AppSkeletonLoader />;
  }

  if (error || !vendor) {
    return <VendorErrorView onBackToHome={() => onNavigate('home')} />;
  }

  const { rating, reviewCount, startingPrice } = VENDOR_DETAIL_STATS;

  return (
    <View className={vendorDetailStyles.container}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
        <VendorHeader
          imageList={imageList}
          activeIndex={carouselState.activeIndex}
          SCREEN_WIDTH={SCREEN_WIDTH}
          scrollViewRef={carouselState.scrollViewRef}
          insets={insets}
          onBack={() => onNavigate('home')}
          handleScroll={carouselState.handleScroll}
          handleScrollBeginDrag={carouselState.handleScrollBeginDrag}
          handleScrollEndDrag={carouselState.handleScrollEndDrag}
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
            vehicleCategories={
              VEHICLE_CATEGORIES as unknown as BookingOptionItem[]
            }
            washTypes={WASH_TYPES as unknown as WashTypeItem[]}
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
        onBookNow={handleBookNow}
      />

      {isSelectionComplete && (
        <PaymentModal
          visible={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={resolvedPrice}
          vendorName={vendor.businessName}
          washType={selectedWashTypeName}
          vehicleCategory={selectedCategory || ''}
          bookingDate={selectedDate?.toISOString() || ''}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </View>
  );
};
