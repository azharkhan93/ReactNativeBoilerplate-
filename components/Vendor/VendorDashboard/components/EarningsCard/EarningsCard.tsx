import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ArrowDownToLine } from 'lucide-react-native';
import { Typography } from '@/components/theme';

export const EarningsCard: React.FC = () => (
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
);
