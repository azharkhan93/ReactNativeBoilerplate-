/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Typography } from '@/components/theme';
import { AppSkeletonLoaderProps } from './types';

export const AppLoadingSpinner: React.FC<AppSkeletonLoaderProps & { label?: string }> = React.memo(
  ({ label = 'Loading Tab2wash...' }) => (
    <View className="flex-1 items-center justify-center p-8 bg-[#F1F6FD]">
      <View className="p-6 rounded-3xl bg-white border border-blue-100/60 shadow-lg shadow-blue-500/10 items-center justify-center gap-3 min-w-[160px]">
        <ActivityIndicator size="large" color="#0D9488" />
        <Typography variant="body-sm" className="text-slate-500 font-medium text-center">
          {label}
        </Typography>
      </View>
    </View>
  ),
);

export const AppSkeletonLoader = AppLoadingSpinner;
