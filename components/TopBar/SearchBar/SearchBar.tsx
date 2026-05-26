import React, { useState } from 'react';
import { View, Keyboard } from 'react-native';
import { Search } from 'lucide-react-native';
import { Typography, IconButton, FormInput } from '../../theme';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onSearch?: (query: string) => void;
  onFocus?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search Services...',
  value: controlledValue,
  onSearch,
  onFocus,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : searchValue;

  const handleChange = (text: string) => {
    if (!isControlled) {
      setSearchValue(text);
    }
    onSearch?.(text);
  };

  const handleFocus = () => {
    onFocus?.();
  };

  const handleClear = () => {
    handleChange('');
    if (!isControlled) {
      setSearchValue('');
    }
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    onSearch?.(value);
  };

  return (
    <View className="relative w-full">
      <FormInput
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        value={value}
        onChangeText={handleChange}
        onFocus={handleFocus}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        containerClassName="mb-0"
        inputClassName="h-12 bg-white border-slate-200 rounded-full pr-12 text-slate-900"
        icon={<Search size={16} color="#64748b" />}
      />
      {value.length > 0 && (
        <View className="absolute right-4 top-1/2 -mt-3.5 z-20">
          <IconButton
            onPress={handleClear}
            className="w-7 h-7 bg-white/10 rounded-full border border-white/5"
            size="sm"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Typography className="text-gray-400 text-xs font-body-bold">✕</Typography>
          </IconButton>
        </View>
      )}
    </View>
  );
};

