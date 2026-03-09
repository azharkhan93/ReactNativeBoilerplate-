import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, LayoutList, Map as MapIcon } from 'lucide-react-native';
import {
    Typography,
    SearchBar,
    ProviderList,
    ProviderMap
} from '@/components/theme';
import { MOCK_PROVIDERS } from '@/data/mockProviders';

export interface NearbyProvidersScreenProps {
    onNavigate?: (route: string) => void;
}

export const NearbyProvidersScreen: React.FC<NearbyProvidersScreenProps> = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

    const filteredProviders = useMemo(() => {
        return MOCK_PROVIDERS.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.services?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery]);

    return (
        <View className="flex-1 bg-gray-950">
            {/* Header */}
            <View
                className="px-5 pb-4 bg-gray-950"
                style={{ paddingTop: Math.max(insets.top, 20) + 10 }}
            >
                <View className="flex-row items-center justify-between mb-4">
                    <TouchableOpacity
                        onPress={() => onNavigate?.('home')}
                        className="bg-white/10 p-2.5 rounded-full border border-white/10"
                    >
                        <ChevronLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Typography variant="subheading" className="text-white">Near Me</Typography>
                    <TouchableOpacity
                        onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                        className="bg-primary-500 p-2.5 rounded-full border border-primary-400/30"
                    >
                        {viewMode === 'list' ? (
                            <MapIcon size={22} color="white" />
                        ) : (
                            <LayoutList size={22} color="white" />
                        )}
                    </TouchableOpacity>
                </View>

                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onClear={() => setSearchQuery('')}
                    placeholder="Search for car washers, detailers..."
                    className="bg-white/5 border-white/10 text-white"
                />
            </View>

            {/* Content */}
            <View className="flex-1 bg-white rounded-t-[40px] overflow-hidden">
                {viewMode === 'list' ? (
                    <ProviderList
                        providers={filteredProviders}
                        onProviderPress={(id) => console.log('Provider selected:', id)}
                        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                    />
                ) : (
                    <View className="flex-1 p-5">
                        <ProviderMap
                            providers={filteredProviders}
                            onProviderPress={(id) => console.log('Provider selected:', id)}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};
