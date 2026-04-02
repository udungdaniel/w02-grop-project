// app/seller/[id]/page.tsx
import React from "react";

interface SellerPageProps {
  params: { id: string };
}

const SellerDetails: React.FC<SellerPageProps> = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <h1>Seller Details</h1>
      <p>Seller ID: {id}</p>
    </div>
  );
};

export default SellerDetails;