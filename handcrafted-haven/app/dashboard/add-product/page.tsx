"use client";

import React from "react";
import AddProductForm from "../../add-product/AddProductForm";

export default function AddProductPage() {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Add Product</h1>
      <AddProductForm />
    </div>
  );
}