import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart, TrendingUp } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { T } from '../../analytics.theme';
import { SectionTitle } from '../SectionTitle';


export const EarningsCard: React.FC = () => (
  <View style={s.card}>
    <SectionTitle
      label="Earnings Growth"
      right={
        <View className="flex-row items-center">
          <TrendingUp size={14} color="#22c55e" />
          <Typography className="text-green-500 text-sm font-body-bold ml-1">+12.5% vs LW</Typography>
        </View>
      }
    />
    <BarChart />
  </View>
);

const s = StyleSheet.create({
  card: { backgroundColor: T.card, borderWidth: 1, borderColor: T.border, borderRadius: 24, padding: 24, marginBottom: 16 },
});
