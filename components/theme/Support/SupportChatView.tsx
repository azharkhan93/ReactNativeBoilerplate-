import React from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
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
    bottomInset,
}) => {
    const bottomSpace = bottomInset > 0 ? bottomInset : 12;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 bg-[#F1F6FD]"
        >
            <SupportHeader onBack={onBack} />
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <MessageBubble
                        message={item}
                        onActionPress={(p) => onSend(p)}
                    />
                )}
                className="flex-1 pt-4 bg-[#F1F6FD]"
                contentContainerStyle={styles.listContent}
                keyboardShouldPersistTaps="handled"
            />

            <View className="w-full bg-[#F1F6FD] border-t border-blue-200/40 pt-2">
                <QuickReplies onReplySelect={onSend} />

                {isTyping && (
                    <Typography variant="body-sm" className="px-5 my-1.5 text-slate-500 italic font-body-medium">
                      AI assistant is typing...
                    </Typography>
                )}
                <ChatInput onSend={onSend} />
                <View style={{ height: bottomSpace }} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    listContent: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingVertical: 12,
    },
});



