import React from 'react';
import { View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Filter, User } from 'lucide-react-native';
import { Typography, IconButton } from '@/components/theme';
import { MOCK_USER } from '@/utils/constants';
import { SearchBar } from './components/SearchBar';
import { TopBarProps } from './types';
import { topBarStyles } from './styles';

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
      className={topBarStyles.root}
      style={{ paddingTop: insets.top }}
    >
      <View className={topBarStyles.innerContainer}>
        <View className={topBarStyles.headerRow}>
          <View className={topBarStyles.locationWrapper}>
            <View className={topBarStyles.pinIconBox}>
              <MapPin size={18} color="#3b82f6" />
            </View>
            <View className={topBarStyles.locationTextContainer}>
              <Typography variant="body-sm" className={topBarStyles.locationLabel}>
                Current Location
              </Typography>
              <Typography
                variant="body"
                className={topBarStyles.locationTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {location}
              </Typography>
            </View>
          </View>

          <IconButton
            variant="circular"
            onPress={onProfilePress}
            className={topBarStyles.profileButton}
          >
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                className={topBarStyles.avatarImage}
                resizeMode="cover"
              />
            ) : (
              <User size={20} color="#64748b" />
            )}
          </IconButton>
        </View>

        <View className={topBarStyles.searchRow}>
          <View className={topBarStyles.searchWrapper}>
            <SearchBar
              placeholder={placeholder}
              value={searchValue}
              onSearch={onSearch}
              onFocus={onSearchFocus}
            />
          </View>
          <IconButton
            onPress={onFilterPress}
            className={topBarStyles.filterButton}
          >
            <Filter size={20} color="white" />
          </IconButton>
        </View>
      </View>
    </View>
  );
};
