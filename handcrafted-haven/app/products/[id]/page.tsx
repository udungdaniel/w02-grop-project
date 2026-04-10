"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { products as defaultProducts, Product } from "../../data/products";
import ProductCard from "../../../components/ProductCard";
import ProductReviews from "@/components/ProductReviews";

export default function ProductDetails() {
  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!productId) return;

    // Load products added by sellers from localStorage
    const storedProducts = localStorage.getItem("products");
    let sellerProducts: Product[] = [];
    if (storedProducts) {
      try {
        sellerProducts = JSON.parse(storedProducts);
      } catch (err) {
        console.error("Error parsing localStorage products:", err);
      }
    }

    // Merge default + seller products
    const allProducts = [...defaultProducts, ...sellerProducts];

    // Find product by id
    const found = allProducts.find((p) => String(p.id) === String(productId));
    setProduct(found || null);
  }, [productId]);

  if (!product) {
    return (
      <div style={styles.container}>
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{product.name}</h1>

      {product.description && (
        <p style={styles.description}>{product.description}</p>
      )}

      <div style={styles.cardWrapper}>
        <ProductCard product={product} />
      </div>

      <section style={styles.sellerBox}>
        <h2>Seller Info</h2>
        <p>
          <strong>{product.seller?.name}</strong>
        </p>
        <p>{product.seller?.bio ?? "No bio available."}</p>
      </section>

      <ProductReviews productId={String(product.id)} />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: { fontSize: "28px", marginBottom: "10px" },
  description: { fontSize: "16px", marginBottom: "20px" },
  cardWrapper: { width: "100%", maxWidth: "350px" },
  sellerBox: {
    marginTop: "40px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
};