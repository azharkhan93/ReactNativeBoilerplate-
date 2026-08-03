/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Sparkles, ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react-native';

import { Typography, Button } from '@/components/theme';
import { AnalysisResultCardProps } from './types';
import { analysisResultStyles } from './styles';

export const AnalysisResultCard: React.FC<AnalysisResultCardProps> = React.memo(
  ({ result, onBookPackagePress, onRescanPress }) => {
    const { recommendedPackage, detectedConditions } = result;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        className={analysisResultStyles.container}
      >
        {/* Header Row */}
        <View className={analysisResultStyles.headerRow}>
          <View className={analysisResultStyles.titleCol}>
            <Typography className={analysisResultStyles.titleText}>
              AI Inspection Results
            </Typography>
            <Typography className={analysisResultStyles.vehicleSubtext}>
              Detected: {result.vehicleType}
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
          Detected Flaws & Dirt Level ({detectedConditions.length})
        </Typography>

        <View className={analysisResultStyles.conditionsList}>
          {detectedConditions.map(cond => {
            const isSevere = cond.severity === 'severe';
            return (
              <View key={cond.id} className={analysisResultStyles.conditionItem}>
                <View className={analysisResultStyles.conditionRow}>
                  <View className="flex-row items-center gap-2">
                    <ShieldAlert
                      size={16}
                      color={isSevere ? '#f43f5e' : '#f59e0b'}
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
                      {cond.severity} ({Math.round(cond.confidenceScore * 100)}%)
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
            <Sparkles size={20} color="#60a5fa" />
            <Typography className={analysisResultStyles.recTitle}>
              Recommended: {recommendedPackage.title}
            </Typography>
          </View>

          <Typography className={analysisResultStyles.recReason}>
            {recommendedPackage.reason}
          </Typography>

          <View className={analysisResultStyles.priceRow}>
            <Typography className={analysisResultStyles.discountPrice}>
              ${recommendedPackage.discountedPrice.toFixed(2)}
            </Typography>
            <Typography className={analysisResultStyles.originalPrice}>
              ${recommendedPackage.originalPrice.toFixed(2)}
            </Typography>
          </View>
        </View>

        {/* Action Buttons */}
        <View className={analysisResultStyles.actionsRow}>
          <TouchableOpacity
            onPress={onRescanPress}
            activeOpacity={0.7}
            className={analysisResultStyles.rescanButton}
          >
            <View className="flex-row items-center gap-1.5">
              <RotateCcw size={16} color="#cbd5e1" />
              <Typography className={analysisResultStyles.rescanText}>
                Re-scan
              </Typography>
            </View>
          </TouchableOpacity>

          <View className="flex-1">
            <Button
              onPress={() =>
                onBookPackagePress(
                  recommendedPackage.packageId,
                  recommendedPackage.suggestedAddons,
                )
              }
              variant="primary"
              size="md"
              className="w-full shadow-lg shadow-blue-500/20"
            >
              <View className="flex-row items-center justify-center gap-2">
                <CheckCircle2 size={18} color="white" />
                <Typography className="text-white font-heading-semibold text-sm">
                  Book This Package
                </Typography>
              </View>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  },
);
