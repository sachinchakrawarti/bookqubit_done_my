// src/shared/user_dashboard/LikesTab/components/LikedBookCard.jsx

"use client";

import React from "react";
import {
  FiHeart,
  FiStar,
  FiShare2,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";
import { useUserInteractions } from "@/shared/buttons";
import "./LikedBookCard.css";

const LikedBookCard = ({
  book,
  onBookClick,
  onUnlike,
  isLikedProp,
  size = "passport",
}) => {
  const { isLiked, toggleLike } = useUserInteractions();
  const liked = isLikedProp !== undefined ? isLikedProp : isLiked(book.id);

  const handleUnlike = (e) => {
    e.stopPropagation();
    if (confirm(`Remove "${book.title}" from your liked list?`)) {
      toggleLike(book.id);
      window.dispatchEvent(new Event("storage"));
      setTimeout(() => window.location.reload(), 300);
      if (onUnlike) onUnlike(book.id);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `I loved "${book.title}" by ${book.author}`,
      });
    } else {
      navigator.clipboard.writeText(`${book.title} by ${book.author}`);
      alert("Copied to clipboard!");
    }
  };

  // Passport style (default)
  if (size === "passport") {
    return (
      <div
        className="liked-book-card passport"
        onClick={() => onBookClick(book)}
      >
        <div className="passport-photo">
          <img src={book.imageUrl} alt={book.title} />
          <span className="photo-rating">⭐{book.rating}</span>
          <span className="photo-like-badge">
            <FiHeart size={10} />
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
              className="passport-action unlike"
              onClick={handleUnlike}
              title="Unlike"
            >
              <FiHeart className="active" size={12} />
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

  // Small style
  if (size === "small") {
    return (
      <div className="liked-book-card small" onClick={() => onBookClick(book)}>
        <div className="small-photo">
          <img src={book.imageUrl} alt={book.title} />
          <span className="small-rating">⭐{book.rating}</span>
        </div>
        <div className="small-info">
          <div className="small-title">{book.title}</div>
          <div className="small-author">{book.author}</div>
          <div className="small-actions">
            <button className="small-action unlike" onClick={handleUnlike}>
              <FiHeart className="active" size={14} />
            </button>
            <button className="small-action share" onClick={handleShare}>
              <FiShare2 size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="liked-book-card grid" onClick={() => onBookClick(book)}>
      <div className="book-cover-wrapper">
        <img src={book.imageUrl} alt={book.title} className="book-cover" />
        <div className="rating-badge">⭐ {book.rating}</div>
        <div className="like-badge">
          <FiHeart />
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
          <button className="action-btn unlike-btn" onClick={handleUnlike}>
            <FiHeart className="active" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LikedBookCard;
