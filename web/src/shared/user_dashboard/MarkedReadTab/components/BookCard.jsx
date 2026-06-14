"use client";

import React from "react";
import {
  FiStar,
  FiHeart,
  FiShare2,
  FiTrash2,
  FiCalendar,
  FiClock,
} from "react-icons/fi";

const BookCard = ({ book, viewMode, onBookClick }) => {
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

  const handleRemoveFromRead = (e, bookId) => {
    e.stopPropagation();
    if (confirm("Remove this book from your read list?")) {
      // Add remove logic here
      console.log("Remove book:", bookId);
    }
  };

  const handleAddToWishlist = (e, book) => {
    e.stopPropagation();
    alert(`Added "${book.title}" to wishlist!`);
  };

  const handleShare = (e, book) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `I just finished reading "${book.title}" by ${book.author}`,
      });
    } else {
      navigator.clipboard.writeText(`${book.title} by ${book.author}`);
      alert("Copied to clipboard!");
    }
  };

  if (viewMode === "list") {
    return (
      <div className="mr-book-list-item" onClick={() => onBookClick(book)}>
        <img src={book.imageUrl} alt={book.title} className="mr-book-cover" />
        <div className="mr-book-info">
          <h3 className="mr-book-title">{book.title}</h3>
          <p className="mr-book-author">by {book.author}</p>
          <div className="mr-book-rating">{renderStars(book.rating)}</div>
          <p className="mr-book-description">{book.description?.substring(0, 200)}...</p>
          <div className="mr-book-meta">
            <div className="mr-meta-item">
              <FiCalendar />
              <span>{book.published}</span>
            </div>
            <div className="mr-meta-item">
              <FiClock />
              <span>{book.pageCount} pages</span>
            </div>
          </div>
          <div className="mr-book-actions">
            <button className="mr-action-btn mr-view-btn">View Details</button>
            <button className="mr-action-btn mr-wishlist-btn" onClick={(e) => handleAddToWishlist(e, book)}>
              <FiHeart />
            </button>
            <button className="mr-action-btn mr-share-btn" onClick={(e) => handleShare(e, book)}>
              <FiShare2 />
            </button>
            <button className="mr-action-btn mr-remove-btn" onClick={(e) => handleRemoveFromRead(e, book.id)}>
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="mr-book-grid-item" onClick={() => onBookClick(book)}>
      <div className="mr-book-cover-wrapper">
        <img src={book.imageUrl} alt={book.title} className="mr-book-cover" />
        <div className="mr-book-rating-badge">{book.rating}★</div>
      </div>
      <div className="mr-book-info">
        <h3 className="mr-book-title">{book.title}</h3>
        <p className="mr-book-author">by {book.author}</p>
        <div className="mr-book-rating">{renderStars(book.rating)}</div>
        <p className="mr-book-description">{book.description?.substring(0, 100)}...</p>
        <div className="mr-book-meta">
          <span>{book.pageCount} pages</span>
        </div>
        <div className="mr-book-actions">
          <button className="mr-action-btn mr-view-btn">Details</button>
          <button className="mr-action-btn mr-wishlist-btn" onClick={(e) => handleAddToWishlist(e, book)}>
            <FiHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;