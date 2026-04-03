export interface Review {
  productId: number;
  user: string;
  rating: number;
  comment: string;
}

export const reviews: Review[] = [
  { productId: 1, user: "John", rating: 5, comment: "Absolutely love it!" },
  { productId: 2, user: "Jane", rating: 4, comment: "Very well made." },
];