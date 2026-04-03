// app/products/page.tsx
import React from "react";
import { products } from "../data/products";
import ProductCard from "../../components/ProductCard";

const ProductsPage = () => {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>All Products</h1>
      <p>Browse handmade products from artisans.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;