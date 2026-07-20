export interface ProductGridProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  discount?: number;
  rating?: number;
  isFavorite?: boolean;
}

export interface ProductGridProps {
  products?: ProductGridProduct[];
  columns?: 2 | 3;
  onProductPress?: (productId: string) => void;
  onFavoritePress?: (productId: string) => void;
  className?: string;
}
