import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SupportHome, SupportChatView } from '@/components/theme';
import { useSupportChat } from '@/hooks/useSupportChat';

export const SupportScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { messages, isTyping, sendMessage } = useSupportChat();

    const [showChat, setShowChat] = useState(false);
    const [search, setSearch] = useState('');
    const flatListRef = useRef<FlatList>(null!);

    useEffect(() => {
        if (showChat) flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages, showChat]);

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            {!showChat ? (
                <SupportHome
                    search={search}
                    onSearchChange={setSearch}
                    onStartChat={() => setShowChat(true)}
                />
            ) : (
                <SupportChatView
                    messages={messages}
                    isTyping={isTyping}
                    onSend={sendMessage}
                    onBack={() => setShowChat(false)}
                    flatListRef={flatListRef}
                    bottomInset={insets.bottom}
                />
            )}
        </View>
    );
};
