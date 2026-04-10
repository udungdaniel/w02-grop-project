import React from "react";
import { sellers } from "../../data/sellers";
import { products } from "../../data/products";
import ProductCard from "../../../components/ProductCard";

interface SellerPageProps {
  params: { id: string };
}

const SellerDetails: React.FC<SellerPageProps> = ({ params }) => {
  const sellerId = params.id; // keep as string

  // Find seller (match by name or convert logic if needed)
  const seller = sellers.find((s) => s.name === sellerId);

  if (!seller) {
    return (
      <div style={{ padding: "30px" }}>
        <h1>Seller Not Found</h1>
      </div>
    );
  }

  // Filter seller products
  const sellerProducts = products.filter(
    (product) => product.seller.name === seller.name
  );

  return (
    <div style={{ padding: "30px" }}>
      {/* Seller Profile */}
      <h1>{seller.name}</h1>

      <img
        src={seller.image}
        alt={seller.name}
        style={{ width: "200px", borderRadius: "10px" }}
      />

      <h3>{seller.craft}</h3>
      <p>{seller.bio}</p>

      <p>
        <strong>Location:</strong> {seller.location}
      </p>

      {/* Seller Products */}
      <h2 style={{ marginTop: "40px" }}>
        Products by {seller.name}
      </h2>

      {sellerProducts.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {sellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDetails;