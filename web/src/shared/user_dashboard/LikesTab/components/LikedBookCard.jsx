"use client";

import React from "react";
import {
  FiHeart,
  FiStar,
  FiShare2,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiThumbsUp,
} from "react-icons/fi";

const LikedBookCard = ({ book, viewMode, variant, onBookClick, onUnlike }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`star ${i < fullStars ? "filled" : "empty"}`}
            fill={i < fullStars ? "currentColor" : "none"}
          />
        ))}
        <span className="rating-value">({rating})</span>
      </div>
    );
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleUnlikeClick = (e) => {
    e.stopPropagation();
    onUnlike(book.id);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `I really liked "${book.title}" by ${book.author}`,
      });
    } else {
      navigator.clipboard.writeText(`${book.title} by ${book.author}`);
      alert("Copied to clipboard!");
    }
  };

  if (variant === "mobile") {
    return (
      <div className="liked-book-card-mobile" onClick={() => onBookClick(book)}>
        <img src={book.cover} alt={book.title} />
        <div className="book-details">
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <div className="book-meta">
            <span className="category">{book.category}</span>
            <span className="liked-date">
              <FiClock /> {formatDate(book.likedDate)}
            </span>
          </div>
          {renderStars(book.rating)}
          <div className="book-stats">
            <span><FiThumbsUp /> {book.likedBy}</span>
          </div>
          <div className="book-actions">
            <button className="unlike-btn" onClick={handleUnlikeClick}>
              <FiHeart /> Unlike
            </button>
            <button className="share-btn" onClick={handleShare}>
              <FiShare2 /> Share
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="liked-book-list-item" onClick={() => onBookClick(book)}>
        <img src={book.cover} alt={book.title} className="book-cover" />
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
          {renderStars(book.rating)}
          <p className="book-description">{book.description.substring(0, 200)}...</p>
          <div className="book-meta">
            <div className="meta-item">
              <FiCalendar />
              <span>Liked on {formatDate(book.likedDate)}</span>
            </div>
            <div className="meta-item">
              <FiBookIcon />
              <span>{book.pageCount} pages</span>
            </div>
            <div className="meta-item">
              <FiThumbsUp />
              <span>{book.likedBy} likes</span>
            </div>
          </div>
          <div className="book-actions">
            <button className="unlike-btn" onClick={handleUnlikeClick}>
              <FiHeart /> Unlike
            </button>
            <button className="share-btn" onClick={handleShare}>
              <FiShare2 /> Share
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="liked-book-grid-item" onClick={() => onBookClick(book)}>
      <div className="book-cover-wrapper">
        <img src={book.cover} alt={book.title} className="book-cover" />
        <button className="unlike-badge" onClick={handleUnlikeClick}>
          <FiHeart />
        </button>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        {renderStars(book.rating)}
        <div className="book-meta">
          <span className="category">{book.category}</span>
          <span className="likes-count">
            <FiThumbsUp /> {book.likedBy}
          </span>
        </div>
        <div className="book-actions">
          <button className="share-btn-small" onClick={handleShare}>
            <FiShare2 />
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper icon component
const FiBookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export default LikedBookCard;