import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@/components/theme';
import { T } from '../../analytics.theme';

export const PerformanceCard: React.FC = () => (
  <View style={s.card}>
    <Typography style={s.overline}>Performance Score</Typography>
    <View className="flex-row items-end mb-3">
      <Typography className="text-white text-5xl font-heading-bold">
        4.8
      </Typography>
      <Typography style={[s.overline, s.subScore]}>/ 5.0</Typography>
    </View>
    <View className="bg-green-500/10 self-start px-3 py-1 rounded-full flex-row items-center mb-4">
      <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
      <Typography className="text-green-500 text-xs font-body-bold tracking-widest uppercase">
        Top Rated Provider
      </Typography>
    </View>
    <View style={s.track}>
      <View
        className="bg-primary-500 h-2 rounded-full"
        style={{ width: '96%' }}
      />
    </View>
  </View>
);

const s = StyleSheet.create({
  card: {
    backgroundColor: T.card,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  overline: {
    color: T.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  subScore: { fontSize: 18, marginBottom: 6, marginLeft: 4 },
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: T.border,
    overflow: 'hidden',
  },
});
