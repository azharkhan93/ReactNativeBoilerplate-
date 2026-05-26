import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';

interface Props {
  label: string;
  right?: React.ReactNode;
}

export const SectionTitle: React.FC<Props> = ({ label, right }) => (
  <View className="flex-row justify-between items-center mb-4">
    <Typography className="text-slate-900 text-base font-heading-semibold">{label}</Typography>
    {right}
  </View>
);
