// src/features/public_profile/components/ProfileBooks.jsx
"use client";

import React from "react";

export default function ProfileBooks({ recentBooks }) {
  return (
    <div className="profile-section">
      <h2 className="section-title">📚 Recently Read</h2>
      <div className="books-grid">
        {recentBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.cover} alt={book.title} className="book-cover" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <div className="book-rating">⭐ {book.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}