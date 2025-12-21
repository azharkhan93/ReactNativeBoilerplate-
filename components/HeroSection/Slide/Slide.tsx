import React from 'react';
import { View, Image, ImageSourcePropType, Dimensions } from 'react-native';
import { Container, Typography } from '../../theme';

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
    <View style={{ width: SCREEN_WIDTH }} className="h-72 relative">
      <Image
        source={data.image}
        className="w-full h-full"
        resizeMode="cover"
      />
      <View className="absolute inset-0"/>
      <View className="absolute inset-0 justify-start py-16 px-6">
        <Container variant="column-centered" gap={4} className="w-full">
          <Typography variant="h2" >
            {data.heading}
          </Typography>
          <Typography variant="body-lg" >
            {data.description}
          </Typography>
        </Container>
      </View>
    </View>
  );
};

