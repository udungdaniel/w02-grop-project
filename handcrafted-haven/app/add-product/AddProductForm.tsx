"use client";

import React, { useState } from "react";
import { Product } from "../data/products";

export default function AddProductForm() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || price === "" || !description) {
      alert("Please fill in all fields");
      return;
    }

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      price: Number(price),
      description,
      seller: {
        name: "You",
        bio: "New seller",
      },
      reviews: [],
    };

    alert(`Product Added: ${newProduct.name} - $${newProduct.price}`);

    // Clear form
    setName("");
    setPrice("");
    setDescription("");
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