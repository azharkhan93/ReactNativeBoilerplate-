import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronUp, ChevronDown } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { parseTime, formatTime } from '@/helpers/dateHelpers';
import { TimeInputProps, StepperProps } from './types';
import { timeInputStyles } from './styles';

const Stepper: React.FC<StepperProps> = ({ value, onInc, onDec }) => (
  <View className={timeInputStyles.stepperContainer}>
    <TouchableOpacity onPress={onInc} className={timeInputStyles.stepperButton} activeOpacity={0.7}>
      <ChevronUp size={16} color="#64748b" />
    </TouchableOpacity>
    <Typography className={timeInputStyles.stepperValue}>{value}</Typography>
    <TouchableOpacity onPress={onDec} className={timeInputStyles.stepperButton} activeOpacity={0.7}>
      <ChevronDown size={16} color="#64748b" />
    </TouchableOpacity>
  </View>
);

export const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const { hours, minutes, period } = parseTime(value);

  const update = (h: number, m: number, p: 'AM' | 'PM') =>
    onChange(formatTime(h, m, p));

  const incH = () => update(hours === 12 ? 1 : hours + 1, minutes, period);
  const decH = () => update(hours === 1 ? 12 : hours - 1, minutes, period);
  const incM = () => update(hours, minutes === 59 ? 0 : minutes + 1, period);
  const decM = () => update(hours, minutes === 0 ? 59 : minutes - 1, period);
  const toggleP = () => update(hours, minutes, period === 'AM' ? 'PM' : 'AM');

  if (editing) {
    return (
      <View className={timeInputStyles.activeContainer}>
        <View className="flex-row items-center">
          <Stepper value={String(hours).padStart(2, '0')} onInc={incH} onDec={decH} />
          <Typography className={timeInputStyles.colon}>:</Typography>
          <Stepper value={String(minutes).padStart(2, '0')} onInc={incM} onDec={decM} />
          <TouchableOpacity
            onPress={toggleP}
            className={timeInputStyles.periodButton}
            activeOpacity={0.8}
          >
            <Typography className={timeInputStyles.periodText}>{period}</Typography>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setEditing(false)} className={timeInputStyles.doneButton}>
          <Typography className={timeInputStyles.doneText}>Done</Typography>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => setEditing(true)}
      activeOpacity={0.8}
      className={timeInputStyles.inactiveContainer}
    >
      <Typography className={timeInputStyles.inactiveText}>{value}</Typography>
      <View className={timeInputStyles.indicatorDot} />
    </TouchableOpacity>
  );
};
