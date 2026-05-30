import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Typography, Button, FormInput } from '@/components/theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { Plus, Trash2, Sparkles } from 'lucide-react-native';

export interface WhyChooseMeFormProps {
  visible: boolean;
  initialValue: string | null | undefined;
  onClose: () => void;
  onSave: (whyChooseMe: string) => void;
  loading?: boolean;
}

const useWhyChooseMeFormState = (
  initialValue: string | null | undefined,
  visible: boolean,
  onSave: (whyChooseMe: string) => void,
) => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (visible) {
      setItems(initialValue?.split('\n').filter(Boolean) || []);
      setNewItem('');
    }
  }, [initialValue, visible]);

  const handleAddItem = () => {
    const val = newItem.trim();
    if (val && !items.includes(val)) {
      setItems(prev => [...prev, val]);
      setNewItem('');
    }
  };

  const handleRemove = (i: number) =>
    setItems(prev => prev.filter((_, idx) => idx !== i));
  const handleSave = () => onSave(items.join('\n'));

  return {
    items,
    newItem,
    setNewItem,
    handleAddItem,
    handleRemove,
    handleSave,
  };
};

interface HighlightItemProps {
  item: string;
  idx: number;
  isLast: boolean;
  onRemove: (idx: number) => void;
}

const HighlightItem: React.FC<HighlightItemProps> = ({
  item,
  idx,
  isLast,
  onRemove,
}) => {
  const handlePress = () => onRemove(idx);
  return (
    <View
      className={`flex-row items-center justify-between p-3 ${
        isLast ? '' : 'border-b border-slate-100'
      }`}
    >
      <Typography variant="body-sm" className="text-slate-700 flex-1 mr-4">
        • {item}
      </Typography>
      <TouchableOpacity
        onPress={handlePress}
        className="p-1.5 rounded-full bg-red-500/10"
        activeOpacity={0.7}
      >
        <Trash2 size={14} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
};

export const WhyChooseMeForm: React.FC<WhyChooseMeFormProps> = ({
  visible,
  initialValue,
  onClose,
  onSave,
  loading = false,
}) => {
  const {
    items,
    newItem,
    setNewItem,
    handleAddItem,
    handleRemove,
    handleSave,
  } = useWhyChooseMeFormState(initialValue, visible, onSave);

  return (
    <BottomSheetModal
      visible={visible}
      title="Value Propositions"
      onClose={onClose}
      height="80%"
      scrollable={false}
    >
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View className="px-5 pt-2 pb-8">
          <View className="flex-row items-center mb-2">
            <Sparkles size={18} color="#f59e0b" />
            <Typography variant="subheading" className="text-slate-900 font-body-bold ml-2">
              Why Choose My Business
            </Typography>
          </View>
          <Typography variant="body-sm" className="text-slate-500 mb-6">
            Add short, punchy reasons that will be displayed on your public
            profile to attract customers.
          </Typography>

          <View className="flex-row items-end gap-3 mb-6">
            <View className="flex-1">
              <FormInput
                label="Add Value Point"
                placeholder="e.g. 100% Satisfaction Guarantee"
                value={newItem}
                onChangeText={setNewItem}
                onSubmitEditing={handleAddItem}
                returnKeyType="done"
                containerClassName="mb-0"
              />
            </View>
            <TouchableOpacity
              onPress={handleAddItem}
              className="bg-primary-600 w-[52px] h-[52px] rounded-2xl items-center justify-center"
              activeOpacity={0.8}
            >
              <Plus size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Typography
            variant="body"
            className="text-slate-900 font-body-semibold mb-3"
          >
            Current Highlights ({items.length})
          </Typography>

          {items.length > 0 ? (
            <View className="bg-white border border-slate-200 rounded-3xl p-2 mb-6 shadow-sm">
              {items.map((item, idx) => (
                <HighlightItem
                  key={idx}
                  item={item}
                  idx={idx}
                  isLast={idx === items.length - 1}
                  onRemove={handleRemove}
                />
              ))}
            </View>
          ) : (
            <View className="py-8 bg-white border border-dashed border-slate-200 rounded-3xl items-center justify-center mb-6">
              <Typography
                variant="body-sm"
                className="text-slate-400 italic text-center px-4"
              >
                No value propositions added yet.
              </Typography>
            </View>
          )}

          <Button variant="primary" onPress={handleSave} loading={loading}>
            Save Highlights →
          </Button>
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};
