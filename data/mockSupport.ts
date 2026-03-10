export interface SupportAction {
    label: string;
    payload: string;
    type: 'cancel' | 'track' | 'refund' | 'contact';
}

export interface SupportMessage {
    id: string;
    text: string;
    sender: 'user' | 'agent';
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
    actions?: SupportAction[];
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: 'General' | 'Payments' | 'Bookings' | 'Tracking';
}

export const FAQ_CATEGORIES = ['General', 'Payments', 'Bookings', 'Tracking'] as const;

export const MOCK_FAQS: FAQ[] = [
    {
        id: '1',
        category: 'General',
        question: 'How do I book a service?',
        answer: 'Navigate to the "Nearby" tab, pick a provider, and select your service.'
    },
    {
        id: '4',
        category: 'General',
        question: 'Is the service 24/7?',
        answer: 'Yes, our platform connects you with providers available around the clock.'
    },
    {
        id: '2',
        category: 'Bookings',
        question: 'Can I cancel my booking?',
        answer: 'Yes, cancellations are allowed up to 2 hours before the service from the "My Bookings" screen.'
    },
    {
        id: '5',
        category: 'Bookings',
        question: 'How do I reschedule?',
        answer: 'Currently, you must cancel and re-book for a different time.'
    },
    {
        id: '3',
        category: 'Tracking',
        question: 'How do I track my provider?',
        answer: 'A "Track Provider" button appears in your Booking details once the status is "On the Way".'
    },
    {
        id: '6',
        category: 'Payments',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, Apple Pay, and Google Pay.'
    },
    {
        id: '7',
        category: 'Payments',
        question: 'How do I get a refund?',
        answer: 'Refunds for cancelled bookings are processed automatically within 3-5 business days.'
    }
];

export const INITIAL_SUPPORT_MESSAGES: SupportMessage[] = [
    {
        id: 'init_1',
        text: 'Hello! I am your AI assistant. How can I help you today?',
        sender: 'agent',
        timestamp: new Date(Date.now() - 3600000),
        status: 'read'
    }
];

export const QUICK_REPLIES = [
    'Track my order',
    'Cancel booking',
    'Refund status',
    'Talk to agent'
];
