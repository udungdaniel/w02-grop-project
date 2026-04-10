"use client";

import React from "react";
import AddProductForm from "./AddProductForm";

export default function AddProductPage() {
  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>Add Product</h1>
      <p>Fill in the details below to add a new handcrafted product.</p>
      <AddProductForm />
    </div>
  );
}