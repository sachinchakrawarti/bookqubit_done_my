"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiCheckCircle,
  FiStar,
  FiHeart,
  FiShare2,
  FiBookmark,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
} from "react-icons/fi";
import { getBooksByLanguage } from "@/data/books";
import "./MarkedReadTab.css";

export default function MarkedReadTab() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("date");

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Load books data
  useEffect(() => {
    const booksData = getBooksByLanguage("en");
    // Filter books that are marked as read (using rating as indicator for read books)
    const readBooks = booksData.filter(book => book.rating >= 4.0);
    setBooks(readBooks);
    setFilteredBooks(readBooks);
  }, []);

  // Filter and search books
  useEffect(() => {
    let result = books;

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
      result = [...result].sort((a, b) => new Date(b.published) - new Date(a.published));
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "title") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedCategory, selectedRating, sortBy, books]);

  // Get unique categories
  const categories = ["all", ...new Set(books.map(book => book.category))];

  const handleRemoveFromRead = (bookId) => {
    if (confirm("Remove this book from your read list?")) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  const handleAddToWishlist = (book) => {
    alert(`Added "${book.title}" to wishlist!`);
  };

  const handleShare = (book) => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `I just finished reading "${book.title}" by ${book.author}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${book.title} by ${book.author}`);
      alert("Copied to clipboard!");
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <FiStar key={i} className="star filled" fill="currentColor" />;
          } else if (i === fullStars && hasHalfStar) {
            return <FiStar key={i} className="star half" />;
          } else {
            return <FiStar key={i} className="star empty" />;
          }
        })}
      </div>
    );
  };

  return (
    <div
      dir={direction}
      className={`marked-read-tab ${themeName}`}
      style={{ fontFamily: currentFont?.family }}
    >
      {/* Header */}
      <div className="mr-header">
        <div className="mr-title-section">
          <FiCheckCircle className={`mr-header-icon ${theme.iconColors?.primary || "text-green-500"}`} />
          <h1 className={`mr-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            Marked Read
          </h1>
        </div>
        <p className={`mr-subtitle ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
          Books you've completed reading
        </p>
      </div>

      {/* Stats Summary */}
      <div className="mr-stats-grid">
        <div className={`mr-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="mr-stat-icon">📚</div>
          <div className="mr-stat-info">
            <span className={`mr-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {filteredBooks.length}
            </span>
            <span className={`mr-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Books Read
            </span>
          </div>
        </div>
        
        <div className={`mr-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="mr-stat-icon">⭐</div>
          <div className="mr-stat-info">
            <span className={`mr-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {(filteredBooks.reduce((sum, book) => sum + book.rating, 0) / filteredBooks.length || 0).toFixed(1)}
            </span>
            <span className={`mr-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Avg Rating
            </span>
          </div>
        </div>
        
        <div className={`mr-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="mr-stat-icon">📖</div>
          <div className="mr-stat-info">
            <span className={`mr-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {filteredBooks.reduce((sum, book) => sum + book.pageCount, 0)}
            </span>
            <span className={`mr-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Total Pages
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`mr-filters-section ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
        <div className="mr-search-bar">
          <FiSearch className="mr-search-icon" />
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`mr-search-input ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
          />
        </div>

        <div className="mr-filters-row">
          <div className="mr-filter-group">
            <FiFilter className="mr-filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`mr-filter-select ${theme.background?.input || (isDarkMode ? "bg-gray-700" : "bg-gray-100")} 
                ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mr-filter-group">
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
              className={`mr-filter-select ${theme.background?.input || (isDarkMode ? "bg-gray-700" : "bg-gray-100")} 
                ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
            >
              <option value={0}>All Ratings</option>
              <option value={4}>4★ & above</option>
              <option value={4.5}>4.5★ & above</option>
            </select>
          </div>

          <div className="mr-filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`mr-filter-select ${theme.background?.input || (isDarkMode ? "bg-gray-700" : "bg-gray-100")} 
                ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>

          <div className="mr-view-toggle">
            <button
              onClick={() => setViewMode("grid")}
              className={`mr-view-btn ${viewMode === "grid" ? "active" : ""}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`mr-view-btn ${viewMode === "list" ? "active" : ""}`}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid/List */}
      {filteredBooks.length > 0 ? (
        <div className={`mr-books-${viewMode}`}>
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className={`mr-book-card ${viewMode === "grid" ? "mr-book-grid" : "mr-book-list"} 
                ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}
            >
              {/* Book Cover */}
              <div className="mr-book-cover-wrapper">
                <img src={book.imageUrl} alt={book.title} className="mr-book-cover" />
                <div className="mr-book-rating-badge">
                  {book.rating}★
                </div>
              </div>

              {/* Book Info */}
              <div className="mr-book-info">
                <h3 className={`mr-book-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                  {book.title}
                </h3>
                <p className={`mr-book-author ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                  by {book.author}
                </p>

                {/* Rating Stars */}
                <div className="mr-book-rating">
                  {renderStars(book.rating)}
                  <span className={`mr-rating-value ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                    ({book.rating})
                  </span>
                </div>

                {/* Description */}
                <p className={`mr-book-description ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                  {book.description.substring(0, 150)}...
                </p>

                {/* Meta Info */}
                <div className="mr-book-meta">
                  <div className="mr-meta-item">
                    <FiCalendar className="mr-meta-icon" />
                    <span className={`mr-meta-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                      {book.published}
                    </span>
                  </div>
                  <div className="mr-meta-item">
                    <FiClock className="mr-meta-icon" />
                    <span className={`mr-meta-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                      {book.pageCount} pages
                    </span>
                  </div>
                </div>

                {/* Category Tag */}
                <div className="mr-book-tags">
                  <span className={`mr-tag ${theme.background?.badge || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}>
                    {book.category}
                  </span>
                  {book.language && (
                    <span className={`mr-tag ${theme.background?.badge || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}>
                      {book.language}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mr-book-actions">
                  <button
                    onClick={() => window.open(`/books/${book.slug}`, "_blank")}
                    className={`mr-action-btn mr-view-btn ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(book)}
                    className="mr-action-btn mr-wishlist-btn"
                    title="Add to Wishlist"
                  >
                    <FiHeart />
                  </button>
                  <button
                    onClick={() => handleShare(book)}
                    className="mr-action-btn mr-share-btn"
                    title="Share"
                  >
                    <FiShare2 />
                  </button>
                  <button
                    onClick={() => handleRemoveFromRead(book.id)}
                    className="mr-action-btn mr-remove-btn"
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
        <div className={`mr-empty-state ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="mr-empty-icon">📚</div>
          <h3 className={`mr-empty-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            No books marked as read
          </h3>
          <p className={`mr-empty-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
            Start reading and mark books as complete to see them here
          </p>
        </div>
      )}
    </div>
  );
}