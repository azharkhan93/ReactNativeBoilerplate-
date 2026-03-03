import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography, Container, Button } from '@/components/theme';
import { ProfileAvatar } from '@/components/Profile/ProfileAvatar';
import {
    ChevronLeft,
    Settings,
    MapPin,
    BadgeCheck,
    Pencil,
    Wrench,
    CreditCard,
    Calendar,
    BarChart3,
    LogOut,
    ChevronRight,
} from 'lucide-react-native';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { AvailabilityContent } from '../Availability';
import { BankAccountDetails } from '../BankAccountDetails';

const VENDOR_STATS = [
    { label: 'RATING', value: '4.9' },
    { label: 'JOBS', value: '1.2k' },
    { label: 'ON-TIME', value: '98%' },
];

const MANAGEMENT_LINKS = [
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

export interface VendorProfileScreenProps {
    onNavigate?: (screen: string) => void;
}

export const VendorProfileScreen: React.FC<VendorProfileScreenProps> = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();
    const [showAvailability, setShowAvailability] = React.useState(false);
    const [showBankAccount, setShowBankAccount] = React.useState(false);

    const handleLinkPress = (id: string) => {
        if (id === 'availability') { setShowAvailability(true); return; }
        if (id === 'bank') { setShowBankAccount(true); return; }
        if (onNavigate) onNavigate(id);
        console.log('Navigate to:', id);
    };

    return (
        <View className="flex-1 bg-gray-950">
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Header */}
                <View
                    className="px-5 pb-2"
                    style={{ paddingTop: Math.max(insets.top, 20) + 10 }}
                >
                    <View className="flex-row items-center justify-between mb-6">
                        <TouchableOpacity className="w-10 h-10 items-center justify-center">
                            <ChevronLeft size={24} color="white" />
                        </TouchableOpacity>
                        <Typography className="text-white text-lg font-heading-semibold">
                            Provider Profile
                        </Typography>
                        <TouchableOpacity className="w-10 h-10 items-center justify-center">
                            <Settings size={22} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Profile Avatar & Info */}
                <View className="items-center px-5 mb-6">
                    <View className="mb-4">
                        <ProfileAvatar size={100} onEditPress={() => console.log('Edit avatar')} />
                    </View>
                    <Typography className="text-white text-2xl font-heading-bold mb-1">
                        Sparkle Detailing Co.
                    </Typography>
                    <View className="flex-row items-center mb-2">
                        <MapPin size={14} color="#94a3b8" />
                        <Typography variant="body-sm" className="text-gray-400 ml-1">
                            Greater Seattle Area, WA
                        </Typography>
                    </View>
                    <View className="flex-row items-center">
                        <BadgeCheck size={14} color="#22c55e" />
                        <Typography variant="body-sm" className="text-green-400 ml-1 font-body-medium">
                            Verified Provider
                        </Typography>
                    </View>
                </View>

                {/* Edit Profile Button */}
                <View className="px-5 mb-6">
                    <TouchableOpacity
                        className="bg-primary-600 py-3.5 rounded-full flex-row items-center justify-center"
                        activeOpacity={0.8}
                    >
                        <Pencil size={16} color="white" />
                        <Typography className="text-white font-body-bold ml-2">Edit Profile</Typography>
                    </TouchableOpacity>
                </View>

                {/* Stats Row */}
                <View className="flex-row mx-5 mb-8">
                    {VENDOR_STATS.map((stat, index) => (
                        <View
                            key={stat.label}
                            className={`flex-1 items-center py-4 ${index < VENDOR_STATS.length - 1 ? 'border-r border-gray-800' : ''}`}
                        >
                            <Typography className="text-white text-2xl font-heading-bold mb-1">
                                {stat.value}
                            </Typography>
                            <Typography variant="body-sm" className="text-gray-500 font-body-bold text-xs tracking-wider uppercase">
                                {stat.label}
                            </Typography>
                        </View>
                    ))}
                </View>

                {/* Business Management Section */}
                <View className="px-5 mb-8">
                    <Typography className="text-gray-500 font-body-bold text-xs mb-4 tracking-widest uppercase">
                        Business Management
                    </Typography>
                    <View className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
                        {MANAGEMENT_LINKS.map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <TouchableOpacity
                                    key={link.id}
                                    onPress={() => handleLinkPress(link.id)}
                                    className={`flex-row items-center px-5 py-4 ${index < MANAGEMENT_LINKS.length - 1 ? 'border-b border-gray-800' : ''}`}
                                    activeOpacity={0.7}
                                >
                                    <View
                                        className="w-10 h-10 rounded-xl items-center justify-center mr-4"
                                        style={{ backgroundColor: `${link.color}20` }}
                                    >
                                        <Icon size={20} color={link.color} />
                                    </View>
                                    <View className="flex-1">
                                        <Typography className="text-white font-body-semibold">{link.label}</Typography>
                                        <Typography variant="body-sm" className="text-gray-500">{link.subtitle}</Typography>
                                    </View>
                                    <ChevronRight size={18} color="#4b5563" />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>


                <View className="px-5 mb-4">
                    <View className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
                        <TouchableOpacity
                            onPress={() => console.log('Log out')}
                            className="flex-row items-center px-5 py-4"
                            activeOpacity={0.7}
                        >
                            <View className="w-10 h-10 rounded-xl items-center justify-center mr-4 bg-red-500/10">
                                <LogOut size={20} color="#ef4444" />
                            </View>
                            <Typography className="text-red-400 font-body-semibold flex-1">Log Out</Typography>
                            <ChevronRight size={18} color="#4b5563" />
                        </TouchableOpacity>
                    </View>
                </View>



            </ScrollView>

            <BottomSheetModal
                visible={showAvailability}
                onClose={() => setShowAvailability(false)}
                title="Availability"
            >
                <AvailabilityContent onClose={() => setShowAvailability(false)} />
            </BottomSheetModal>

            <BottomSheetModal
                visible={showBankAccount}
                onClose={() => setShowBankAccount(false)}
                title="Bank Account Details"
            >
                <BankAccountDetails />
            </BottomSheetModal>
        </View>
    );
};
