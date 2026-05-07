import React from 'react';
import { View, Image, ImageSourcePropType, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface SlideData {
  id: string;
  image: ImageSourcePropType;
}

interface SlideProps {
  data: SlideData;
  width?: number;
}

export const Slide: React.FC<SlideProps> = ({ data, width = SCREEN_WIDTH }) => {
  return (
    <View style={{ width, height: 200 }} className="relative overflow-hidden">
      <Image
        source={data.image}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
};
