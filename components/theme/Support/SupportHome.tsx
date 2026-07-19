 
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
    className="flex-1 bg-[#F1F6FD]"
  >
    <View className="px-5 pt-3">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="bg-primary-500/10 border border-primary-500/20 p-2.5 rounded-2xl mr-3 shadow-sm shadow-blue-100">
            <CircleHelp size={22} color="#3b82f6" />
          </View>
          <View>
            <Typography variant="subheading" className="font-heading-semibold text-slate-900 text-base">
              Help Center
            </Typography>
            <Typography variant="body-sm" className="text-slate-500 text-xs font-body-medium mt-0.5">
              24/7 Support Assistance
            </Typography>
          </View>
        </View>
        <TouchableOpacity
          onPress={onStartChat}
          className="bg-primary-500 px-4 py-2.5 rounded-full shadow-md shadow-primary-500/30"
          activeOpacity={0.7}
        >
          <Typography className="text-white text-xs font-body-semibold">
            Chat Now
          </Typography>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <FormInput
        placeholder="Search for quick help..."
        placeholderTextColor="#94a3b8"
        value={search}
        onChangeText={onSearchChange}
        containerClassName="mb-4"
        inputClassName="h-12 bg-white border-slate-200/80 rounded-2xl shadow-sm shadow-slate-100 font-body text-sm"
        icon={<Search size={18} color="#64748b" />}
      />
    </View>

    <FAQSection search={search} />

    <View className="px-5 mt-4 mb-4">
      <TouchableOpacity
        onPress={() =>
          onReportIssue ? onReportIssue() : onNavigate('serviceDispute')
        }
        className="bg-red-500/10 p-5 rounded-2xl border border-red-200/80 flex-row items-center shadow-sm shadow-red-100"
        activeOpacity={0.7}
      >
        <View className="bg-red-500 p-3 rounded-xl mr-4 shadow-sm shadow-red-400/30">
          <AlertCircle size={22} color="white" />
        </View>
        <View className="flex-1">
          <Typography variant="body" className="font-body-semibold text-red-700 text-base">
            Report a problem
          </Typography>
          <Typography
            variant="body-sm"
            className="text-red-600/80 text-xs mt-0.5 font-body-medium"
          >
            Issue with a recent car wash? Let us know.
          </Typography>
        </View>
      </TouchableOpacity>
    </View>

    <View className="px-5 mt-2 mb-10">
      <TouchableOpacity
        onPress={onStartChat}
        className="bg-blue-50/90 p-5 rounded-2xl border border-blue-200/80 flex-row items-center shadow-sm shadow-blue-100"
        activeOpacity={0.7}
      >
        <View className="flex-1">
          <Typography
            variant="body"
            className="font-body-semibold text-primary-600 text-base"
          >
            Still stuck?
          </Typography>
          <Typography
            variant="body-sm"
            className="text-slate-600 text-xs mt-0.5 font-body-medium"
          >
            Talk to our AI bot for instant answers
          </Typography>
        </View>
        <View className="bg-primary-500 p-3 rounded-full shadow-md shadow-primary-500/30">
          <MessageCircle size={20} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  </ScreenScrollView>
);

