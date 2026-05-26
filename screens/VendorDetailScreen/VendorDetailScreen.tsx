import React, { useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  ShieldAlert,
  Sparkles,
  Car,
  Shield,
  Home,
  Wrench,
} from 'lucide-react-native';
import { Typography } from '@/components/theme/Typography';
import { Button } from '@/components/theme/Button';
import {
  VENDOR_DETAIL_DEFAULT_IMAGE,
  VENDOR_DETAIL_STATS,
} from '@/utils/constants';
import { useVendorDetail } from './hooks/useVendorDetail';
import { useCarousel } from './hooks/useCarousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PRICE_MATRIX: Record<string, Record<string, number>> = {
  hatchback: {
    normal: 299,
    foam: 449,
    ceramic: 1299,
  },
  sedan: {
    normal: 399,
    foam: 549,
    ceramic: 1599,
  },
  suv: {
    normal: 499,
    foam: 699,
    ceramic: 1999,
  },
  luxury: {
    normal: 699,
    foam: 999,
    ceramic: 2999,
  },
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
      return VENDOR_DETAIL_STATS.startingPrice; // Fallback to base pricing
    }
    const base = PRICE_MATRIX[selectedCategory]?.[selectedWashType] ?? VENDOR_DETAIL_STATS.startingPrice;
    const surcharge = selectedLocation === 'doorstep' ? 99 : 0;
    return base + surcharge;
  }, [selectedCategory, selectedWashType, selectedLocation]);

  const isSelectionComplete = !!(selectedCategory && selectedWashType && selectedLocation);

  if (loading) {
    return (
      <View className="flex-1 bg-notchLight items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Typography
          variant="body"
          className="text-slate-600 mt-4 font-body-semibold"
        >
          Fetching expert details...
        </Typography>
      </View>
    );
  }

  if (error || !vendor) {
    return (
      <View className="flex-1 bg-notchLight px-6 justify-center items-center">
        <ShieldAlert size={48} color="#ef4444" />
        <Typography
          variant="h3"
          className="text-slate-900 font-heading-bold text-center mt-4"
        >
          Failed to load vendor details
        </Typography>
        <Typography
          variant="body"
          className="text-slate-600 text-center mt-2 font-body mb-6"
        >
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
        {/* Dynamic Image Gallery Slider */}
        <View className="relative h-72 bg-slate-100">
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onScrollBeginDrag={handleScrollBeginDrag}
            onScrollEndDrag={handleScrollEndDrag}
            className="w-full h-full"
          >
            {imageList.map((img, idx) => (
              <Image
                key={`${img}-${idx}`}
                source={{ uri: img }}
                style={{ width: SCREEN_WIDTH }}
                className="h-full bg-slate-200"
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          <TouchableOpacity
            onPress={() => onNavigate('home')}
            className="absolute left-5 bg-white/90 p-3 rounded-full border border-slate-200/50 shadow-md shadow-slate-200"
            style={{ top: Math.max(insets.top, 20) }}
            activeOpacity={0.7}
          >
            <ChevronLeft size={20} color="#475569" />
          </TouchableOpacity>

          {imageList.length > 1 && (
            <View className="absolute bottom-4 right-5 bg-white/90 px-3 py-1 rounded-full border border-slate-200/60 shadow-sm shadow-slate-200">
              <Typography
                variant="body-sm"
                className="text-slate-800 text-[11px] font-body-semibold"
              >
                {activeIndex + 1} / {imageList.length} Photos
              </Typography>
            </View>
          )}
        </View>

        <View className="px-5 pt-6 flex-col">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 mr-4">
              <Typography
                variant="h2"
                className="text-slate-900 font-heading-bold leading-tight"
              >
                {vendor.businessName}
              </Typography>
            </View>
             <View className="items-end">
              <Typography
                variant="body-sm"
                className="text-slate-500 uppercase tracking-widest font-body-semibold text-[10px]"
              >
                Starting from
              </Typography>
              <Typography
                variant="h3"
                className="text-primary-600 font-heading-bold"
              >
                ₹{startingPrice}
              </Typography>
            </View>
          </View>

          {/* Quick Metrics Bar */}
          <View className="flex-row items-center flex-wrap gap-x-4 gap-y-2 mt-4 py-3 border-y border-blue-200/30">
            <View className="flex-row items-center">
              <Star size={14} color="#FBBF24" fill="#FBBF24" />
              <Typography
                variant="body-sm"
                className="text-slate-900 ml-1 font-body-semibold"
              >
                {rating.toFixed(1)}
              </Typography>
              <Typography
                variant="body-sm"
                className="text-slate-500 ml-1 font-body"
              >
                ({reviewCount} reviews)
              </Typography>
            </View>
            <View className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            {vendor.serviceRadius && (
              <View className="flex-row items-center">
                <MapPin size={13} color="#3b82f6" />
                <Typography
                  variant="body-sm"
                  className="text-slate-700 ml-1 font-body-medium"
                >
                  {vendor.serviceRadius} radius
                </Typography>
              </View>
            )}
            {vendor.operatingHours && (
              <View className="flex-row items-center">
                <View className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-2" />
                <View className="flex-row items-center">
                  <Clock size={13} color="#16a34a" />
                  <Typography
                    variant="body-sm"
                    className="text-slate-700 ml-1 font-body-medium"
                    numberOfLines={1}
                  >
                    {vendor.operatingHours}
                  </Typography>
                </View>
              </View>
            )}
          </View>

          {/* Description Section */}
          {vendor.description && (
            <View className="mt-6">
              <Typography
                variant="subheading"
                className="text-slate-900 font-body-semibold mb-2"
              >
                About Our Service
              </Typography>
              <Typography
                variant="body"
                className="text-slate-600 leading-relaxed font-body"
              >
                {vendor.description}
              </Typography>
            </View>
          )}

          {vendor.whyChooseMe && (
            <View className="mt-6 bg-notch border border-blue-200/50 rounded-2xl p-4 flex-row items-start">
              <View className="bg-primary-500/10 p-2 rounded-xl border border-primary-500/10 mr-3 mt-0.5">
                <Sparkles size={16} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Typography
                  variant="body"
                  className="text-primary-600 font-body-bold mb-1"
                >
                  Why Choose Us?
                </Typography>
                <Typography
                  variant="body-sm"
                  className="text-slate-700 leading-relaxed font-body"
                >
                  {vendor.whyChooseMe}
                </Typography>
              </View>
            </View>
          )}
          {/* Customize Booking Matrix Section */}
          <View className="mt-8 border-t border-blue-200/30 pt-6">
            <Typography
              variant="subheading"
              className="text-slate-900 font-body-semibold mb-1"
            >
              Customize Your Booking
            </Typography>
            <Typography variant="body-sm" className="text-slate-500 mb-5 font-body">
              Select vehicle size and service preferences for instant pricing
            </Typography>

            {/* 1. Vehicle Size / Category Selector */}
            <View className="mb-6">
              <Typography variant="body-sm" className="text-slate-700 font-body-semibold mb-3">
                1. Select Vehicle Size
              </Typography>
              <View className="flex-row flex-wrap gap-2.5">
                {VEHICLE_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const IconComp = cat.icon;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      activeOpacity={0.7}
                      onPress={() => setSelectedCategory(cat.id)}
                      className={`flex-row items-center px-4 py-3 rounded-2xl border ${
                        isSelected
                          ? 'bg-primary-500/10 border-primary-500'
                          : 'bg-white border-slate-200/60'
                      }`}
                    >
                      <IconComp size={15} color={isSelected ? '#3b82f6' : '#64748b'} />
                      <Typography
                        className={`font-body-bold ml-2 text-sm ${
                          isSelected ? 'text-primary-600' : 'text-slate-800'
                        }`}
                      >
                        {cat.name}
                      </Typography>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* 2. Service/Wash Type Selector */}
            <View className="mb-6">
              <Typography variant="body-sm" className="text-slate-700 font-body-semibold mb-3">
                2. Select Wash Type
              </Typography>
              <View className="flex-col gap-3">
                {WASH_TYPES.map((type) => {
                  const isSelected = selectedWashType === type.id;
                  const pricePreview = selectedCategory
                    ? PRICE_MATRIX[selectedCategory]?.[type.id]
                    : null;

                  return (
                    <TouchableOpacity
                      key={type.id}
                      activeOpacity={0.7}
                      onPress={() => setSelectedWashType(type.id)}
                      className={`p-4 rounded-2xl border flex-row justify-between items-center ${
                        isSelected
                          ? 'bg-primary-500/10 border-primary-500'
                          : 'bg-white border-slate-200/60'
                      }`}
                    >
                      <View className="flex-1 mr-3">
                        <View className="flex-row items-center flex-wrap">
                          <Typography
                            className={`font-body-bold text-sm ${
                              isSelected ? 'text-primary-600' : 'text-slate-900'
                            }`}
                          >
                            {type.name}
                          </Typography>
                          <View className="w-1 h-1 rounded-full bg-slate-300 mx-2" />
                          <Typography variant="body-sm" className="text-slate-500 font-body-medium">
                            {type.duration}
                          </Typography>
                        </View>
                        <Typography variant="body-sm" className="text-slate-600 mt-1 font-body">
                          {type.description}
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
              <Typography variant="body-sm" className="text-slate-700 font-body-semibold mb-3">
                3. Choose Service Location
              </Typography>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSelectedLocation('doorstep')}
                  className={`flex-1 p-4 rounded-2xl border items-center justify-center ${
                    selectedLocation === 'doorstep'
                      ? 'bg-primary-500/10 border-primary-500'
                      : 'bg-white border-slate-200/60 shadow-sm shadow-slate-100'
                  }`}
                >
                  <Home size={18} color={selectedLocation === 'doorstep' ? '#3b82f6' : '#64748b'} />
                  <Typography
                    className={`font-body-bold mt-2 text-sm text-center ${
                      selectedLocation === 'doorstep' ? 'text-primary-600' : 'text-slate-800'
                    }`}
                  >
                    At Home (Doorstep)
                  </Typography>
                  <Typography variant="body-sm" className="text-primary-600 mt-1 text-[11px] font-body-medium text-center">
                    +₹99 Travel Fee
                  </Typography>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSelectedLocation('workshop')}
                  className={`flex-1 p-4 rounded-2xl border items-center justify-center ${
                    selectedLocation === 'workshop'
                      ? 'bg-primary-500/10 border-primary-500'
                      : 'bg-white border-slate-200/60 shadow-sm shadow-slate-100'
                  }`}
                >
                  <Wrench size={18} color={selectedLocation === 'workshop' ? '#3b82f6' : '#64748b'} />
                  <Typography
                    className={`font-body-bold mt-2 text-sm text-center ${
                      selectedLocation === 'workshop' ? 'text-primary-600' : 'text-slate-800'
                    }`}
                  >
                    At Center (Workshop)
                  </Typography>
                  <Typography variant="body-sm" className="text-green-600 mt-1 text-[11px] font-body-medium text-center">
                    No Surcharge
                  </Typography>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Contact Details & Address Info */}
          <View className="mt-8 border-t border-blue-200/30 pt-6 flex-col gap-4">
            <Typography
              variant="subheading"
              className="text-slate-900 font-body-semibold"
            >
              Location & Contact
            </Typography>
            {vendor.address && (
              <View className="flex-row items-start">
                <View className="bg-white p-2 rounded-lg border border-slate-200/60 mr-3 shadow-sm shadow-slate-100">
                  <MapPin size={14} color="#64748b" />
                </View>
                <View className="flex-1 justify-center">
                  <Typography
                    variant="body-sm"
                    className="text-slate-500 text-[10px] uppercase font-body-semibold"
                  >
                    Address
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-slate-800 mt-0.5 font-body-medium"
                  >
                    {vendor.address}
                  </Typography>
                </View>
              </View>
            )}
            {vendor.contactNumber && (
              <View className="flex-row items-start">
                <View className="bg-white p-2 rounded-lg border border-slate-200/60 mr-3 shadow-sm shadow-slate-100">
                  <Phone size={14} color="#64748b" />
                </View>
                <View className="flex-1 justify-center">
                  <Typography
                    variant="body-sm"
                    className="text-slate-500 text-[10px] uppercase font-body-semibold"
                  >
                    Phone Number
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-slate-800 mt-0.5 font-body-medium"
                  >
                    {vendor.contactNumber}
                  </Typography>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Booking Floating Action Bar at the Bottom */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-slate-200 px-5 pt-4 pb-6 flex-row items-center justify-between shadow-2xl shadow-slate-300"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <Typography variant="h2" className="text-slate-900 font-heading-bold">
          ₹{resolvedPrice}
        </Typography>
        <Button
          variant={isSelectionComplete ? 'primary' : 'disabled'}
          className="w-1/2 shadow shadow-primary-200"
          onPress={() => {
            if (isSelectionComplete) {
              onNavigate('liveTracking', {
                category: selectedCategory,
                washType: selectedWashType,
                location: selectedLocation,
                price: resolvedPrice,
              });
            }
          }}
        >
          {isSelectionComplete ? 'Book Now' : 'Select Options'}
        </Button>
      </View>
    </View>
  );
};
