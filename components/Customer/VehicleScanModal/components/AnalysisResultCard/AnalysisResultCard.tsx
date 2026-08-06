import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import {
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react-native';

import { Typography, Button } from '@/components/theme';
import { AnalysisResultCardProps } from './types';
import { analysisResultStyles } from './styles';

export const AnalysisResultCard: React.FC<AnalysisResultCardProps> = React.memo(
  ({ result, onBookPackagePress, onRescanPress }) => {
    const { recommendedPackage, detectedConditions } = result;

    if (!result.isVehicleDetected) {
      return (
        <View className="p-6 items-center justify-center bg-rose-950/20 border border-rose-500/30 rounded-2xl my-4">
          <ShieldAlert size={44} color="#f43f5e" className="mb-3" />
          <Typography className="text-xl font-bold text-slate-100 text-center mb-2">
            No Vehicle Detected
          </Typography>
          <Typography className="text-sm text-slate-300 text-center mb-6 leading-relaxed">
            {result.retakeGuidance ||
              'Please ensure clear lighting and capture the full exterior profile of your vehicle.'}
          </Typography>
          <Button
            onPress={onRescanPress}
            variant="primary"
            className="w-full py-3 bg-rose-600 active:bg-rose-700"
          >
            Retake Photos
          </Button>
        </View>
      );
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={`${analysisResultStyles.container} pb-4`}
      >
        {/* Header Row */}
        <View className={analysisResultStyles.headerRow}>
          <View className={analysisResultStyles.titleCol}>
            <Typography className={analysisResultStyles.titleText}>
              AI Inspection Results
            </Typography>
            <Typography className={analysisResultStyles.vehicleSubtext}>
              Detected: {result.vehicleType ?? 'Vehicle'}
            </Typography>
          </View>

          <View className={analysisResultStyles.scoreBox}>
            <Typography className={analysisResultStyles.scoreValue}>
              {result.overallConditionScore} / 10
            </Typography>
            <Typography className={analysisResultStyles.scoreLabel}>
              Condition Rating
            </Typography>
          </View>
        </View>

        {/* Detected Conditions List */}
        <Typography className={analysisResultStyles.sectionLabel}>
          Detected Flaws & Dirt Level ({detectedConditions?.length ?? 0})
        </Typography>

        <View className={analysisResultStyles.conditionsList}>
          {(detectedConditions ?? []).map(cond => {
            const isSevere = cond.severity === 'severe';
            return (
              <View
                key={cond.id}
                className={analysisResultStyles.conditionItem}
              >
                <View className={analysisResultStyles.conditionRow}>
                  <View className="flex-row items-center gap-2 flex-1 pr-1">
                    <ShieldAlert
                      size={16}
                      color={isSevere ? '#e11d48' : '#d97706'}
                    />
                    <Typography className={analysisResultStyles.conditionName}>
                      {cond.name}
                    </Typography>
                  </View>

                  <View
                    className={
                      isSevere
                        ? analysisResultStyles.conditionBadgeSevere
                        : analysisResultStyles.conditionBadgeModerate
                    }
                  >
                    <Typography
                      className={
                        isSevere
                          ? analysisResultStyles.badgeTextSevere
                          : analysisResultStyles.badgeTextModerate
                      }
                    >
                      {cond.severity} ({Math.round(cond.confidenceScore * 100)}
                      %)
                    </Typography>
                  </View>
                </View>
                <Typography className={analysisResultStyles.conditionSummary}>
                  {cond.summary}
                </Typography>
              </View>
            );
          })}
        </View>

        {/* AI Recommended Wash Package Box */}
        <View className={analysisResultStyles.recommendationBox}>
          <View className={analysisResultStyles.recHeaderRow}>
            <Sparkles size={20} color="#2563eb" />
            <Typography className={analysisResultStyles.recTitle}>
              Recommended: {recommendedPackage.title}
            </Typography>
          </View>

          <Typography className={analysisResultStyles.recReason}>
            {recommendedPackage.reason}
          </Typography>

          {(recommendedPackage.discountedPrice !== undefined ||
            recommendedPackage.originalPrice !== undefined) && (
            <View className={analysisResultStyles.priceRow}>
              {recommendedPackage.discountedPrice !== undefined && (
                <Typography className={analysisResultStyles.discountPrice}>
                  ${recommendedPackage.discountedPrice.toFixed(2)}
                </Typography>
              )}
              {recommendedPackage.originalPrice !== undefined &&
                recommendedPackage.originalPrice !== recommendedPackage.discountedPrice && (
                  <Typography className={analysisResultStyles.originalPrice}>
                    ${recommendedPackage.originalPrice.toFixed(2)}
                  </Typography>
                )}
            </View>
          )}
        </View>

        {/* Perfectly Aligned 50/50 Action Buttons */}
        <View className={analysisResultStyles.actionsRow}>
          <TouchableOpacity
            onPress={onRescanPress}
            activeOpacity={0.7}
            className={analysisResultStyles.rescanButton}
          >
            <View className="flex-row items-center justify-center gap-1.5">
              <RotateCcw size={16} color="#475569" />
              <Typography className={analysisResultStyles.rescanText}>
                Re-scan
              </Typography>
            </View>
          </TouchableOpacity>

          <View className={analysisResultStyles.bookButtonWrapper}>
            <Button
              onPress={() =>
                onBookPackagePress(
                  recommendedPackage.packageId,
                  recommendedPackage.suggestedAddons,
                )
              }
              variant="primary"
              size="md"
              className="w-full shadow-md shadow-blue-500/20"
            >
              <View className="flex-row items-center justify-center gap-1.5">
                <CheckCircle2 size={18} color="white" />
                <Typography className="text-white font-heading-semibold text-xs text-center">
                  Book Now
                </Typography>
              </View>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  },
);
