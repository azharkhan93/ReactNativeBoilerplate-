import React from 'react';
import { FlatList, View } from 'react-native';
import { ProviderCard } from '../ProviderCard';
import { Provider } from '@/data/mockProviders';
import { Typography } from '../Typography';

export interface ProviderListProps {
    providers: Provider[];
    onProviderPress?: (id: string) => void;
    contentContainerStyle?: any;
}

export const ProviderList: React.FC<ProviderListProps> = ({
    providers,
    onProviderPress,
    contentContainerStyle,
}) => {
    if (providers.length === 0) {
        return (
            <View className="flex-1 items-center justify-center p-10">
                <Typography variant="body" className="text-gray-400 text-center">
                    No service providers found in this area.
                </Typography>
            </View>
        );
    }

    return (
        <FlatList
            data={providers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ProviderCard provider={item} onPress={onProviderPress} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={contentContainerStyle}
            className="flex-1"
        />
    );
};
