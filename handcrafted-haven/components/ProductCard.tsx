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
  if (!product) return <div>Loading...</div>; // fallback if undefined

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link href={`/products/${product.id}`}>View Product</Link>
    </div>
  );
};

export default ProductCard;