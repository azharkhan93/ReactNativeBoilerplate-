import React from 'react';
import { View, Image } from 'react-native';
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
  avatarUrl?: string | null;
}

export const TopBar: React.FC<TopBarProps> = ({
  onSearch,
  onSearchFocus,
  onProfilePress,
  onFilterPress,
  placeholder = 'Search services...',
  searchValue,
  location = MOCK_USER.location,
  avatarUrl,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-[#D7E4F7] z-50 border-b border-[#c1d2eb]"
      style={{ paddingTop: insets.top }}
    >
      <View className="px-5 py-2">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center flex-1 mr-4">
            <View className="bg-white/85 p-2 rounded-full mr-3 border border-blue-200/50">
              <MapPin size={18} color="#3b82f6" />
            </View>
            <View>
              <Typography variant="body-sm" className="!text-slate-600 font-medium">
                Current Location
              </Typography>
              <Typography
                variant="body"
                className="font-body-bold !text-black"
                numberOfLines={1}
              >
                {location}
              </Typography>
            </View>
          </View>

          <IconButton
            variant="circular"
            onPress={onProfilePress}
            className="bg-slate-50 border border-slate-200 overflow-hidden w-11 h-11 items-center justify-center rounded-full"
          >
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <User size={20} color="#64748b" />
            )}
          </IconButton>
        </View>

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
