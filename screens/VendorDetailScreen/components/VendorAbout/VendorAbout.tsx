import React from 'react';
import { View } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { Typography } from '@/components/theme/Typography';

export interface VendorAboutProps {
  description?: string | null;
  whyChooseMe?: string | null;
}

export const VendorAbout: React.FC<VendorAboutProps> = ({
  description,
  whyChooseMe,
}) => {
  return (
    <View className="mt-6 flex-col gap-6">
      {description && (
        <View>
          <Typography
            variant="subheading"
            className="text-slate-900 font-body-semibold mb-2"
          >
            About Our Service
          </Typography>
          <Typography
            variant="body"
            className="text-slate-600 leading-relaxed font-body"
          >
            {description}
          </Typography>
        </View>
      )}

      {whyChooseMe && (
        <View className="bg-notch border border-blue-200/50 rounded-2xl p-4 flex-row items-start">
          <View className="bg-primary-500/10 p-2 rounded-xl border border-primary-500/10 mr-3 mt-0.5">
            <Sparkles size={16} color="#3b82f6" />
          </View>
          <View className="flex-1">
            <Typography
              variant="body"
              className="text-primary-600 font-body-bold mb-1"
            >
              Why Choose Us?
            </Typography>
            <Typography
              variant="body-sm"
              className="text-slate-700 leading-relaxed font-body"
            >
              {whyChooseMe}
            </Typography>
          </View>
        </View>
      )}
    </View>
  );
};
