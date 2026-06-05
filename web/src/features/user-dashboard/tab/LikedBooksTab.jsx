"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiHeart,
  FiShare2,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiThumbsUp,
  FiMessageCircle,
  FiBookOpen,
} from "react-icons/fi";
import { getBooksByLanguage } from "@/data/books";
import "./LikedBooksTab.css";

export default function LikedBooksTab() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date");
  const [selectedRating, setSelectedRating] = useState(0);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Load books data (books with rating >= 4.5 as "liked books")
  useEffect(() => {
    const booksData = getBooksByLanguage("en");
    // Filter books that are highly rated (4.5 and above)
    const likedBooks = booksData.filter(book => book.rating >= 4.5);
    
    // Add like date and reaction for each book
    const booksWithDetails = likedBooks.map((book, index) => ({
      ...book,
      likedDate: new Date(Date.now() - index * 86400000).toISOString().split('T')[0],
      reaction: index % 3 === 0 ? "❤️" : index % 2 === 0 ? "👍" : "📚",
      comment: index % 2 === 0 ? "Amazing book! Highly recommend!" : "Loved every page of this book",
    }));
    
    setBooks(booksWithDetails);
    setFilteredBooks(booksWithDetails);
  }, []);

  // Filter and search books
  useEffect(() => {
    let result = [...books];

    // Search filter
    if (searchTerm) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(book => book.category === selectedCategory);
    }

    // Rating filter
    if (selectedRating > 0) {
      result = result.filter(book => Math.floor(book.rating) >= selectedRating);
    }

    // Sort
    if (sortBy === "date") {
      result = [...result].sort((a, b) => new Date(b.likedDate) - new Date(a.likedDate));
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "title") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedCategory, selectedRating, sortBy, books]);

  // Get unique categories
  const categories = ["all", ...new Set(books.map(book => book.category))];

  const handleUnlike = (bookId) => {
    if (confirm("Remove this book from your liked books?")) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  const handleShare = (book) => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `I loved "${book.title}" by ${book.author}! ⭐${book.rating}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${book.title} by ${book.author} - ${book.rating}★`);
      alert("Copied to clipboard!");
    }
  };

  const handleViewDetails = (book) => {
    window.open(`/books/${book.slug}`, "_blank");
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <FiHeart key={i} className="star filled" fill="currentColor" />;
          } else if (i === fullStars && hasHalfStar) {
            return <FiHeart key={i} className="star half" />;
          } else {
            return <FiHeart key={i} className="star empty" />;
          }
        })}
      </div>
    );
  };

  return (
    <div
      dir={direction}
      className={`liked-books-tab ${themeName}`}
      style={{ fontFamily: currentFont?.family }}
    >
      {/* Header */}
      <div className="liked-header">
        <div className="liked-title-section">
          <FiHeart className={`liked-header-icon ${theme.iconColors?.primary || "text-red-500"}`} />
          <h1 className={`liked-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            Liked Books
          </h1>
        </div>
        <p className={`liked-subtitle ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
          Books you've loved and recommended
        </p>
      </div>

      {/* Stats Summary */}
      <div className="liked-stats-grid">
        <div className={`liked-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="liked-stat-icon">❤️</div>
          <div className="liked-stat-info">
            <span className={`liked-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {filteredBooks.length}
            </span>
            <span className={`liked-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Liked Books
            </span>
          </div>
        </div>
        
        <div className={`liked-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="liked-stat-icon">⭐</div>
          <div className="liked-stat-info">
            <span className={`liked-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {(filteredBooks.reduce((sum, book) => sum + book.rating, 0) / filteredBooks.length || 0).toFixed(1)}
            </span>
            <span className={`liked-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Avg Rating
            </span>
          </div>
        </div>
        
        <div className={`liked-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="liked-stat-icon">📖</div>
          <div className="liked-stat-info">
            <span className={`liked-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {filteredBooks.reduce((sum, book) => sum + book.pageCount, 0)}
            </span>
            <span className={`liked-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Total Pages
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`liked-filters-section ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
        <div className="liked-search-bar">
          <FiSearch className="liked-search-icon" />
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`liked-search-input ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
          />
        </div>

        <div className="liked-filters-row">
          <div className="liked-filter-group">
            <FiFilter className="liked-filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`liked-filter-select ${theme.background?.input || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="liked-filter-group">
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
              className={`liked-filter-select ${theme.background?.input || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5★ & above</option>
              <option value={4.8}>4.8★ & above</option>
            </select>
          </div>

          <div className="liked-filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`liked-filter-select ${theme.background?.input || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}
            >
              <option value="date">Sort by Date Liked</option>
              <option value="rating">Sort by Rating</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>

          <div className="liked-view-toggle">
            <button
              onClick={() => setViewMode("grid")}
              className={`liked-view-btn ${viewMode === "grid" ? "active" : ""}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`liked-view-btn ${viewMode === "list" ? "active" : ""}`}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid/List */}
      {filteredBooks.length > 0 ? (
        <div className={`liked-books-${viewMode}`}>
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className={`liked-book-card ${viewMode === "grid" ? "liked-book-grid" : "liked-book-list"} 
                ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}
            >
              {/* Reaction Badge */}
              <div className="liked-reaction-badge">
                {book.reaction}
              </div>

              {/* Book Cover */}
              <div className="liked-book-cover-wrapper">
                <img src={book.imageUrl} alt={book.title} className="liked-book-cover" />
                <div className="liked-book-rating-badge">
                  {book.rating}★
                </div>
              </div>

              {/* Book Info */}
              <div className="liked-book-info">
                <h3 className={`liked-book-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                  {book.title}
                </h3>
                <p className={`liked-book-author ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                  by {book.author}
                </p>

                {/* Rating Hearts */}
                <div className="liked-book-rating">
                  {renderStars(book.rating)}
                  <span className={`liked-rating-value ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                    ({book.rating})
                  </span>
                </div>

                {/* User Comment */}
                {book.comment && (
                  <div className={`liked-comment ${theme.background?.badge || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}>
                    <FiMessageCircle className="liked-comment-icon" />
                    <span className={`liked-comment-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-300" : "text-gray-600")}`}>
                      "{book.comment}"
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className={`liked-book-description ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                  {book.description.substring(0, 120)}...
                </p>

                {/* Meta Info */}
                <div className="liked-book-meta">
                  <div className="liked-meta-item">
                    <FiCalendar className="liked-meta-icon" />
                    <span className={`liked-meta-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                      Liked: {new Date(book.likedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="liked-meta-item">
                    <FiClock className="liked-meta-icon" />
                    <span className={`liked-meta-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                      {book.pageCount} pages
                    </span>
                  </div>
                  <div className="liked-meta-item">
                    <FiThumbsUp className="liked-meta-icon" />
                    <span className={`liked-meta-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                      Recommended
                    </span>
                  </div>
                </div>

                {/* Category Tag */}
                <div className="liked-book-tags">
                  <span className={`liked-tag ${theme.background?.badge || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}>
                    {book.category}
                  </span>
                  {book.language && (
                    <span className={`liked-tag ${theme.background?.badge || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}>
                      {book.language}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="liked-book-actions">
                  <button
                    onClick={() => handleViewDetails(book)}
                    className={`liked-action-btn liked-view-btn ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`}
                  >
                    <FiBookOpen />
                    View Details
                  </button>
                  <button
                    onClick={() => handleShare(book)}
                    className="liked-action-btn liked-share-btn"
                    title="Share"
                  >
                    <FiShare2 />
                  </button>
                  <button
                    onClick={() => handleUnlike(book.id)}
                    className="liked-action-btn liked-unlike-btn"
                    title="Remove"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`liked-empty-state ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="liked-empty-icon">❤️</div>
          <h3 className={`liked-empty-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            No liked books yet
          </h3>
          <p className={`liked-empty-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
            Start liking books you enjoy and they'll appear here
          </p>
          <button className={`liked-browse-btn ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`}>
            Browse Books
          </button>
        </div>
      )}
    </div>
  );
}