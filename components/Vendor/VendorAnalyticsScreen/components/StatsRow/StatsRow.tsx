import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, Target } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { T } from '../../analytics.theme';

export const StatsRow: React.FC = () => (
  <View className="flex-row gap-3 mb-4">
    <View style={[s.card, s.flex1]}>
      <View style={[s.badge, { backgroundColor: '#dbeafe' }]}><Target size={20} color="#3b82f6" /></View>
      <Typography style={s.label}>Booking Conversion</Typography>
      <Typography className="text-slate-900 text-2xl font-heading-bold mb-1">84.2%</Typography>
      <View className="flex-row items-center">
        <TrendingUp size={12} color="#22c55e" />
        <Typography className="text-green-500 text-xs font-body-semibold ml-1">↑ 2.4%</Typography>
      </View>
    </View>

    <View style={[s.card, s.flex1]}>
      <View style={[s.badge, { backgroundColor: '#fef3c7' }]}>
        <Typography className="text-orange-500 text-lg">😊</Typography>
      </View>
      <Typography style={s.label}>Avg Response</Typography>
      <Typography className="text-slate-900 text-2xl font-heading-bold mb-1">14m</Typography>
      <View className="flex-row items-center">
        <TrendingDown size={12} color="#22c55e" />
        <Typography className="text-green-500 text-xs font-body-semibold ml-1">↓ 3m</Typography>
      </View>
    </View>
  </View>
);

const s = StyleSheet.create({
  card:  { backgroundColor: T.card, borderWidth: 1, borderColor: T.border, borderRadius: 24, padding: 20, marginBottom: 0 },
  flex1: { flex: 1 },
  badge: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  label: { fontSize: 12, color: T.muted, marginBottom: 4 },
});
