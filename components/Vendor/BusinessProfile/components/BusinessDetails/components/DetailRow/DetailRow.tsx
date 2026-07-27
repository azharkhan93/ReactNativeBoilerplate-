import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';
import { DetailRowProps } from './types';
import { detailRowStyles } from './styles';

export const DetailRow: React.FC<DetailRowProps> = React.memo(
  ({ label, value, isLast }) => (
    <View
      className={`flex-row items-start justify-between py-3 ${
        isLast ? '' : 'border-b border-slate-100'
      }`}
    >
      <Typography variant="body-sm" className={detailRowStyles.label}>
        {label}
      </Typography>
      <Typography variant="body-sm" className={detailRowStyles.value}>
        {value || '—'}
      </Typography>
    </View>
  ),
);
