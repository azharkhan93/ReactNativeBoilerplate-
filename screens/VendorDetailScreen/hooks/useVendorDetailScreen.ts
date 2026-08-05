import { useState, useMemo, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVendorDetail } from './useVendorDetail';
import { useCarousel } from './useCarousel';
import { getUserId } from '@/utils/store/authStore';
import {
  PRICE_MATRIX,
  WASH_TYPES,
  VENDOR_DETAIL_DEFAULT_IMAGE,
  VENDOR_DETAIL_STATS,
} from '../constants';

interface UseVendorDetailScreenParams {
  vendorId: string | null;
  onNavigate: (route: string, params?: Record<string, unknown>) => void;
  onRequestAuth?: (onSuccessCallback?: () => void) => void;
}

export const useVendorDetailScreen = ({
  vendorId,
  onNavigate,
  onRequestAuth,
}: UseVendorDetailScreenParams) => {
  const insets = useSafeAreaInsets();
  const { vendor, loading, error } = useVendorDetail(vendorId);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWashType, setSelectedWashType] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<'doorstep' | 'workshop' | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const imageList = useMemo(() => {
    if (!vendor) return [];
    const list = [vendor.imageUri, ...(vendor.images || [])].filter(
      (img): img is string => !!img?.trim(),
    );
    return list.length ? list : [VENDOR_DETAIL_DEFAULT_IMAGE];
  }, [vendor]);

  const carouselState = useCarousel({ itemCount: imageList.length });

  const resolvedPrice = useMemo(() => {
    if (!selectedCategory || !selectedWashType) {
      return VENDOR_DETAIL_STATS.startingPrice;
    }
    const base =
      PRICE_MATRIX[selectedCategory]?.[selectedWashType] ??
      VENDOR_DETAIL_STATS.startingPrice;
    return base + (selectedLocation === 'doorstep' ? 99 : 0);
  }, [selectedCategory, selectedWashType, selectedLocation]);

  const isSelectionComplete = useMemo(
    () =>
      !!(
        selectedCategory &&
        selectedWashType &&
        selectedLocation &&
        selectedDate
      ),
    [selectedCategory, selectedWashType, selectedLocation, selectedDate],
  );

  const handleBookNow = useCallback(async () => {
    if (isSelectionComplete) {
      const currentUserId = await getUserId();
      if (currentUserId) {
        setShowPaymentModal(true);
      } else if (onRequestAuth) {
        onRequestAuth(() => {
          setShowPaymentModal(true);
        });
      } else {
        setShowPaymentModal(true);
      }
    }
  }, [isSelectionComplete, onRequestAuth]);

  const handlePaymentSuccess = useCallback(() => {
    setShowPaymentModal(false);
    if (!vendor) return;
    onNavigate('liveTracking', {
      category: selectedCategory,
      washType: selectedWashType,
      location: selectedLocation,
      price: resolvedPrice,
      bookingDate: selectedDate?.toISOString(),
      vendorName: vendor.businessName,
    });
  }, [
    vendor,
    onNavigate,
    selectedCategory,
    selectedWashType,
    selectedLocation,
    resolvedPrice,
    selectedDate,
  ]);

  const selectedWashTypeName = useMemo(() => {
    return WASH_TYPES.find(w => w.id === selectedWashType)?.name || '';
  }, [selectedWashType]);

  return {
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
  };
};
