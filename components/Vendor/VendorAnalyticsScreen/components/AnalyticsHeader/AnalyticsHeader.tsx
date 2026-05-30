import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { CalendarDays } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { TIME_RANGES, TimeRange } from '../../analytics.data';

interface Props {
  range: TimeRange;
  onRangeChange: (r: TimeRange) => void;
  paddingTop: number;
}

export const AnalyticsHeader: React.FC<Props> = ({
  range,
  onRangeChange,
  paddingTop,
}) => (
  <View
    className="bg-notch border-b border-blue-200/50 rounded-b-2xl px-5 pb-5 z-50 mb-6 shadow-sm shadow-slate-100"
    style={{ paddingTop }}
  >
    <View className="flex-row items-center justify-between">
      <Typography className="text-slate-900 text-lg font-heading-bold">
        Analytics
      </Typography>
      <TouchableOpacity className="w-9 h-9 bg-notchLight rounded-xl items-center justify-center border border-blue-200/40 shadow-sm shadow-slate-100">
        <CalendarDays size={18} color="#3b82f6" />
      </TouchableOpacity>
    </View>
    <View className="flex-row mt-4 gap-2">
      {TIME_RANGES.map(r => (
        <TouchableOpacity
          key={r}
          onPress={() => onRangeChange(r)}
          className={`px-4 py-2 rounded-full ${
            r === range ? 'bg-primary-500 shadow-sm shadow-primary-500/20' : 'bg-white border border-slate-200/60'
          }`}
          activeOpacity={0.8}
        >
          <Typography
            className={`text-sm font-body-semibold ${
              r === range ? 'text-white' : 'text-slate-600'
            }`}
          >
            {r}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);
