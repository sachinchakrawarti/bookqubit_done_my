"use client";

import React, { useState } from "react";
import {
  FiHeart,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiStar,
  FiTrash2,
  FiFlag,
  FiChevronDown,
} from "react-icons/fi";
import PriorityBadge from "./PriorityBadge";

const WishlistCard = ({ 
  book, 
  viewMode = "grid", 
  variant = "full",
  onBookClick, 
  onMoveToReading, 
  onRemove,
  onUpdatePriority 
}) => {
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [showReason, setShowReason] = useState(false);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const priorities = [
    { value: "high", label: "High Priority", color: "#ef4444" },
    { value: "medium", label: "Medium Priority", color: "#f59e0b" },
    { value: "low", label: "Low Priority", color: "#10b981" },
  ];

  const handlePriorityChange = (priority) => {
    onUpdatePriority(book.id, priority);
    setShowPriorityMenu(false);
  };

  if (variant === "mobile") {
    return (
      <div className="wishlist-card-mobile" onClick={() => onBookClick(book)}>
        <img src={book.cover} alt={book.title} />
        <div className="book-details">
          <div className="book-header">
            <h3>{book.title}</h3>
            <PriorityBadge priority={book.priority} />
          </div>
          <p>{book.author}</p>
          <div className="book-meta">
            <span><FiCalendar /> {formatDate(book.addedDate)}</span>
            <span><FiClock /> {book.estimatedPages} pages</span>
            <span><FiStar /> {book.rating}</span>
          </div>
          {book.reason && (
            <div className="book-reason">
              <span>Why: {book.reason.substring(0, 60)}...</span>
            </div>
          )}
          <div className="book-actions">
            <button className="start-btn" onClick={() => onMoveToReading(book.id)}>
              <FiBookOpen /> Start Reading
            </button>
            <button className="remove-btn" onClick={() => onRemove(book.id)}>
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="wishlist-card-list" onClick={() => onBookClick(book)}>
        <img src={book.cover} alt={book.title} className="book-cover" />
        <div className="book-info">
          <div className="book-header">
            <h3 className="book-title">{book.title}</h3>
            <PriorityBadge priority={book.priority} />
          </div>
          <p className="book-author">by {book.author}</p>
          <div className="book-rating">
            <FiStar className="star" />
            <span>{book.rating}</span>
            <span className="category">{book.category}</span>
          </div>
          {book.reason && (
            <div className="book-reason">
              <strong>Why I want to read this:</strong>
              <p>{book.reason}</p>
            </div>
          )}
          <div className="book-tags">
            {book.tags.map((tag, idx) => (
              <span key={idx} className="tag">#{tag}</span>
            ))}
          </div>
          <div className="book-meta">
            <span><FiCalendar /> Added on {formatDate(book.addedDate)}</span>
            <span><FiClock /> {book.estimatedPages} pages</span>
          </div>
          <div className="book-actions">
            <button className="start-btn" onClick={() => onMoveToReading(book.id)}>
              <FiBookOpen /> Start Reading
            </button>
            <div className="priority-dropdown">
              <button className="priority-btn" onClick={() => setShowPriorityMenu(!showPriorityMenu)}>
                <FiFlag /> Change Priority <FiChevronDown />
              </button>
              {showPriorityMenu && (
                <div className="priority-menu">
                  {priorities.map(p => (
                    <button key={p.value} onClick={() => handlePriorityChange(p.value)}>
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="remove-btn" onClick={() => onRemove(book.id)}>
              <FiTrash2 /> Remove
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="wishlist-card-grid" onClick={() => onBookClick(book)}>
      <div className="book-cover-wrapper">
        <img src={book.cover} alt={book.title} className="book-cover" />
        <PriorityBadge priority={book.priority} className="priority-badge" />
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-rating">
          <FiStar className="star" />
          <span>{book.rating}</span>
        </div>
        <div className="book-meta">
          <span><FiClock /> {book.estimatedPages} pgs</span>
        </div>
        <div className="book-actions">
          <button className="start-btn" onClick={() => onMoveToReading(book.id)}>
            <FiBookOpen /> Start
          </button>
          <button className="remove-btn" onClick={() => onRemove(book.id)}>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;