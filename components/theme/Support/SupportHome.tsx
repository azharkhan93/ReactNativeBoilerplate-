/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import {
  CircleHelp,
  Search,
  X,
  MessageCircle,
  AlertCircle,
} from 'lucide-react-native';
import { Typography } from '../Typography';
import { FAQSection } from './FAQSection';

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
  <ScrollView
    className="flex-1 bg-gray-950"
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 125 }}
  >
    <View className="px-5 pt-2">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="bg-primary-500/10 border border-primary-500/20 p-2.5 rounded-xl mr-3">
            <CircleHelp size={22} color="#3b82f6" />
          </View>
          <View>
            <Typography variant="body" className="font-body-bold text-white">
              Help Center
            </Typography>
            <Typography variant="body-sm" className="text-gray-400 text-[10px]">
              24/7 Support
            </Typography>
          </View>
        </View>
        <TouchableOpacity
          onPress={onStartChat}
          className="bg-primary-500 px-4 py-2 rounded-xl"
        >
          <Typography className="text-white text-[12px] font-body-bold">
            Chat Now
          </Typography>
        </TouchableOpacity>
      </View>

      {/* Compact Search Bar */}
      <View className="bg-gray-900 rounded-xl px-3 py-2 flex-row items-center mb-4 border border-gray-800">
        <Search size={16} color="#9CA3AF" />
        <TextInput
          className="flex-1 ml-2 text-white py-0.5 text-[13px]"
          placeholder="Search for quick help..."
          placeholderTextColor="#6b7280"
          value={search}
          onChangeText={onSearchChange}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <X size={16} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
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
          <Typography variant="body-sm" className="font-body-bold text-red-400">
            Report a problem
          </Typography>
          <Typography
            variant="body-sm"
            className="text-red-500/60 text-[11px] mt-0.5 font-body"
          >
            Issue with a recent car wash? Let us know.
          </Typography>
        </View>
      </TouchableOpacity>
    </View>

    <View className="px-5 mt-4 mb-10">
      <TouchableOpacity
        onPress={onStartChat}
        className="bg-primary-500/5 p-5 rounded-3xl border border-primary-500/20 flex-row items-center"
      >
        <View className="flex-1">
          <Typography
            variant="body-sm"
            className="font-body-bold text-primary-400"
          >
            Still stuck?
          </Typography>
          <Typography
            variant="body-sm"
            className="text-primary-500/60 text-[11px] mt-0.5 font-body"
          >
            Talk to our AI bot for instant answers
          </Typography>
        </View>
        <View className="bg-primary-500 p-2.5 rounded-full">
          <MessageCircle size={18} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  </ScrollView>
);
