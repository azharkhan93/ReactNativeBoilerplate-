import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../theme/Typography';
import { Container } from '../../theme/Container';

interface TipSelectorProps {
    selectedAmount: number | null;
    onSelect: (amount: number) => void;
}

const TIP_AMOUNTS = [5, 10, 15, 20];

export const TipSelector: React.FC<TipSelectorProps> = ({ selectedAmount, onSelect }) => {
    return (
        <Container variant="column" gap={3} className="w-full mb-6">
            <Typography variant="body-sm" className="text-slate-500 font-heading-semibold">
                LEAVE A TIP
            </Typography>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
            >
                {TIP_AMOUNTS.map((amount) => {
                    const isSelected = selectedAmount === amount;
                    return (
                        <TouchableOpacity
                            key={amount}
                            onPress={() => onSelect(amount)}
                            activeOpacity={0.7}
                            className={`px-6 py-3 rounded-2xl border-2 transition-all ${isSelected
                                    ? 'border-primary-500 bg-primary-50'
                                    : 'border-slate-100 bg-white'
                                }`}
                        >
                            <Typography
                                variant="body"
                                className={`font-heading-bold ${isSelected ? 'text-primary-600' : 'text-slate-600'}`}
                            >
                                ${amount}
                            </Typography>
                        </TouchableOpacity>
                    );
                })}
                <TouchableOpacity
                    onPress={() => onSelect(0)}
                    activeOpacity={0.7}
                    className={`px-6 py-3 rounded-2xl border-2 border-dashed ${selectedAmount === 0
                            ? 'border-primary-400 bg-slate-50'
                            : 'border-slate-200 bg-white'
                        }`}
                >
                    <Typography variant="body" className="text-slate-400 font-heading-medium">
                        Custom
                    </Typography>
                </TouchableOpacity>
            </ScrollView>
        </Container>
    );
};
