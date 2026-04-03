import React from "react";
import { products, Product, Review } from "../../data/products";
import ProductCard from "../../../components/ProductCard";

interface ProductDetailsProps {
  params: { id: string };
}

export default function ProductDetails({ params }: ProductDetailsProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        Product not found
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Product Info */}
      <h1>{product.name}</h1>
      {product.description && <p>{product.description}</p>}
      <ProductCard product={product} />

      {/* Seller Info */}
      <section
        style={{
          marginTop: "40px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Seller Info</h2>
        <p><strong>{product.seller.name}</strong></p>
        <p>{product.seller.bio ?? "No bio available."}</p>
      </section>

      {/* Reviews */}
      <section style={{ marginTop: "40px" }}>
        <h2>Reviews</h2>

        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review: Review, idx: number) => (
            <div
              key={idx}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "10px 0",
              }}
            >
              <p>
                <strong>{review.user}</strong> ⭐ {review.rating}
              </p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>
    </div>
  );
}