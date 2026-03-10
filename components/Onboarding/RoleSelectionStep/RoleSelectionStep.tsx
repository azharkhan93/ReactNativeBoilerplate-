import React from 'react';
import { Dimensions, View } from 'react-native';
import { User, Briefcase } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Typography } from '../../theme/Typography';
import { Container } from '../../theme/Container';
import { RoleOption } from './RoleOption';

const { width } = Dimensions.get('window');

const ROLES = [
    {
        id: 'customer' as const,
        title: 'Customer',
        description: 'I want to book car wash services',
        icon: User,
        delay: 400
    },
    {
        id: 'provider' as const,
        title: 'Service Provider',
        description: 'I want to offer car wash services',
        icon: Briefcase,
        delay: 600
    }
];

interface RoleSelectionStepProps {
    onSelect: (role: 'customer' | 'provider') => void;
    selectedRole: 'customer' | 'provider' | null;
}

export const RoleSelectionStep: React.FC<RoleSelectionStepProps> = ({ onSelect, selectedRole }) => {
    return (
        <Container
            variant="column-centered"
            style={{ width }}
            className="flex-1 px-6 justify-center"
        >
            <Animated.View entering={FadeInUp.delay(200)} className="items-center mb-12">
                <Typography variant="h3" className="text-center mb-4 tracking-tight">
                    Choose Your Role
                </Typography>
                <Typography variant="body" className="text-center px-6">
                    Select how you want to use the platform to get started.
                </Typography>
            </Animated.View>

            <Container variant="column" className="w-full">
                {ROLES.map((role, index) => (
                    <View key={role.id} className={index === 0 ? 'mb-8' : ''}>
                        <RoleOption
                            title={role.title}
                            description={role.description}
                            icon={role.icon}
                            isSelected={selectedRole === role.id}
                            onPress={() => onSelect(role.id)}
                            delay={role.delay}
                        />
                    </View>
                ))}
            </Container>
        </Container>
    );
};
