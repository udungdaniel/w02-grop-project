import React from "react";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <strong>{review.user}</strong>
      <p>Rating: {review.rating} / 5</p>
      <p>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;