import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Typography } from '../../theme/Typography';
import { Button } from '../../theme/Button';
import { Container } from '../../theme/Container';
import { DisputeReasonList } from './DisputeReasonList';
import { DisputeForm } from './DisputeForm';
import { AlertCircle } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface ServiceDisputeProps {
    bookingId: string;
    providerName: string;
    onSubmit: (data: { reason: string; details: string }) => void;
    onCancel: () => void;
}

export const ServiceDispute: React.FC<ServiceDisputeProps> = ({
    bookingId,
    providerName,
    onSubmit,
    onCancel
}) => {
    const [reason, setReason] = useState<string | null>(null);
    const [details, setDetails] = useState('');

    const handleSubmit = () => {
        if (!reason) return;
        onSubmit({ reason, details });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <ScrollView
                className="flex-1 bg-white"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <Container variant="column" className="px-6 pt-8">
                    <Animated.View entering={FadeInUp.delay(100)} className="items-center mb-8 bg-error-50/50 p-6 rounded-[32px] border border-error-100/50 w-full">
                        <AlertCircle size={40} color="#EF4444" className="mb-4" />
                        <Typography variant="h3" className="text-center mb-2 text-error-900">
                            Report an Issue
                        </Typography>
                        <Typography variant="body" className="text-center text-error-700/80">
                            Booking ID: <Typography className="font-heading-bold">{bookingId}</Typography>
                        </Typography>
                        <Typography variant="body-sm" className="text-center mt-2 text-error-600/60">
                            We're sorry something went wrong with {providerName}.
                        </Typography>
                    </Animated.View>

                    <DisputeReasonList selectedReason={reason} onSelect={setReason} />

                    <DisputeForm details={details} onDetailsChange={setDetails} />

                    <Container variant="column" gap={3} className="mt-8">
                        <Button
                            onPress={handleSubmit}
                            disabled={!reason}
                            variant="primary"
                            size="md"
                            className="w-full bg-error-600"
                        >
                            Report Issue
                        </Button>
                        <Button
                            variant="primary"
                            onPress={onCancel}
                            size="sm"
                            className="w-full"
                        >
                          Cancel
                        </Button>
                    </Container>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
