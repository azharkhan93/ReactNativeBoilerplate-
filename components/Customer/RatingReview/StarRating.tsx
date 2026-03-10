import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Star } from 'lucide-react-native';
import { Container } from '../../theme/Container';

interface StarRatingProps {
    rating: number;
    onRatingChange?: (rating: number) => void;
    maxStars?: number;
    size?: number;
    readonly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
    rating,
    onRatingChange,
    maxStars = 5,
    size = 32,
    readonly = false,
}) => {
    return (
        <Container variant="row" gap={2} className="justify-center py-4">
            {[...Array(maxStars)].map((_, index) => {
                const starIndex = index + 1;
                const isFull = starIndex <= rating;

                return (
                    <TouchableOpacity
                        key={index}
                        disabled={readonly}
                        onPress={() => onRatingChange?.(starIndex)}
                        activeOpacity={0.7}
                    >
                        <Star
                            size={size}
                            fill={isFull ? '#F59E0B' : 'transparent'}
                            color={isFull ? '#F59E0B' : '#D1D5DB'}
                            strokeWidth={1.5}
                        />
                    </TouchableOpacity>
                );
            })}
        </Container>
    );
};
