"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiMessageCircle,
  FiHeart,
  FiShare2,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiUser,
  FiThumbsUp,
  FiMoreVertical,
  FiFlag,
} from "react-icons/fi";
import { getBooksByLanguage } from "@/data/books";
import "./CommentsTab.css";

// Note: FiReply doesn't exist in react-icons/fi, using alternative icons
// For reply functionality, we'll use FiCornerDownLeft or similar

export default function CommentsTab() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list");
  const [selectedComment, setSelectedComment] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(null);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Load comments data
  useEffect(() => {
    const booksData = getBooksByLanguage("en");
    
    // Generate mock comments for books
    const mockComments = [];
    const users = [
      { name: "John Doe", avatar: "JD", username: "@john_reader" },
      { name: "Sarah Smith", avatar: "SS", username: "@sarah_loves_books" },
      { name: "Mike Johnson", avatar: "MJ", username: "@mike_reads" },
      { name: "Emma Watson", avatar: "EW", username: "@emma_books" },
    ];
    
    const commentTexts = [
      "Absolutely loved this book! The character development was outstanding.",
      "A must-read for anyone interested in this genre. Highly recommend!",
      "The writing style is beautiful. Couldn't put it down.",
      "Interesting perspective, but felt a bit slow in the middle.",
      "One of the best books I've read this year!",
      "The ending was unexpected but satisfying.",
    ];

    booksData.slice(0, 12).forEach((book, index) => {
      const numComments = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numComments; i++) {
        const user = users[(index + i) % users.length];
        const commentDate = new Date(Date.now() - (index * 86400000) - (i * 3600000));
        
        mockComments.push({
          id: `${book.id}-${i}`,
          bookId: book.id,
          bookTitle: book.title,
          bookAuthor: book.author,
          bookCover: book.imageUrl,
          user: user,
          text: commentTexts[(index + i) % commentTexts.length],
          date: commentDate.toISOString(),
          likes: Math.floor(Math.random() * 50) + 1,
          replies: Math.floor(Math.random() * 10),
          isLiked: false,
          isEdited: i === 0 ? false : true,
        });
      }
    });
    
    setComments(mockComments);
    setFilteredComments(mockComments);
  }, []);

  // Filter comments
  useEffect(() => {
    let result = [...comments];

    // Search filter
    if (searchTerm) {
      result = result.filter(comment =>
        comment.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedFilter === "most_liked") {
      result = [...result].sort((a, b) => b.likes - a.likes);
    } else if (selectedFilter === "most_replies") {
      result = [...result].sort((a, b) => b.replies - a.replies);
    } else if (selectedFilter === "recent") {
      result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredComments(result);
  }, [searchTerm, selectedFilter, comments]);

  const handleLike = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1, isLiked: !comment.isLiked }
        : comment
    ));
  };

  const handleDelete = (commentId) => {
    if (confirm("Delete this comment?")) {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  const handleReply = (commentId) => {
    if (replyText.trim()) {
      alert(`Reply sent: "${replyText}"`);
      setReplyText("");
      setShowReplyBox(null);
    }
  };

  const handleShare = (comment) => {
    if (navigator.share) {
      navigator.share({
        title: `Comment on ${comment.bookTitle}`,
        text: comment.text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(comment.text);
      alert("Comment copied to clipboard!");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) return "Just now";
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div
      dir={direction}
      className={`comments-tab ${themeName}`}
      style={{ fontFamily: currentFont?.family }}
    >
      {/* Header */}
      <div className="comments-header">
        <div className="comments-title-section">
          <FiMessageCircle className={`comments-header-icon ${theme.iconColors?.primary || "text-sky-500"}`} />
          <h1 className={`comments-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            My Comments
          </h1>
        </div>
        <p className={`comments-subtitle ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
          All the comments you've made on books
        </p>
      </div>

      {/* Stats Summary */}
      <div className="comments-stats-grid">
        <div className={`comments-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="comments-stat-icon">💬</div>
          <div className="comments-stat-info">
            <span className={`comments-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {filteredComments.length}
            </span>
            <span className={`comments-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Total Comments
            </span>
          </div>
        </div>
        
        <div className={`comments-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="comments-stat-icon">❤️</div>
          <div className="comments-stat-info">
            <span className={`comments-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {filteredComments.reduce((sum, c) => sum + c.likes, 0)}
            </span>
            <span className={`comments-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Total Likes
            </span>
          </div>
        </div>
        
        <div className={`comments-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="comments-stat-icon">📚</div>
          <div className="comments-stat-info">
            <span className={`comments-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {new Set(filteredComments.map(c => c.bookId)).size}
            </span>
            <span className={`comments-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Books Commented
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`comments-filters-section ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
        <div className="comments-search-bar">
          <FiSearch className="comments-search-icon" />
          <input
            type="text"
            placeholder="Search comments, books, or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`comments-search-input ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
          />
        </div>

        <div className="comments-filters-row">
          <div className="comments-filter-group">
            <FiFilter className="comments-filter-icon" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className={`comments-filter-select ${theme.background?.input || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}
            >
              <option value="recent">Most Recent</option>
              <option value="most_liked">Most Liked</option>
              <option value="most_replies">Most Replies</option>
            </select>
          </div>

          <div className="comments-view-toggle">
            <button
              onClick={() => setViewMode("grid")}
              className={`comments-view-btn ${viewMode === "grid" ? "active" : ""}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`comments-view-btn ${viewMode === "list" ? "active" : ""}`}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      {filteredComments.length > 0 ? (
        <div className={`comments-${viewMode}`}>
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`comment-card ${viewMode === "grid" ? "comment-grid" : "comment-list"} 
                ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}
            >
              {/* Book Info Section */}
              <div className="comment-book-info">
                <img src={comment.bookCover} alt={comment.bookTitle} className="comment-book-cover" />
                <div className="comment-book-details">
                  <h4 className={`comment-book-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                    {comment.bookTitle}
                  </h4>
                  <p className={`comment-book-author ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                    by {comment.bookAuthor}
                  </p>
                </div>
              </div>

              {/* Comment Content */}
              <div className="comment-content">
                <div className="comment-user">
                  <div className={`comment-avatar ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`}>
                    {comment.user.avatar}
                  </div>
                  <div className="comment-user-info">
                    <div className="comment-user-name">{comment.user.name}</div>
                    <div className="comment-user-username">{comment.user.username}</div>
                  </div>
                  <div className="comment-date">
                    <FiClock size={12} />
                    <span>{formatDate(comment.date)}</span>
                  </div>
                </div>

                <p className={`comment-text ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                  {comment.text}
                </p>

                {comment.isEdited && (
                  <div className={`comment-edited ${theme.textColors?.secondary || (isDarkMode ? "text-gray-500" : "text-gray-400")}`}>
                    (edited)
                  </div>
                )}

                {/* Comment Actions */}
                <div className="comment-actions">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`comment-action-btn ${comment.isLiked ? "liked" : ""}`}
                  >
                    <FiThumbsUp />
                    <span>{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => setShowReplyBox(showReplyBox === comment.id ? null : comment.id)}
                    className="comment-action-btn"
                  >
                    <FiMessageCircle />
                    <span>{comment.replies}</span>
                  </button>
                  <button
                    onClick={() => handleShare(comment)}
                    className="comment-action-btn"
                  >
                    <FiShare2 />
                  </button>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="comment-action-btn delete-btn"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                {/* Reply Box */}
                {showReplyBox === comment.id && (
                  <div className={`reply-box ${theme.background?.input || (isDarkMode ? "bg-gray-700" : "bg-gray-50")}`}>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply..."
                      className={`reply-input ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
                      rows="2"
                    />
                    <div className="reply-actions">
                      <button
                        onClick={() => setShowReplyBox(null)}
                        className="reply-cancel"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReply(comment.id)}
                        className={`reply-submit ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`}
                      >
                        Post Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`comments-empty-state ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="comments-empty-icon">💬</div>
          <h3 className={`comments-empty-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            No comments yet
          </h3>
          <p className={`comments-empty-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
            Start commenting on books you read
          </p>
          <button className={`comments-browse-btn ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`}>
            Browse Books
          </button>
        </div>
      )}
    </div>
  );
}