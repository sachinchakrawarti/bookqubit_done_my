// src/features/public_profile/components/ProfileReviews.jsx
"use client";

import React from "react";

export default function ProfileReviews({ recentReviews }) {
  return (
    <div className="profile-section">
      <h2 className="section-title">💬 Recent Reviews</h2>
      <div className="reviews-list">
        {recentReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <strong>{review.bookTitle}</strong>
              <span className="review-rating">⭐ {review.rating}</span>
            </div>
            <p className="review-content">"{review.content}"</p>
            <p className="review-date">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}