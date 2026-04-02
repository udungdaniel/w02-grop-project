import React from "react";
import { products } from "../../data/products";
import ProductCard from "../../../components/ProductCard";

interface Product {
  id: string | number;
  name: string;
  price: number;
}

interface ProductDetailsProps {
  params: {
    id: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const { id } = params;

  // Find the product by id
  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <div>Product not found</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Product Details</h1>
      <ProductCard product={product} />
    </div>
  );
};

export default ProductDetails;