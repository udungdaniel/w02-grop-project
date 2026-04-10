// components/SearchBar.tsx
import React from "react";

interface SearchBarProps {
  nameQuery: string;
  sellerQuery: string;
  minPrice: string;
  maxPrice: string;
  onChange: (filters: {
    nameQuery: string;
    sellerQuery: string;
    minPrice: string;
    maxPrice: string;
  }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  nameQuery,
  sellerQuery,
  minPrice,
  maxPrice,
  onChange,
}) => {
  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Search product name..."
        value={nameQuery}
        onChange={(e) => onChange({ nameQuery: e.target.value, sellerQuery, minPrice, maxPrice })}
        style={{ padding: "10px", margin: "5px", width: "200px", borderRadius: "6px", border: "1px solid #ccc" }}
      />
      <input
        type="text"
        placeholder="Search seller..."
        value={sellerQuery}
        onChange={(e) => onChange({ nameQuery, sellerQuery: e.target.value, minPrice, maxPrice })}
        style={{ padding: "10px", margin: "5px", width: "200px", borderRadius: "6px", border: "1px solid #ccc" }}
      />
      <input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => onChange({ nameQuery, sellerQuery, minPrice: e.target.value, maxPrice })}
        style={{ padding: "10px", margin: "5px", width: "100px", borderRadius: "6px", border: "1px solid #ccc" }}
      />
      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => onChange({ nameQuery, sellerQuery, minPrice, maxPrice: e.target.value })}
        style={{ padding: "10px", margin: "5px", width: "100px", borderRadius: "6px", border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default SearchBar;