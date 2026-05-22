/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography, FormInput, Button } from '../../../../theme';
import { AddressData } from '../../hooks/useCustomerAddresses';

interface CustomerAddressFormProps {
  initialAddress?: AddressData | null;
  onSave: (data: Omit<AddressData, 'id'>) => void;
  onCancel: () => void;
  isEdit: boolean;
}

const EMPTY_FORM: Omit<AddressData, 'id'> = {
  label: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  type: 'home',
};

const ADDRESS_TYPES: Array<AddressData['type']> = ['home', 'work', 'office'];

export const CustomerAddressForm: React.FC<CustomerAddressFormProps> = ({
  initialAddress,
  onSave,
  onCancel,
  isEdit,
}) => {
  const [form, setForm] = useState<Omit<AddressData, 'id'>>(EMPTY_FORM);

  useEffect(() => {
    if (initialAddress) {
      const { id, ...rest } = initialAddress;
      setForm(rest);
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initialAddress]);

  const isFormValid = !!(
    form.label.trim() &&
    form.street.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.zipCode.trim()
  );

  const handleTextChange = (field: keyof Omit<AddressData, 'id'>, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeSelect = (type: AddressData['type']) => {
    setForm(prev => ({ ...prev, type }));
  };

  const handleSavePress = () => {
    if (isFormValid) {
      onSave(form);
    }
  };

  return (
    <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 mb-5 shadow-2xl">
      <Typography className="text-white font-body-bold mb-4">
        {isEdit ? 'Edit Address Details' : 'Add New Address'}
      </Typography>

      <FormInput
        label="Address Name / Label"
        placeholder="e.g. Home, Work HQ"
        value={form.label}
        onChangeText={v => handleTextChange('label', v)}
      />

      <FormInput
        label="Street Address"
        placeholder="e.g. 123 Main St"
        value={form.street}
        onChangeText={v => handleTextChange('street', v)}
      />

      <View className="flex-row gap-3">
        <View className="flex-1">
          <FormInput
            label="City"
            placeholder="e.g. Seattle"
            value={form.city}
            onChangeText={v => handleTextChange('city', v)}
          />
        </View>
        <View className="flex-1">
          <FormInput
            label="State"
            placeholder="e.g. WA"
            maxLength={2}
            autoCapitalize="characters"
            value={form.state}
            onChangeText={v => handleTextChange('state', v.toUpperCase())}
          />
        </View>
      </View>

      <FormInput
        label="ZIP Code"
        placeholder="e.g. 98101"
        keyboardType="numeric"
        value={form.zipCode}
        onChangeText={v => handleTextChange('zipCode', v)}
      />

      <Typography variant="body-sm" className="text-gray-400 mb-2.5 ml-1">
        Address Classification
      </Typography>

      <View className="flex-row gap-3 mb-5">
        {ADDRESS_TYPES.map(t => {
          const isSelected = form.type === t;
          let activeStyles = 'bg-gray-950 border-gray-800';
          let textStyle = 'text-gray-400';

          if (isSelected) {
            if (t === 'home') {
              activeStyles = 'bg-blue-500/10 border-blue-500/40';
              textStyle = 'text-blue-400 font-body-bold';
            } else if (t === 'work') {
              activeStyles = 'bg-orange-500/10 border-orange-500/40';
              textStyle = 'text-orange-400 font-body-bold';
            } else if (t === 'office') {
              activeStyles = 'bg-emerald-500/10 border-emerald-500/40';
              textStyle = 'text-emerald-400 font-body-bold';
            }
          }

          return (
            <TouchableOpacity
              key={t}
              onPress={() => handleTypeSelect(t)}
              className={`flex-1 py-2.5 rounded-xl items-center border ${activeStyles}`}
            >
              <Typography className={`capitalize ${textStyle}`}>{t}</Typography>
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="flex-row justify-end gap-3 mt-1">
        <Button variant="outlined" size="sm" onPress={onCancel}>
          Cancel
        </Button>
        <Button
          variant={isFormValid ? 'primary' : 'disabled'}
          size="sm"
          onPress={handleSavePress}
        >
          {isEdit ? 'Save' : 'Add'}
        </Button>
      </View>
    </View>
  );
};
