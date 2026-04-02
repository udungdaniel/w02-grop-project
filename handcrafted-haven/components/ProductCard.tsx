// components/ProductCard.tsx
import React from "react";
import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  price: number;
}

interface ProductCardProps {
  product?: Product; // optional to avoid errors
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", width: "200px" }}>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      {/* Correct usage of Link in Next.js 13+ */}
      <Link 
        href={`/products/${product.id}`} 
        style={{ color: "#0070f3", textDecoration: "underline" }}
      >
        View Product
      </Link>
    </div>
  );
};

export default ProductCard;