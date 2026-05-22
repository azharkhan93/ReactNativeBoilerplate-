import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Typography } from '@/components/theme';
import {
  ShieldCheck,
  Info,
  Sparkles,
  Image as ImageIcon,
  Edit2,
} from 'lucide-react-native';
import { BusinessProfileFormData } from '../../hooks/useBusinessProfile';

export interface BusinessExtendedDetailsProps {
  profile: BusinessProfileFormData;
  onEditPress: () => void;
  onWhyChooseMeEditPress: () => void;
}

export const BusinessExtendedDetails: React.FC<
  BusinessExtendedDetailsProps
> = ({ profile, onEditPress, onWhyChooseMeEditPress }) => {
  const images = profile.images ?? [];
  const whyChooseMe = profile.whyChooseMe?.trim() || '';
  const description = profile.description?.trim() || '';

  // Clean value propositions: split by comma or period or newlines to make a beautiful list of items
  const whyChooseMeItems = whyChooseMe
    ? whyChooseMe
        .split(/[.,;\n]+/)
        .map(item => item.trim())
        .filter(Boolean)
    : [];

  return (
    <View className="mt-3 mb-6">
      {/* Horizontally scrolling gallery */}
      <View className="flex-row items-center justify-between mb-3 px-0.5">
        <Typography variant="subheading" className="text-white">
          Business Showcase Gallery
        </Typography>
        <TouchableOpacity
          onPress={onEditPress}
          className="flex-row items-center"
          activeOpacity={0.7}
        >
          <Edit2 size={13} color="#3b82f6" />
          <Typography
            variant="body"
            className="text-primary-400 font-body-semibold ml-1.5"
          >
            Manage
          </Typography>
        </TouchableOpacity>
      </View>

      {images.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mb-6"
          contentContainerStyle={s.galleryScroll}
        >
          {images.map((img, idx) => (
            <View
              key={idx}
              className="w-[140px] h-[95px] rounded-[20px] overflow-hidden border border-slate-800 bg-[#0f1623]"
            >
              <Image
                source={{ uri: img }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <TouchableOpacity
          onPress={onEditPress}
          className="w-full bg-[#0f1623] rounded-[24px] border border-slate-800 py-6 items-center justify-center mb-5"
          style={s.dashedBorder}
          activeOpacity={0.8}
        >
          <View className="w-11 h-11 rounded-full bg-blue-500/10 items-center justify-center">
            <ImageIcon size={22} color="#3b82f6" />
          </View>
          <Typography
            variant="body-sm"
            className="text-gray-400 font-body-semibold mt-2"
          >
            No portfolio images added yet
          </Typography>
          <Typography
            variant="body"
            className="text-gray-600 text-center px-4 mt-1"
          >
            Showcase your storefront, workspace, or past detaily works to
            attract more customers.
          </Typography>
        </TouchableOpacity>
      )}

      {/* Why Choose Us Proposition Section */}
      <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 mb-5">
        <View className="flex-row items-center justify-between mb-4 border-b border-gray-800/60 pb-3">
          <View className="flex-row items-center">
            <Sparkles size={18} color="#f59e0b" />
            <Typography
              variant="body"
              className="text-white font-body-semibold ml-2"
            >
              Why Choose Me
            </Typography>
          </View>
          <TouchableOpacity onPress={onWhyChooseMeEditPress} activeOpacity={0.7}>
            <Typography
              variant="body"
              className="text-primary-400 font-body-semibold"
            >
              {whyChooseMeItems.length > 0 ? 'Edit' : '+ Add'}
            </Typography>
          </TouchableOpacity>
        </View>

        {whyChooseMeItems.length > 0 ? (
          <View className="gap-3">
            {whyChooseMeItems.map((item, idx) => (
              <View key={idx} className="flex-row items-start">
                <View className="w-5 h-5 items-center justify-center mr-2 mt-0.5">
                  <ShieldCheck size={14} color="#f59e0b" />
                </View>
                <Typography
                  variant="body-sm"
                  className="text-gray-300 leading-5 flex-1"
                >
                  {item}
                </Typography>
              </View>
            ))}
          </View>
        ) : (
          <Typography
            variant="body-sm"
            className="text-gray-500 italic leading-5"
          >
            Add short, punchy value propositions (e.g. Eco-Friendly Products,
            5-Star Rated Service, Certified Detailing Experts) to display on
            your public profile page.
          </Typography>
        )}
      </View>

      {/* Elaborated Description Section */}
      <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5">
        <View className="flex-row items-center justify-between mb-4 border-b border-gray-800/60 pb-3">
          <View className="flex-row items-center">
            <Info size={18} color="#3b82f6" />
            <Typography
              variant="body"
              className="text-white font-body-semibold ml-2"
            >
              About Our Business
            </Typography>
          </View>
          {!description && (
            <TouchableOpacity onPress={onEditPress} activeOpacity={0.7}>
              <Typography
                variant="body"
                className="text-primary-400 font-body-semibold"
              >
                + Add
              </Typography>
            </TouchableOpacity>
          )}
        </View>

        {description ? (
          <Typography
            variant="body-sm"
            className="text-gray-300 leading-6 font-body"
          >
            {description}
          </Typography>
        ) : (
          <Typography
            variant="body-sm"
            className="text-gray-500 italic leading-5"
          >
            Provide a complete story of your business: your services, quality
            standard, operating values, and what sets your experience apart.
          </Typography>
        )}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  dashedBorder: {
    borderStyle: 'dashed',
  },
  galleryScroll: {
    gap: 12,
    paddingHorizontal: 2,
  },
});
