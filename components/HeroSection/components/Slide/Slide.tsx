import React from 'react';
import { View, Image } from 'react-native';
import { SlideProps } from './types';
import { slideStyles } from './styles';

export const Slide: React.FC<SlideProps> = ({ data, width }) => {
  return (
    <View
      style={slideStyles.getContainerStyle(width)}
      className={slideStyles.container}
    >
      <Image
        source={data.image}
        className={slideStyles.image}
        resizeMode="cover"
      />
    </View>
  );
};
