import React from 'react';
import { View } from 'react-native';
import { Typography, FormInput, Button } from '@/components/theme';

interface BreakFormCardProps {
  name: string;
  start: string;
  end: string;
  onChangeName: (value: string) => void;
  onChangeStart: (value: string) => void;
  onChangeEnd: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  isEdit: boolean;
}

export const BreakFormCard: React.FC<BreakFormCardProps> = ({
  name,
  start,
  end,
  onChangeName,
  onChangeStart,
  onChangeEnd,
  onCancel,
  onSave,
  isEdit,
}) => (
  <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 mb-5 shadow-2xl">
    <Typography className="text-white font-body-bold mb-3">
      {isEdit ? 'Edit Break Time' : 'Add New Break'}
    </Typography>
    <FormInput
      label="Break Name"
      placeholder="e.g. Lunch Break"
      value={name}
      onChangeText={onChangeName}
    />
    <View className="flex-row gap-3">
      <View className="flex-1">
        <FormInput
          label="Start Time"
          placeholder="12:00 PM"
          value={start}
          onChangeText={onChangeStart}
        />
      </View>
      <View className="flex-1">
        <FormInput
          label="End Time"
          placeholder="01:00 PM"
          value={end}
          onChangeText={onChangeEnd}
        />
      </View>
    </View>
    <View className="flex-row justify-end gap-3 mt-2">
      <Button variant="outlined" size="sm" onPress={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" size="sm" disabled={!name} onPress={onSave}>
        {isEdit ? 'Save' : 'Add'}
      </Button>
    </View>
  </View>
);
