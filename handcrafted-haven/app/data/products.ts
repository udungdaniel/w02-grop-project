export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface Seller {
  name: string;
  bio?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  seller: Seller;
  reviews?: Review[];
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface Seller {
  name: string;
  bio?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  seller: Seller;
  reviews?: Review[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Handmade Necklace",
    price: 25,
    description: "A beautiful handmade necklace crafted with care.",
    seller: {
      name: "Alice Artisan",
      bio: "Crafting jewelry for over 10 years."
    },
    reviews: [
      {
        user: "John",
        rating: 5,
        comment: "Absolutely love it!"
      },
      {
        user: "Mary",
        rating: 4,
        comment: "Great quality."
      }
    ]
  },
  {
    id: "2",
    name: "Wooden Bowl",
    price: 40,
    description: "Hand-carved wooden bowl, perfect for kitchen or decor.",
    seller: {
      name: "Bob Carpenter",
      bio: "Specializes in handmade wooden items."
    },
    reviews: []
  },
  {
    id: "3",
    name: "Beaded Bracelet",
    price: 15,
    description: "Colorful beaded bracelet made with love.",
    seller: {
      name: "Clara Beads",
      bio: "Jewelry artisan using traditional techniques."
    },
    reviews: [
      { user: "Anna", rating: 5, comment: "Lovely bracelet!" }
    ]
  },
  {
    id: "4",
    name: "Ceramic Mug",
    price: 22,
    description: "Hand-painted ceramic mug for your morning coffee.",
    seller: {
      name: "David Potter",
      bio: "Ceramic artist crafting functional art pieces."
    },
    reviews: []
  }
];