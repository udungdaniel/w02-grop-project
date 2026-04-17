import React from "react";
import Link from "next/link";

interface Seller {
  id: string | number;
  name: string;
  bio?: string;
  image?: string;     
  avatarUrl?: string;  
}

interface SellerCardProps {
  seller: Seller;
}

const SellerCard: React.FC<SellerCardProps> = ({ seller }) => {
  // ✅ fallback logic (very important)
  const imageSrc =
    seller.image || seller.avatarUrl || "/default-avatar.png";

  return (
    <div style={styles.card}>
      <img
        src={imageSrc}
        alt={seller.name}
        style={styles.image}
      />

      <h3 style={styles.name}>{seller.name}</h3>

      <p style={styles.bio}>
        {seller.bio || "No bio available"}
      </p>

      <Link href={`/seller/${seller.id}`} style={styles.link}>
        View Profile
      </Link>
    </div>
  );
};

export default SellerCard;

// ✅ cleaner UI (optional but better)
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#fff",
    maxWidth: "250px",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  name: {
    fontSize: "18px",
    marginBottom: "5px",
  },
  bio: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  link: {
    color: "#0070f3",
    textDecoration: "none",
    fontWeight: "bold",
  },
};