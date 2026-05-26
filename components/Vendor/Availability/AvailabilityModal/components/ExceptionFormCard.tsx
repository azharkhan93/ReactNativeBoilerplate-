import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography, FormInput, Button } from '@/components/theme';

interface ExceptionForm {
  label: string;
  month: string;
  day: string;
  type: 'blocked' | 'shortened';
}

interface ExceptionFormCardProps {
  exForm: ExceptionForm;
  onChangeLabel: (value: string) => void;
  onChangeMonth: (value: string) => void;
  onChangeDay: (value: string) => void;
  onChangeType: (value: 'blocked' | 'shortened') => void;
  onCancel: () => void;
  onSave: () => void;
  isEdit: boolean;
}

export const ExceptionFormCard: React.FC<ExceptionFormCardProps> = ({
  exForm,
  onChangeLabel,
  onChangeMonth,
  onChangeDay,
  onChangeType,
  onCancel,
  onSave,
  isEdit,
}) => (
  <View className="bg-white border border-slate-200 rounded-3xl p-5 mb-5 shadow-sm">
    <Typography className="text-slate-900 font-body-bold mb-3">
      {isEdit ? 'Edit Exception Date' : 'Add Exception Date'}
    </Typography>
    <FormInput
      label="Reason / Label"
      placeholder="e.g. Independence Day"
      value={exForm.label}
      onChangeText={onChangeLabel}
    />
    <View className="flex-row gap-3">
      <View className="flex-1">
        <FormInput
          label="Month (3 letters)"
          placeholder="MAY"
          autoCapitalize="characters"
          maxLength={3}
          value={exForm.month}
          onChangeText={onChangeMonth}
        />
      </View>
      <View className="flex-1">
        <FormInput
          label="Day of Month"
          placeholder="25"
          keyboardType="numeric"
          value={exForm.day}
          onChangeText={onChangeDay}
        />
      </View>
    </View>
    <Typography variant="body-sm" className="text-slate-500 mb-2 ml-1">
      Exception Type
    </Typography>
    <View className="flex-row gap-3 mb-4">
      {(['blocked', 'shortened'] as const).map(t => (
        <TouchableOpacity
          key={t}
          onPress={() => onChangeType(t)}
          className={`flex-1 py-2.5 rounded-xl items-center border ${
            exForm.type === t
              ? t === 'blocked'
                ? 'bg-red-500/10 border-red-500/40'
                : 'bg-yellow-500/10 border-yellow-500/40'
              : 'bg-[#F1F6FD] border-slate-200'
          }`}
        >
          <Typography
            className={
              exForm.type === t
                ? t === 'blocked'
                  ? 'text-red-400 font-body-bold'
                  : 'text-yellow-400 font-body-bold'
                : 'text-slate-500'
            }
          >
            {t === 'blocked' ? 'Blocked Out' : 'Shortened'}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
    <View className="flex-row justify-end gap-3 mt-2">
      <Button variant="outlined" size="sm" onPress={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" size="sm" disabled={!exForm.label || !exForm.day} onPress={onSave}>
        {isEdit ? 'Save' : 'Add'}
      </Button>
    </View>
  </View>
);
