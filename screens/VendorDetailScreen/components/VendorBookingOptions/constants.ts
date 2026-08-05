import { Home, Wrench } from 'lucide-react-native';
import { LocationOption } from './types';

export const LOCATION_OPTIONS: readonly LocationOption[] = [
  {
    id: 'doorstep',
    title: 'At Home (Doorstep)',
    badge: '+₹99 Travel Fee',
    badgeStyle: 'text-primary-600',
    Icon: Home,
  },
  {
    id: 'workshop',
    title: 'At Center (Workshop)',
    badge: 'No Surcharge',
    badgeStyle: 'text-green-600',
    Icon: Wrench,
  },
] as const;
