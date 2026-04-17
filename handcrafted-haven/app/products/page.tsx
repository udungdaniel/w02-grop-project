"use client";

import React, { useEffect, useState } from "react";
import { products as defaultProducts, Product } from "../data/products";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import { sellers } from "../data/sellers";

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    nameQuery: "",
    sellerQuery: "",
    minPrice: "",
    maxPrice: "",
    category: "",
  });

  const { nameQuery, sellerQuery, minPrice, maxPrice, category } = filters;

  // Load seller-added products
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

    // Merge + remove duplicates
    const merged = [...defaultProducts, ...sellerProducts].filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.id === product.id)
    );

    setAllProducts(merged);
  }, []);

  const min = parseFloat(minPrice);
  const max = parseFloat(maxPrice);

  // Apply filters
  const filteredProducts = allProducts
    .filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(nameQuery.toLowerCase());

      // 
      const seller = sellers.find((s) => s.id === product.sellerId);

      const matchesSeller = sellerQuery
        ? seller?.name?.toLowerCase().includes(sellerQuery.toLowerCase())
        : true;

      const matchesMinPrice = !isNaN(min) ? product.price >= min : true;

      const matchesMaxPrice = !isNaN(max) ? product.price <= max : true;

      const matchesCategory = category
        ? product.category?.toLowerCase() === category.toLowerCase()
        : true;

      return (
        matchesName &&
        matchesSeller &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesCategory
      );
    })
    // Sort by price (low → high)
    .sort((a, b) => a.price - b.price);

  return (
    <div style={styles.container}>
      <h1>All Products</h1>
      <p>Browse handmade products from artisans.</p>

      {/* Filters */}
      <SearchBar
        nameQuery={nameQuery}
        sellerQuery={sellerQuery}
        minPrice={minPrice}
        maxPrice={maxPrice}
        category={category}
        onChange={(newFilters) => setFilters(newFilters)}
      />

      {/* Results */}
      <p style={styles.resultText}>
        Showing {filteredProducts.length} product(s)
      </p>

      {/* Product Grid */}
      <div style={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p style={styles.empty}>
            No products found. Try adjusting your filters.
          </p>
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
    maxWidth: "1200px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },
  resultText: {
    marginTop: "10px",
    color: "#555",
  },
  empty: {
    marginTop: "20px",
    color: "#888",
    textAlign: "center",
  },
};