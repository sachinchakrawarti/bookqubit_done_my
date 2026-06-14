"use client";

import React, { useState } from "react";
import {
  FiStar,
  FiHeart,
  FiShare2,
  FiBookOpen,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import ProgressBar from "./ProgressBar";

const BookCard = ({ book, viewMode, onBookClick, onUpdateProgress }) => {
  const [showProgressInput, setShowProgressInput] = useState(false);
  const [newProgress, setNewProgress] = useState(book.progress);

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

  const handleUpdateProgress = () => {
    if (newProgress >= 0 && newProgress <= 100) {
      onUpdateProgress(book.id, newProgress);
      setShowProgressInput(false);
    }
  };

  const handleContinueReading = () => {
    if (onBookClick) onBookClick(book);
  };

  if (viewMode === "list") {
    return (
      <div className="cr-book-list-item">
        <img src={book.imageUrl} alt={book.title} className="cr-book-cover" />
        <div className="cr-book-info">
          <h3 className="cr-book-title">{book.title}</h3>
          <p className="cr-book-author">by {book.author}</p>
          {renderStars(book.rating)}
          
          <ProgressBar progress={book.progress} showPercentage />
          
          <div className="cr-book-meta">
            <div className="cr-meta-item">
              <FiCalendar />
              <span>Started: {book.startDate}</span>
            </div>
            <div className="cr-meta-item">
              <FiClock />
              <span>{book.pagesRead}/{book.pageCount} pages</span>
            </div>
          </div>
          
          <div className="cr-book-actions">
            <button className="cr-action-btn cr-continue-btn" onClick={handleContinueReading}>
              <FiBookOpen /> Continue Reading
            </button>
            <button 
              className="cr-action-btn cr-update-btn"
              onClick={() => setShowProgressInput(!showProgressInput)}
            >
              Update Progress
            </button>
            <button className="cr-action-btn cr-wishlist-btn">
              <FiHeart />
            </button>
            <button className="cr-action-btn cr-share-btn">
              <FiShare2 />
            </button>
          </div>

          {showProgressInput && (
            <div className="cr-progress-input">
              <input
                type="range"
                min="0"
                max="100"
                value={newProgress}
                onChange={(e) => setNewProgress(Number(e.target.value))}
              />
              <div className="cr-progress-controls">
                <span>{newProgress}%</span>
                <button onClick={handleUpdateProgress}>Save</button>
                <button onClick={() => setShowProgressInput(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="cr-book-grid-item">
      <div className="cr-book-cover-wrapper">
        <img src={book.imageUrl} alt={book.title} className="cr-book-cover" />
        <div className="cr-progress-badge">{book.progress}%</div>
      </div>
      <div className="cr-book-info">
        <h3 className="cr-book-title">{book.title}</h3>
        <p className="cr-book-author">by {book.author}</p>
        {renderStars(book.rating)}
        
        <ProgressBar progress={book.progress} size="small" />
        
        <div className="cr-book-meta">
          <span>{book.pagesRead}/{book.pageCount} pages</span>
        </div>
        
        <div className="cr-book-actions">
          <button className="cr-action-btn cr-continue-btn" onClick={handleContinueReading}>
            Continue
          </button>
          <button className="cr-action-btn cr-wishlist-btn">
            <FiHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;