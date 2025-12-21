import React, { useState } from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import { Typography, IconButton } from '../../theme';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onSearch?: (query: string) => void;
  onFocus?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search products...',
  value: controlledValue,
  onSearch,
  onFocus,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : searchValue;

  const handleChange = (text: string) => {
    if (!isControlled) {
      setSearchValue(text);
    }
    onSearch?.(text);
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
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
    <View
      className={`flex-row items-center rounded-full px-4 py-2.5 ${
        isFocused
          ? 'bg-white border-2 border-primary-500'
          : 'bg-gray-100'
      }`}
    >
      <Typography className="text-gray-400 mr-2">🔍</Typography>
      <TextInput
        className="flex-1 text-body font-body text-gray-900"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />
      {value.length > 0 ? (
        <IconButton
          onPress={handleClear}
          className="ml-2 w-5 h-5"
          size="sm"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          variant="default"
        >
          <Typography className="text-gray-400 text-lg">✕</Typography>
        </IconButton>
      ): null}
    </View>
  );
};

