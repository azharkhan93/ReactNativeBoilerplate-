import React from 'react';
import { View } from 'react-native';
import { AppSkeletonLoaderProps } from './types';
import { appSkeletonStyles } from './styles';

export const AppSkeletonLoader: React.FC<AppSkeletonLoaderProps> = () => (
  <View className={appSkeletonStyles.root}>

    {/* Top Nav / Header Skeleton — mirrors real TopBar */}
    <View className={appSkeletonStyles.header}>
      <View className={appSkeletonStyles.topRow}>
        <View className={appSkeletonStyles.locationBox}>
          <View className={appSkeletonStyles.locationIcon} />
          <View className={appSkeletonStyles.locationTextCol}>
            <View className={appSkeletonStyles.locationLabel} />
            <View className={appSkeletonStyles.locationTitle} />
          </View>
        </View>
        <View className={appSkeletonStyles.avatarCircle} />
      </View>
      <View className={appSkeletonStyles.searchRow}>
        <View className={appSkeletonStyles.searchBar} />
        <View className={appSkeletonStyles.filterButton} />
      </View>
    </View>

    {/* Body Content */}
    <View className={appSkeletonStyles.content}>

      {/* Hero Banner */}
      <View className={appSkeletonStyles.heroBanner} />

      {/* Section: Categories */}
      <View>
        <View className={appSkeletonStyles.sectionTitle} />
        <View className={appSkeletonStyles.categoriesRow}>
          <View className={appSkeletonStyles.categoryPill} />
          <View className={appSkeletonStyles.categoryPill} />
          <View className={appSkeletonStyles.categoryPill} />
          <View className={appSkeletonStyles.categoryPill} />
        </View>
      </View>

      {/* Section: Cards */}
      <View>
        <View className={appSkeletonStyles.sectionTitle} />
        <View className={appSkeletonStyles.cardRow}>
          <View className={appSkeletonStyles.cardItem}>
            <View className={appSkeletonStyles.cardImage} />
            <View className={appSkeletonStyles.cardTitle} />
            <View className={appSkeletonStyles.cardSub} />
          </View>
          <View className={appSkeletonStyles.cardItem}>
            <View className={appSkeletonStyles.cardImage} />
            <View className={appSkeletonStyles.cardTitle} />
            <View className={appSkeletonStyles.cardSub} />
          </View>
        </View>
      </View>

    </View>
  </View>
);
