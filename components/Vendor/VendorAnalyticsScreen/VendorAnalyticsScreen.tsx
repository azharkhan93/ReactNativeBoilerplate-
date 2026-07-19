import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TimeRange } from './analytics.data';
import { AnalyticsHeader } from './components/AnalyticsHeader';
import { PerformanceCard } from './components/PerformanceCard';
import { EarningsCard } from './components/EarningsCard';
import { StatsRow } from './components/StatsRow';
import { SatisfactionCard } from './components/SatisfactionCard';
import { InsightsCard } from './components/InsightsCard';
import { ScreenScrollView } from '@/components/theme';

export const VendorAnalyticsScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const [range, setRange] = useState<TimeRange>('Last 7 Days');

  return (
    <View className="flex-1 bg-notchLight">
      <AnalyticsHeader
        range={range}
        onRangeChange={setRange}
        paddingTop={Math.max(top, 20) + 10}
      />
      <ScreenScrollView contentContainerStyle={{ padding: 20 }}>
        <PerformanceCard />
        <EarningsCard />
        <StatsRow />
        <SatisfactionCard />
        <InsightsCard />
      </ScreenScrollView>
    </View>
  );
};
