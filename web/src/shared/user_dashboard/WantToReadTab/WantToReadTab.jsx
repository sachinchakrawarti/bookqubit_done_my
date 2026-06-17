// src/shared/user_dashboard/WantToReadTab/WantToReadTab.jsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiStar,
  FiFilter,
  FiSearch,
  FiBookOpen,
  FiHeart,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";
import WantToReadBookCard from "./components/WantToReadBookCard";
import WantToReadStatsCard from "./components/WantToReadStatsCard";
import { getBooksByLanguage } from "@/data/books";
import { useUserInteractions } from "@/shared/buttons";
import "./WantToReadTab.css";

const WantToReadTab = ({
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
  const { isWantToRead, getCounts, addToWantToRead } = useUserInteractions();

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

  // Load books data - ONLY books that are want to read
  const loadWantToReadBooks = useCallback(() => {
    setLoading(true);
    try {
      const booksData = getBooksByLanguage("en");

      const wantedBooks = booksData.filter((book) => {
        const wanted = isWantToRead(book.id);
        if (wanted) {
          console.log(`⭐ Want to Read: ${book.title} (${book.id})`);
        }
        return wanted;
      });

      console.log(
        `⭐ Found ${wantedBooks.length} want to read books:`,
        wantedBooks.map((b) => b.title),
      );

      const limitedBooks = maxItems
        ? wantedBooks.slice(0, maxItems)
        : wantedBooks;
      setBooks(limitedBooks);
      setFilteredBooks(limitedBooks);
    } catch (error) {
      console.error("Error loading want to read books:", error);
    } finally {
      setLoading(false);
    }
  }, [isWantToRead, maxItems]);

  // Load books on mount
  useEffect(() => {
    loadWantToReadBooks();
  }, [loadWantToReadBooks]);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "userInteractions") {
        console.log("🔄 Storage changed, reloading want to read books...");
        loadWantToReadBooks();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadWantToReadBooks]);

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

  const handleRemoveFromWishlist = (bookId) => {
    if (confirm("Remove this book from your want to read list?")) {
      addToWantToRead(bookId);
      setTimeout(() => {
        loadWantToReadBooks();
      }, 200);
    }
  };

  if (loading) {
    return (
      <div className={`want-to-read-loading ${isDarkMode ? "dark" : ""}`}>
        <div className="loading-spinner"></div>
        <p>Loading your want to read books...</p>
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div
        className={`want-to-read-compact ${isDarkMode ? "dark" : ""}`}
        dir={direction}
      >
        <div className="compact-header">
          <h4>Want to Read</h4>
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
              <p>No books in your wishlist yet</p>
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
        className={`want-to-read-mobile ${isDarkMode ? "dark" : ""}`}
        dir={direction}
      >
        <div className="mobile-header">
          <h2>Want to Read</h2>
          <p>Books you're excited to read</p>
        </div>

        <div className="mobile-search">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search wishlist..."
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
              <FiHeart />
              <p>No books in your wishlist yet</p>
              <button className="start-browsing-btn">Browse Books</button>
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
      className={`want-to-read-full ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      {showHeader && (
        <div className="wtr-header">
          <div className="wtr-title-section">
            <FiStar className="wtr-header-icon" />
            <h1 className="wtr-title">Want to Read</h1>
          </div>
          <p className="wtr-subtitle">Books you're excited to read</p>
        </div>
      )}

      {showStats && (
        <div className="wtr-stats-grid">
          <WantToReadStatsCard
            icon={<FiStar />}
            value={stats.totalBooks}
            label="Want to Read"
            color="#f59e0b"
          />
          <WantToReadStatsCard
            icon={<FiBookOpen />}
            value={stats.totalPages.toLocaleString()}
            label="Total Pages"
            color="#3b82f6"
          />
          <WantToReadStatsCard
            icon={<FiTrendingUp />}
            value={stats.avgRating}
            label="Avg Rating"
            color="#8b5cf6"
          />
          <WantToReadStatsCard
            icon={<FiClock />}
            value={counts.wantToRead || 0}
            label="Wishlist Count"
            color="#22c55e"
          />
        </div>
      )}

      <div className="wtr-filters-section">
        <div className="wtr-search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="wtr-search-input"
          />
        </div>

        <div className="wtr-filters-row">
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
        <div className="wtr-books-passport">
          {filteredBooks.map((book) => (
            <WantToReadBookCard
              key={book.id}
              book={book}
              onBookClick={handleBookClick}
              onRemove={handleRemoveFromWishlist}
              isWantedProp={isWantToRead(book.id)}
              size={cardSize}
            />
          ))}
        </div>
      ) : (
        <div className="wtr-empty-state">
          <div className="empty-icon">⭐</div>
          <h3 className="empty-title">No books in your wishlist</h3>
          <p className="empty-text">Start adding books you want to read</p>
          <button className="empty-browse-btn">Browse Books</button>
        </div>
      )}
    </div>
  );
};

export default WantToReadTab;
