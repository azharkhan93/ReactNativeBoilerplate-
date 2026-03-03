import { Wrench, CreditCard, Calendar, BarChart3, Briefcase } from 'lucide-react-native';

export const VENDOR_STATS = [
    { label: 'RATING', value: '4.9' },
    { label: 'JOBS', value: '1.2k' },
    { label: 'ON-TIME', value: '98%' },
];

export const MANAGEMENT_LINKS = [
    {
        id: 'business',
        label: 'Business Profile',
        subtitle: 'Company details & registration',
        icon: Briefcase,
        color: '#3b82f6',
    },
    {
        id: 'services',
        label: 'Manage Services',
        subtitle: 'Pricing, packages & durations',
        icon: Wrench,
        color: '#3b82f6',
    },
    {
        id: 'bank',
        label: 'Bank Account',
        subtitle: 'Payout methods & tax info',
        icon: CreditCard,
        color: '#22c55e',
    },
    {
        id: 'availability',
        label: 'Availability',
        subtitle: 'Schedule & service windows',
        icon: Calendar,
        color: '#a855f7',
    },
    {
        id: 'analytics',
        label: 'Business Insights',
        subtitle: 'Analytics & monthly reports',
        icon: BarChart3,
        color: '#f59e0b',
    },
];
