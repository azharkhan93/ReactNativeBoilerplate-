import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Typography } from '@/components/theme/Typography';

export interface VendorHeaderProps {
  imageList: string[];
  activeIndex: number;
  SCREEN_WIDTH: number;
  scrollViewRef: React.RefObject<ScrollView | null>;
  insets: { top: number };
  onBack: () => void;
  handleScroll: (event: any) => void;
  handleScrollBeginDrag: () => void;
  handleScrollEndDrag: () => void;
}

export const VendorHeader: React.FC<VendorHeaderProps> = ({
  imageList,
  activeIndex,
  SCREEN_WIDTH,
  scrollViewRef,
  insets,
  onBack,
  handleScroll,
  handleScrollBeginDrag,
  handleScrollEndDrag,
}) => {
  return (
    <View className="relative h-72 bg-slate-100">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        className="w-full h-full"
      >
        {imageList.map((img, idx) => (
          <Image
            key={`${img}-${idx}`}
            source={{ uri: img }}
            style={{ width: SCREEN_WIDTH }}
            className="h-full bg-slate-200"
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={onBack}
        className="absolute left-5 bg-white/90 p-3 rounded-full border border-slate-200/50 shadow-md shadow-slate-200"
        style={{ top: Math.max(insets.top, 20) }}
        activeOpacity={0.7}
      >
        <ChevronLeft size={20} color="#475569" />
      </TouchableOpacity>

      {imageList.length > 1 && (
        <View className="absolute bottom-4 right-5 bg-white/90 px-3 py-1 rounded-full border border-slate-200/60 shadow-sm shadow-slate-200">
          <Typography
            variant="body-sm"
            className="text-slate-800 text-[11px] font-body-semibold"
          >
            {activeIndex + 1} / {imageList.length} Photos
          </Typography>
        </View>
      )}
    </View>
  );
};
