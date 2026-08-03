import React, { useState, useCallback } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { cn } from '@/utils/cn';
import { HERO_SLIDES } from './constants';
import { Slide } from './components/Slide';
import { PaginationDots } from './components/PaginationDots';
import { useHeroCarousel } from './hooks/useHeroCarousel';
import { HeroSectionProps } from './types';
import { heroSectionStyles } from './styles';
import { AiScanBanner, VehicleScanModal } from '@/components/Customer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_WIDTH = SCREEN_WIDTH - 40;

export const HeroSection: React.FC<HeroSectionProps> = ({
  className,
  onSelectRecommendedPackage,
}) => {
  const [isScanModalVisible, setIsScanModalVisible] = useState<boolean>(false);

  const { activeIndex, flatListRef, onScroll } = useHeroCarousel(
    HERO_SLIDES.length,
    CAROUSEL_WIDTH,
  );

  const handleOpenScanModal = useCallback((): void => {
    setIsScanModalVisible(true);
  }, []);

  const handleCloseScanModal = useCallback((): void => {
    setIsScanModalVisible(false);
  }, []);

  return (
    <View className={cn(heroSectionStyles.container, className)}>
      <View className={heroSectionStyles.carouselWrapper}>
        <FlatList
          ref={flatListRef}
          data={HERO_SLIDES}
          renderItem={({ item }) => (
            <Slide data={item} width={CAROUSEL_WIDTH} />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          getItemLayout={(_, index) => ({
            length: CAROUSEL_WIDTH,
            offset: CAROUSEL_WIDTH * index,
            index,
          })}
        />
      </View>
      <PaginationDots
        total={HERO_SLIDES.length}
        activeIndex={activeIndex}
        className={heroSectionStyles.dotsMargin}
      />

      {/* Embedded AI Vehicle Scanner Banner */}
      <AiScanBanner onPress={handleOpenScanModal} />

      {/* Embedded AI Vehicle Scanner Modal */}
      <VehicleScanModal
        visible={isScanModalVisible}
        onClose={handleCloseScanModal}
        onSelectRecommendedPackage={onSelectRecommendedPackage}
      />
    </View>
  );
};

