import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { MANAGEMENT_LINKS } from '../../constants';

interface ManagementListProps {
    onLinkPress: (id: string) => void;
}

export const ManagementList: React.FC<ManagementListProps> = ({ onLinkPress }) => (
    <View className="px-5 mb-8">
        <Typography variant="body-sm" className="text-gray-500 font-body-bold text-xs mb-4 tracking-widest uppercase">
            Business Management
        </Typography>
        <View className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
            {MANAGEMENT_LINKS.map((link, index) => {
                const Icon = link.icon;
                return (
                    <TouchableOpacity
                        key={link.id}
                        onPress={() => onLinkPress(link.id)}
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
                            <Typography variant='body' >{link.label}</Typography>
                            <Typography variant="body">{link.subtitle}</Typography>
                        </View>
                        <ChevronRight size={18} color="#4b5563" />
                    </TouchableOpacity>
                );
            })}
        </View>
    </View>
);
