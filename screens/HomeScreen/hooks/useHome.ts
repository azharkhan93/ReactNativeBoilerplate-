
import {
    getFeaturedServices,
    getNearbyServices,
    getRecommendedServices
} from '../helpers/homeHelpers';

export const useHome = () => {
    const featuredServices = getFeaturedServices();
    const nearbyServices = getNearbyServices();
    const recommendedServices = getRecommendedServices();

    return {
        featuredServices,
        nearbyServices,
        recommendedServices,
        loading: false,
        error: null
    };
};
