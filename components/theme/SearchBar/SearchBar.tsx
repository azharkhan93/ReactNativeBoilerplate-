import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search as SearchIcon, X } from 'lucide-react-native';

export interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onClear?: () => void;
    placeholder?: string;
    className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    onClear,
    placeholder = 'Search...',
    className = '',
}) => {
    return (
        <View className={`bg-white rounded-2xl flex-row items-center px-4 h-12 border border-gray-100 shadow-sm ${className}`}>
            <SearchIcon size={20} color="#9CA3AF" />
            <TextInput
                className="flex-1 ml-3 text-gray-950 font-body py-0"
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChangeText}
                autoCorrect={false}
            />
            {value.length > 0 && onClear ? (
                <TouchableOpacity onPress={onClear} activeOpacity={0.7} className="p-1">
                    <X size={18} color="#9CA3AF" />
                </TouchableOpacity>
            ): null}
        </View>
    );
};
