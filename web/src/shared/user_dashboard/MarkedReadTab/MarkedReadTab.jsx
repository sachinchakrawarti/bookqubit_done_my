"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiCheckCircle,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiBookOpen,
  FiStar,           // ✅ added
} from "react-icons/fi";
import BookCard from "./components/BookCard";
import StatsCard from "./components/StatsCard";
import { getBooksByLanguage } from "@/data/books";
import "./MarkedReadTab.css";

const MarkedReadTab = ({ 
  variant = "full", // full, compact, mobile
  showHeader = true,
  showStats = true,
  maxItems = null,
  onBookClick = null,
}) => {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Load books data
  useEffect(() => {
    setLoading(true);
    try {
      const booksData = getBooksByLanguage("en");
      // Filter books that are marked as read (rating >= 4.0)
      const readBooks = booksData.filter(book => book.rating >= 4.0);
      const limitedBooks = maxItems ? readBooks.slice(0, maxItems) : readBooks;
      setBooks(limitedBooks);
      setFilteredBooks(limitedBooks);
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  }, [maxItems]);

  // Filter and search books
  useEffect(() => {
    let result = [...books];

    // Search filter
    if (searchTerm) {
      result = result.filter(book =>
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category?.toLowerCase().includes(searchTerm.toLowerCase())
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
      result = [...result].sort((a, b) => a.title?.localeCompare(b.title));
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedCategory, selectedRating, sortBy, books]);

  // Get unique categories
  const categories = ["all", ...new Set(books.map(book => book.category).filter(Boolean))];

  // Calculate stats
  const stats = {
    totalBooks: filteredBooks.length,
    totalPages: filteredBooks.reduce((sum, book) => sum + (book.pageCount || 0), 0),
    avgRating: (filteredBooks.reduce((sum, book) => sum + (book.rating || 0), 0) / filteredBooks.length || 0).toFixed(1),
  };

  const handleBookClick = (book) => {
    if (onBookClick) {
      onBookClick(book);
    } else {
      window.open(`/books/${book.slug}`, "_blank");
    }
  };

  if (loading) {
    return (
      <div className={`marked-read-loading ${isDarkMode ? "dark" : ""}`}>
        <div className="loading-spinner"></div>
        <p>Loading your read books...</p>
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={`marked-read-compact ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="compact-header">
          <h4>Recently Read</h4>
          <button className="view-all-btn">View All →</button>
        </div>
        <div className="compact-books-list">
          {filteredBooks.slice(0, 5).map((book) => (
            <div key={book.id} className="compact-book-item" onClick={() => handleBookClick(book)}>
              <img src={book.imageUrl} alt={book.title} />
              <div className="compact-book-info">
                <h5>{book.title}</h5>
                <p>{book.author}</p>
                <div className="compact-rating">⭐ {book.rating}</div>
              </div>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <div className="compact-empty">
              <p>No books marked as read yet</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile variant
  if (variant === "mobile") {
    return (
      <div className={`marked-read-mobile ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="mobile-header">
          <h2>Marked Read</h2>
          <p>Books you've completed reading</p>
        </div>
        
        <div className="mobile-search">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="mobile-books-list">
          {filteredBooks.map((book) => (
            <div key={book.id} className="mobile-book-card" onClick={() => handleBookClick(book)}>
              <img src={book.imageUrl} alt={book.title} />
              <div className="mobile-book-details">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <div className="book-rating">⭐ {book.rating}</div>
                <div className="book-meta">
                  <span>{book.pageCount} pages</span>
                  <span>{book.published}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <div className="mobile-empty">
              <FiBookOpen />
              <p>No books marked as read yet</p>
              <button className="start-reading-btn">Start Reading</button>
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
      className={`marked-read-full ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      {showHeader && (
        <div className="mr-header">
          <div className="mr-title-section">
            <FiCheckCircle className="mr-header-icon" />
            <h1 className="mr-title">Marked Read</h1>
          </div>
          <p className="mr-subtitle">Books you've completed reading</p>
        </div>
      )}

      {/* Stats Cards */}
      {showStats && (
        <div className="mr-stats-grid">
          <StatsCard icon={<FiBookOpen />} value={stats.totalBooks} label="Books Read" />
          <StatsCard icon={<FiBookOpen />} value={stats.totalPages.toLocaleString()} label="Total Pages" />
          <StatsCard icon={<FiStar />} value={stats.avgRating} label="Avg Rating" />
        </div>
      )}

      {/* Filters Section */}
      <div className="mr-filters-section">
        <div className="mr-search-bar">
          <FiSearch className="mr-search-icon" />
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-search-input"
          />
        </div>

        <div className="mr-filters-row">
          <div className="mr-filter-group">
            <FiFilter className="mr-filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mr-filter-select"
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
              className="mr-filter-select"
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
              className="mr-filter-select"
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
            <BookCard 
              key={book.id} 
              book={book} 
              viewMode={viewMode}
              onBookClick={handleBookClick}
            />
          ))}
        </div>
      ) : (
        <div className="mr-empty-state">
          <div className="mr-empty-icon">📚</div>
          <h3 className="mr-empty-title">No books marked as read</h3>
          <p className="mr-empty-text">Start reading and mark books as complete to see them here</p>
        </div>
      )}
    </div>
  );
};

export default MarkedReadTab;