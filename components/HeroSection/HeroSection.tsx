import React from 'react';
import { View, FlatList, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { twMerge } from 'tailwind-merge';

export interface HeroSectionProps {
  className?: string;
}
import { HERO_SLIDES } from './constants';
import { Slide } from './Slide';
import { PaginationDots } from './PaginationDots';

import { useHeroCarousel } from './hooks/useHeroCarousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_WIDTH = SCREEN_WIDTH - 40; 

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const { activeIndex, flatListRef, onScroll } = useHeroCarousel(HERO_SLIDES.length, CAROUSEL_WIDTH);

  return (
    <View className={twMerge('py-4 px-5', className)}>
      <View className="h-[200px] rounded-2xl overflow-hidden shadow-lg shadow-black/10 bg-black">
        <FlatList
          ref={flatListRef}
          data={HERO_SLIDES}
          renderItem={({ item }) => <Slide data={item} width={CAROUSEL_WIDTH} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          getItemLayout={(_, index) => ({ length: CAROUSEL_WIDTH, offset: CAROUSEL_WIDTH * index, index })}
        />
      </View>
      <PaginationDots total={HERO_SLIDES.length} activeIndex={activeIndex} className="mt-4" />
    </View>
  );
};

