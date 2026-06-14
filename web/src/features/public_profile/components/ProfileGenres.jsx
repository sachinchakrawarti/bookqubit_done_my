// src/features/public_profile/components/ProfileGenres.jsx
"use client";

import React from "react";

export default function ProfileGenres({ favoriteGenres, favoriteAuthors }) {
  return (
    <>
      <div className="profile-section">
        <h2 className="section-title">📖 Favorite Genres</h2>
        <div className="genres-list">
          {favoriteGenres.map((genre) => (
            <span key={genre} className="genre-tag">{genre}</span>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">✍️ Favorite Authors</h2>
        <div className="authors-list">
          {favoriteAuthors.map((author) => (
            <span key={author} className="author-tag">{author}</span>
          ))}
        </div>
      </div>
    </>
  );
}