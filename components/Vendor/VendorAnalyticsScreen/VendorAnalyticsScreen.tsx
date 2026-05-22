/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../theme';
import {
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
} from 'lucide-react-native';

// ─── Theme ────────────────────────────────────────────────────────
const T = {
  bg: '#030712',
  card: '#0f1623',
  border: '#1e293b',
  muted: '#64748b',
} as const;
const MAX_BAR = 80;

// ─── Data ─────────────────────────────────────────────────────────
const TIME_RANGES = ['Last 7 Days', 'Last 30 Days', 'Monthly'] as const;
type TimeRange = (typeof TIME_RANGES)[number];

const CHART_BARS = [
  { day: 'MON', h: 30 },
  { day: 'TUE', h: 45 },
  { day: 'WED', h: 35 },
  { day: 'THU', h: 55 },
  { day: 'FRI', h: 65 },
  { day: 'SAT', h: 80 },
  { day: 'SUN', h: 100 },
];

const SATISFACTION = [
  { stars: 5, pct: 88 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 2 },
  { stars: 1, pct: 1 },
];

const INSIGHTS = [
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

// ─── Styles ───────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: T.bg },
  header: {
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
  scroll: { padding: 20, paddingBottom: 40 },
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
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: T.border,
    overflow: 'hidden',
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: MAX_BAR + 24,
  },
  bar: { width: '60%', borderRadius: 6, marginBottom: 6 },
  barIdle: { backgroundColor: '#1e3a5f' },
  barActive: { backgroundColor: '#3b82f6' },
  barLabel: { fontSize: 10, fontWeight: '500', color: T.muted },
  starGroup: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 12,
  },
  starPct: { fontSize: 13, color: T.muted, width: 32, textAlign: 'right' },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statLabel: { fontSize: 12, color: T.muted, marginBottom: 4 },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: T.bg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  insightBody: { fontSize: 13, lineHeight: 20, color: T.muted },
});

// ─── Sub-components ───────────────────────────────────────────────
const SectionTitle: React.FC<{ label: string; right?: React.ReactNode }> = ({
  label,
  right,
}) => (
  <View className="flex-row justify-between items-center mb-4">
    <Typography className="text-white text-base font-heading-semibold">
      {label}
    </Typography>
    {right}
  </View>
);

const BarChart: React.FC = () => (
  <View style={s.chartRow}>
    {CHART_BARS.map((b, i) => (
      <View key={b.day} className="items-center flex-1">
        <View
          style={[
            s.bar,
            i === CHART_BARS.length - 1 ? s.barActive : s.barIdle,
            { height: (b.h / 100) * MAX_BAR },
          ]}
        />
        <Typography style={s.barLabel}>{b.day}</Typography>
      </View>
    ))}
  </View>
);

const StarBar: React.FC<{ stars: number; pct: number }> = ({ stars, pct }) => (
  <View className="flex-row items-center mb-2">
    <View style={s.starGroup}>
      {Array.from({ length: stars }).map((_, i) => (
        <Typography key={i} className="text-yellow-400 text-[13px]">
          ★
        </Typography>
      ))}
    </View>
    <View style={s.track} className="flex-1 mr-3">
      <View
        className="bg-primary-500 h-2 rounded-full"
        style={{ width: `${pct}%` }}
      />
    </View>
    <Typography style={s.starPct}>{pct}%</Typography>
  </View>
);

// ─── Screen ───────────────────────────────────────────────────────
export const VendorAnalyticsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [range, setRange] = useState<TimeRange>('Last 7 Days');

  return (
    <View style={s.root}>
      <View style={[s.header, { paddingTop: Math.max(insets.top, 20) + 10 }]}>
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
              onPress={() => setRange(r)}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}
      >
        {/* Performance Score */}
        <View style={s.card}>
          <Typography style={s.overline}>Performance Score</Typography>
          <View className="flex-row items-end mb-3">
            <Typography className="text-white text-5xl font-heading-bold">
              4.8
            </Typography>
            <Typography
              style={[
                s.overline,
                { fontSize: 18, marginBottom: 6, marginLeft: 4 },
              ]}
            >
              / 5.0
            </Typography>
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

        {/* Earnings Growth */}
        <View style={s.card}>
          <SectionTitle
            label="Earnings Growth"
            right={
              <View className="flex-row items-center">
                <TrendingUp size={14} color="#22c55e" />
                <Typography className="text-green-500 text-sm font-body-bold ml-1">
                  +12.5% vs LW
                </Typography>
              </View>
            }
          />
          <BarChart />
        </View>

        {/* Stats Row */}
        <View className="flex-row gap-3 mb-4">
          <View style={[s.card, { flex: 1, marginBottom: 0 }]}>
            <View style={[s.iconBadge, { backgroundColor: '#1e3a5f' }]}>
              <Target size={20} color="#3b82f6" />
            </View>
            <Typography style={s.statLabel}>Booking Conversion</Typography>
            <Typography className="text-white text-2xl font-heading-bold mb-1">
              84.2%
            </Typography>
            <View className="flex-row items-center">
              <TrendingUp size={12} color="#22c55e" />
              <Typography className="text-green-500 text-xs font-body-semibold ml-1">
                ↑ 2.4%
              </Typography>
            </View>
          </View>
          <View style={[s.card, { flex: 1, marginBottom: 0 }]}>
            <View style={[s.iconBadge, { backgroundColor: '#2a1f0e' }]}>
              <Typography className="text-orange-400 text-lg">😊</Typography>
            </View>
            <Typography style={s.statLabel}>Avg Response</Typography>
            <Typography className="text-white text-2xl font-heading-bold mb-1">
              14m
            </Typography>
            <View className="flex-row items-center">
              <TrendingDown size={12} color="#22c55e" />
              <Typography className="text-green-500 text-xs font-body-semibold ml-1">
                ↓ 3m
              </Typography>
            </View>
          </View>
        </View>

        {/* Customer Satisfaction */}
        <View style={s.card}>
          <SectionTitle label="Customer Satisfaction" />
          {SATISFACTION.map(item => (
            <StarBar key={item.stars} {...item} />
          ))}
        </View>

        {/* Business Insights */}
        <View style={[s.card, { marginBottom: 0 }]}>
          <SectionTitle label="Business Insights" />
          {INSIGHTS.map(({ id, icon: Icon, color, bg, title, body }) => (
            <View key={id} style={s.insightRow}>
              <View style={[s.insightIcon, { backgroundColor: bg }]}>
                <Icon size={18} color={color} />
              </View>
              <View className="flex-1">
                <Typography className="text-white font-body-semibold mb-1">
                  {title}
                </Typography>
                <Typography style={s.insightBody}>{body}</Typography>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
