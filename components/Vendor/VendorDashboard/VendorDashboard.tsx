import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../theme';
import {
    Plus,
    Check,
    X,
    Calendar,
    BarChart3,
    User,
    Wrench,
    Clock,
    ChevronRight,
    ArrowDownToLine,
} from 'lucide-react-native';
import { VENDOR_STATS, MOCK_BOOKINGS, BOOKING_STATUS } from '@/utils/constants';
import { ServiceManagement } from '../ServiceManagement';

const QUICK_ACTIONS = [
    { id: '1', label: 'Services', icon: Wrench, color: '#3b82f6', bg: '#1e3a5f' },
    { id: '2', label: 'Schedule', icon: Calendar, color: '#a855f7', bg: '#3b1f5e' },
    { id: '3', label: 'Insights', icon: BarChart3, color: '#22c55e', bg: '#1a3d2b' },
    { id: '4', label: 'Profile', icon: User, color: '#f59e0b', bg: '#3d2e0f' },
];

export interface VendorDashboardProps {
    onNavigate?: (route: string) => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();
    const [isAddServiceVisible, setIsAddServiceVisible] = useState(false);
    const pendingRequests = MOCK_BOOKINGS.filter(b => b.status === BOOKING_STATUS.PENDING);

    const handleQuickActionPress = (id: string) => {
        if (id === '1') setIsAddServiceVisible(true);
        else if (id === '3') onNavigate?.('analytics');
        else if (id === '4') onNavigate?.('profile');
    };

    return (
        <View className="flex-1 bg-gray-950">
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Welcome Header */}
                <View
                    className="px-5 pb-4"
                    style={{ paddingTop: Math.max(insets.top, 20) + 10 }}
                >
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <View className="w-12 h-12 bg-green-500 rounded-full items-center justify-center mr-3 border-2 border-green-400">
                                <User size={22} color="white" />
                            </View>
                            <View>
                                <Typography variant="body-sm" className="text-gray-400 font-body-medium">
                                    WELCOME BACK
                                </Typography>
                                <Typography className="text-white text-xl font-heading-bold">
                                    Good Morning, Alex
                                </Typography>
                            </View>
                        </View>
                        <View className="flex-row items-center bg-green-500/20 px-3 py-1.5 rounded-full">
                            <View className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                            <Typography variant="body-sm" className="text-green-400 font-body-bold text-xs">
                                ONLINE
                            </Typography>
                        </View>
                    </View>
                </View>

                {/* Earnings Card */}
                <View className="mx-5 mb-8">
                    <View className="bg-primary-600 rounded-3xl p-6 border border-primary-500">
                        <Typography variant="body-sm" className="text-primary-200 font-body-medium mb-1">
                            Today's Earnings
                        </Typography>
                        <Typography className="text-white text-4xl font-heading-bold mb-4">
                            $450.00
                        </Typography>

                        <View className="flex-row items-center justify-between">
                            <View>
                                <Typography variant="body-sm" className="text-primary-200">
                                    This Week: <Typography variant="body-sm" className="text-white font-body-bold">$2,840</Typography>
                                </Typography>
                                <Typography variant="body-sm" className="text-primary-200 mt-0.5">
                                    Total Balance: <Typography variant="body-sm" className="text-white font-body-bold">$12,450</Typography>
                                </Typography>
                            </View>
                            <TouchableOpacity className="bg-white px-5 py-2.5 rounded-full flex-row items-center">
                                <ArrowDownToLine size={14} color="#3b82f6" />
                                <Typography className="text-primary-600 font-body-bold ml-1.5">Withdraw</Typography>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Quick Actions Row */}
                <View className="px-5 mb-8">
                    <Typography className="text-gray-400 font-body-bold text-xs mb-4 tracking-widest uppercase">
                        Quick Actions
                    </Typography>
                    <View className="flex-row justify-between">
                        {QUICK_ACTIONS.map((action) => {
                            const Icon = action.icon;
                            return (
                                <TouchableOpacity
                                    key={action.id}
                                    onPress={() => handleQuickActionPress(action.id)}
                                    className="items-center"
                                    style={{ width: '22%' }}
                                    activeOpacity={0.7}
                                >
                                    <View
                                        className="w-16 h-16 rounded-2xl items-center justify-center mb-2 border border-gray-800"
                                        style={{ backgroundColor: action.bg }}
                                    >
                                        <Icon size={24} color={action.color} />
                                    </View>
                                    <Typography variant="body-sm" className="text-gray-300 font-body-medium text-center">
                                        {action.label}
                                    </Typography>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

               
                <View className="px-5 mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Typography className="text-white text-lg font-heading-semibold">
                            New Booking Requests
                        </Typography>
                        {pendingRequests.length > 0 && (
                            <View className="bg-primary-500/20 px-3 py-1 rounded-full">
                                <Typography variant="body-sm" className="text-primary-400 font-body-bold">
                                    {pendingRequests.length} New
                                </Typography>
                            </View>
                        )}
                    </View>

                    {pendingRequests.length === 0 ? (
                        <View className="bg-gray-900 rounded-3xl p-8 items-center justify-center border border-gray-800">
                            <View className="w-16 h-16 bg-gray-800 rounded-full items-center justify-center mb-4">
                                <Clock size={28} color="#6b7280" />
                            </View>
                            <Typography className="text-gray-500 font-body-medium mb-1">No pending requests</Typography>
                            <Typography variant="body-sm" className="text-gray-600">New bookings will appear here</Typography>
                        </View>
                    ) : (
                        pendingRequests.map((booking) => (
                            <View key={booking.id} className="bg-gray-900 rounded-3xl p-5 mb-4 border border-gray-800">
                                <View className="flex-row items-start mb-4">
                                    {/* Avatar placeholder */}
                                    <View className="w-12 h-12 bg-gray-700 rounded-full items-center justify-center mr-4">
                                        <Typography className="text-gray-300 font-body-bold text-lg">
                                            {booking.customerName.charAt(0)}
                                        </Typography>
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row justify-between items-start">
                                            <Typography className="text-white font-body-semibold text-base">
                                                {booking.customerName}
                                            </Typography>
                                            <Typography className="text-green-400 font-heading-semibold text-base">
                                                ${booking.price}.00
                                            </Typography>
                                        </View>
                                        <Typography variant="body-sm" className="text-gray-400 mt-0.5">
                                            {booking.serviceName}
                                        </Typography>
                                        <View className="flex-row items-center mt-1">
                                            <Clock size={12} color="#6b7280" />
                                            <Typography variant="body-sm" className="text-gray-500 ml-1.5">
                                                10:30 AM - Today
                                            </Typography>
                                        </View>
                                    </View>
                                </View>

                                <View className="flex-row gap-3">
                                    <TouchableOpacity className="flex-1 bg-green-500 py-3 rounded-2xl flex-row justify-center items-center">
                                        <Check size={16} color="white" />
                                        <Typography className="text-white font-body-bold ml-1.5">Accept</Typography>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="flex-1 bg-gray-800 py-3 rounded-2xl flex-row justify-center items-center border border-gray-700">
                                        <X size={16} color="#9ca3af" />
                                        <Typography className="text-gray-400 font-body-bold ml-1.5">Decline</Typography>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>

            <ServiceManagement
                visible={isAddServiceVisible}
                onClose={() => setIsAddServiceVisible(false)}
                onSave={(service: any) => console.log('Saved service:', service)}
            />
        </View>
    );
};
