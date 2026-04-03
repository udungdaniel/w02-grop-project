import React from "react";
import Link from "next/link";

interface Seller {
  id: string | number;
  name: string;
  bio?: string;
  avatarUrl?: string;
}

interface SellerCardProps {
  seller: Seller;
}

const SellerCard: React.FC<SellerCardProps> = ({ seller }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px" }}>
      <img src={seller.avatarUrl || "/default-avatar.png"} alt={seller.name} width={100} />
      <h3>{seller.name}</h3>
      <p>{seller.bio || "No bio available"}</p>
      <Link href={`/seller/${seller.id}`}>View Profile</Link>
    </div>
  );
};

export default SellerCard;