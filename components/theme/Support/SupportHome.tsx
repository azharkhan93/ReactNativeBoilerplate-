 
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  CircleHelp,
  Search,
  MessageCircle,
  AlertCircle,
} from 'lucide-react-native';
import { Typography } from '../Typography';
import { FormInput } from '../FormInput';
import { FAQSection } from './FAQSection';
import { ScreenScrollView } from '../ScreenScrollView';

export interface SupportHomeProps {
  search: string;
  onSearchChange: (text: string) => void;
  onStartChat: () => void;
  onNavigate: (screen: string) => void;
  onReportIssue?: () => void;
}

export const SupportHome: React.FC<SupportHomeProps> = ({
  search,
  onSearchChange,
  onStartChat,
  onNavigate,
  onReportIssue,
}) => (
  <ScreenScrollView
    className="flex-1 bg-notchLight"
  >
    <View className="px-5 pt-2">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="bg-primary-500/10 border border-primary-500/20 p-2.5 rounded-xl mr-3">
            <CircleHelp size={22} color="#3b82f6" />
          </View>
          <View>
            <Typography variant="body" className="font-body-bold text-slate-900">
              Help Center
            </Typography>
            <Typography variant="body-sm" className="text-slate-500 text-[10px] font-body-medium">
              24/7 Support
            </Typography>
          </View>
        </View>
        <TouchableOpacity
          onPress={onStartChat}
          className="bg-primary-500 px-4 py-2 rounded-xl shadow-sm shadow-primary-200"
        >
          <Typography className="text-white text-[12px] font-body-bold">
            Chat Now
          </Typography>
        </TouchableOpacity>
      </View>

      {/* Compact Search Bar utilizing FormInput */}
      <FormInput
        placeholder="Search for quick help..."
        placeholderTextColor="#6b7280"
        value={search}
        onChangeText={onSearchChange}
        containerClassName="mb-4"
        inputClassName="h-11 bg-white border-slate-200/60 rounded-xl"
        icon={<Search size={16} color="#64748b" />}
      />
    </View>

    <FAQSection search={search} />

    <View className="px-5 mt-4 mb-4">
      <TouchableOpacity
        onPress={() =>
          onReportIssue ? onReportIssue() : onNavigate('serviceDispute')
        }
        className="bg-red-500/5 p-5 rounded-3xl border border-red-500/20 flex-row items-center"
      >
        <View className="bg-red-500 p-2.5 rounded-xl mr-4">
          <AlertCircle size={22} color="white" />
        </View>
        <View className="flex-1">
          <Typography variant="body-sm" className="font-body-bold text-red-600">
            Report a problem
          </Typography>
          <Typography
            variant="body-sm"
            className="text-red-500/80 text-[11px] mt-0.5 font-body-medium"
          >
            Issue with a recent car wash? Let us know.
          </Typography>
        </View>
      </TouchableOpacity>
    </View>

    <View className="px-5 mt-4 mb-10">
      <TouchableOpacity
        onPress={onStartChat}
        className="bg-notch p-5 rounded-3xl border border-blue-200/50 flex-row items-center shadow-sm shadow-slate-100"
      >
        <View className="flex-1">
          <Typography
            variant="body-sm"
            className="font-body-bold text-primary-600"
          >
            Still stuck?
          </Typography>
          <Typography
            variant="body-sm"
            className="text-slate-600 text-[11px] mt-0.5 font-body-medium"
          >
            Talk to our AI bot for instant answers
          </Typography>
        </View>
        <View className="bg-primary-500 p-2.5 rounded-full shadow-md shadow-primary-200">
          <MessageCircle size={18} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  </ScreenScrollView>
);
