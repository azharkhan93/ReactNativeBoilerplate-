import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { User, Briefcase, ChevronRight } from 'lucide-react-native';
import { Typography } from '../theme/Typography';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface RoleSelectionStepProps {
    onSelect: (role: 'customer' | 'provider') => void;
    selectedRole: 'customer' | 'provider' | null;
}

export const RoleSelectionStep: React.FC<RoleSelectionStepProps> = ({ onSelect, selectedRole }) => {
    return (
        <View style={{ width, flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>

            <Animated.View entering={FadeInUp.delay(200)} className="items-center mb-12">
                <Typography variant="h3" className="text-center mb-4  tracking-tight">
                    Choose Your Role
                </Typography>
                <Typography variant="body" className="text-center px-6">
                    Select how you want to use the platform to get started.
                </Typography>
            </Animated.View>


            <View className="w-full gap-6">
                <RoleOption
                    title="Customer"
                    description="I want to book car wash services"
                    icon={User}
                    isSelected={selectedRole === 'customer'}
                    onPress={() => onSelect('customer')}
                    delay={400}
                />
                <RoleOption
                    title="Service Provider"
                    description="I want to offer car wash services"
                    icon={Briefcase}
                    isSelected={selectedRole === 'provider'}
                    onPress={() => onSelect('provider')}
                    delay={600}
                />
            </View>
        </View>
    );
};

interface RoleOptionProps {
    title: string;
    description: string;
    icon: any;
    isSelected: boolean;
    onPress: () => void;
    delay: number;
}

const RoleOption: React.FC<RoleOptionProps> = ({ title, description, icon: Icon, isSelected, onPress, delay }) => (
    <Animated.View entering={FadeInDown.delay(delay)}>
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className={`flex-row items-center p-6 rounded-3xl border-2 transition-all ${isSelected
                ? 'border-primary-500 bg-primary-50/50'
                : 'border-slate-100 bg-white'
                }`}
        >
            <View className={`w-14 h-14 rounded-2xl items-center justify-center mr-4 ${isSelected ? 'bg-primary-500' : 'bg-slate-50'
                }`}>
                <Icon size={28} color={isSelected ? 'white' : '#64748B'} />
            </View>
            <View className="flex-1">
                <Typography variant="body-lg" className={`font-heading-semibold ${isSelected ? 'text-primary-700' : 'text-slate-900'
                    }`}>
                    {title}
                </Typography>
                <Typography variant="body-sm" className="text-slate-500">
                    {description}
                </Typography>
            </View>
            {isSelected && <ChevronRight size={20} color="#3b82f6" />}
        </TouchableOpacity>
    </Animated.View>
);
