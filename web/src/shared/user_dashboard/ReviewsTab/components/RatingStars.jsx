"use client";

import React from "react";
import { FiStar } from "react-icons/fi";

const RatingStars = ({ rating, size = "medium", showValue = false }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  const getSize = () => {
    switch (size) {
      case "small":
        return "14px";
      case "large":
        return "24px";
      default:
        return "18px";
    }
  };
  
  const starSize = getSize();
  
  return (
    <div className="rating-stars">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <FiStar key={i} className="star filled" size={starSize} fill="currentColor" />;
        } else if (i === fullStars && hasHalfStar) {
          return <FiStar key={i} className="star half" size={starSize} />;
        } else {
          return <FiStar key={i} className="star empty" size={starSize} />;
        }
      })}
      {showValue && <span className="rating-value">{rating}</span>}
    </div>
  );
};

export default RatingStars;