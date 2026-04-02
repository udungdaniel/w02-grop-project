// app/page.tsx
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Handcrafted Haven</h1>
      <p>
        Welcome to Handcrafted Haven — a marketplace for unique handmade
        products created by talented artisans.
      </p>

      <h2>Featured Products</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}