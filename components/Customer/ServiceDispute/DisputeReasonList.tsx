import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '../../theme/Typography';
import { Container } from '../../theme/Container';
import { CheckCircle2, Circle } from 'lucide-react-native';

export const DISPUTE_REASONS = [
    'Service was not performed',
    'Poor quality of work',
    'Provider arrived late',
    'I was overcharged',
    'Damage to vehicle',
    'Other',
];

interface DisputeReasonListProps {
    selectedReason: string | null;
    onSelect: (reason: string) => void;
}

export const DisputeReasonList: React.FC<DisputeReasonListProps> = ({ selectedReason, onSelect }) => {
    return (
        <Container variant="column" gap={3} className="w-full">
            <Typography variant="body-sm" className="text-slate-500 font-heading-semibold uppercase mb-1">
                Select a reason
            </Typography>
            {DISPUTE_REASONS.map((reason) => {
                const isSelected = selectedReason === reason;
                return (
                    <TouchableOpacity
                        key={reason}
                        onPress={() => onSelect(reason)}
                        activeOpacity={0.7}
                        className={`flex-row items-center p-4 rounded-2xl border-2 transition-all ${isSelected
                            ? 'border-primary-500 bg-primary-50/30'
                            : 'border-slate-100 bg-white'
                            }`}
                    >
                        <View className="mr-3">
                            {isSelected ? (
                                <CheckCircle2 size={22} color="#3B82F6" strokeWidth={2.5} />
                            ) : (
                                <Circle size={22} color="#E2E8F0" />
                            )}
                        </View>
                        <Typography
                            variant="body"
                            className={`font-heading-medium ${isSelected ? 'text-primary-700' : 'text-slate-600'}`}
                        >
                            {reason}
                        </Typography>
                    </TouchableOpacity>
                );
            })}
        </Container>
    );
};

