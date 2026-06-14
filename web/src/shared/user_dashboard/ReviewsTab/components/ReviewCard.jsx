"use client";

import React, { useState } from "react";
import {
  FiThumbsUp,
  FiMessageSquare,
  FiShare2,
  FiEdit2,
  FiTrash2,
  FiClock,
  FiCalendar,
  FiBookOpen,
} from "react-icons/fi";
import RatingStars from "./RatingStars";

const ReviewCard = ({ 
  review, 
  viewMode = "list", 
  variant = "full",
  onLike, 
  onEdit, 
  onDelete,
  onReviewClick 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      onLike(review.id);
      setIsLiked(true);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const content = showFullContent ? review.content : review.content.substring(0, 300);
  const hasMore = review.content.length > 300;

  if (variant === "mobile") {
    return (
      <div className="review-card-mobile" onClick={() => onReviewClick?.(review)}>
        <div className="review-header-mobile">
          <img src={review.bookCover} alt={review.bookTitle} />
          <div className="review-book-info">
            <h3>{review.bookTitle}</h3>
            <p>{review.bookAuthor}</p>
            <RatingStars rating={review.rating} size="small" />
          </div>
        </div>
        <div className="review-content-mobile">
          <h4>{review.title}</h4>
          <p>{review.content.substring(0, 150)}...</p>
        </div>
        <div className="review-footer-mobile">
          <span><FiCalendar /> {formatDate(review.date)}</span>
          <button className={`like-btn ${isLiked ? "active" : ""}`} onClick={handleLike}>
            <FiThumbsUp /> {review.likes + (isLiked ? 1 : 0)}
          </button>
          <button className="comment-btn">
            <FiMessageSquare /> {review.comments}
          </button>
          <button className="edit-btn" onClick={() => onEdit(review)}>
            <FiEdit2 />
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="review-card-grid" onClick={() => onReviewClick?.(review)}>
        <img src={review.bookCover} alt={review.bookTitle} className="review-cover" />
        <div className="review-content">
          <RatingStars rating={review.rating} size="small" />
          <h3>{review.title}</h3>
          <p>{review.content.substring(0, 120)}...</p>
          <div className="review-meta">
            <span><FiBookOpen /> {review.bookTitle}</span>
            <span><FiCalendar /> {formatDate(review.date)}</span>
          </div>
          <div className="review-actions">
            <button className="like-btn" onClick={handleLike}>
              <FiThumbsUp /> {review.likes}
            </button>
            <button className="edit-btn" onClick={() => onEdit(review)}>
              <FiEdit2 />
            </button>
            <button className="delete-btn" onClick={() => onDelete(review.id)}>
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List view (full)
  return (
    <div className="review-card-list" onClick={() => onReviewClick?.(review)}>
      <div className="review-sidebar">
        <img src={review.bookCover} alt={review.bookTitle} className="review-cover" />
        <RatingStars rating={review.rating} size="medium" />
        <div className="review-votes">
          <button className={`vote-btn ${isLiked ? "active" : ""}`} onClick={handleLike}>
            <FiThumbsUp />
          </button>
          <span>{review.likes + (isLiked ? 1 : 0)}</span>
        </div>
      </div>
      
      <div className="review-main">
        <div className="review-header">
          <div>
            <h3>{review.title}</h3>
            <div className="review-book">
              <FiBookOpen />
              <span>{review.bookTitle} by {review.bookAuthor}</span>
            </div>
          </div>
          <div className="review-date">
            <FiCalendar />
            <span>{formatDate(review.date)}</span>
            {review.isEdited && <span className="edited-badge">(edited)</span>}
          </div>
        </div>
        
        <div className="review-body">
          <p>{content}</p>
          {hasMore && (
            <button className="read-more-btn" onClick={() => setShowFullContent(!showFullContent)}>
              {showFullContent ? "Show less" : "Read more"}
            </button>
          )}
        </div>
        
        <div className="review-footer">
          <div className="review-stats">
            <span><FiThumbsUp /> {review.helpful} found helpful</span>
            <span><FiMessageSquare /> {review.comments} comments</span>
          </div>
          <div className="review-actions">
            <button className="action-btn" onClick={() => onEdit(review)}>
              <FiEdit2 /> Edit
            </button>
            <button className="action-btn delete" onClick={() => onDelete(review.id)}>
              <FiTrash2 /> Delete
            </button>
            <button className="action-btn">
              <FiShare2 /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;