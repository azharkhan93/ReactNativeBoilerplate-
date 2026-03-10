import { useState, useCallback } from 'react';
import { SupportMessage, INITIAL_SUPPORT_MESSAGES, SupportAction } from '@/data/mockSupport';

const INTENT_MAP: Record<string, { text: string; actions?: SupportAction[] }> = {
    'cancel': {
        text: "I see you'd like to cancel a booking. I can help with that. Which booking would you like to cancel?",
        actions: [{ label: 'View Active Bookings', payload: 'bookings', type: 'cancel' }]
    },
    'track': {
        text: "You can track your provider in real-time once they are 'On the Way'.",
        actions: [{ label: 'Track Now', payload: 'tracking', type: 'track' }]
    },
    'refund': {
        text: "Refunds are processed automatically for cancelled bookings. Would you like to check a specific refund status?",
        actions: [{ label: 'Refund Policy', payload: 'policy', type: 'refund' }]
    },
    'agent': {
        text: "Connecting you to a human agent... please wait a moment.",
        actions: [{ label: 'Call Support', payload: 'tel:123', type: 'contact' }]
    }
};

export const useSupportChat = () => {
    const [messages, setMessages] = useState<SupportMessage[]>(INITIAL_SUPPORT_MESSAGES);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = useCallback((text: string) => {
        const userMsg: SupportMessage = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
            status: 'sent'
        };

        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        setTimeout(() => {
            const lowerText = text.toLowerCase();
            const intentKey = Object.keys(INTENT_MAP).find(key => lowerText.includes(key));
            const response = intentKey ? INTENT_MAP[intentKey] : {
                text: "I'm not sure I understand. Try asking about 'cancellation', 'tracking', or 'refunds'."
            };

            const botMsg: SupportMessage = {
                id: (Date.now() + 1).toString(),
                text: response.text,
                sender: 'agent',
                timestamp: new Date(),
                status: 'delivered',
                actions: response.actions
            };

            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    }, []);

    return { messages, isTyping, sendMessage };
};

