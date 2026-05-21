import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Coffee, CalendarX, Trash2, ChevronRight } from 'lucide-react-native';
import { Typography, FormInput, Button } from '@/components/theme';
import { WeekStrip } from '../WeekStrip';
import { DayRow } from '../DayRow';
import { SectionHeader } from '../components/SectionHeader';
import { DAYS, CARD_STYLE } from '../constants';
import { useVendorAvailability } from '../hooks/useVendorAvailability';

const EMPTY_BREAK = { name: '', start: '12:00 PM', end: '01:00 PM' };

interface ExceptionForm { label: string; month: string; day: string; type: 'blocked' | 'shortened'; }
const EMPTY_EXCEPTION: ExceptionForm = { label: '', month: 'MAY', day: '25', type: 'blocked' };

const EmptyCard: React.FC<{ message: string }> = ({ message }) => (
    <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 items-center justify-center mb-6">
        <Typography className="text-gray-500 text-[13px]">{message}</Typography>
    </View>
);

export const AvailabilityContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { schedule, breaks, exceptions, loading, handleToggleDay, handleChangeStart, handleChangeEnd, handleRemoveBreak, handleAddBreak, handleAddException, handleSave } = useVendorAvailability();

    const [showBreak, setShowBreak] = useState(false);
    const [breakForm, setBreakForm] = useState(EMPTY_BREAK);

    const [showException, setShowException] = useState(false);
    const [exForm, setExForm] = useState<ExceptionForm>(EMPTY_EXCEPTION);

    const handleSaveAndClose = async () => { await handleSave(); onClose(); };

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

            <SectionHeader icon={<Coffee size={16} color="#3b82f6" />} title="Break Times" onAdd={() => setShowBreak(true)} addLabel="Add Break" />

            {showBreak && (
                <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 mb-5">
                    <Typography className="text-white font-body-semibold mb-3">Add New Break</Typography>
                    <FormInput label="Break Name" placeholder="e.g. Lunch Break" value={breakForm.name} onChangeText={v => setBreakForm(f => ({ ...f, name: v }))} />
                    <View className="flex-row gap-3">
                        <View className="flex-1"><FormInput label="Start Time" placeholder="12:00 PM" value={breakForm.start} onChangeText={v => setBreakForm(f => ({ ...f, start: v }))} /></View>
                        <View className="flex-1"><FormInput label="End Time" placeholder="01:00 PM" value={breakForm.end} onChangeText={v => setBreakForm(f => ({ ...f, end: v }))} /></View>
                    </View>
                    <View className="flex-row justify-end gap-3 mt-2">
                        <Button variant="outlined" size="sm" onPress={() => { setShowBreak(false); setBreakForm(EMPTY_BREAK); }}>Cancel</Button>
                        <Button variant="primary" size="sm" disabled={!breakForm.name} onPress={() => { handleAddBreak(breakForm.name, breakForm.start, breakForm.end); setShowBreak(false); setBreakForm(EMPTY_BREAK); }}>Add</Button>
                    </View>
                </View>
            )}

            {breaks.length === 0 ? <EmptyCard message="No breaks set today" /> : breaks.map(b => (
                <View key={b.id} className={`${CARD_STYLE} flex-row items-center justify-between`}>
                    <View>
                        <Typography className="text-white font-body-semibold">{b.label}</Typography>
                        <Typography className="text-gray-500 text-[12px] mt-0.5">{b.time} • {b.repeat}</Typography>
                    </View>
                    <TouchableOpacity onPress={() => handleRemoveBreak(b.id)} className="w-8 h-8 bg-gray-800 rounded-xl items-center justify-center">
                        <Trash2 size={14} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            ))}

            <SectionHeader icon={<CalendarX size={16} color="#3b82f6" />} title="Exceptions" onAdd={() => setShowException(true)} addLabel="Add Date" />

            {showException && (
                <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 mb-5">
                    <Typography className="text-white font-body-semibold mb-3">Add Exception Date</Typography>
                    <FormInput label="Reason / Label" placeholder="e.g. Independence Day" value={exForm.label} onChangeText={v => setExForm(f => ({ ...f, label: v }))} />
                    <View className="flex-row gap-3">
                        <View className="flex-1"><FormInput label="Month (3 letters)" placeholder="MAY" autoCapitalize="characters" maxLength={3} value={exForm.month} onChangeText={v => setExForm(f => ({ ...f, month: v.toUpperCase() }))} /></View>
                        <View className="flex-1"><FormInput label="Day of Month" placeholder="25" keyboardType="numeric" value={exForm.day} onChangeText={v => setExForm(f => ({ ...f, day: v }))} /></View>
                    </View>
                    <Typography variant="body-sm" className="text-gray-400 mb-2 ml-1">Exception Type</Typography>
                    <View className="flex-row gap-3 mb-4">
                        {(['blocked', 'shortened'] as const).map(t => (
                            <TouchableOpacity key={t} onPress={() => setExForm(f => ({ ...f, type: t }))}
                                className={`flex-1 py-2.5 rounded-xl items-center border ${exForm.type === t ? (t === 'blocked' ? 'bg-red-500/10 border-red-500/40' : 'bg-yellow-500/10 border-yellow-500/40') : 'bg-gray-950 border-gray-800'}`}>
                                <Typography className={exForm.type === t ? (t === 'blocked' ? 'text-red-400 font-body-bold' : 'text-yellow-400 font-body-bold') : 'text-gray-400'}>
                                    {t === 'blocked' ? 'Blocked Out' : 'Shortened'}
                                </Typography>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="flex-row justify-end gap-3 mt-2">
                        <Button variant="outlined" size="sm" onPress={() => { setShowException(false); setExForm(EMPTY_EXCEPTION); }}>Cancel</Button>
                        <Button variant="primary" size="sm" disabled={!exForm.label || !exForm.day} onPress={() => { handleAddException(exForm.label, exForm.month || 'MAY', parseInt(exForm.day, 10) || 1, exForm.type); setShowException(false); setExForm(EMPTY_EXCEPTION); }}>Add</Button>
                    </View>
                </View>
            )}

            {exceptions.length === 0 ? <EmptyCard message="No holiday exceptions set" /> : exceptions.map(ex => (
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
            ))}

            <TouchableOpacity className="bg-primary-500 py-4 rounded-2xl items-center mt-2 shadow-lg shadow-primary-500/25 flex-row justify-center" activeOpacity={0.85} onPress={handleSaveAndClose} disabled={loading}>
                {loading ? <ActivityIndicator size="small" color="white" /> : <Typography className="text-white font-body-bold text-base">Save Availability</Typography>}
            </TouchableOpacity>
        </ScrollView>
    );
};
