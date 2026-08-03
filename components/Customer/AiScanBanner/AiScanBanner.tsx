import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Sparkles, Scan, ChevronRight } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { AiScanBannerProps } from './types';
import { aiScanBannerStyles } from './styles';

export const AiScanBanner: React.FC<AiScanBannerProps> = React.memo(
  ({ onPress }) => (
    <View className={aiScanBannerStyles.container}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        className={aiScanBannerStyles.button}
      >
        <View className="flex-row items-center gap-3.5 flex-1 pr-2">
          <View className={aiScanBannerStyles.iconBox}>
            <Scan size={22} color="#60a5fa" />
          </View>

          <View className={aiScanBannerStyles.textCol}>
            <View className={aiScanBannerStyles.tagRow}>
              <Sparkles size={14} color="#38bdf8" />
              <Typography className={aiScanBannerStyles.tagText}>
                AI Paint & Dirt Inspector
              </Typography>
            </View>
            <Typography className={aiScanBannerStyles.titleText}>
              Scan Your Car with AI
            </Typography>
            <Typography className={aiScanBannerStyles.subtitleText}>
              Get instant flaw diagnostic & recommended packages
            </Typography>
          </View>
        </View>

        <View className={aiScanBannerStyles.arrowBox}>
          <ChevronRight size={18} color="#93c5fd" />
        </View>
      </TouchableOpacity>
    </View>
  ),
);
