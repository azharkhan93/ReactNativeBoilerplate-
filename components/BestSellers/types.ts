export interface BestSellerProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  discount?: number;
  rating: number;
  isFavorite?: boolean;
}

export interface BestSellersProps {
  title?: string;
  products?: readonly BestSellerProduct[];
  onViewAllPress?: () => void;
  onProductPress?: (productId: string) => void;
  onFavoritePress?: (productId: string) => void;
  className?: string;
}
