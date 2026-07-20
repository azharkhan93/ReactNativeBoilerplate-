/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ListRenderItemInfo,
} from 'react-native';
import { Star, MapPin, Eye } from 'lucide-react-native';
import { Typography } from '../../theme/Typography';
import { SectionHeader } from '../../theme/SectionHeader';
import { useRecentlyAdded } from './hooks/useRecentlyAdded';

export interface RecentlyAddedProps {
  title?: string;
  onVendorPress?: (vendorId: string) => void;
  activeCategoryId?: string | null;
}

export const RecentlyAdded: React.FC<RecentlyAddedProps> = ({
  title = 'Recently Added',
  onVendorPress,
  activeCategoryId,
}) => {
  const { vendors: gqlVendors, loading } = useRecentlyAdded();

  const vendors = useMemo(() => {
    const rawList = gqlVendors || [];
    if (!activeCategoryId) {
      return rawList;
    }
    return rawList.filter(vendor =>
      vendor.categories?.some(cat => cat.id === activeCategoryId),
    );
  }, [gqlVendors, activeCategoryId]);

  const keyExtractor = useCallback((item: (typeof vendors)[number]) => item.id, []);

  const renderItem = useCallback(
    ({ item: vendor }: ListRenderItemInfo<(typeof vendors)[number]>) => {
      const handlePress = () => onVendorPress?.(vendor.id);
      const rating = 4.8;
      const price = 49;

      return (
        <TouchableOpacity
          key={vendor.id}
          className="w-44 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm shadow-slate-100 flex-col"
          activeOpacity={0.8}
          onPress={handlePress}
        >
          <View className="relative">
            <Image
              source={{
                uri: vendor.imageUri || undefined,
              }}
              className="w-full h-28 bg-slate-50"
              resizeMode="cover"
            />

            {vendor.serviceRadius && (
              <View className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 rounded-md border border-slate-100">
                <Typography
                  variant="body-sm"
                  className="text-primary-400 text-[10px] font-body-medium"
                >
                  {vendor.serviceRadius}
                </Typography>
              </View>
            )}
          </View>

          <View className="p-3 flex-1 flex-col justify-between">
            <View>
              <Typography
                variant="body"
                className="text-slate-800 font-body-semibold leading-tight mb-1"
                numberOfLines={1}
              >
                {vendor.businessName}
              </Typography>

              <View className="flex-row items-center mb-2">
                <Star size={12} color="#FBBF24" fill="#FBBF24" />

                <Typography
                  variant="body-sm"
                  className="text-slate-500 ml-1 font-body-medium text-[11px]"
                >
                  {rating.toFixed(1)}
                </Typography>

                {vendor.address && (
                  <>
                    <View className="w-1 h-1 rounded-full bg-gray-700 mx-1.5" />

                    <MapPin size={10} color="#9CA3AF" />

                    <Typography
                      variant="body-sm"
                      className="text-gray-400 ml-0.5 text-[10px]"
                      numberOfLines={1}
                    >
                      {vendor.address}
                    </Typography>
                  </>
                )}
              </View>
            </View>

            <View className="flex-row items-center justify-between mt-1 pt-2 border-t border-slate-100">
              <View className="flex-col">
                <Typography
                  variant="body-sm"
                  className="text-gray-500 text-[9px] uppercase font-body-semibold"
                >
                  Starting From
                </Typography>

                <Typography
                  variant="body"
                  className="text-slate-900 font-body-bold text-[14px]"
                >
                  ₹{price}
                </Typography>
              </View>

              <TouchableOpacity
                onPress={handlePress}
                className="flex-row items-center bg-primary-600/10 px-2 py-1.5 rounded-lg border border-primary-500/20"
                activeOpacity={0.7}
              >
                <Eye size={12} color="#3b82f6" />

                <Typography
                  variant="body-sm"
                  className="text-primary-500 font-body-bold text-[10px] ml-1"
                >
                  Details
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [onVendorPress],
  );

  if (loading) {
    return (
      <View className="px-4 py-8 items-center justify-center">
        <ActivityIndicator size="small" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="px-4 py-4">
      <SectionHeader
        title={title}
        subtitle="Newly joined expert car washers in your area"
      />

      <FlatList
        data={vendors}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 14 }}
      />
    </View>
  );
};
