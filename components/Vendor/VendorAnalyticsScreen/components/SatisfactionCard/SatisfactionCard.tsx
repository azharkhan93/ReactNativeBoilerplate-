import React from 'react';
import { View, StyleSheet } from 'react-native';
import { T } from '../../analytics.theme';
import { SATISFACTION } from '../../analytics.data';
import { SectionTitle } from '../SectionTitle';
import { StarBar } from '../StarBar/StarBar';
;

export const SatisfactionCard: React.FC = () => (
  <View style={s.card}>
    <SectionTitle label="Customer Satisfaction" />
    {SATISFACTION.map(item => <StarBar key={item.stars} {...item} />)}
  </View>
);

const s = StyleSheet.create({
  card: { backgroundColor: T.card, borderWidth: 1, borderColor: T.border, borderRadius: 24, padding: 24, marginBottom: 16 },
});
