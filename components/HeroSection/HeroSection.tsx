import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Typography } from '../theme';
import { HERO_SLIDES } from './constants';
import { ShieldCheck, Zap } from 'lucide-react-native';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  className,
}) => {
  const [main, second, third] = HERO_SLIDES;

  return (
    <View className={cn('px-5 py-4', className)}>
      <View className="flex-row gap-3 h-[280px]">
        {/* Main Spotlight - Featured exterior care */}
        <View className="flex-1 rounded-[32px] overflow-hidden relative shadow-lg shadow-black/10">
          <Image source={main.image} className="w-full h-full" resizeMode="cover" />
          <View className="absolute inset-0 bg-black/40" />
          <View className="absolute inset-0 p-5 justify-between">
            <View className="bg-white/20 self-start p-2 rounded-xl backdrop-blur-md border border-white/20">
              <Zap size={16} color="#fbbf24" fill="#fbbf24" />
            </View>
            <View>
              <Typography className="text-white text-xl font-heading-bold leading-tight mb-1">
                {main.heading}
              </Typography>
              <Typography className="text-white/70 font-body text-[10px]" numberOfLines={2}>
                {main.description}
              </Typography>
            </View>
          </View>
        </View>

        {/* Secondary Stack */}
        <View className="w-[42%] gap-3">
          {/* Top Tile */}
          <View className="flex-1 rounded-[28px] overflow-hidden relative shadow-md shadow-black/5">
            <Image source={second.image} className="w-full h-full" resizeMode="cover" />
            <View className="absolute inset-0 bg-black/30" />
            <View className="absolute inset-0 p-4 justify-end">
              <Typography className="text-white text-sm font-heading-bold leading-tight" numberOfLines={2}>
                {second.heading}
              </Typography>
            </View>
          </View>

         
          <View className="flex-1 rounded-[28px] overflow-hidden relative shadow-md shadow-black/5 bg-primary-600">
            <Image source={third.image} className="w-full h-full opacity-60" resizeMode="cover" />
            <View className="absolute inset-0 p-4 justify-between">
              <ShieldCheck size={14} color="white" />
              <Typography className="text-white text-xs font-body-bold leading-tight">
                {third.heading}
              </Typography>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

