import React from "react";

interface ProductDetailsProps {
  params: {
    id: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
    </div>
  );
};

export default ProductDetails;