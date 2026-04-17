"use client";

import React, { useState } from "react";
import { Product } from "../data/products";
import { CATEGORIES } from "../../constants/categories";

export default function AddProductForm() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || price === "" || !description || !category) {
      alert("Please fill in all fields");
      return;
    }

    // ✅ MUST MATCH REGISTER SYSTEM
    const loggedInUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!loggedInUser) {
      alert("You must be logged in to add a product");
      return;
    }

    // 🔥 IMPORTANT: use STRING ID (matches sellers.ts)
    const sellerId = String(loggedInUser.id);

    if (!sellerId) {
      alert("Invalid session. Please login again.");
      return;
    }

    // ----------------------------
    // CREATE PRODUCT (FIXED STRUCTURE)
    // ----------------------------
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: name.trim(),
      price: Number(price),
      description: description.trim(),
      category: category.trim(),
      sellerId, 
      reviews: [],
    };

    // ----------------------------
    // SAVE PRODUCTS
    // ----------------------------
    let existingProducts: Product[] = [];

    try {
      const stored = localStorage.getItem("products");
      if (stored) {
        existingProducts = JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error reading products:", error);
    }

    const updatedProducts = [...existingProducts, newProduct];

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    alert(`Product Added: ${newProduct.name} - ₦${newProduct.price}`);

    // reset form
    setName("");
    setPrice("");
    setDescription("");
    setCategory(CATEGORIES[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "15px" }}>
        <label>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#2c7a7b",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Product
      </button>
    </form>
  );
}