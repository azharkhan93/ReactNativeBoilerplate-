import React, { useState, useMemo } from 'react';
import {
  View,
  LayoutAnimation,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import { Typography } from '../Typography';
import { MOCK_FAQS, FAQ_CATEGORIES } from '@/data/mockSupport';
import { filterFaqs } from '@/utils/supportHelper';

export const FAQSection: React.FC<{ search?: string }> = ({ search = '' }) => {
  const [cat, setCat] = useState<string>('All');
  const [exp, setExp] = useState<string[]>([]);

  const filtered = useMemo(
    () => filterFaqs(MOCK_FAQS, search, cat),
    [search, cat],
  );

  const toggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExp(p => (p.includes(id) ? p.filter(i => i !== id) : [...p, id]));
  };

  return (
    <View className="px-5 mt-2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-5 -mx-5 px-5"
      >
        <View className="flex-row space-x-2 gap-2 pr-10">
          {['All', ...FAQ_CATEGORIES].map(c => (
            <TouchableOpacity
              key={c}
              onPress={() => setCat(c)}
              className={`px-5 py-2 rounded-full border ${
                cat === c
                  ? 'bg-primary-500 border-primary-500 shadow-md shadow-primary-500/25'
                  : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
              }`}
              activeOpacity={0.7}
            >
              <Typography
                className={`text-[13px] font-body-semibold ${
                  cat === c ? 'text-white' : 'text-slate-700'
                }`}
              >
                {c}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {filtered.length ? (
        filtered.map(f => (
          <TouchableOpacity
            key={f.id}
            onPress={() => toggle(f.id)}
            className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-3 shadow-sm shadow-slate-100/60"
            activeOpacity={0.7}
          >
            <View className="flex-row justify-between items-center">
              <Typography
                variant="body-sm"
                className="font-body-semibold text-slate-900 flex-1 pr-2 text-sm"
              >
                {f.question}
              </Typography>
              {exp.includes(f.id) ? (
                <ChevronDown size={18} color="#3b82f6" />
              ) : (
                <ChevronRight size={18} color="#94a3b8" />
              )}
            </View>
            {exp.includes(f.id) && (
              <Typography
                variant="body-sm"
                className="mt-3 pt-3 border-t border-slate-100 text-slate-600 leading-5 font-body-medium text-xs"
              >
                {f.answer}
              </Typography>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <View className="items-center py-10">
          <Typography className="text-slate-400 italic font-body-medium">
            No results found
          </Typography>
        </View>
      )}
    </View>
  );
};
