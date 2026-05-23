import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Send, Plus, Paperclip } from 'lucide-react-native';

export interface ChatInputProps {
    onSend: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text.trim());
            setText('');
        }
    };

    return (
        <View className="flex-row items-center p-4 bg-gray-950 border-t border-gray-900">
            <TouchableOpacity className="p-2 bg-gray-900 border border-gray-800 rounded-full mr-2">
                <Plus size={20} color="#9ca3af" />
            </TouchableOpacity>

            <View className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl px-4 py-2 flex-row items-center">
                <TextInput
                    className="flex-1 text-white py-1 font-body"
                    placeholder="Type a message..."
                    placeholderTextColor="#6b7280"
                    value={text}
                    onChangeText={setText}
                    multiline
                />
                <TouchableOpacity className="ml-2">
                    <Paperclip size={20} color="#9ca3af" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleSend}
                disabled={!text.trim()}
                className={`ml-3 p-3 rounded-full ${text.trim() ? 'bg-primary-500' : 'bg-gray-800'}`}
            >
                <Send size={18} color="white" />
            </TouchableOpacity>
        </View>
    );
};
