import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { T } from './analytics.theme';
import { TimeRange } from './analytics.data';
import { AnalyticsHeader } from './components/AnalyticsHeader';
import { PerformanceCard } from './components/PerformanceCard';
import { EarningsCard } from './components/EarningsCard';
import { StatsRow } from './components/StatsRow';
import { SatisfactionCard } from './components/SatisfactionCard';
import { InsightsCard } from './components/InsightsCard';

export const VendorAnalyticsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [range, setRange] = useState<TimeRange>('Last 7 Days');

  const headerPaddingTop = Math.max(insets.top, 20) + 10;

  return (
    <View style={s.root}>
      <AnalyticsHeader
        range={range}
        onRangeChange={setRange}
        paddingTop={headerPaddingTop}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <PerformanceCard />
        <EarningsCard />
        <StatsRow />
        <SatisfactionCard />
        <InsightsCard />
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: T.bg },
  scroll: { padding: 20, paddingBottom: 40 },
});
