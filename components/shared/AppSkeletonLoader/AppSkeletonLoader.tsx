/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { AppSkeletonLoaderProps } from './types';
import { appSkeletonStyles } from './styles';

const SkeletonCardItem: React.FC = React.memo(() => (
  <View className={appSkeletonStyles.cardItem}>
    <View className={appSkeletonStyles.cardImage} />
    <View className={appSkeletonStyles.cardContent}>
      <View className={appSkeletonStyles.cardTitle} />
      <View className={appSkeletonStyles.cardRating} />
      <View className={appSkeletonStyles.cardPrice} />
    </View>
  </View>
));

const SkeletonCardSection: React.FC<{ readonly count?: number }> = React.memo(
  ({ count = 3 }) => (
    <View className={appSkeletonStyles.section}>
      <View className="px-5 mb-3">
        <View className={appSkeletonStyles.sectionTitle} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
      >
        {Array.from({ length: count }).map((_, idx) => (
          <SkeletonCardItem key={idx} />
        ))}
      </ScrollView>
    </View>
  ),
);

export const AppSkeletonLoader: React.FC<AppSkeletonLoaderProps> = React.memo(
  ({ showHeader = true }) => (
    <View className={appSkeletonStyles.root}>
      {showHeader && (
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
      )}

      <View className={appSkeletonStyles.content}>
        {showHeader ? (
          <>
            <View className={appSkeletonStyles.heroBanner} />

            <View className={appSkeletonStyles.section}>
              <View className="px-5 mb-3">
                <View className={appSkeletonStyles.sectionTitle} />
              </View>
              <View className={appSkeletonStyles.categoriesRow}>
                {Array.from({ length: 4 }).map((_, idx) => (
                  <View key={idx} className={appSkeletonStyles.categoryPill} />
                ))}
              </View>
            </View>

            <SkeletonCardSection />
          </>
        ) : (
          <>
            <SkeletonCardSection />
            <SkeletonCardSection />
          </>
        )}
      </View>
    </View>
  ),
);
