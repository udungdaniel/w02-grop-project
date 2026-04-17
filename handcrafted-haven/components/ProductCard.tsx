import React from "react";
import Link from "next/link";
import { Product } from "../app/data/products"; // ✅ use shared type

interface Seller {
  id: string;
  name: string;
  bio?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const sellers: Seller[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("sellers") || "[]")
      : [];

  const seller = sellers.find((s) => s.id === product.sellerId);

  return (
    <div style={cardStyle}>
      {product.image && (
        <img src={product.image} alt={product.name} style={imageStyle} />
      )}

      <div style={contentStyle}>
        <h3>{product.name}</h3>

        <p style={{ fontWeight: "bold" }}>₦{product.price}</p>

        <p style={{ fontSize: "14px", color: "#777" }}>
          Seller: {seller?.name || "Unknown Seller"}
        </p>

        <p style={{ fontSize: "13px", color: "#999" }}>
          {seller?.bio || "No bio information available"}
        </p>

        {product.description && (
          <p style={descriptionStyle}>
            {product.description.slice(0, 80)}...
          </p>
        )}

        <Link href={`/products/${product.id}`} style={linkStyle}>
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

/* ---------- Styles ---------- */

const cardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "15px",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "6px",
  marginBottom: "10px",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#555",
};

const linkStyle: React.CSSProperties = {
  marginTop: "10px",
  color: "#2c7a7b",
  textDecoration: "none",
  fontWeight: "bold",
};