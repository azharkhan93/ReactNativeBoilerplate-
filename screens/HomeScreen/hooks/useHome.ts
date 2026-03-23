
import { useQuery } from '@apollo/client/react';
import { GetHomeDataDocument } from '../../../__generated__/graphql';
import {
    getFeaturedServices,
    getNearbyServices,
    getRecommendedServices
} from '../helpers/homeHelpers';

export const useHome = () => {
    const { data, loading, error } = useQuery(GetHomeDataDocument);

    const featuredServices = data?.items?.map((item) => ({
        id: item.id,
        name: item.name,
        price: 45,
        originalPrice: 60,
        discount: 25,
        imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80',
        rating: 4.8,
    })) || getFeaturedServices();

    const nearbyServices = getNearbyServices();
    const recommendedServices = getRecommendedServices();

    return {
        featuredServices,
        nearbyServices,
        recommendedServices,
        loading,
        error
    };
};
