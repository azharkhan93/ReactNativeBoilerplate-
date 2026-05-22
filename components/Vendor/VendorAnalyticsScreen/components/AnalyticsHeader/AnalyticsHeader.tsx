import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { CalendarDays } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { T } from '../../analytics.theme';
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
  <View style={[s.container, { paddingTop }]}>
    <View className="flex-row items-center justify-between">
      <Typography className="text-white text-xl font-heading-bold">
        Analytics
      </Typography>
      <TouchableOpacity style={s.iconBtn}>
        <CalendarDays size={18} color={T.muted} />
      </TouchableOpacity>
    </View>
    <View className="flex-row mt-4 gap-2">
      {TIME_RANGES.map(r => (
        <TouchableOpacity
          key={r}
          onPress={() => onRangeChange(r)}
          className={`px-4 py-2 rounded-full ${
            r === range ? 'bg-primary-500' : 'bg-[#1e293b]'
          }`}
          activeOpacity={0.8}
        >
          <Typography
            className={`text-sm font-body-semibold ${
              r === range ? 'text-white' : 'text-[#64748b]'
            }`}
          >
            {r}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: T.card,
    borderBottomWidth: 1,
    borderBottomColor: T.border,
  },
  iconBtn: {
    width: 36,
    height: 36,
    backgroundColor: T.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
