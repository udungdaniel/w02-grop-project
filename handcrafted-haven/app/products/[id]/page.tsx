"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { products as defaultProducts, Product } from "../../data/products";
import ProductCard from "../../../components/ProductCard";
import ProductReviews from "@/components/ProductReviews";
import { sellers as staticSellers } from "../../data/sellers";

interface Seller {
  id: string | number;
  name: string;
  bio?: string;
  image?: string;
}

export default function ProductDetails() {
  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);

  useEffect(() => {
    if (!productId) return;

    // -------------------------------
    // LOAD PRODUCTS (local + default)
    // -------------------------------
    const storedProducts = localStorage.getItem("products");
    let sellerProducts: Product[] = [];

    if (storedProducts) {
      try {
        sellerProducts = JSON.parse(storedProducts);
      } catch (err) {
        console.error("Error parsing products:", err);
      }
    }

    const allProducts = [...defaultProducts, ...sellerProducts];

    const foundProduct = allProducts.find(
      (p) => String(p.id) === String(productId)
    );

    if (!foundProduct) {
      setProduct(null);
      return;
    }

    setProduct(foundProduct);

    // -------------------------------
    // LOAD SELLERS (local + static)
    // -------------------------------
    const storedSellers = localStorage.getItem("sellers");
    let dynamicSellers: Seller[] = [];

    if (storedSellers) {
      try {
        dynamicSellers = JSON.parse(storedSellers);
      } catch (err) {
        console.error("Error parsing sellers:", err);
      }
    }

    const allSellers: Seller[] = [
      ...staticSellers,
      ...dynamicSellers,
    ];

    const foundSeller = allSellers.find(
      (s) => String(s.id) === String(foundProduct.sellerId)
    );

    setSeller(foundSeller || null);
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

      {/* SELLER SECTION */}
      <section style={styles.sellerBox}>
        <h2>Seller Info</h2>

        {seller ? (
          <>
            <p>
              <strong>{seller.name}</strong>
            </p>
            <p>{seller.bio || "No bio available"}</p>
          </>
        ) : (
          <p style={{ color: "red" }}>
            Seller not found (check sellerId mapping)
          </p>
        )}
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