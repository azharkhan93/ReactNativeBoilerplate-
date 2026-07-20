export interface NewArrivalProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  discount?: number;
  rating?: number;
  isFavorite?: boolean;
}

export interface NewArrivalsProps {
  title?: string;
  products?: readonly NewArrivalProduct[];
  onViewAllPress?: () => void;
  onProductPress?: (productId: string) => void;
  onFavoritePress?: (productId: string) => void;
  className?: string;
}
