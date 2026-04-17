import React from "react";
import { CATEGORIES } from "../constants/categories";

type Filters = {
  nameQuery: string;
  sellerQuery: string;
  minPrice: string;
  maxPrice: string;
  category: string;
};

interface SearchBarProps extends Filters {
  onChange: (filters: Filters) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  nameQuery,
  sellerQuery,
  minPrice,
  maxPrice,
  category,
  onChange,
}) => {
  const update = (newValues: Partial<Filters>) => {
    onChange({
      nameQuery,
      sellerQuery,
      minPrice,
      maxPrice,
      category,
      ...newValues,
    });
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search product..."
        value={nameQuery}
        onChange={(e) => update({ nameQuery: e.target.value })}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Search seller..."
        value={sellerQuery}
        onChange={(e) => update({ sellerQuery: e.target.value })}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => update({ minPrice: e.target.value })}
        style={styles.smallInput}
      />

      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => update({ maxPrice: e.target.value })}
        style={styles.smallInput}
      />

      <select
        value={category}
        onChange={(e) => update({ category: e.target.value })}
        style={styles.select}
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "200px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  smallInput: {
    padding: "10px",
    width: "120px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "10px",
    width: "160px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
};