// src/shared/user_dashboard/WantToReadTab/components/WantToReadBookCard.jsx

"use client";

import React from "react";
import {
  FiStar,
  FiHeart,
  FiShare2,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";
import { useUserInteractions } from "@/shared/buttons";
import "./WantToReadBookCard.css";

const WantToReadBookCard = ({
  book,
  onBookClick,
  onRemove,
  isWantedProp,
  size = "passport",
}) => {
  const { isWantToRead, addToWantToRead } = useUserInteractions();
  const isWanted =
    isWantedProp !== undefined ? isWantedProp : isWantToRead(book.id);

  const handleRemove = (e) => {
    e.stopPropagation();
    if (confirm(`Remove "${book.title}" from your want to read list?`)) {
      addToWantToRead(book.id);
      window.dispatchEvent(new Event("storage"));
      setTimeout(() => window.location.reload(), 300);
      if (onRemove) onRemove(book.id);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `I want to read "${book.title}" by ${book.author}`,
      });
    } else {
      navigator.clipboard.writeText(`${book.title} by ${book.author}`);
      alert("Copied to clipboard!");
    }
  };

  // Passport style
  if (size === "passport") {
    return (
      <div
        className="want-to-read-card passport"
        onClick={() => onBookClick(book)}
      >
        <div className="passport-photo">
          <img src={book.imageUrl} alt={book.title} />
          <span className="photo-rating">⭐{book.rating}</span>
          <span className="photo-wanted-badge">
            <FiStar size={10} />
          </span>
        </div>
        <div className="passport-info">
          <div className="passport-title">{book.title}</div>
          <div className="passport-author">{book.author}</div>
          <div className="passport-meta">
            <span>{book.pageCount} pgs</span>
            <span>•</span>
            <span>{book.published?.split("-")[0]}</span>
          </div>
          <div className="passport-actions">
            <button
              className="passport-action remove"
              onClick={handleRemove}
              title="Remove"
            >
              <FiTrash2 size={12} />
            </button>
            <button
              className="passport-action share"
              onClick={handleShare}
              title="Share"
            >
              <FiShare2 size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="want-to-read-card grid" onClick={() => onBookClick(book)}>
      <div className="book-cover-wrapper">
        <img src={book.imageUrl} alt={book.title} className="book-cover" />
        <div className="rating-badge">⭐ {book.rating}</div>
        <div className="wanted-badge">
          <FiStar />
        </div>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-meta">
          <span>{book.pageCount} pages</span>
        </div>
        <div className="book-actions">
          <button
            className="action-btn details-btn"
            onClick={(e) => {
              e.stopPropagation();
              onBookClick(book);
            }}
          >
            Details
          </button>
          <button className="action-btn remove-btn" onClick={handleRemove}>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WantToReadBookCard;
