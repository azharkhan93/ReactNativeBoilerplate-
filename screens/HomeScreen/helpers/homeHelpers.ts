import { MOCK_SERVICES } from '@/utils/constants';

/**
 * Maps MOCK_SERVICES to the format expected by the FlashSale (Special Offers) component.
 */
export const getFeaturedServices = () => {
  return MOCK_SERVICES.map(s => ({
    id: s.id,
    name: s.name,
    price: s.price,
    originalPrice: s.price * 1.2,
    discount: 20,
    rating: 4.8
  }));
};

/**
 * Maps MOCK_SERVICES to the format expected by the BestSellers (Nearby Providers) component.
 */
export const getNearbyServices = () => {
  return MOCK_SERVICES.map(s => ({
    id: s.id,
    name: s.name,
    price: s.price,
    rating: 4.9,
    isFavorite: false
  }));
};

/**
 * Maps a subset of MOCK_SERVICES to the format expected by the NewArrivals (Recommendations) component.
 */
export const getRecommendedServices = () => {
  return MOCK_SERVICES.slice(0, 2).map(s => ({
    id: s.id,
    name: s.name,
    price: s.price,
    rating: 4.7,
    isFavorite: true
  }));
};
