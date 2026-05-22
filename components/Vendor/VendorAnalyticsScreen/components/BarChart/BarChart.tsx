import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@/components/theme';
import { T, MAX_BAR } from '../../analytics.theme';
import { CHART_BARS } from '../../analytics.data';

export const BarChart: React.FC = () => (
  <View style={s.row}>
    {CHART_BARS.map((b, i) => (
      <View key={b.day} className="items-center flex-1">
        <View
          style={[
            s.bar,
            i === CHART_BARS.length - 1 ? s.barActive : s.barIdle,
            { height: (b.h / 100) * MAX_BAR },
          ]}
        />
        <Typography style={s.label}>{b.day}</Typography>
      </View>
    ))}
  </View>
);

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', height: MAX_BAR + 24 },
  bar: { width: '60%', borderRadius: 6, marginBottom: 6 },
  barIdle: { backgroundColor: '#1e3a5f' },
  barActive: { backgroundColor: '#3b82f6' },
  label: { fontSize: 10, fontWeight: '500', color: T.muted },
});
