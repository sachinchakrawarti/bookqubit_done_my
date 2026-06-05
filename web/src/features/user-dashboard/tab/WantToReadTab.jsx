"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
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
  FiPlus,
  FiChevronRight,
  FiAward,
} from "react-icons/fi";
import { getBooksByLanguage } from "@/data/books";
import "./WantToReadTab.css";

export default function WantToReadTab() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("priority");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Load books data (books with rating 4.0-4.5 as "want to read")
  useEffect(() => {
    const booksData = getBooksByLanguage("en");
    // Filter books that are rated between 4.0 and 4.5 as "want to read"
    const wantToReadBooks = booksData.filter(book => book.rating >= 4.0 && book.rating < 4.6);
    
    // Add priority and added date for each book
    const booksWithPriority = wantToReadBooks.map((book, index) => ({
      ...book,
      priority: index % 3 === 0 ? "high" : index % 2 === 0 ? "medium" : "low",
      addedDate: new Date(Date.now() - index * 86400000).toISOString().split('T')[0],
      reason: index % 2 === 0 ? "Recommended by friends" : "Featured in book club",
    }));
    
    setBooks(booksWithPriority);
    setFilteredBooks(booksWithPriority);
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

    // Priority filter
    if (priorityFilter !== "all") {
      result = result.filter(book => book.priority === priorityFilter);
    }

    // Sort
    if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      result = [...result].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "title") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "date") {
      result = [...result].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedCategory, priorityFilter, sortBy, books]);

  // Get unique categories
  const categories = ["all", ...new Set(books.map(book => book.category))];

  const handleMoveToReading = (book) => {
    if (confirm(`Start reading "${book.title}"?`)) {
      setBooks(books.filter(b => b.id !== book.id));
      alert(`Added "${book.title}" to Currently Reading!`);
    }
  };

  const handleRemove = (bookId) => {
    if (confirm("Remove this book from your wishlist?")) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  const handleShare = (book) => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `I want to read "${book.title}" by ${book.author}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${book.title} by ${book.author}`);
      alert("Copied to clipboard!");
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "#ef4444";
      case "medium": return "#f97316";
      case "low": return "#22c55e";
      default: return "#6b7280";
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case "high": return "🔥 High Priority";
      case "medium": return "📖 Medium Priority";
      case "low": return "⏰ Low Priority";
      default: return priority;
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
      className={`want-to-read-tab ${themeName}`}
      style={{ fontFamily: currentFont?.family }}
    >
      {/* Header */}
      <div className="wtr-header">
        <div className="wtr-title-section">
          <FiBookmark className={`wtr-header-icon ${theme.iconColors?.primary || "text-purple-500"}`} />
          <h1 className={`wtr-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            Want to Read
          </h1>
        </div>
        <p className={`wtr-subtitle ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
          Your reading wishlist - books you plan to read in the future
        </p>
      </div>

      {/* Stats Summary */}
      <div className="wtr-stats-grid">
        <div className={`wtr-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="wtr-stat-icon">📚</div>
          <div className="wtr-stat-info">
            <span className={`wtr-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {filteredBooks.length}
            </span>
            <span className={`wtr-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Books to Read
            </span>
          </div>
        </div>
        
        <div className={`wtr-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="wtr-stat-icon">⭐</div>
          <div className="wtr-stat-info">
            <span className={`wtr-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {(filteredBooks.reduce((sum, book) => sum + book.rating, 0) / filteredBooks.length || 0).toFixed(1)}
            </span>
            <span className={`wtr-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Avg Rating
            </span>
          </div>
        </div>
        
        <div className={`wtr-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="wtr-stat-icon">🔥</div>
          <div className="wtr-stat-info">
            <span className={`wtr-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {books.filter(b => b.priority === "high").length}
            </span>
            <span className={`wtr-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              High Priority
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`wtr-filters-section ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
        <div className="wtr-search-bar">
          <FiSearch className="wtr-search-icon" />
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`wtr-search-input ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
          />
        </div>

        <div className="wtr-filters-row">
          <div className="wtr-filter-group">
            <FiFilter className="wtr-filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`wtr-filter-select ${theme.background?.input || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="wtr-filter-group">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className={`wtr-filter-select ${theme.background?.input || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <div className="wtr-filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`wtr-filter-select ${theme.background?.input || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}
            >
              <option value="priority">Sort by Priority</option>
              <option value="rating">Sort by Rating</option>
              <option value="title">Sort by Title</option>
              <option value="date">Sort by Date Added</option>
            </select>
          </div>

          <div className="wtr-view-toggle">
            <button
              onClick={() => setViewMode("grid")}
              className={`wtr-view-btn ${viewMode === "grid" ? "active" : ""}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`wtr-view-btn ${viewMode === "list" ? "active" : ""}`}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid/List */}
      {filteredBooks.length > 0 ? (
        <div className={`wtr-books-${viewMode}`}>
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className={`wtr-book-card ${viewMode === "grid" ? "wtr-book-grid" : "wtr-book-list"} 
                ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}
            >
              {/* Priority Badge */}
              <div className="wtr-priority-badge" style={{ backgroundColor: getPriorityColor(book.priority) }}>
                {getPriorityLabel(book.priority)}
              </div>

              {/* Book Cover */}
              <div className="wtr-book-cover-wrapper">
                <img src={book.imageUrl} alt={book.title} className="wtr-book-cover" />
                <div className="wtr-book-rating-badge">
                  {book.rating}★
                </div>
              </div>

              {/* Book Info */}
              <div className="wtr-book-info">
                <h3 className={`wtr-book-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                  {book.title}
                </h3>
                <p className={`wtr-book-author ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                  by {book.author}
                </p>

                {/* Rating Stars */}
                <div className="wtr-book-rating">
                  {renderStars(book.rating)}
                  <span className={`wtr-rating-value ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                    ({book.rating})
                  </span>
                </div>

                {/* Reason */}
                {book.reason && (
                  <div className={`wtr-reason ${theme.background?.badge || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}>
                    <FiAward className="wtr-reason-icon" />
                    <span className={`wtr-reason-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-300" : "text-gray-600")}`}>
                      {book.reason}
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className={`wtr-book-description ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                  {book.description.substring(0, 120)}...
                </p>

                {/* Meta Info */}
                <div className="wtr-book-meta">
                  <div className="wtr-meta-item">
                    <FiCalendar className="wtr-meta-icon" />
                    <span className={`wtr-meta-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                      Added: {new Date(book.addedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="wtr-meta-item">
                    <FiClock className="wtr-meta-icon" />
                    <span className={`wtr-meta-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                      {book.pageCount} pages
                    </span>
                  </div>
                </div>

                {/* Category Tag */}
                <div className="wtr-book-tags">
                  <span className={`wtr-tag ${theme.background?.badge || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}>
                    {book.category}
                  </span>
                  {book.language && (
                    <span className={`wtr-tag ${theme.background?.badge || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}>
                      {book.language}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="wtr-book-actions">
                  <button
                    onClick={() => handleMoveToReading(book)}
                    className={`wtr-action-btn wtr-start-btn ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`}
                  >
                    <FiBookmark />
                    Start Reading
                  </button>
                  <button
                    onClick={() => handleShare(book)}
                    className="wtr-action-btn wtr-share-btn"
                    title="Share"
                  >
                    <FiShare2 />
                  </button>
                  <button
                    onClick={() => handleRemove(book.id)}
                    className="wtr-action-btn wtr-remove-btn"
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
        <div className={`wtr-empty-state ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="wtr-empty-icon">📚</div>
          <h3 className={`wtr-empty-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            Your reading wishlist is empty
          </h3>
          <p className={`wtr-empty-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
            Add books you want to read and they'll appear here
          </p>
          <button className={`wtr-add-btn ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`}>
            <FiPlus /> Browse Books
          </button>
        </div>
      )}
    </div>
  );
}