import { Target, Users } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

export const TIME_RANGES = ['Last 7 Days', 'Last 30 Days', 'Monthly'] as const;
export type TimeRange = (typeof TIME_RANGES)[number];

export const CHART_BARS = [
  { day: 'MON', h: 30 },
  { day: 'TUE', h: 45 },
  { day: 'WED', h: 35 },
  { day: 'THU', h: 55 },
  { day: 'FRI', h: 65 },
  { day: 'SAT', h: 80 },
  { day: 'SUN', h: 100 },
];

export const SATISFACTION = [
  { stars: 5, pct: 88 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 2 },
  { stars: 1, pct: 1 },
];

export interface InsightItem {
  id: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  title: string;
  body: string;
}

export const INSIGHTS: InsightItem[] = [
  {
    id: '1',
    icon: Target,
    color: '#3b82f6',
    bg: '#1e3a5f',
    title: 'Optimize for Weekends',
    body: 'Highest demand on Saturday afternoons 2–5 PM. Consider adding staff.',
  },
  {
    id: '2',
    icon: Users,
    color: '#a855f7',
    bg: '#3b1f5e',
    title: 'Loyalty Insight',
    body: '32% of bookings this week were from returning customers. Great job!',
  },
];
