"use client";

import React, { useState } from "react";
import {
  FiThumbsUp,
  FiThumbsDown,
  FiMessageSquare,
  FiMoreHorizontal,
  FiTrash2,
  FiEdit2,
  FiClock,
  FiUser,
  FiBookOpen,
} from "react-icons/fi";

const CommentCard = ({ comment, variant = "full", onLike, onDislike, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      onLike(comment.id);
      setIsLiked(true);
      if (isDisliked) setIsDisliked(false);
    }
  };

  const handleDislike = () => {
    if (!isDisliked) {
      onDislike(comment.id);
      setIsDisliked(true);
      if (isLiked) setIsLiked(false);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (variant === "mobile") {
    return (
      <div className="comment-card-mobile">
        <div className="comment-header-mobile">
          <img src={comment.userAvatar} alt={comment.userName} className="user-avatar" />
          <div className="comment-user-info">
            <strong>{comment.userName}</strong>
            <div className="comment-meta">
              <span><FiClock /> {formatDate(comment.date)}</span>
              {comment.isEdited && <span className="edited-badge">(edited)</span>}
            </div>
          </div>
          <button className="more-actions" onClick={() => setShowActions(!showActions)}>
            <FiMoreHorizontal />
          </button>
          {showActions && (
            <div className="action-dropdown-mobile">
              <button onClick={() => onEdit()}>
                <FiEdit2 /> Edit
              </button>
              <button onClick={() => onDelete(comment.id)}>
                <FiTrash2 /> Delete
              </button>
            </div>
          )}
        </div>
        
        <div className="comment-content-mobile">
          <div className="comment-book-info">
            <FiBookOpen />
            <span>On: {comment.bookTitle}</span>
          </div>
          <p>{comment.content}</p>
        </div>
        
        <div className="comment-footer-mobile">
          <button className={`action-btn ${isLiked ? "active" : ""}`} onClick={handleLike}>
            <FiThumbsUp /> {comment.likes}
          </button>
          <button className={`action-btn ${isDisliked ? "active" : ""}`} onClick={handleDislike}>
            <FiThumbsDown /> {comment.dislikes}
          </button>
          <button className="action-btn" onClick={() => setShowReplies(!showReplies)}>
            <FiMessageSquare /> {comment.replies}
          </button>
        </div>

        {showReplies && (
          <div className="replies-section-mobile">
            <p className="replies-placeholder">Replies will appear here...</p>
          </div>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <div className="comment-card-full">
      <div className="comment-sidebar">
        <img src={comment.userAvatar} alt={comment.userName} className="user-avatar" />
        <div className="vote-buttons">
          <button className={`vote-btn up ${isLiked ? "active" : ""}`} onClick={handleLike}>
            <FiThumbsUp />
          </button>
          <span className="vote-count">{comment.likes - comment.dislikes}</span>
          <button className={`vote-btn down ${isDisliked ? "active" : ""}`} onClick={handleDislike}>
            <FiThumbsDown />
          </button>
        </div>
      </div>
      
      <div className="comment-main">
        <div className="comment-header">
          <div className="comment-user">
            <strong>{comment.userName}</strong>
            <span className="comment-date">
              <FiClock /> {formatDate(comment.date)}
            </span>
            {comment.isEdited && <span className="edited-badge">Edited</span>}
          </div>
          <div className="comment-actions">
            <button className="action-icon" onClick={() => onEdit()}>
              <FiEdit2 />
            </button>
            <button className="action-icon" onClick={() => onDelete(comment.id)}>
              <FiTrash2 />
            </button>
          </div>
        </div>
        
        <div className="comment-book">
          <img src={comment.bookCover} alt={comment.bookTitle} className="book-thumb" />
          <span>Commenting on: <strong>{comment.bookTitle}</strong></span>
        </div>
        
        <div className="comment-content">
          <p>{comment.content}</p>
        </div>
        
        <div className="comment-footer">
          <button className="reply-btn" onClick={() => setShowReplies(!showReplies)}>
            <FiMessageSquare /> Reply ({comment.replies})
          </button>
        </div>

        {showReplies && (
          <div className="replies-section">
            <p className="replies-placeholder">Reply section coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;