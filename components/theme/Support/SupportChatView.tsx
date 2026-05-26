/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SupportHeader } from './SupportHeader';
import { MessageBubble } from './MessageBubble';

import { ChatInput } from './ChatInput';
import { Typography } from '../Typography';
import { SupportMessage } from '@/data/mockSupport';
import { QuickReplies } from './QuickReplies';

export interface SupportChatViewProps {
    messages: SupportMessage[];
    isTyping: boolean;
    onSend: (text: string) => void;
    onBack: () => void;
    flatListRef: React.RefObject<FlatList>;
    bottomInset: number;
}

export const SupportChatView: React.FC<SupportChatViewProps> = ({
    messages,
    isTyping,
    onSend,
    onBack,
    flatListRef,
    bottomInset
}) => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <SupportHeader onBack={onBack} />
        <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <MessageBubble
                    message={item}
                    onActionPress={(p) => console.log('Action:', p)}
                />
            )}
            className="flex-1 pt-4"
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
        />

        <QuickReplies onReplySelect={onSend} />

        {isTyping && <Typography variant="body-sm" className="px-5 mb-2 text-gray-400 italic">AI is typing...</Typography>}
        <ChatInput onSend={onSend} />
        <View style={{ height: bottomInset }} />
    </KeyboardAvoidingView>
);
