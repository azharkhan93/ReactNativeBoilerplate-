import React, { useCallback } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import {
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react-native';

import { Typography, Button } from '@/components/theme';
import { DetectedCondition } from '../../types';
import { AnalysisResultCardProps } from './types';
import { analysisResultStyles as s } from './styles';

const NoVehicleView: React.FC<{ guidance?: string; onRescan: () => void }> = React.memo(
  ({ guidance, onRescan }) => (
    <View className="p-6 items-center justify-center bg-rose-950/20 border border-rose-500/30 rounded-2xl my-4">
      <ShieldAlert size={44} color="#f43f5e" className="mb-3" />
      <Typography className="text-xl font-bold text-slate-100 text-center mb-2">
        No Vehicle Detected
      </Typography>
      <Typography className="text-sm text-slate-300 text-center mb-6 leading-relaxed">
        {guidance || 'Please ensure clear lighting and capture the full exterior profile of your vehicle.'}
      </Typography>
      <Button onPress={onRescan} variant="primary" className="w-full py-3 bg-rose-600 active:bg-rose-700">
        Retake Photos
      </Button>
    </View>
  ),
);

const ConditionItem: React.FC<{ cond: DetectedCondition }> = React.memo(({ cond }) => {
  const isSevere = cond.severity === 'severe';
  return (
    <View className={s.conditionItem}>
      <View className={s.conditionRow}>
        <View className="flex-row items-center gap-2 flex-1 pr-1">
          <ShieldAlert size={16} color={isSevere ? '#e11d48' : '#d97706'} />
          <Typography className={s.conditionName}>{cond.name}</Typography>
        </View>

        <View className={isSevere ? s.conditionBadgeSevere : s.conditionBadgeModerate}>
          <Typography className={isSevere ? s.badgeTextSevere : s.badgeTextModerate}>
            {cond.severity} ({Math.round(cond.confidenceScore * 100)}%)
          </Typography>
        </View>
      </View>
      <Typography className={s.conditionSummary}>{cond.summary}</Typography>
    </View>
  );
});

export const AnalysisResultCard: React.FC<AnalysisResultCardProps> = React.memo(
  ({ result, onBookPackagePress, onRescanPress }) => {
    const { recommendedPackage, detectedConditions, isVehicleDetected } = result;

    const handleBook = useCallback(() => {
      onBookPackagePress(recommendedPackage.packageId, recommendedPackage.suggestedAddons);
    }, [onBookPackagePress, recommendedPackage]);

    if (!isVehicleDetected) {
      return <NoVehicleView guidance={result.retakeGuidance} onRescan={onRescanPress} />;
    }

    const { discountedPrice, originalPrice } = recommendedPackage;
    const hasDiscount = originalPrice !== undefined && originalPrice !== discountedPrice;

    return (
      <ScrollView showsVerticalScrollIndicator={false} className={`${s.container} pb-4`}>
        {/* Header Row */}
        <View className={s.headerRow}>
          <View className={s.titleCol}>
            <Typography className={s.titleText}>AI Inspection Results</Typography>
            <Typography className={s.vehicleSubtext}>
              Detected: {result.vehicleType ?? 'Vehicle'}
            </Typography>
          </View>

          <View className={s.scoreBox}>
            <Typography className={s.scoreValue}>{result.overallConditionScore} / 10</Typography>
            <Typography className={s.scoreLabel}>Condition Rating</Typography>
          </View>
        </View>

        {/* Detected Conditions List */}
        <Typography className={s.sectionLabel}>
          Detected Flaws & Dirt Level ({detectedConditions?.length ?? 0})
        </Typography>

        <View className={s.conditionsList}>
          {(detectedConditions ?? []).map(cond => (
            <ConditionItem key={cond.id} cond={cond} />
          ))}
        </View>

        {/* AI Recommended Wash Package Box */}
        <View className={s.recommendationBox}>
          <View className={s.recHeaderRow}>
            <Sparkles size={20} color="#2563eb" />
            <Typography className={s.recTitle}>Recommended: {recommendedPackage.title}</Typography>
          </View>

          <Typography className={s.recReason}>{recommendedPackage.reason}</Typography>

          {(discountedPrice !== undefined || originalPrice !== undefined) && (
            <View className={s.priceRow}>
              {discountedPrice !== undefined && (
                <Typography className={s.discountPrice}>${discountedPrice.toFixed(2)}</Typography>
              )}
              {hasDiscount && (
                <Typography className={s.originalPrice}>${originalPrice.toFixed(2)}</Typography>
              )}
            </View>
          )}
        </View>

        {/* 50/50 Aligned Action Buttons */}
        <View className={s.actionsRow}>
          <TouchableOpacity onPress={onRescanPress} activeOpacity={0.7} className={s.rescanButton}>
            <View className="flex-row items-center justify-center gap-1.5">
              <RotateCcw size={16} color="#475569" />
              <Typography className={s.rescanText}>Re-scan</Typography>
            </View>
          </TouchableOpacity>

          <View className={s.bookButtonWrapper}>
            <Button onPress={handleBook} variant="primary" size="md" className="w-full shadow-md shadow-blue-500/20">
              <View className="flex-row items-center justify-center gap-1.5">
                <CheckCircle2 size={18} color="white" />
                <Typography className="text-white font-heading-semibold text-xs text-center">Book Now</Typography>
              </View>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  },
);
