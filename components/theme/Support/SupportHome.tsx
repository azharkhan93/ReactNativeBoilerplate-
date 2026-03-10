import React from 'react';
import { View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { CircleHelp, Search, X, MessageCircle } from 'lucide-react-native';
import { Typography } from '../Typography';
import { FAQSection } from './FAQSection';

export interface SupportHomeProps {
    search: string;
    onSearchChange: (text: string) => void;
    onStartChat: () => void;
}

export const SupportHome: React.FC<SupportHomeProps> = ({ search, onSearchChange, onStartChat }) => (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
        {/* Compressed Custom Header */}
        <View className="px-5 pt-2">
            <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                    <View className="bg-primary-50 p-2.5 rounded-xl mr-3">
                        <CircleHelp size={22} color="#3B82F6" />
                    </View>
                    <View>
                        <Typography variant="body" className="font-black text-gray-900">Help Center</Typography>
                        <Typography variant="body-sm" className="text-gray-400 text-[10px]">24/7 Support</Typography>
                    </View>
                </View>
                <TouchableOpacity onPress={onStartChat} className="bg-primary-500 px-4 py-2 rounded-xl">
                    <Typography className="text-white text-[12px] font-bold">Chat Now</Typography>
                </TouchableOpacity>
            </View>

            {/* Compact Search Bar */}
            <View className="bg-gray-100 rounded-xl px-3 py-2 flex-row items-center mb-4 border border-gray-200/50">
                <Search size={16} color="#9CA3AF" />
                <TextInput
                    className="flex-1 ml-2 text-gray-800 py-0.5 text-[13px]"
                    placeholder="Search for quick help..."
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

        <View className="px-5 mt-4 mb-10">
            <TouchableOpacity
                onPress={onStartChat}
                className="bg-primary-50 p-5 rounded-3xl border border-primary-100 flex-row items-center"
            >
                <View className="flex-1">
                    <Typography variant="body-sm" className="font-bold text-primary-900">Still stuck?</Typography>
                    <Typography variant="body-sm" className="text-primary-700 text-[11px] mt-0.5">Talk to our AI bot for instant answers</Typography>
                </View>
                <View className="bg-primary-500 p-2.5 rounded-full">
                    <MessageCircle size={18} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    </ScrollView>
);
