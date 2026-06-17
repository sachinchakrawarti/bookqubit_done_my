// src/shared/user_dashboard/CurrentlyReadingTab/CurrentlyReadingTab.jsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiBookOpen,
  FiFilter,
  FiSearch,
  FiTrendingUp,
  FiClock,
  FiBookmark,
} from "react-icons/fi";
import BookCard from "./components/BookCard";
import StatsCard from "./components/StatsCard";
import { getBooksByLanguage } from "@/data/books";
import { useUserInteractions } from "@/shared/buttons";
import "./CurrentlyReadingTab.css";

const CurrentlyReadingTab = ({
  variant = "full",
  showHeader = true,
  showStats = true,
  maxItems = null,
  onBookClick = null,
  cardSize = "passport",
}) => {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const { isCurrentlyReading, getCounts, addToCurrentlyReading } =
    useUserInteractions();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Load books data - ONLY books that are currently reading
  const loadCurrentlyReadingBooks = useCallback(() => {
    setLoading(true);
    try {
      const booksData = getBooksByLanguage("en");

      const readingBooks = booksData.filter((book) => {
        const reading = isCurrentlyReading(book.id);
        if (reading) {
          console.log(`📖 Currently Reading: ${book.title} (${book.id})`);
        }
        return reading;
      });

      console.log(
        `📖 Found ${readingBooks.length} currently reading books:`,
        readingBooks.map((b) => b.title),
      );

      const limitedBooks = maxItems
        ? readingBooks.slice(0, maxItems)
        : readingBooks;
      setBooks(limitedBooks);
      setFilteredBooks(limitedBooks);
    } catch (error) {
      console.error("Error loading currently reading books:", error);
    } finally {
      setLoading(false);
    }
  }, [isCurrentlyReading, maxItems]);

  // Load books on mount
  useEffect(() => {
    loadCurrentlyReadingBooks();
  }, [loadCurrentlyReadingBooks]);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "userInteractions") {
        console.log("🔄 Storage changed, reloading currently reading books...");
        loadCurrentlyReadingBooks();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadCurrentlyReadingBooks]);

  // Filter and search books
  useEffect(() => {
    let result = [...books];

    if (searchTerm) {
      result = result.filter(
        (book) =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((book) => book.category === selectedCategory);
    }

    if (selectedRating > 0) {
      result = result.filter(
        (book) => Math.floor(book.rating) >= selectedRating,
      );
    }

    if (sortBy === "date") {
      result = [...result].sort(
        (a, b) => new Date(b.published) - new Date(a.published),
      );
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "title") {
      result = [...result].sort((a, b) => a.title?.localeCompare(b.title));
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedCategory, selectedRating, sortBy, books]);

  // Get unique categories
  const categories = [
    "all",
    ...new Set(books.map((book) => book.category).filter(Boolean)),
  ];

  // Calculate stats
  const stats = {
    totalBooks: filteredBooks.length,
    totalPages: filteredBooks.reduce(
      (sum, book) => sum + (book.pageCount || 0),
      0,
    ),
    avgRating:
      filteredBooks.length > 0
        ? (
            filteredBooks.reduce((sum, book) => sum + (book.rating || 0), 0) /
            filteredBooks.length
          ).toFixed(1)
        : "0",
  };

  // Get user interaction counts
  const counts = getCounts();

  const handleBookClick = (book) => {
    if (onBookClick) {
      onBookClick(book);
    } else {
      window.open(`/books/${book.slug}`, "_blank");
    }
  };

  const handleRemoveFromReading = (bookId) => {
    if (confirm("Remove this book from your currently reading list?")) {
      addToCurrentlyReading(bookId);
      setTimeout(() => {
        loadCurrentlyReadingBooks();
      }, 200);
    }
  };

  if (loading) {
    return (
      <div className={`currently-reading-loading ${isDarkMode ? "dark" : ""}`}>
        <div className="loading-spinner"></div>
        <p>Loading your currently reading books...</p>
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div
        className={`currently-reading-compact ${isDarkMode ? "dark" : ""}`}
        dir={direction}
      >
        <div className="compact-header">
          <h4>Currently Reading</h4>
          <button className="view-all-btn">View All →</button>
        </div>
        <div className="compact-books-list">
          {filteredBooks.slice(0, 5).map((book) => (
            <div
              key={book.id}
              className="compact-book-item"
              onClick={() => handleBookClick(book)}
            >
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
      <div
        className={`currently-reading-mobile ${isDarkMode ? "dark" : ""}`}
        dir={direction}
      >
        <div className="mobile-header">
          <h2>Currently Reading</h2>
          <p>Books you're reading now</p>
        </div>

        <div className="mobile-search">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search reading list..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mobile-books-list">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="mobile-book-card"
              onClick={() => handleBookClick(book)}
            >
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
              <p>No books currently reading</p>
              <button className="start-reading-btn">Browse Books</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full variant (default) - with passport cards
  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`currently-reading-full ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      {showHeader && (
        <div className="cr-header">
          <div className="cr-title-section">
            <FiBookOpen className="cr-header-icon" />
            <h1 className="cr-title">Currently Reading</h1>
          </div>
          <p className="cr-subtitle">Books you're reading now</p>
        </div>
      )}

      {showStats && (
        <div className="cr-stats-grid">
          <StatsCard
            icon={<FiBookOpen />}
            value={stats.totalBooks}
            label="Reading Now"
            color="#3b82f6"
          />
          <StatsCard
            icon={<FiBookmark />}
            value={stats.totalPages.toLocaleString()}
            label="Total Pages"
            color="#8b5cf6"
          />
          <StatsCard
            icon={<FiTrendingUp />}
            value={stats.avgRating}
            label="Avg Rating"
            color="#f59e0b"
          />
          <StatsCard
            icon={<FiClock />}
            value={counts.currentlyReading || 0}
            label="In Progress"
            color="#22c55e"
          />
        </div>
      )}

      <div className="cr-filters-section">
        <div className="cr-search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="cr-search-input"
          />
        </div>

        <div className="cr-filters-row">
          <div className="filter-group">
            <FiFilter className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
              className="filter-select"
            >
              <option value={0}>All Ratings</option>
              <option value={4}>4★ & above</option>
              <option value={4.5}>4.5★ & above</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="cr-books-passport">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onBookClick={handleBookClick}
              onRemove={handleRemoveFromReading}
              isReadingProp={isCurrentlyReading(book.id)}
              size={cardSize}
            />
          ))}
        </div>
      ) : (
        <div className="cr-empty-state">
          <div className="empty-icon">📖</div>
          <h3 className="empty-title">No books currently reading</h3>
          <p className="empty-text">
            Start reading a book to track your progress
          </p>
          <button className="empty-browse-btn">Browse Books</button>
        </div>
      )}
    </div>
  );
};

export default CurrentlyReadingTab;
