import React from 'react';
import { FormInput } from '../../theme';

interface DisputeFormProps {
    details: string;
    onDetailsChange: (text: string) => void;
}

export const DisputeForm: React.FC<DisputeFormProps> = ({ details, onDetailsChange }) => {
    return (
        <FormInput
            label="Additional Details"
            placeholder="Please describe the issue in detail so we can help you better..."
            multiline
            value={details}
            onChangeText={onDetailsChange}
            inputClassName="min-h-[140px]"
            containerClassName="mt-6 w-full"
        />
    );
};
