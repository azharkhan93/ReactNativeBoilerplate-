import { ImageSourcePropType } from 'react-native';

export interface SlideData {
  id: string;
  image: ImageSourcePropType;
}

export interface SlideProps {
  data: SlideData;
  width?: number;
}
