import React, { useState, useMemo } from 'react';
import { View, LayoutAnimation, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronRight, HelpCircle, CircleHelp } from 'lucide-react-native';
import { Typography } from '../Typography';
import { FAQ, MOCK_FAQS, FAQ_CATEGORIES } from '@/data/mockSupport';


export interface FAQSectionProps {
    search?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ search = '' }) => {
    const [activeCategory, setActiveCategory] = useState<typeof FAQ_CATEGORIES[number] | 'All'>('All');
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    const filteredFaqs = useMemo(() => {
        return MOCK_FAQS.filter(faq => {
            const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) ||
                faq.answer.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [search, activeCategory]);

    const toggleExpand = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <View className="px-5 mt-2">
            {/* Category Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 -mx-5 px-5">

                <View className="flex-row space-x-2 pr-10">
                    {['All', ...FAQ_CATEGORIES].map(cat => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setActiveCategory(cat as any)}
                            className={`px-6 py-2.5 rounded-full border ${activeCategory === cat ? 'bg-primary-500 border-primary-500 shadow-sm shadow-primary-500/20' : 'bg-gray-50 border-gray-100'}`}
                        >
                            <Typography className={`text-[13px] font-bold ${activeCategory === cat ? 'text-white' : 'text-gray-500'}`}>
                                {cat}
                            </Typography>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {filteredFaqs.length > 0 ? filteredFaqs.map(faq => {
                const isExpanded = expandedIds.includes(faq.id);
                return (
                    <TouchableOpacity key={faq.id} onPress={() => toggleExpand(faq.id)} className="bg-gray-50 rounded-2xl p-4 mb-3" activeOpacity={0.7}>
                        <View className="flex-row justify-between items-center">
                            <Typography variant="body-sm" className="font-bold text-gray-800 flex-1">{faq.question}</Typography>
                            {isExpanded ? <ChevronDown size={18} color="#6B7280" /> : <ChevronRight size={18} color="#6B7280" />}
                        </View>
                        {isExpanded && <Typography variant="body-sm" className="mt-3 pt-3 border-t border-gray-100 text-gray-500 leading-5">{faq.answer}</Typography>}
                    </TouchableOpacity>
                );
            }) : (
                <View className="items-center py-10">
                    <Typography className="text-gray-400 italic">No results found</Typography>
                </View>
            )}
        </View>
    );
};




