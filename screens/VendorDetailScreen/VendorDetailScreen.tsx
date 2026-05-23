import React, { useMemo } from 'react';
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
} from 'lucide-react-native';
import { Typography } from '@/components/theme/Typography';
import { Button } from '@/components/theme/Button';
import {
  VENDOR_DETAIL_DEFAULT_IMAGE,
  VENDOR_DETAIL_STATS,
} from '@/utils/constants';
import { useVendorDetail } from './hooks/useVendorDetail';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

  const imageList = useMemo(() => {
    if (!vendor) return [];
    const list = [vendor.imageUri, ...(vendor.images || [])].filter(
      (img): img is string => !!img?.trim(),
    );
    return list.length ? list : [VENDOR_DETAIL_DEFAULT_IMAGE];
  }, [vendor]);

  if (loading) {
    return (
      <View className="flex-1 bg-gray-950 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Typography
          variant="body"
          className="text-gray-400 mt-4 font-body-semibold"
        >
          Fetching expert details...
        </Typography>
      </View>
    );
  }

  if (error || !vendor) {
    return (
      <View className="flex-1 bg-gray-950 px-6 justify-center items-center">
        <ShieldAlert size={48} color="#ef4444" />
        <Typography
          variant="h3"
          className="text-white font-heading-bold text-center mt-4"
        >
          Failed to load vendor details
        </Typography>
        <Typography
          variant="body"
          className="text-gray-400 text-center mt-2 font-body mb-6"
        >
          The requested provider profile could not be retrieved at this time.
        </Typography>
        <Button
          variant="outlined"
          onPress={() => onNavigate('home')}
          className="w-full"
        >
          Back to Home
        </Button>
      </View>
    );
  }

  const { rating, reviewCount, startingPrice } = VENDOR_DETAIL_STATS;

  return (
    <View className="flex-1 bg-gray-950">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
        {/* Dynamic Image Gallery Slider */}
        <View className="relative h-72 bg-gray-900">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            className="w-full h-full"
          >
            {imageList.map((img, idx) => (
              <Image
                key={`${img}-${idx}`}
                source={{ uri: img }}
                style={{ width: SCREEN_WIDTH }}
                className="h-full bg-gray-800"
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          <TouchableOpacity
            onPress={() => onNavigate('home')}
            className="absolute left-5 bg-gray-950/70 p-3 rounded-full border border-gray-800"
            style={{ top: Math.max(insets.top, 20) }}
            activeOpacity={0.7}
          >
            <ChevronLeft size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {imageList.length > 1 && (
            <View className="absolute bottom-4 right-5 bg-gray-950/80 px-3 py-1 rounded-full border border-gray-800">
              <Typography
                variant="body-sm"
                className="text-white text-[11px] font-body-semibold"
              >
                1 / {imageList.length} Photos
              </Typography>
            </View>
          )}
        </View>

        {/* Details Section */}
        <View className="px-5 pt-6 flex-col">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 mr-4">
              <Typography
                variant="h2"
                className="text-white font-heading-bold leading-tight"
              >
                {vendor.businessName}
              </Typography>
            </View>
             <View className="items-end">
              <Typography
                variant="body-sm"
                className="text-gray-500 uppercase tracking-widest font-body-semibold text-[10px]"
              >
                Starting from
              </Typography>
              <Typography
                variant="h3"
                className="text-primary-400 font-heading-bold"
              >
                ₹{startingPrice}
              </Typography>
            </View>
          </View>

          {/* Quick Metrics Bar */}
          <View className="flex-row items-center flex-wrap gap-x-4 gap-y-2 mt-4 py-3 border-y border-gray-900">
            <View className="flex-row items-center">
              <Star size={14} color="#FBBF24" fill="#FBBF24" />
              <Typography
                variant="body-sm"
                className="text-white ml-1 font-body-semibold"
              >
                {rating.toFixed(1)}
              </Typography>
              <Typography
                variant="body-sm"
                className="text-gray-500 ml-1 font-body"
              >
                ({reviewCount} reviews)
              </Typography>
            </View>
            <View className="w-1.5 h-1.5 rounded-full bg-gray-800" />
            {vendor.serviceRadius && (
              <View className="flex-row items-center">
                <MapPin size={13} color="#3b82f6" />
                <Typography
                  variant="body-sm"
                  className="text-gray-300 ml-1 font-body-medium"
                >
                  {vendor.serviceRadius} radius
                </Typography>
              </View>
            )}
            {vendor.operatingHours && (
              <View className="flex-row items-center">
                <View className="w-1.5 h-1.5 rounded-full bg-gray-800 mx-2" />
                <View className="flex-row items-center">
                  <Clock size={13} color="#22c55e" />
                  <Typography
                    variant="body-sm"
                    className="text-gray-300 ml-1 font-body-medium"
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
                className="text-white font-body-semibold mb-2"
              >
                About Our Service
              </Typography>
              <Typography
                variant="body"
                className="text-gray-400 leading-relaxed font-body"
              >
                {vendor.description}
              </Typography>
            </View>
          )}



          {/* Why Choose Me Section */}
          {vendor.whyChooseMe && (
            <View className="mt-6 bg-gray-900/40 border border-gray-900 rounded-2xl p-4 flex-row items-start">
              <View className="bg-primary-500/10 p-2 rounded-xl border border-primary-500/10 mr-3 mt-0.5">
                <Sparkles size={16} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Typography
                  variant="body"
                  className="text-primary-400 font-body-bold mb-1"
                >
                  Why Choose Us?
                </Typography>
                <Typography
                  variant="body-sm"
                  className="text-gray-400 leading-relaxed font-body"
                >
                  {vendor.whyChooseMe}
                </Typography>
              </View>
            </View>
          )}

          {/* Contact Details & Address Info */}
          <View className="mt-8 border-t border-gray-900 pt-6 flex-col gap-4">
            <Typography
              variant="subheading"
              className="text-white font-body-semibold"
            >
              Location & Contact
            </Typography>
            {vendor.address && (
              <View className="flex-row items-start">
                <View className="bg-gray-900 p-2 rounded-lg border border-gray-800 mr-3">
                  <MapPin size={14} color="#9CA3AF" />
                </View>
                <View className="flex-1 justify-center">
                  <Typography
                    variant="body-sm"
                    className="text-gray-500 text-[10px] uppercase font-body-semibold"
                  >
                    Address
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-gray-300 mt-0.5 font-body"
                  >
                    {vendor.address}
                  </Typography>
                </View>
              </View>
            )}
            {vendor.contactNumber && (
              <View className="flex-row items-start">
                <View className="bg-gray-900 p-2 rounded-lg border border-gray-800 mr-3">
                  <Phone size={14} color="#9CA3AF" />
                </View>
                <View className="flex-1 justify-center">
                  <Typography
                    variant="body-sm"
                    className="text-gray-500 text-[10px] uppercase font-body-semibold"
                  >
                    Phone Number
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-gray-300 mt-0.5 font-body"
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
        className="absolute bottom-0 left-0 right-0 bg-gray-950/90 border-t border-gray-900 px-5 pt-4 pb-6 flex-row items-center justify-between"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <View className="flex-col">
          <Typography
            variant="body-sm"
            className="text-gray-500 uppercase tracking-widest font-body-semibold text-[9px]"
          >
            Starting Price
          </Typography>
          <Typography variant="h2" className="text-white font-heading-bold">
            ₹{startingPrice}
          </Typography>
        </View>
        <Button
          variant="primary"
          className="w-1/2"
          onPress={() => onNavigate('liveTracking')}
        >
          Book Now
        </Button>
      </View>
    </View>
  );
};
