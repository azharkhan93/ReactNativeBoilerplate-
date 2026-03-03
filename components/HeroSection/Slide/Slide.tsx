import React from 'react';
import { View, Image, ImageSourcePropType, Dimensions } from 'react-native';
import { Typography } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface SlideData {
  id: string;
  image: ImageSourcePropType;
  heading: string;
  description: string;
}

interface SlideProps {
  data: SlideData;
}

export const Slide: React.FC<SlideProps> = ({ data }) => {
  return (
    <View style={{ width: SCREEN_WIDTH }} className="h-48 relative overflow-hidden">
      <Image
        source={data.image}
        className="w-full h-full"
        resizeMode="cover"
      />

      <View className="absolute inset-0 bg-black/50" />

      <View className="absolute inset-0 px-4 mt-[40px] items-start justify-center">
        <Typography
          variant="h1"
          className="text-white mb-2 leading-tight font-heading-bold text-2xl"
        >
          {data.heading}
        </Typography>
        <Typography
          variant="body"
          className="text-white leading-6 pr-10 font-body"
        >
          {data.description}
        </Typography>
      </View>
    </View>
  );
};
