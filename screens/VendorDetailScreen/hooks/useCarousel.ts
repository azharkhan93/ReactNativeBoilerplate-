import { useState, useEffect, useRef, useCallback } from 'react';
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface UseCarouselProps {
  itemCount: number;
  delay?: number;
}

export const useCarousel = ({ itemCount, delay = 3500 }: UseCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (itemCount <= 1) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % itemCount;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * SCREEN_WIDTH,
          animated: true,
        });
        return nextIndex;
      });
    }, delay);
  }, [itemCount, delay]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(xOffset / SCREEN_WIDTH);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < itemCount) {
      setActiveIndex(newIndex);
    }
  }, [activeIndex, itemCount]);

  const handleScrollBeginDrag = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const handleScrollEndDrag = useCallback(() => {
    startTimer();
  }, [startTimer]);

  return {
    scrollViewRef,
    activeIndex,
    handleScroll,
    handleScrollBeginDrag,
    handleScrollEndDrag,
  };
};
