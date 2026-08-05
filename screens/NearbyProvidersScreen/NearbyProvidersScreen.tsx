import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SlidersHorizontal, Navigation } from 'lucide-react-native';
import {
  Typography,
  SearchBar,
  ProviderList,
  ProviderMap,
} from '@/components/theme';
import { AppSkeletonLoader } from '@/components/shared';
import { useNearbyVendors } from './hooks/useNearbyVendors';
import { NearbyProvidersScreenProps } from './types';
import { nearbyProvidersStyles } from './styles';

export const NearbyProvidersScreen: React.FC<NearbyProvidersScreenProps> = ({ onNavigate }) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const { providers, loading } = useNearbyVendors(searchQuery);

  const handleProviderPress = (id: string) => {
    onNavigate?.('vendorDetails', { vendorId: id });
  };

  return (
    <View className={nearbyProvidersStyles.container}>
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
        className={nearbyProvidersStyles.topOverlayContainer}
        style={{ paddingTop: Math.max(insets.top, 20) }}
      >
        {/* Search and Filters Overlay */}
        <View className={nearbyProvidersStyles.searchRow}>
          <View className={nearbyProvidersStyles.searchBarWrapper}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Find a provider by name or..."
              className={nearbyProvidersStyles.searchBar}
            />
          </View>

          <TouchableOpacity
            className={nearbyProvidersStyles.iconButton}
            activeOpacity={0.7}
          >
            <SlidersHorizontal size={22} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className={nearbyProvidersStyles.iconButton}
            activeOpacity={0.7}
          >
            <Navigation size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View className={nearbyProvidersStyles.bottomSheet}>
        <View className={nearbyProvidersStyles.headerRow}>
          <Typography variant="h3" className={nearbyProvidersStyles.title}>
            Nearby Providers
          </Typography>
          <TouchableOpacity activeOpacity={0.7}>
            <Typography
              variant="body-sm"
              className={nearbyProvidersStyles.seeAllText}
            >
              See all
            </Typography>
          </TouchableOpacity>
        </View>

        <View className={nearbyProvidersStyles.listContainer}>
          {loading ? (
            <AppSkeletonLoader />
          ) : (
            <ProviderList
              providers={providers}
              onProviderPress={handleProviderPress}
            />
          )}
        </View>
      </View>
    </View>
  );
};
