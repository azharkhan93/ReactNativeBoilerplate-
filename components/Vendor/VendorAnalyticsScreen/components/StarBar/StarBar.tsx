import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@/components/theme';
import { T } from '../../analytics.theme';

interface Props {
  stars: number;
  pct: number;
}

export const StarBar: React.FC<Props> = ({ stars, pct }) => (
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
    <Typography style={s.pct}>{pct}%</Typography>
  </View>
);

const s = StyleSheet.create({
  starGroup: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 12,
  },
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: T.border,
    overflow: 'hidden',
  },
  pct: { fontSize: 13, color: T.muted, width: 32, textAlign: 'right' },
});
