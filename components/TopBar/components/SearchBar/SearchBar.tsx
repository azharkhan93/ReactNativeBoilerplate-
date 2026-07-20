import React, { useState } from 'react';
import { View, Keyboard } from 'react-native';
import { Search } from 'lucide-react-native';
import { Typography, IconButton, FormInput } from '@/components/theme';
import { SearchBarProps } from './types';
import { searchBarStyles } from './styles';

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
    <View className={searchBarStyles.container}>
      <FormInput
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        value={value}
        onChangeText={handleChange}
        onFocus={handleFocus}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        containerClassName={searchBarStyles.containerClassName}
        inputClassName={searchBarStyles.inputClassName}
        icon={<Search size={16} color="#64748b" />}
      />
      {value.length > 0 && (
        <View className={searchBarStyles.clearButtonWrapper}>
          <IconButton
            onPress={handleClear}
            className={searchBarStyles.clearButton}
            size="sm"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Typography className={searchBarStyles.clearText}>✕</Typography>
          </IconButton>
        </View>
      )}
    </View>
  );
};
