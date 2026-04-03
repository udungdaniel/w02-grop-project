export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  sellerId: number;
}

export const products: Product[] = [
  { id: 1, name: "Handmade Necklace", price: 25, description: "Beautiful handcrafted necklace", imageUrl: "/products/necklace.jpg", sellerId: 1 },
  { id: 2, name: "Wooden Bowl", price: 40, description: "Carved wooden bowl", imageUrl: "/products/bowl.jpg", sellerId: 2 },
  { id: 3, name: "Clay Flower Pot", price: 18, description: "Hand-painted flower pot", imageUrl: "/products/pot.jpg", sellerId: 1 },
];