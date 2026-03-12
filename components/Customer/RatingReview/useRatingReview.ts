import { useState } from 'react';

export interface ReviewData {
    rating: number;
    review: string;
    tags: string[];
    photos: string[];
}

export const useRatingReview = (onSubmit: (data: ReviewData) => void) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [photos, setPhotos] = useState<string[]>([]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = () => {
        if (rating === 0) return;
        onSubmit({ rating, review, tags: selectedTags, photos });
    };

    return {
        rating,
        setRating,
        review,
        setReview,
        selectedTags,
        toggleTag,
        photos,
        setPhotos,
        handleSubmit,
    };
};
