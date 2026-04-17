export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  sellerId: string; 
  category?: string;
  image?: string;
  reviews?: Review[];
}

// Default products (ALL FIXED TO STRING IDs)
export const products: Product[] = [
  {
    id: "1",
    name: "Handmade Necklace",
    price: 25,
    description: "A beautiful handmade necklace crafted with care.",
    sellerId: "1",
    category: "Jewelry",
    reviews: [
      { user: "John", rating: 5, comment: "Absolutely love it!" },
      { user: "Mary", rating: 4, comment: "Great quality." },
    ],
  },
  {
    id: "2",
    name: "Wooden Bowl",
    price: 40,
    description: "Hand-carved wooden bowl, perfect for kitchen or decor.",
    sellerId: "2",
    category: "Woodwork",
    reviews: [],
  },
  {
    id: "3",
    name: "Beaded Bracelet",
    price: 15,
    description: "Colorful beaded bracelet made with love.",
    sellerId: "3",
    category: "Jewelry",
    reviews: [{ user: "Anna", rating: 5, comment: "Lovely bracelet!" }],
  },
  {
    id: "4",
    name: "Ceramic Mug",
    price: 22,
    description: "Hand-painted ceramic mug for your morning coffee.",
    category: "Pottery",
    sellerId: "4",
    reviews: [],
  },
];