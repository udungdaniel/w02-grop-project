export interface Seller {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

export const sellers: Seller[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    bio: "Passionate artisan of clay crafts",
    avatarUrl: "/images/sellers/alice.jpg", 
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    bio: "Woodworking specialist",
    avatarUrl: "/images/sellers/bob.jpg", 
  },
];