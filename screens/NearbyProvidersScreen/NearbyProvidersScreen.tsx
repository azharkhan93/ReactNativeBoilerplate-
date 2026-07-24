/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SlidersHorizontal, Navigation } from 'lucide-react-native';
import {
  Typography,
  SearchBar,
  ProviderList,
  ProviderMap,
} from '@/components/theme';
import { useNearbyVendors } from './hooks/useNearbyVendors';

export interface NearbyProvidersScreenProps {
  onNavigate?: (route: string, params?: any) => void;
}

export const NearbyProvidersScreen: React.FC<NearbyProvidersScreenProps> = ({ onNavigate }) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const { providers, loading } = useNearbyVendors(searchQuery);

  const handleProviderPress = (id: string) => {
    onNavigate?.('vendorDetails', { vendorId: id });
  };

  return (
    <View className="flex-1">
      {/* Background Map */}
      <View style={StyleSheet.absoluteFillObject}>
        <ProviderMap
          fullScreen
          providers={providers}
          onProviderPress={handleProviderPress}
        />
      </View>

      {/* Top Overlay Area (Header + Search) */}
      <View
        className="px-5 absolute top-0 left-0 right-0 z-10"
        style={{ paddingTop: Math.max(insets.top, 20) }}
      >
        {/* Search and Filters Overlay */}
        <View className="flex-row items-center">
          <View className="flex-1">
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Find a provider by name or..."
              className="bg-white border-none shadow-xl h-14"
            />
          </View>

          <TouchableOpacity
            className="bg-white p-4 rounded-full shadow-xl ml-3"
            activeOpacity={0.7}
          >
            <SlidersHorizontal size={22} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white p-4 rounded-full shadow-xl ml-3"
            activeOpacity={0.7}
          >
            <Navigation size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] pt-7 pb-2 shadow-2xl h-[45%]">
        <View className="px-6 flex-row items-center justify-between mb-4">
          <Typography variant="h3" className="text-gray-900 font-bold text-xl">
            Nearby Providers
          </Typography>
          <TouchableOpacity activeOpacity={0.7}>
            <Typography
              variant="body-sm"
              className="text-primary-600 font-semibold"
            >
              See all
            </Typography>
          </TouchableOpacity>
        </View>

        <View className="flex-1">
          {loading ? (
            <View className="py-10 items-center justify-center">
              <ActivityIndicator size="large" color="#0284c7" />
            </View>
          ) : (
            <ProviderList
              providers={providers}
              onProviderPress={handleProviderPress}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 40,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
