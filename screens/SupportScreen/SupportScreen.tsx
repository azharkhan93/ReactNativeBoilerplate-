import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Typography,
    SupportHeader,
    MessageBubble,
    ChatInput,
    FAQSection,
    QuickReplies
} from '@/components/theme';

import { useSupportChat } from '@/hooks/useSupportChat';

export const SupportScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { messages, isTyping, sendMessage } = useSupportChat();
    const [showChat, setShowChat] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (showChat) flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages, showChat]);

    const SupportHome = () => (
        <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
            <View className="px-5 py-6">
                <Typography variant="h2" className="font-black">Help Center</Typography>
                <Typography variant="body" className="text-gray-500 mt-2">Find answers or chat with our automated support.</Typography>
            </View>

            <FAQSection />

            <View className="px-5 mt-6">
                <Typography variant="body" className="font-bold mb-4">Proactive Suggestions</Typography>
                <View className="flex-row space-x-2">
                    <TouchableOpacity onPress={() => setShowChat(true)} className="flex-1 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                        <Typography variant="body-sm" className="font-bold text-blue-900">Track Recent Booking</Typography>
                        <Typography variant="body-sm" className="text-blue-700 mt-1">Check status of your last job</Typography>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="px-5 mt-10 mb-10">
                <View className="bg-primary-50 p-6 rounded-[32px] border border-primary-100">
                    <Typography variant="body" className="font-bold text-primary-900">Need more help?</Typography>
                    <Typography variant="body-sm" className="text-primary-700 mt-2 mb-4">Our AI bot and team are online 24/7.</Typography>
                    <TouchableOpacity onPress={() => setShowChat(true)} className="bg-primary-500 self-start px-6 py-3 rounded-xl">
                        <Typography className="text-white font-bold">Start Live Chat</Typography>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            {!showChat ? <SupportHome /> : (
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                    <SupportHeader onBack={() => setShowChat(false)} />
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
                    />

                    <QuickReplies onReplySelect={sendMessage} />

                    {isTyping && <Typography variant="body-sm" className="px-5 mb-2 text-gray-400 italic">AI is typing...</Typography>}
                    <ChatInput onSend={sendMessage} />
                    <View style={{ height: insets.bottom }} />
                </KeyboardAvoidingView>
            )}
        </View>
    );
};


