import React from 'react';
import { ScrollView, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Coffee, CalendarX, Trash2, ChevronRight } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { WeekStrip } from '../WeekStrip';
import { DayRow } from '../DayRow';
import { SectionHeader } from '../components/SectionHeader';
import { DAYS, CARD_STYLE } from '../constants';
import { useVendorAvailability } from '../hooks/useVendorAvailability';

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
        handleSave,
    } = useVendorAvailability();

    const handleSaveAndClose = async () => {
        await handleSave();
        onClose();
    };

    if (loading && Object.keys(schedule).length === 0) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-950 p-10 min-h-[300px]">
                <ActivityIndicator size="large" color="#3b82f6" />
                <Typography className="text-gray-400 mt-4 font-body">Loading Schedule...</Typography>
            </View>
        );
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 40 }} className="bg-gray-950">
            <WeekStrip />

            <Typography className="text-white text-base font-heading-semibold mb-1">Weekly Schedule</Typography>
            <Typography className="text-gray-500 text-[13px] mb-5">Set your recurring operating hours</Typography>

            {DAYS.map(day => (
                <DayRow
                    key={day}
                    day={day}
                    schedule={schedule[day] || { enabled: false, start: '09:00 AM', end: '06:00 PM' }}
                    onToggle={() => handleToggleDay(day)}
                    onChangeStart={v => handleChangeStart(day, v)}
                    onChangeEnd={v => handleChangeEnd(day, v)}
                />
            ))}

            <SectionHeader icon={<Coffee size={16} color="#3b82f6" />} title="Break Times" onAdd={() => { }} addLabel="Add Break" />
            {breaks.length === 0 ? (
                <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 items-center justify-center mb-6">
                    <Typography className="text-gray-500 text-[13px]">No breaks set today</Typography>
                </View>
            ) : (
                breaks.map(b => (
                    <View key={b.id} className={`${CARD_STYLE} flex-row items-center justify-between`}>
                        <View>
                            <Typography className="text-white font-body-semibold">{b.label}</Typography>
                            <Typography className="text-gray-500 text-[12px] mt-0.5">{b.time} • {b.repeat}</Typography>
                        </View>
                        <TouchableOpacity onPress={() => handleRemoveBreak(b.id)} className="w-8 h-8 bg-gray-800 rounded-xl items-center justify-center">
                            <Trash2 size={14} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                ))
            )}

            <SectionHeader icon={<CalendarX size={16} color="#3b82f6" />} title="Exceptions" onAdd={() => { }} addLabel="Add Date" />
            {exceptions.length === 0 ? (
                <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 items-center justify-center mb-6">
                    <Typography className="text-gray-500 text-[13px]">No holiday exceptions set</Typography>
                </View>
            ) : (
                exceptions.map(ex => (
                    <TouchableOpacity key={ex.id} className={`${CARD_STYLE} flex-row items-center`} activeOpacity={0.8}>
                        <View className="bg-gray-800 rounded-xl px-3 py-2 items-center mr-4">
                            <Typography className="text-primary-400 text-[10px] font-body-bold tracking-wider">{ex.month}</Typography>
                            <Typography className="text-white text-lg font-heading-bold leading-5">{ex.day}</Typography>
                        </View>
                        <View className="flex-1">
                            <Typography className="text-white font-body-semibold">{ex.label}</Typography>
                            <View className={`self-start mt-1 px-2 py-0.5 rounded-full ${ex.type === 'blocked' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
                                <Typography className={`text-[10px] font-body-bold tracking-wider uppercase ${ex.type === 'blocked' ? 'text-red-400' : 'text-yellow-400'}`}>
                                    {ex.type === 'blocked' ? 'Blocked Out' : 'Shortened Hours'}
                                </Typography>
                            </View>
                        </View>
                        <ChevronRight size={16} color="#4b5563" />
                    </TouchableOpacity>
                ))
            )}

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
