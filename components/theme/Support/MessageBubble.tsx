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
        <View className={`flex-row ${isUser ? 'justify-end' : 'justify-start'} mb-3 px-4`}>
            <View className={`max-w-[82%] p-3.5 rounded-2xl ${isUser ? 'bg-primary-500 rounded-tr-none shadow-sm shadow-primary-500/20' : 'bg-white border border-slate-200/80 rounded-tl-none shadow-sm shadow-slate-100'}`}>
                <Typography variant="body-sm" className={isUser ? 'text-white font-medium text-[14px] leading-5' : 'text-slate-800 font-medium text-[14px] leading-5'}>{message.text}</Typography>

                {message.actions && (
                    <View className="mt-2.5 space-y-2 gap-1.5">
                        {message.actions.map((action, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => onActionPress?.(action.payload)}
                                className={`py-2 px-4 rounded-xl items-center justify-center ${isUser ? 'bg-white/20 border border-white/30' : 'bg-blue-50/80 border border-blue-200/80'}`}
                                activeOpacity={0.7}
                            >
                                <Typography variant="body-sm" className={isUser ? 'text-white font-semibold' : 'text-primary-600 font-semibold'}>
                                    {action.label}
                                </Typography>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <Typography variant="body-sm" className={`text-[10px] mt-1 text-right font-medium ${isUser ? 'text-primary-100' : 'text-slate-400'}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            </View>
        </View>
    );
};




