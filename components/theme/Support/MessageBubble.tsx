import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../Typography';
import { SupportMessage } from '@/data/mockSupport';
import React from 'react';

export interface MessageBubbleProps {
    message: SupportMessage;
    onActionPress?: (payload: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onActionPress }) => {
    const isUser = message.sender === 'user';
    return (
        <View className={`flex-row ${isUser ? 'justify-end' : 'justify-start'} mb-4 px-4`}>
            <View className={`max-w-[80%] p-4 rounded-[20px] ${isUser ? 'bg-primary-500 rounded-tr-none' : 'bg-gray-900 border border-gray-800 rounded-tl-none'}`}>
                <Typography variant="body-sm" className={isUser ? 'text-white font-body' : 'text-white font-body'}>{message.text}</Typography>

                {message.actions && (
                    <View className="mt-3 space-y-2">
                        {message.actions.map((action, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => onActionPress?.(action.payload)}
                                className={`py-2 rounded-xl items-center ${isUser ? 'bg-white/20 border border-white/30' : 'bg-gray-800 border border-gray-700'}`}
                            >
                                <Typography variant="body-sm" className={isUser ? 'text-white font-body-bold' : 'text-primary-400 font-body-bold'}>
                                    {action.label}
                                </Typography>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <Typography variant="body-sm" className={`text-[9px] mt-1 text-right ${isUser ? 'text-primary-100' : 'text-gray-500'}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            </View>
        </View>
    );
};


