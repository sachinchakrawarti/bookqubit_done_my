"use client";

import React, { useState } from "react";
import { FiX, FiSend, FiBookOpen } from "react-icons/fi";

const CommentForm = ({ comment, onSubmit, onClose, variant = "modal" }) => {
  const [content, setContent] = useState(comment?.content || "");
  const [bookTitle, setBookTitle] = useState(comment?.bookTitle || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...comment,
        content: content.trim(),
        bookTitle: bookTitle || comment?.bookTitle,
      });
      setContent("");
      setBookTitle("");
      onClose();
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "mobile") {
    return (
      <div className="comment-form-mobile">
        <div className="form-header">
          <h3>{comment ? "Edit Comment" : "Add Comment"}</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Share your thoughts about this book..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            autoFocus
          />
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={isSubmitting || !content.trim()}>
              <FiSend /> {isSubmitting ? "Posting..." : comment ? "Update" : "Post Comment"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Modal variant
  return (
    <div className="comment-form-modal-content">
      <div className="form-header">
        <h3>{comment ? "Edit Your Comment" : "Write a Comment"}</h3>
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {!comment && (
          <div className="form-group">
            <label>
              <FiBookOpen /> Book Title
            </label>
            <input
              type="text"
              placeholder="Enter book title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label>Your Comment</label>
          <textarea
            placeholder="What are your thoughts about this book?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
          />
        </div>
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={isSubmitting || !content.trim()}>
            <FiSend /> {isSubmitting ? "Submitting..." : comment ? "Update Comment" : "Post Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;