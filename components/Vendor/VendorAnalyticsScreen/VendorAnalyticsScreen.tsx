/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../theme';
import {
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
} from 'lucide-react-native';

// ─── Constants ────────────────────────────────────────────────────
const BG = '#030712';
const CARD = '#0f1623';
const BORDER = '#1e293b';
const MUTED = '#64748b';

const TIME_RANGES = ['Last 7 Days', 'Last 30 Days', 'Monthly'] as const;

const CHART_BARS = [
  { day: 'MON', height: 30 },
  { day: 'TUE', height: 45 },
  { day: 'WED', height: 35 },
  { day: 'THU', height: 55 },
  { day: 'FRI', height: 65 },
  { day: 'SAT', height: 80 },
  { day: 'SUN', height: 100 },
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
    body: 'Highest demand observed on Saturday afternoons between 2 PM and 5 PM. Consider adding staff.',
  },
  {
    id: '2',
    icon: Users,
    color: '#a855f7',
    bg: '#3b1f5e',
    title: 'Loyalty Insight',
    body: '32% of your bookings this week were from returning customers. Great job on service quality!',
  },
];

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

const BarChart: React.FC = () => {
  const maxH = 80;
  return (
    <View
      className="flex-row items-end justify-between"
      style={{ height: maxH + 24 }}
    >
      {CHART_BARS.map((b, i) => {
        const isLast = i === CHART_BARS.length - 1;
        const barH = (b.height / 100) * maxH;
        return (
          <View key={b.day} className="items-center flex-1">
            <View
              style={{
                height: barH,
                width: '60%',
                backgroundColor: isLast ? '#3b82f6' : '#1e3a5f',
                borderRadius: 6,
                marginBottom: 6,
              }}
            />
            <Typography
              className="text-[10px] font-body-medium"
              style={{ color: MUTED }}
            >
              {b.day}
            </Typography>
          </View>
        );
      })}
    </View>
  );
};

const StarBar: React.FC<{ stars: number; pct: number }> = ({ stars, pct }) => (
  <View className="flex-row items-center mb-2">
    <View
      className="flex-row mr-3"
      style={{ width: 60, justifyContent: 'flex-end' }}
    >
      {Array.from({ length: stars }).map((_, i) => (
        <Typography key={i} className="text-yellow-400 text-[13px]">
          ★
        </Typography>
      ))}
    </View>
    <View
      className="flex-1 rounded-full h-2 mr-3"
      style={{ backgroundColor: BORDER }}
    >
      <View
        className="bg-primary-500 h-2 rounded-full"
        style={{ width: `${pct}%` }}
      />
    </View>
    <Typography
      className="text-[13px]"
      style={{ color: MUTED, width: 32, textAlign: 'right' }}
    >
      {pct}%
    </Typography>
  </View>
);

// ─── Main Screen ─────────────────────────────────────────────────
export const VendorAnalyticsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [range, setRange] =
    useState<(typeof TIME_RANGES)[number]>('Last 7 Days');

  return (
    <View className="flex-1" style={{ backgroundColor: BG }}>
      {/* Header */}
      <View
        className="px-5 pb-4"
        style={{
          paddingTop: Math.max(insets.top, 20) + 10,
          backgroundColor: CARD,
          borderBottomWidth: 1,
          borderBottomColor: BORDER,
        }}
      >
        <View className="flex-row items-center justify-between">
          <Typography className="text-white text-xl font-heading-bold">
            Analytics
          </Typography>
          <TouchableOpacity
            className="w-9 h-9 rounded-xl items-center justify-center"
            style={{ backgroundColor: BORDER }}
          >
            <CalendarDays size={18} color={MUTED} />
          </TouchableOpacity>
        </View>

        {/* Time range pills */}
        <View className="flex-row mt-4 gap-2">
          {TIME_RANGES.map(r => (
            <TouchableOpacity
              key={r}
              onPress={() => setRange(r)}
              className={`px-4 py-2 rounded-full ${
                r === range ? 'bg-primary-500' : ''
              }`}
              style={r !== range ? { backgroundColor: BORDER } : undefined}
              activeOpacity={0.8}
            >
              <Typography
                className={`text-sm font-body-semibold ${
                  r === range ? 'text-white' : ''
                }`}
                style={r !== range ? { color: MUTED } : undefined}
              >
                {r}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        {/* Performance Score */}
        <View
          className="rounded-3xl p-6 mb-4"
          style={{ backgroundColor: CARD, borderWidth: 1, borderColor: BORDER }}
        >
          <Typography
            className="text-xs font-body-bold tracking-widest uppercase mb-2"
            style={{ color: MUTED }}
          >
            Performance Score
          </Typography>
          <View className="flex-row items-end mb-3">
            <Typography className="text-white text-5xl font-heading-bold">
              4.8
            </Typography>
            <Typography
              className="text-xl font-body-medium mb-1.5 ml-1"
              style={{ color: MUTED }}
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
          <View
            className="rounded-full h-2"
            style={{ backgroundColor: BORDER }}
          >
            <View
              className="bg-primary-500 h-2 rounded-full"
              style={{ width: '96%' }}
            />
          </View>
        </View>

        {/* Earnings Growth */}
        <View
          className="rounded-3xl p-6 mb-4"
          style={{ backgroundColor: CARD, borderWidth: 1, borderColor: BORDER }}
        >
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
          {/* Booking Conversion */}
          <View
            className="flex-1 rounded-3xl p-5"
            style={{
              backgroundColor: CARD,
              borderWidth: 1,
              borderColor: BORDER,
            }}
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mb-3"
              style={{ backgroundColor: '#1e3a5f' }}
            >
              <Target size={20} color="#3b82f6" />
            </View>
            <Typography className="text-xs mb-1" style={{ color: MUTED }}>
              Booking Conversion
            </Typography>
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

          {/* Avg Response */}
          <View
            className="flex-1 rounded-3xl p-5"
            style={{
              backgroundColor: CARD,
              borderWidth: 1,
              borderColor: BORDER,
            }}
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mb-3"
              style={{ backgroundColor: '#2a1f0e' }}
            >
              <Typography className="text-orange-400 text-lg">😊</Typography>
            </View>
            <Typography className="text-xs mb-1" style={{ color: MUTED }}>
              Avg Response
            </Typography>
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
        <View
          className="rounded-3xl p-6 mb-4"
          style={{ backgroundColor: CARD, borderWidth: 1, borderColor: BORDER }}
        >
          <SectionTitle label="Customer Satisfaction" />
          {SATISFACTION.map(s => (
            <StarBar key={s.stars} stars={s.stars} pct={s.pct} />
          ))}
        </View>

        <View
          className="rounded-3xl p-6"
          style={{ backgroundColor: CARD, borderWidth: 1, borderColor: BORDER }}
        >
          <SectionTitle label="Business Insights" />
          {INSIGHTS.map(insight => {
            const Icon = insight.icon;
            return (
              <View
                key={insight.id}
                className="flex-row items-start mb-4 last:mb-0 rounded-2xl p-4"
                style={{ backgroundColor: BG }}
              >
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-4 mt-0.5"
                  style={{ backgroundColor: insight.bg }}
                >
                  <Icon size={18} color={insight.color} />
                </View>
                <View className="flex-1">
                  <Typography className="text-white font-body-semibold mb-1">
                    {insight.title}
                  </Typography>
                  <Typography
                    className="text-[13px] leading-5"
                    style={{ color: MUTED }}
                  >
                    {insight.body}
                  </Typography>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
