export interface Seller {
  id: number;
  name: string;
  bio: string;
  avatarUrl: string;
}

export const sellers: Seller[] = [
  { id: 1, name: "Alice", bio: "Passionate artisan of clay crafts", avatarUrl: "/sellers/alice.jpg" },
  { id: 2, name: "Bob", bio: "Woodworking specialist", avatarUrl: "/sellers/bob.jpg" },
];