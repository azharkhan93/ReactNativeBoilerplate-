import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Slide, SlideData } from './Slide';
import { PaginationDots } from './PaginationDots';
import { HERO_SLIDES } from './constants';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface HeroSectionProps {
  slides?: SlideData[];
  autoSlideInterval?: number;
  className?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const HeroSection: React.FC<HeroSectionProps> = ({
  slides = HERO_SLIDES,
  autoSlideInterval = 3000,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const intervalRef = useRef<number | null>(null);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const scrollToIndex = useCallback((index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated: true,
    });
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const nextIndex = (prev + 1) % slides.length;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, autoSlideInterval);
  }, [slides.length, autoSlideInterval, scrollToIndex, stopAutoSlide]);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

  return (
    <View className={cn('px-3 py-2 ', className)}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onTouchStart={stopAutoSlide}
        onTouchEnd={startAutoSlide}
        onScrollBeginDrag={stopAutoSlide}
        onScrollEndDrag={startAutoSlide}
        nestedScrollEnabled={true}
        className="relative rounded-md "
      >
        {slides.map((slide) => (
          <Slide key={slide.id} data={slide} />
        ))}
      </ScrollView>
      <View className="absolute bottom-6 left-4 right-4">
        <PaginationDots total={slides.length} activeIndex={activeIndex} />
      </View>
    </View>
  );
};

