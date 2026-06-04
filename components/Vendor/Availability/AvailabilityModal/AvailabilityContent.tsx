import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Coffee, CalendarX } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { WeekStrip } from '../WeekStrip';
import { DayRow } from '../DayRow';
import { SectionHeader } from '../components/SectionHeader';
import { DAYS } from '../constants';
import { useVendorAvailability } from '../hooks/useVendorAvailability';
import { BreakFormCard } from './components/BreakFormCard';
import { BreakItemCard } from './components/BreakItemCard';
import { ExceptionFormCard } from './components/ExceptionFormCard';
import { ExceptionItemCard } from './components/ExceptionItemCard';

const EMPTY_BREAK = { name: '', start: '12:00 PM', end: '01:00 PM' };

interface ExceptionForm {
  label: string;
  month: string;
  day: string;
  type: 'blocked' | 'shortened';
}

const EMPTY_EXCEPTION: ExceptionForm = {
  label: '',
  month: 'MAY',
  day: '25',
  type: 'blocked',
};

const EmptyCard: React.FC<{ message: string }> = ({ message }) => (
  <View className="bg-white border border-slate-200 rounded-3xl p-5 items-center justify-center mb-6">
    <Typography className="text-slate-500 text-[13px] font-body-semibold">{message}</Typography>
  </View>
);

export const AvailabilityContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    schedule,
    breaks,
    exceptions,
    loading,
    handleToggleDay,
    handleChangeStart,
    handleChangeEnd,
    handleRemoveBreak,
    handleAddBreak,
    handleUpdateBreak,
    handleRemoveException,
    handleAddException,
    handleUpdateException,
    handleSave,
  } = useVendorAvailability();

  const [showBreak, setShowBreak] = useState(false);
  const [breakForm, setBreakForm] = useState(EMPTY_BREAK);
  const [editingBreakId, setEditingBreakId] = useState<string | null>(null);

  const [showException, setShowException] = useState(false);
  const [exForm, setExForm] = useState<ExceptionForm>(EMPTY_EXCEPTION);
  const [editingExceptionId, setEditingExceptionId] = useState<string | null>(null);

  const handleSaveAndClose = async () => {
    await handleSave();
    onClose();
  };

  const resetBreakState = () => {
    setShowBreak(false);
    setBreakForm(EMPTY_BREAK);
    setEditingBreakId(null);
  };

  const resetExceptionState = () => {
    setShowException(false);
    setExForm(EMPTY_EXCEPTION);
    setEditingExceptionId(null);
  };

  if (loading && Object.keys(schedule).length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-notchLight p-10 min-h-[300px]">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Typography className="text-slate-400 mt-4 font-body">Loading Schedule...</Typography>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      className="bg-notchLight"
    >
      <WeekStrip />
      <Typography className="text-slate-900 text-base font-heading-semibold mb-1">
        Weekly Schedule
      </Typography>
      <Typography className="text-slate-500 text-[13px] mb-5">
        Set your recurring operating hours
      </Typography>

      {DAYS.map(day => (
        <DayRow
          key={day}
          day={day}
          schedule={
            schedule[day] || {
              enabled: false,
              start: '09:00 AM',
              end: '06:00 PM',
              }
          }
          onToggle={() => handleToggleDay(day)}
          onChangeStart={v => handleChangeStart(day, v)}
          onChangeEnd={v => handleChangeEnd(day, v)}
        />
      ))}

      {/* Break Times Section */}
      <SectionHeader
        icon={<Coffee size={16} color="#3b82f6" />}
        title="Break Times"
        onAdd={() => {
          setEditingBreakId(null);
          setBreakForm(EMPTY_BREAK);
          setShowBreak(true);
        }}
        addLabel="Add Break"
      />

      {showBreak && (
        <BreakFormCard
          name={breakForm.name}
          start={breakForm.start}
          end={breakForm.end}
          onChangeName={v => setBreakForm(f => ({ ...f, name: v }))}
          onChangeStart={v => setBreakForm(f => ({ ...f, start: v }))}
          onChangeEnd={v => setBreakForm(f => ({ ...f, end: v }))}
          onCancel={resetBreakState}
          onSave={() => {
            if (editingBreakId) {
              handleUpdateBreak(editingBreakId, breakForm.name, breakForm.start, breakForm.end);
            } else {
              handleAddBreak(breakForm.name, breakForm.start, breakForm.end);
            }
            resetBreakState();
          }}
          isEdit={!!editingBreakId}
        />
      )}

      {breaks.length === 0 ? (
        <EmptyCard message="No breaks set today" />
      ) : (
        breaks.map(b => (
          <BreakItemCard
            key={b.id}
            breakItem={b}
            onEdit={() => {
              const parts = (b.time ?? '').split(' - ');
              setBreakForm({
                name: b.label,
                start: parts[0] || '12:00 PM',
                end: parts[1] || '01:00 PM',
              });
              setEditingBreakId(b.id);
              setShowBreak(true);
            }}
            onRemove={() => handleRemoveBreak(b.id)}
          />
        ))
      )}

      {/* Exceptions Section */}
      <SectionHeader
        icon={<CalendarX size={16} color="#3b82f6" />}
        title="Exceptions"
        onAdd={() => {
          setEditingExceptionId(null);
          setExForm(EMPTY_EXCEPTION);
          setShowException(true);
        }}
        addLabel="Add Date"
      />

      {showException && (
        <ExceptionFormCard
          exForm={exForm}
          onChangeLabel={v => setExForm(f => ({ ...f, label: v }))}
          onChangeMonth={v => setExForm(f => ({ ...f, month: v.toUpperCase() }))}
          onChangeDay={v => setExForm(f => ({ ...f, day: v }))}
          onChangeType={t => setExForm(f => ({ ...f, type: t }))}
          onCancel={resetExceptionState}
          onSave={() => {
            const dayVal = parseInt(exForm.day, 10) || 1;
            if (editingExceptionId) {
              handleUpdateException(
                editingExceptionId,
                exForm.label,
                exForm.month || 'MAY',
                dayVal,
                exForm.type,
              );
            } else {
              handleAddException(exForm.label, exForm.month || 'MAY', dayVal, exForm.type);
            }
            resetExceptionState();
          }}
          isEdit={!!editingExceptionId}
        />
      )}

      {exceptions.length === 0 ? (
        <EmptyCard message="No holiday exceptions set" />
      ) : (
        exceptions.map(ex => (
          <ExceptionItemCard
            key={ex.id}
            exception={ex}
            onEdit={() => {
              setExForm({
                label: ex.label,
                month: ex.month,
                day: String(ex.day),
                type: ex.type,
              });
              setEditingExceptionId(ex.id);
              setShowException(true);
            }}
            onRemove={() => handleRemoveException(ex.id)}
          />
        ))
      )}

      {/* Save Button */}
      <TouchableOpacity
        className="bg-primary-500 py-4 rounded-2xl items-center mt-2 shadow-lg shadow-primary-500/25 flex-row justify-center"
        activeOpacity={0.85}
        onPress={handleSaveAndClose}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Typography className="text-white font-body-bold text-base">Save Availability</Typography>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};
