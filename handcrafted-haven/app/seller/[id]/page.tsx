"use client";

import React, { useEffect, useState } from "react";
import { sellers as defaultSellers } from "../../data/sellers";
import { products as defaultProducts } from "../../data/products";
import ProductCard from "../../../components/ProductCard";

interface Seller {
  id: string;
  name: string;
  bio: string;
  image: string;
  craft?: string;
  location?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  sellerId: string;
  image?: string;
  description?: string;
}


const SellerDetails = ({ sellerId }: { sellerId: string }) => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [bioInput, setBioInput] = useState("");

  // Load data
  useEffect(() => {
    const storedSellers = JSON.parse(localStorage.getItem("sellers") || "[]");
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");

    setSellers(storedSellers.length ? storedSellers : defaultSellers);
    setProducts([...defaultProducts, ...storedProducts]);
  }, []);

  const seller = sellers.find((s) => String(s.id) === sellerId);

  useEffect(() => {
    if (seller) {
      setBioInput(seller.bio || "");
    }
  }, [seller]);

  if (!seller) {
    return (
      <div style={{ padding: "30px" }}>
        <h1>Seller Not Found</h1>
      </div>
    );
  }

  const sellerProducts = products.filter(
    (p) => String(p.sellerId) === sellerId
  );

  const handleSaveBio = () => {
    const updated = sellers.map((s) =>
      String(s.id) === sellerId ? { ...s, bio: bioInput } : s
    );

    setSellers(updated);
    localStorage.setItem("sellers", JSON.stringify(updated));
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "auto" }}>
      {/* Seller Info */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <img
          src={seller.image}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
          }}
        />

        <h1>{seller.name}</h1>

        <h3>{seller.craft || "Seller"}</h3>

        {isEditing ? (
          <>
            <textarea
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              style={{ width: "100%", maxWidth: "500px" }}
            />

            <button onClick={handleSaveBio}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p>{seller.bio || "No bio yet"}</p>
            <button onClick={() => setIsEditing(true)}>Edit Bio</button>
          </>
        )}
      </div>

      {/* Products */}
      <h2>Products by {seller.name}</h2>

      {sellerProducts.length === 0 ? (
        <p>No products yet</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {sellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDetails;