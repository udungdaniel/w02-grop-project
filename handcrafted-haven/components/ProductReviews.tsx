"use client";

import React, { useEffect, useState } from "react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Props {
  productId: string | number;
}

export default function ProductReviews({ productId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const storageKey = `reviews_${productId}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setReviews(JSON.parse(stored));
    }
  }, [storageKey]);

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview: Review = {
      id: Date.now(),
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };

    const updated = [newReview, ...reviews];

    setReviews(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));

    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={submitReview} style={formStyle}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={inputStyle}
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          style={textareaStyle}
        />

        <button type="submit" style={buttonStyle}>
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div style={{ marginTop: "30px" }}>
        {reviews.length === 0 && <p>No reviews yet.</p>}

        {reviews.map((review) => (
          <div key={review.id} style={reviewCard}>
            <strong>{review.name}</strong>
            <p>{"⭐".repeat(review.rating)}</p>
            <p>{review.comment}</p>
            <small>{review.date}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  gap: "10px",
};

const inputStyle: React.CSSProperties = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const textareaStyle: React.CSSProperties = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonStyle: React.CSSProperties = {
  background: "#2c7a7b",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
};

const reviewCard: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "6px",
  marginBottom: "15px",
};