import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@/components/theme';
import { T } from '../../analytics.theme';
import { INSIGHTS } from '../../analytics.data';
import { SectionTitle } from '../SectionTitle';

export const InsightsCard: React.FC = () => (
  <View style={[s.card, s.last]}>
    <SectionTitle label="Business Insights" />
    {INSIGHTS.map(({ id, icon: Icon, color, bg, title, body }) => (
      <View
        key={id}
        className="flex-row items-start bg-notchLight rounded-2xl p-4 mb-3"
      >
        <View style={[s.iconWrap, { backgroundColor: bg }]}>
          <Icon size={18} color={color} />
        </View>
        <View className="flex-1">
          <Typography className="text-slate-800 font-body-semibold mb-1">
            {title}
          </Typography>
          <Typography style={s.body}>{body}</Typography>
        </View>
      </View>
    ))}
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
  last: { marginBottom: 0 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  body: { fontSize: 13, lineHeight: 20, color: T.muted },
});
