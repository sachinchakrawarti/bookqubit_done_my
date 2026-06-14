"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiMessageSquare,
  FiFilter,
  FiSearch,
  FiThumbsUp,
  FiThumbsDown,
  FiMoreHorizontal,
  FiTrash2,
  FiEdit2,
  FiClock,
  FiUser,
} from "react-icons/fi";
import CommentCard from "./components/CommentCard";
import CommentForm from "./components/CommentForm";
import "./CommentsTab.css";

const CommentsTab = ({ 
  variant = "full", // full, compact, mobile
  showHeader = true,
  maxItems = null,
  onCommentClick = null,
}) => {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, recent, popular
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [loading, setLoading] = useState(true);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock comments data
  useEffect(() => {
    setLoading(true);
    try {
      const mockComments = [
        {
          id: 1,
          bookId: 1,
          bookTitle: "The Great Gatsby",
          bookCover: "https://via.placeholder.com/50x70",
          userName: "Sarah Johnson",
          userAvatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=3b82f6&color=fff",
          content: "This book was absolutely amazing! The character development was incredible and the plot kept me engaged throughout. Highly recommend!",
          date: "2024-01-15",
          likes: 24,
          dislikes: 2,
          replies: 5,
          isEdited: false,
        },
        {
          id: 2,
          bookId: 2,
          bookTitle: "1984",
          bookCover: "https://via.placeholder.com/50x70",
          userName: "Michael Chen",
          userAvatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=8b5cf6&color=fff",
          content: "A chilling vision of the future that remains relevant today. Orwell's masterpiece is a must-read for everyone.",
          date: "2024-01-10",
          likes: 42,
          dislikes: 1,
          replies: 12,
          isEdited: false,
        },
        {
          id: 3,
          bookId: 3,
          bookTitle: "Dune",
          bookCover: "https://via.placeholder.com/50x70",
          userName: "Emily Rodriguez",
          userAvatar: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=10b981&color=fff",
          content: "The world-building is phenomenal! Herbert creates an entire universe that feels real and lived-in. A masterpiece of science fiction.",
          date: "2024-01-05",
          likes: 56,
          dislikes: 0,
          replies: 8,
          isEdited: false,
        },
        {
          id: 4,
          bookId: 4,
          bookTitle: "To Kill a Mockingbird",
          bookCover: "https://via.placeholder.com/50x70",
          userName: "David Williams",
          userAvatar: "https://ui-avatars.com/api/?name=David+Williams&background=ef4444&color=fff",
          content: "A timeless classic that deals with important themes of justice and morality. Beautifully written and thought-provoking.",
          date: "2023-12-28",
          likes: 38,
          dislikes: 3,
          replies: 6,
          isEdited: true,
          editedDate: "2024-01-02",
        },
      ];
      
      const limitedComments = maxItems ? mockComments.slice(0, maxItems) : mockComments;
      setComments(limitedComments);
      setFilteredComments(limitedComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoading(false);
    }
  }, [maxItems]);

  // Filter comments
  useEffect(() => {
    let result = [...comments];

    if (searchTerm) {
      result = result.filter(comment =>
        comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType === "recent") {
      result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (filterType === "popular") {
      result = [...result].sort((a, b) => b.likes - a.likes);
    }

    setFilteredComments(result);
  }, [searchTerm, filterType, comments]);

  const handleAddComment = (newComment) => {
    const comment = {
      id: Date.now(),
      ...newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      dislikes: 0,
      replies: 0,
      isEdited: false,
    };
    setComments([comment, ...comments]);
    setShowCommentForm(false);
  };

  const handleEditComment = (updatedComment) => {
    setComments(comments.map(comment =>
      comment.id === updatedComment.id
        ? { ...updatedComment, isEdited: true, editedDate: new Date().toISOString().split('T')[0] }
        : comment
    ));
    setEditingComment(null);
  };

  const handleDeleteComment = (commentId) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const handleDislikeComment = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, dislikes: comment.dislikes + 1 }
        : comment
    ));
  };

  const stats = {
    totalComments: comments.length,
    totalLikes: comments.reduce((sum, c) => sum + c.likes, 0),
    totalReplies: comments.reduce((sum, c) => sum + c.replies, 0),
  };

  if (loading) {
    return (
      <div className={`comments-loading ${isDarkMode ? "dark" : ""}`}>
        <div className="loading-spinner"></div>
        <p>Loading comments...</p>
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={`comments-compact ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="compact-header">
          <h4>Recent Comments</h4>
          <button className="view-all-btn">View All →</button>
        </div>
        <div className="compact-comments-list">
          {filteredComments.slice(0, 3).map((comment) => (
            <div key={comment.id} className="compact-comment-item" onClick={() => onCommentClick?.(comment)}>
              <img src={comment.userAvatar} alt={comment.userName} />
              <div className="compact-comment-info">
                <div className="compact-comment-header">
                  <strong>{comment.userName}</strong>
                  <span>on {comment.bookTitle}</span>
                </div>
                <p>{comment.content.substring(0, 80)}...</p>
                <div className="compact-comment-stats">
                  <span><FiThumbsUp /> {comment.likes}</span>
                  <span><FiMessageSquare /> {comment.replies}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredComments.length === 0 && (
            <div className="compact-empty">
              <p>No comments yet</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile variant
  if (variant === "mobile") {
    return (
      <div className={`comments-mobile ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="mobile-header">
          <h2>Comments</h2>
          <p>What people are saying about books</p>
        </div>

        <div className="mobile-stats">
          <div className="mobile-stat">
            <FiMessageSquare />
            <div>
              <strong>{stats.totalComments}</strong>
              <span>Comments</span>
            </div>
          </div>
          <div className="mobile-stat">
            <FiThumbsUp />
            <div>
              <strong>{stats.totalLikes}</strong>
              <span>Likes</span>
            </div>
          </div>
        </div>

        <button className="mobile-add-comment-btn" onClick={() => setShowCommentForm(true)}>
          + Add Comment
        </button>

        <div className="mobile-search">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search comments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mobile-filters">
          <button
            className={`filter-chip ${filterType === "all" ? "active" : ""}`}
            onClick={() => setFilterType("all")}
          >
            All
          </button>
          <button
            className={`filter-chip ${filterType === "recent" ? "active" : ""}`}
            onClick={() => setFilterType("recent")}
          >
            Recent
          </button>
          <button
            className={`filter-chip ${filterType === "popular" ? "active" : ""}`}
            onClick={() => setFilterType("popular")}
          >
            Popular
          </button>
        </div>

        <div className="mobile-comments-list">
          {filteredComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              variant="mobile"
              onLike={handleLikeComment}
              onDislike={handleDislikeComment}
              onEdit={() => setEditingComment(comment)}
              onDelete={handleDeleteComment}
            />
          ))}
          {filteredComments.length === 0 && (
            <div className="mobile-empty">
              <FiMessageSquare />
              <p>No comments found</p>
              <button onClick={() => setShowCommentForm(true)}>Be the first to comment</button>
            </div>
          )}
        </div>

        {showCommentForm && (
          <CommentForm
            onSubmit={handleAddComment}
            onClose={() => setShowCommentForm(false)}
            variant="mobile"
          />
        )}

        {editingComment && (
          <CommentForm
            comment={editingComment}
            onSubmit={handleEditComment}
            onClose={() => setEditingComment(null)}
            variant="mobile"
          />
        )}
      </div>
    );
  }

  // Full variant (default)
  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`comments-full ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      {showHeader && (
        <div className="comments-header">
          <div className="comments-title-section">
            <FiMessageSquare className="comments-header-icon" />
            <h1 className="comments-title">Comments</h1>
          </div>
          <p className="comments-subtitle">Share your thoughts and engage with other readers</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="comments-stats-grid">
        <div className="comments-stat-card">
          <FiMessageSquare className="stat-icon" />
          <div className="stat-info">
            <span className="stat-value">{stats.totalComments}</span>
            <span className="stat-label">Total Comments</span>
          </div>
        </div>
        <div className="comments-stat-card">
          <FiThumbsUp className="stat-icon" />
          <div className="stat-info">
            <span className="stat-value">{stats.totalLikes}</span>
            <span className="stat-label">Total Likes</span>
          </div>
        </div>
        <div className="comments-stat-card">
          <FiMessageSquare className="stat-icon" />
          <div className="stat-info">
            <span className="stat-value">{stats.totalReplies}</span>
            <span className="stat-label">Replies</span>
          </div>
        </div>
      </div>

      {/* Add Comment Button */}
      <div className="comments-actions">
        <button className="add-comment-btn" onClick={() => setShowCommentForm(true)}>
          + Write a Comment
        </button>
      </div>

      {/* Search and Filters */}
      <div className="comments-filters-section">
        <div className="comments-search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search comments by book, user, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="comments-search-input"
          />
        </div>

        <div className="comments-filters-row">
          <div className="filter-group">
            <FiFilter className="filter-icon" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Comments</option>
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comments List */}
      {filteredComments.length > 0 ? (
        <div className="comments-list">
          {filteredComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              variant="full"
              onLike={handleLikeComment}
              onDislike={handleDislikeComment}
              onEdit={() => setEditingComment(comment)}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      ) : (
        <div className="comments-empty-state">
          <div className="empty-icon">💬</div>
          <h3 className="empty-title">No comments yet</h3>
          <p className="empty-text">Be the first to share your thoughts about books</p>
          <button className="empty-add-btn" onClick={() => setShowCommentForm(true)}>
            Write a Comment
          </button>
        </div>
      )}

      {/* Comment Form Modal */}
      {showCommentForm && (
        <div className="comment-form-overlay">
          <div className="comment-form-modal">
            <CommentForm
              onSubmit={handleAddComment}
              onClose={() => setShowCommentForm(false)}
              variant="modal"
            />
          </div>
        </div>
      )}

      {/* Edit Comment Form Modal */}
      {editingComment && (
        <div className="comment-form-overlay">
          <div className="comment-form-modal">
            <CommentForm
              comment={editingComment}
              onSubmit={handleEditComment}
              onClose={() => setEditingComment(null)}
              variant="modal"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsTab;