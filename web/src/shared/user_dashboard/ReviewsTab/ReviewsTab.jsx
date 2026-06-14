"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiStar,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiEdit2,
  FiTrash2,
  FiThumbsUp,
  FiMessageSquare,
  FiShare2,
  FiClock,
  FiCalendar,
  FiBookOpen,
} from "react-icons/fi";
import ReviewCard from "./components/ReviewCard";
import RatingStars from "./components/RatingStars";
import "./ReviewsTab.css";

const ReviewsTab = ({ 
  variant = "full", // full, compact, mobile
  showHeader = true,
  showStats = true,
  maxItems = null,
  onReviewClick = null,
  onEditReview = null,
  onDeleteReview = null,
}) => {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("list");
  const [loading, setLoading] = useState(true);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock reviews data
  useEffect(() => {
    setLoading(true);
    try {
      const mockReviews = [
        {
          id: 1,
          bookId: 1,
          bookTitle: "The Great Gatsby",
          bookCover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          bookAuthor: "F. Scott Fitzgerald",
          rating: 4.5,
          title: "A Timeless Classic",
          content: "This book is a masterpiece of American literature. The themes of wealth, love, and the American Dream are brilliantly explored. Fitzgerald's prose is absolutely gorgeous, and the characters are unforgettable. A must-read for everyone.",
          date: "2024-01-15",
          likes: 24,
          comments: 5,
          isEdited: false,
          helpful: 18,
        },
        {
          id: 2,
          bookId: 2,
          bookTitle: "1984",
          bookCover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          bookAuthor: "George Orwell",
          rating: 5,
          title: "Chillingly Relevant",
          content: "A chilling vision of the future that remains relevant today. Orwell's warnings about surveillance and control are more important than ever. The world-building is exceptional, and the characters are deeply compelling.",
          date: "2024-01-10",
          likes: 42,
          comments: 12,
          isEdited: false,
          helpful: 35,
        },
        {
          id: 3,
          bookId: 3,
          bookTitle: "Dune",
          bookCover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          bookAuthor: "Frank Herbert",
          rating: 4.8,
          title: "Science Fiction Epic",
          content: "An epic masterpiece of science fiction that continues to inspire generations. The world-building is phenomenal, and the political intrigue is fascinating. A complex but rewarding read.",
          date: "2024-01-05",
          likes: 56,
          comments: 8,
          isEdited: true,
          editedDate: "2024-01-07",
          helpful: 42,
        },
        {
          id: 4,
          bookId: 4,
          bookTitle: "To Kill a Mockingbird",
          bookCover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          bookAuthor: "Harper Lee",
          rating: 5,
          title: "Powerful and Moving",
          content: "A powerful story of racial injustice and loss of innocence in the American South. Harper Lee's writing is beautiful and heartbreaking. This book will stay with you long after you finish it.",
          date: "2023-12-28",
          likes: 38,
          comments: 6,
          isEdited: false,
          helpful: 29,
        },
        {
          id: 5,
          bookId: 5,
          bookTitle: "The Hobbit",
          bookCover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          bookAuthor: "J.R.R. Tolkien",
          rating: 4.7,
          title: "A Wonderful Adventure",
          content: "A timeless fantasy adventure that began it all. Tolkien's world-building is incredible, and Bilbo's journey is both exciting and heartwarming. Perfect for readers of all ages.",
          date: "2023-12-20",
          likes: 45,
          comments: 10,
          isEdited: false,
          helpful: 33,
        },
      ];
      
      const limitedReviews = maxItems ? mockReviews.slice(0, maxItems) : mockReviews;
      setReviews(limitedReviews);
      setFilteredReviews(limitedReviews);
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [maxItems]);

  // Filter and sort reviews
  useEffect(() => {
    let result = [...reviews];

    if (searchTerm) {
      result = result.filter(review =>
        review.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRating > 0) {
      result = result.filter(review => Math.floor(review.rating) === selectedRating);
    }

    if (sortBy === "recent") {
      result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "helpful") {
      result = [...result].sort((a, b) => b.helpful - a.helpful);
    } else if (sortBy === "likes") {
      result = [...result].sort((a, b) => b.likes - a.likes);
    }

    setFilteredReviews(result);
  }, [searchTerm, selectedRating, sortBy, reviews]);

  const stats = {
    totalReviews: reviews.length,
    averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0).toFixed(1),
    totalLikes: reviews.reduce((sum, r) => sum + r.likes, 0),
    totalHelpful: reviews.reduce((sum, r) => sum + r.helpful, 0),
    ratingDistribution: {
      5: reviews.filter(r => Math.floor(r.rating) === 5).length,
      4: reviews.filter(r => Math.floor(r.rating) === 4).length,
      3: reviews.filter(r => Math.floor(r.rating) === 3).length,
      2: reviews.filter(r => Math.floor(r.rating) === 2).length,
      1: reviews.filter(r => Math.floor(r.rating) === 1).length,
    },
  };

  const handleEdit = (review) => {
    if (onEditReview) {
      onEditReview(review);
    } else {
      alert(`Edit review for "${review.bookTitle}"`);
    }
  };

  const handleDelete = (reviewId) => {
    if (onDeleteReview) {
      onDeleteReview(reviewId);
    } else if (confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter(r => r.id !== reviewId));
    }
  };

  const handleLike = (reviewId) => {
    setReviews(reviews.map(review =>
      review.id === reviewId
        ? { ...review, likes: review.likes + 1 }
        : review
    ));
  };

  if (loading) {
    return (
      <div className={`reviews-loading ${isDarkMode ? "dark" : ""}`}>
        <div className="loading-spinner"></div>
        <p>Loading your reviews...</p>
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={`reviews-compact ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="compact-header">
          <h4>Recent Reviews</h4>
          <button className="view-all-btn">View All →</button>
        </div>
        <div className="compact-reviews-list">
          {filteredReviews.slice(0, 3).map((review) => (
            <div key={review.id} className="compact-review-item" onClick={() => onReviewClick?.(review)}>
              <div className="compact-review-header">
                <strong>{review.bookTitle}</strong>
                <RatingStars rating={review.rating} size="small" />
              </div>
              <p>{review.content.substring(0, 80)}...</p>
              <div className="compact-review-footer">
                <span><FiThumbsUp /> {review.likes}</span>
                <span><FiMessageSquare /> {review.comments}</span>
              </div>
            </div>
          ))}
          {filteredReviews.length === 0 && (
            <div className="compact-empty">
              <p>No reviews yet</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile variant
  if (variant === "mobile") {
    return (
      <div className={`reviews-mobile ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="mobile-header">
          <h2>My Reviews</h2>
          <p>Share your thoughts about books</p>
        </div>

        <div className="mobile-stats">
          <div className="mobile-stat">
            <FiStar />
            <div>
              <strong>{stats.totalReviews}</strong>
              <span>Reviews</span>
            </div>
          </div>
          <div className="mobile-stat">
            <FiStar />
            <div>
              <strong>{stats.averageRating}</strong>
              <span>Avg Rating</span>
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

        <button className="mobile-write-review-btn">
          + Write a Review
        </button>

        <div className="mobile-search">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mobile-filters">
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(Number(e.target.value))}
            className="mobile-filter-select"
          >
            <option value={0}>All Ratings</option>
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mobile-filter-select"
          >
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rated</option>
            <option value="helpful">Most Helpful</option>
            <option value="likes">Most Likes</option>
          </select>
        </div>

        <div className="mobile-reviews-list">
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              variant="mobile"
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {filteredReviews.length === 0 && (
            <div className="mobile-empty">
              <FiStar />
              <p>No reviews found</p>
              <button className="write-review-btn">Write Your First Review</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full variant (default)
  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`reviews-full ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      {showHeader && (
        <div className="reviews-header">
          <div className="reviews-title-section">
            <FiStar className="reviews-header-icon" />
            <h1 className="reviews-title">My Reviews</h1>
          </div>
          <p className="reviews-subtitle">Share your thoughts and help other readers discover great books</p>
        </div>
      )}

      {/* Stats Cards */}
      {showStats && (
        <div className="reviews-stats-grid">
          <div className="reviews-stat-card">
            <FiStar className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{stats.totalReviews}</span>
              <span className="stat-label">Total Reviews</span>
            </div>
          </div>
          <div className="reviews-stat-card">
            <FiStar className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{stats.averageRating}</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
          <div className="reviews-stat-card">
            <FiThumbsUp className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{stats.totalHelpful}</span>
              <span className="stat-label">Helpful Votes</span>
            </div>
          </div>
          <div className="reviews-stat-card">
            <FiMessageSquare className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{reviews.reduce((sum, r) => sum + r.comments, 0)}</span>
              <span className="stat-label">Comments</span>
            </div>
          </div>
        </div>
      )}

      {/* Rating Distribution */}
      <div className="rating-distribution">
        <h3>Rating Distribution</h3>
        <div className="distribution-bars">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = stats.ratingDistribution[rating];
            const percentage = (count / stats.totalReviews) * 100 || 0;
            return (
              <div key={rating} className="distribution-row">
                <span className="rating-label">{rating} ★</span>
                <div className="distribution-bar">
                  <div className="distribution-fill" style={{ width: `${percentage}%` }} />
                </div>
                <span className="rating-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions Bar */}
      <div className="reviews-actions">
        <button className="write-review-btn">
          <FiEdit2 /> Write a Review
        </button>
      </div>

      {/* Search and Filters */}
      <div className="reviews-filters-section">
        <div className="reviews-search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search reviews by book title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="reviews-search-input"
          />
        </div>

        <div className="reviews-filters-row">
          <div className="filter-group">
            <FiFilter className="filter-icon" />
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
              className="filter-select"
            >
              <option value={0}>All Ratings</option>
              <option value={5}>5 Stars - Excellent</option>
              <option value={4}>4 Stars - Very Good</option>
              <option value={3}>3 Stars - Good</option>
              <option value={2}>2 Stars - Fair</option>
              <option value={1}>1 Star - Poor</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rated</option>
              <option value="helpful">Most Helpful</option>
              <option value="likes">Most Likes</option>
            </select>
          </div>

          <div className="reviews-view-toggle">
            <button
              onClick={() => setViewMode("grid")}
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List/Grid */}
      {filteredReviews.length > 0 ? (
        <div className={`reviews-${viewMode}`}>
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              viewMode={viewMode}
              variant="full"
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReviewClick={onReviewClick}
            />
          ))}
        </div>
      ) : (
        <div className="reviews-empty-state">
          <div className="empty-icon">✍️</div>
          <h3 className="empty-title">No reviews yet</h3>
          <p className="empty-text">Share your thoughts about books you've read</p>
          <button className="empty-write-btn">Write Your First Review</button>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;