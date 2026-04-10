"use client";

import React, { useEffect, useState } from "react";
import { products as defaultProducts, Product } from "../data/products";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    nameQuery: "",
    sellerQuery: "",
    minPrice: "",
    maxPrice: "",
  });

  const { nameQuery, sellerQuery, minPrice, maxPrice } = filters;

  // Load seller-added products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    let sellerProducts: Product[] = [];

    if (storedProducts) {
      try {
        sellerProducts = JSON.parse(storedProducts);
      } catch (error) {
        console.error("Failed to parse localStorage products:", error);
      }
    }

    // Merge default products with seller-added products
    setAllProducts([...defaultProducts, ...sellerProducts]);
  }, []);

  // Apply filters
  const filteredProducts = allProducts.filter((product: Product) => {
    const matchesName = product.name.toLowerCase().includes(nameQuery.toLowerCase());
    const matchesSeller = product.seller?.name
      ?.toLowerCase()
      .includes(sellerQuery.toLowerCase());
    const matchesMinPrice = minPrice ? product.price >= parseFloat(minPrice) : true;
    const matchesMaxPrice = maxPrice ? product.price <= parseFloat(maxPrice) : true;

    return matchesName && matchesSeller && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div style={styles.container}>
      <h1>All Products</h1>
      <p>Browse handmade products from artisans.</p>

      {/* Search and Filters */}
      <SearchBar
        nameQuery={nameQuery}
        sellerQuery={sellerQuery}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChange={(newFilters) => setFilters(newFilters)}
      />

      {/* Product Grid */}
      <div style={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },
};