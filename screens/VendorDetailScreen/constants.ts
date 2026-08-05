import { Dimensions } from 'react-native';
import { Car, Shield } from 'lucide-react-native';
export { VENDOR_DETAIL_DEFAULT_IMAGE, VENDOR_DETAIL_STATS } from '@/utils/constants';

const { width } = Dimensions.get('window');
export const SCREEN_WIDTH = width;

export const PRICE_MATRIX: Record<string, Record<string, number>> = {
  hatchback: { normal: 299, foam: 449, ceramic: 1299 },
  sedan: { normal: 399, foam: 549, ceramic: 1599 },
  suv: { normal: 499, foam: 699, ceramic: 1999 },
  luxury: { normal: 699, foam: 999, ceramic: 2999 },
};

export const VEHICLE_CATEGORIES = [
  { id: 'hatchback', name: 'Hatchback', icon: Car },
  { id: 'sedan', name: 'Sedan', icon: Car },
  { id: 'suv', name: 'SUV', icon: Car },
  { id: 'luxury', name: 'Luxury', icon: Shield },
] as const;

export const WASH_TYPES = [
  {
    id: 'normal',
    name: 'Normal Wash',
    duration: '30 mins',
    description: 'Exterior eco-pressure wash & dry',
  },
  {
    id: 'foam',
    name: 'Foam Wash',
    duration: '45 mins',
    description: 'Deep foam, tire glaze & window polish',
  },
  {
    id: 'ceramic',
    name: 'Ceramic Wax',
    duration: '90 mins',
    description: 'Foam wash + hand clay bar & premium wax',
  },
] as const;
