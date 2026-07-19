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
        <View className="flex-row items-center px-4 py-3 bg-[#F1F6FD] border-t border-blue-200/50">
            <TouchableOpacity className="w-10 h-10 bg-white border border-slate-200/80 rounded-full items-center justify-center mr-2 shadow-sm shadow-slate-100" activeOpacity={0.7}>
                <Plus size={20} color="#64748b" />
            </TouchableOpacity>

            <View className="flex-1 bg-white border border-slate-200/80 rounded-full px-4 py-1.5 flex-row items-center shadow-sm shadow-slate-100">
                <TextInput
                    className="flex-1 text-slate-900 py-1 font-body text-sm"
                    placeholder="Type a message..."
                    placeholderTextColor="#94a3b8"
                    value={text}
                    onChangeText={setText}
                    multiline
                />
                <TouchableOpacity className="ml-2" activeOpacity={0.7}>
                    <Paperclip size={18} color="#64748b" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleSend}
                disabled={!text.trim()}
                activeOpacity={0.7}
                className={`ml-2 w-10 h-10 rounded-full items-center justify-center ${text.trim() ? 'bg-primary-500 shadow-md shadow-primary-500/30' : 'bg-slate-200'}`}
            >
                <Send size={18} color="white" />
            </TouchableOpacity>
        </View>
    );
};

