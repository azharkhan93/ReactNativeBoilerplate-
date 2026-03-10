import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Typography } from '../Typography';
import { QUICK_REPLIES } from '@/data/mockSupport';

export interface QuickRepliesProps {
    onReplySelect: (reply: string) => void;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({ onReplySelect }) => {
    return (
        <View className="py-2">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            >
                {QUICK_REPLIES.map(reply => (
                    <TouchableOpacity
                        key={reply}
                        onPress={() => onReplySelect(reply)}
                        className="bg-primary-50 border border-primary-100 px-4 py-2.5 rounded-2xl mr-2"
                    >
                        <Typography variant="body-sm" className="text-primary-600 font-bold">
                            {reply}
                        </Typography>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
