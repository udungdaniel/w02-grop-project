import React from "react";
import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  description?: string;
  seller?: { name: string; bio?: string };
}

interface ProductCardProps {
  product: Product; // required now
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div style={cardStyle}>
      {/* Product Image */}
      {product.image && (
        <img src={product.image} alt={product.name} style={imageStyle} />
      )}

      <div style={contentStyle}>
        <h3 style={{ margin: "5px 0" }}>{product.name}</h3>

        <p style={{ fontWeight: "bold", margin: "5px 0" }}>
          ${product.price}
        </p>

        {product.seller && (
          <p style={{ fontSize: "14px", color: "#777", margin: "5px 0" }}>
            Seller: {product.seller.name}
          </p>
        )}

        {product.description && (
          <p style={descriptionStyle}>{product.description.slice(0, 80)}...</p>
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
  justifyContent: "space-between",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  width: "100%",
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