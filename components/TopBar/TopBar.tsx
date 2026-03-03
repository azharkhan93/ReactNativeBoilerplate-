import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar } from './SearchBar';
import { Typography, IconButton } from '../theme';
import { MapPin, Filter, User } from 'lucide-react-native';
import { MOCK_USER } from '@/utils/constants';

export interface TopBarProps {
  onSearch?: (query: string) => void;
  onSearchFocus?: () => void;
  onProfilePress?: () => void;
  onFilterPress?: () => void;
  placeholder?: string;
  searchValue?: string;
  location?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onSearch,
  onSearchFocus,
  onProfilePress,
  onFilterPress,
  placeholder = 'Search services...',
  searchValue,
  location = MOCK_USER.location,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-white rounded-bl-[32px] rounded-br-[32px] shadow-xl shadow-black/10 z-50"
      style={{ paddingTop: insets.top }}
    >
      <View className="px-5 py-2">
        {/* Top Row: Location and Profile */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center flex-1 mr-4">
            <View className="bg-primary-50 p-2 rounded-full mr-3">
              <MapPin size={20} color="#3b82f6" />
            </View>
            <View>
              <Typography variant="body-sm" className="text-gray-400">Current Location</Typography>
              <Typography variant="body" className="font-body-semibold text-gray-900" numberOfLines={1}>
                {location}
              </Typography>
            </View>
          </View>

          <IconButton
            variant="circular"
            onPress={onProfilePress}
            className="bg-gray-50 border border-gray-100"
          >
            <User size={22} color="#4B5563" />
          </IconButton>
        </View>

        {/* Bottom Row: Search and Filter */}
        <View className="flex-row items-center gap-3 pb-2">
          <View className="flex-1">
            <SearchBar
              placeholder={placeholder}
              value={searchValue}
              onSearch={onSearch}
              onFocus={onSearchFocus}
            />
          </View>
          <IconButton
            onPress={onFilterPress}
            className="bg-primary-500 w-12 h-12 rounded-2xl border border-primary-400/30"
          >
            <Filter size={20} color="white" />
          </IconButton>
        </View>
      </View>
    </View>
  );
};
