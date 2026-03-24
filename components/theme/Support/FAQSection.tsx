import React, { useState, useMemo } from 'react';
import { View, LayoutAnimation, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import { Typography } from '../Typography';
import { MOCK_FAQS, FAQ_CATEGORIES } from '@/data/mockSupport';
import { filterFaqs } from '@/utils/supportHelper';

export const FAQSection: React.FC<{ search?: string }> = ({ search = '' }) => {
    const [cat, setCat] = useState<string>('All');
    const [exp, setExp] = useState<string[]>([]);

    const filtered = useMemo(() => filterFaqs(MOCK_FAQS, search, cat), [search, cat]);

    const toggle = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExp(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);
    };

    return (
        <View className="px-5 mt-2">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 -mx-5 px-5">
                <View className="flex-row space-x-2 pr-10">
                    {['All', ...FAQ_CATEGORIES].map(c => (
                        <TouchableOpacity key={c} onPress={() => setCat(c)} className={`px-6 py-2.5 rounded-full border ${cat === c ? 'bg-primary-500 border-primary-500 shadow-sm shadow-primary-500/20' : 'bg-gray-50 border-gray-100'}`}>
                            <Typography className={`text-[13px] font-bold ${cat === c ? 'text-white' : 'text-gray-500'}`}>{c}</Typography>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {filtered.length ? filtered.map(f => (
                <TouchableOpacity key={f.id} onPress={() => toggle(f.id)} className="bg-gray-50 rounded-2xl p-4 mb-3" activeOpacity={0.7}>
                    <View className="flex-row justify-between items-center">
                        <Typography variant="body-sm" className="font-bold text-gray-800 flex-1">{f.question}</Typography>
                        {exp.includes(f.id) ? <ChevronDown size={18} color="#6B7280" /> : <ChevronRight size={18} color="#6B7280" />}
                    </View>
                    {exp.includes(f.id) && <Typography variant="body-sm" className="mt-3 pt-3 border-t border-gray-100 text-gray-500 leading-5">{f.answer}</Typography>}
                </TouchableOpacity>
            )) : <View className="items-center py-10"><Typography className="text-gray-400 italic">No results found</Typography></View>}
        </View>
    );
};




