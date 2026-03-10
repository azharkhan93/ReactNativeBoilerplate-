import React from 'react';
import { View, TextInput } from 'react-native';
import { Typography } from '../../theme/Typography';
import { Container } from '../../theme/Container';

interface DisputeFormProps {
    details: string;
    onDetailsChange: (text: string) => void;
}

export const DisputeForm: React.FC<DisputeFormProps> = ({ details, onDetailsChange }) => {
    return (
        <Container variant="column" gap={3} className="w-full mt-6">
            <Typography variant="body-sm" className="text-slate-500 font-heading-semibold uppercase">
                Additional Details
            </Typography>
            <View className="bg-slate-50 rounded-3xl p-5 border border-slate-100 h-40">
                <TextInput
                    placeholder="Please describe the issue in detail so we can help you better..."
                    multiline
                    textAlignVertical="top"
                    value={details}
                    onChangeText={onDetailsChange}
                    style={{ flex: 1, color: '#1E293B', fontSize: 15, lineHeight: 22 }}
                    placeholderTextColor="#94A3B8"
                />
            </View>
        </Container>
    );
};
