"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiBookOpen,
  FiClock,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";
import BookCard from "./components/BookCard";
import ProgressBar from "./components/ProgressBar";
import { getBooksByLanguage } from "@/data/books";
import "./CurrentlyReadingTab.css";

const CurrentlyReadingTab = ({ 
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
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("progress");
  const [loading, setLoading] = useState(true);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Load currently reading books data
  useEffect(() => {
    setLoading(true);
    try {
      const booksData = getBooksByLanguage("en");
      // Filter books that are currently being read (progress between 1-99%)
      const readingBooks = booksData
        .filter(book => book.progress && book.progress > 0 && book.progress < 100)
        .map(book => ({
          ...book,
          progress: book.progress || Math.floor(Math.random() * 100),
          startDate: book.startDate || "2024-01-01",
          targetDate: book.targetDate || "2024-12-31",
          pagesRead: Math.floor((book.pageCount || 300) * (book.progress / 100)),
        }));
      const limitedBooks = maxItems ? readingBooks.slice(0, maxItems) : readingBooks;
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

    if (searchTerm) {
      result = result.filter(book =>
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre !== "all") {
      result = result.filter(book => book.category === selectedGenre);
    }

    if (sortBy === "progress") {
      result = [...result].sort((a, b) => b.progress - a.progress);
    } else if (sortBy === "title") {
      result = [...result].sort((a, b) => a.title?.localeCompare(b.title));
    } else if (sortBy === "pages") {
      result = [...result].sort((a, b) => (b.pagesRead || 0) - (a.pagesRead || 0));
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedGenre, sortBy, books]);

  const genres = ["all", ...new Set(books.map(book => book.category).filter(Boolean))];

  // Calculate stats
  const stats = {
    totalBooks: filteredBooks.length,
    totalPages: filteredBooks.reduce((sum, book) => sum + (book.pageCount || 0), 0),
    totalPagesRead: filteredBooks.reduce((sum, book) => sum + (book.pagesRead || 0), 0),
    avgProgress: Math.round(filteredBooks.reduce((sum, book) => sum + (book.progress || 0), 0) / filteredBooks.length) || 0,
  };

  const handleBookClick = (book) => {
    if (onBookClick) {
      onBookClick(book);
    } else {
      window.open(`/books/${book.slug}`, "_blank");
    }
  };

  const updateProgress = (bookId, newProgress) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId
          ? { ...book, progress: newProgress, pagesRead: Math.floor((book.pageCount || 300) * (newProgress / 100)) }
          : book
      )
    );
  };

  if (loading) {
    return (
      <div className={`currently-reading-loading ${isDarkMode ? "dark" : ""}`}>
        <div className="loading-spinner"></div>
        <p>Loading your reading list...</p>
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={`currently-reading-compact ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="compact-header">
          <h4>Currently Reading</h4>
          <button className="view-all-btn">View All →</button>
        </div>
        <div className="compact-books-list">
          {filteredBooks.slice(0, 3).map((book) => (
            <div key={book.id} className="compact-book-item" onClick={() => handleBookClick(book)}>
              <img src={book.imageUrl} alt={book.title} />
              <div className="compact-book-info">
                <h5>{book.title}</h5>
                <p>{book.author}</p>
                <ProgressBar progress={book.progress} size="small" />
              </div>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <div className="compact-empty">
              <p>No books currently reading</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile variant
  if (variant === "mobile") {
    return (
      <div className={`currently-reading-mobile ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="mobile-header">
          <h2>Currently Reading</h2>
          <p>Books you're reading right now</p>
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
        
        <div className="mobile-stats">
          <div className="mobile-stat">
            <FiBookOpen />
            <div>
              <strong>{stats.totalBooks}</strong>
              <span>Books</span>
            </div>
          </div>
          <div className="mobile-stat">
            <FiTrendingUp />
            <div>
              <strong>{stats.avgProgress}%</strong>
              <span>Avg Progress</span>
            </div>
          </div>
        </div>
        
        <div className="mobile-books-list">
          {filteredBooks.map((book) => (
            <div key={book.id} className="mobile-book-card" onClick={() => handleBookClick(book)}>
              <img src={book.imageUrl} alt={book.title} />
              <div className="mobile-book-details">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <ProgressBar progress={book.progress} size="small" showPercentage />
                <div className="book-meta">
                  <span>{book.pagesRead}/{book.pageCount} pages</span>
                </div>
              </div>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <div className="mobile-empty">
              <FiBookOpen />
              <p>No books currently reading</p>
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
      className={`currently-reading-full ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      {showHeader && (
        <div className="cr-header">
          <div className="cr-title-section">
            <FiBookOpen className="cr-header-icon" />
            <h1 className="cr-title">Currently Reading</h1>
          </div>
          <p className="cr-subtitle">Books you're reading right now</p>
        </div>
      )}

      {/* Stats Cards */}
      {showStats && (
        <div className="cr-stats-grid">
          <div className="cr-stat-card">
            <FiBookOpen className="cr-stat-icon" />
            <div className="cr-stat-info">
              <span className="cr-stat-value">{stats.totalBooks}</span>
              <span className="cr-stat-label">Books Reading</span>
            </div>
          </div>
          <div className="cr-stat-card">
            <FiTrendingUp className="cr-stat-icon" />
            <div className="cr-stat-info">
              <span className="cr-stat-value">{stats.avgProgress}%</span>
              <span className="cr-stat-label">Average Progress</span>
            </div>
          </div>
          <div className="cr-stat-card">
            <FiCalendar className="cr-stat-icon" />
            <div className="cr-stat-info">
              <span className="cr-stat-value">{stats.totalPagesRead.toLocaleString()}</span>
              <span className="cr-stat-label">Pages Read</span>
            </div>
          </div>
          <div className="cr-stat-card">
            <FiClock className="cr-stat-icon" />
            <div className="cr-stat-info">
              <span className="cr-stat-value">{stats.totalPages}</span>
              <span className="cr-stat-label">Total Pages</span>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="cr-filters-section">
        <div className="cr-search-bar">
          <FiSearch className="cr-search-icon" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="cr-search-input"
          />
        </div>

        <div className="cr-filters-row">
          <div className="cr-filter-group">
            <FiFilter className="cr-filter-icon" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="cr-filter-select"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === "all" ? "All Genres" : genre}
                </option>
              ))}
            </select>
          </div>

          <div className="cr-filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cr-filter-select"
            >
              <option value="progress">Sort by Progress</option>
              <option value="title">Sort by Title</option>
              <option value="pages">Sort by Pages Read</option>
            </select>
          </div>

          <div className="cr-view-toggle">
            <button
              onClick={() => setViewMode("grid")}
              className={`cr-view-btn ${viewMode === "grid" ? "active" : ""}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`cr-view-btn ${viewMode === "list" ? "active" : ""}`}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid/List */}
      {filteredBooks.length > 0 ? (
        <div className={`cr-books-${viewMode}`}>
          {filteredBooks.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              viewMode={viewMode}
              onBookClick={handleBookClick}
              onUpdateProgress={updateProgress}
            />
          ))}
        </div>
      ) : (
        <div className="cr-empty-state">
          <div className="cr-empty-icon">📖</div>
          <h3 className="cr-empty-title">No books currently reading</h3>
          <p className="cr-empty-text">Start reading a book to track your progress</p>
        </div>
      )}
    </div>
  );
};

export default CurrentlyReadingTab;