// src/shared/user_dashboard/MarkedReadTab/MarkedReadTab.jsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiCheckCircle,
  FiFilter,
  FiSearch,
  FiBookOpen,
  FiStar,
} from "react-icons/fi";
import BookCard from "./components/BookCard";
import StatsCard from "./components/StatsCard";
import { getBooksByLanguage } from "@/data/books";
import { useUserInteractions } from "@/shared/buttons";
import "./MarkedReadTab.css";

const MarkedReadTab = ({
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
  const {
    isMarkedRead,
    getCounts,
    isLiked,
    isWishlisted,
    markAsRead,
    interactions,
    isLoaded,
  } = useUserInteractions();

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

  // Theme helper functions
  const getHeaderIconColor = () => {
    return theme.iconColors?.primary || "text-sky-500";
  };

  const getTextPrimary = () => {
    return (
      theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")
    );
  };

  const getTextSecondary = () => {
    return (
      theme.textColors?.secondary ||
      (isDarkMode ? "text-gray-400" : "text-gray-600")
    );
  };

  const getCardBackground = () => {
    return theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white");
  };

  const getCardBorder = () => {
    return (
      theme.border?.default || "border border-gray-200 dark:border-gray-700"
    );
  };

  const getInputBackground = () => {
    return (
      theme.background?.input || (isDarkMode ? "bg-gray-700" : "bg-gray-100")
    );
  };

  const getPrimaryButtonBg = () => {
    return (
      theme.buttonColors?.primaryButton?.background ||
      "bg-gradient-to-r from-sky-600 to-sky-500"
    );
  };

  const getPrimaryButtonHover = () => {
    return (
      theme.buttonColors?.primaryButton?.hoverBackground ||
      "hover:from-sky-700 hover:to-sky-600"
    );
  };

  const getPrimaryButtonText = () => {
    return theme.buttonColors?.primaryButton?.textColor || "text-white";
  };

  const getIconColor = () => {
    return theme.iconColors?.primary || "text-sky-500";
  };

  // Load books data - ONLY books marked as read
  const loadMarkedBooks = useCallback(() => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const booksData = getBooksByLanguage("en");

      const markedBooks = booksData.filter((book) => {
        const marked = isMarkedRead(book.id);
        if (marked) {
          console.log(`✅ Marked: ${book.title} (${book.id})`);
        }
        return marked;
      });

      console.log(
        `📚 Found ${markedBooks.length} marked books:`,
        markedBooks.map((b) => b.title),
      );

      const limitedBooks = maxItems
        ? markedBooks.slice(0, maxItems)
        : markedBooks;
      setBooks(limitedBooks);
      setFilteredBooks(limitedBooks);
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, interactions.markedRead, isMarkedRead, maxItems]);

  // Load books on mount and when markedRead changes
  useEffect(() => {
    loadMarkedBooks();
  }, [loadMarkedBooks]);

  // Listen for storage changes (when other tabs update)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "userInteractions") {
        console.log("🔄 Storage changed, reloading books...");
        loadMarkedBooks();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadMarkedBooks]);

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

  // Function to mark a book as read and refresh
  const handleMarkAsRead = (bookId) => {
    markAsRead(bookId);
    setTimeout(() => {
      loadMarkedBooks();
    }, 200);
  };

  if (loading || !isLoaded) {
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
      <div
        className={`marked-read-compact ${isDarkMode ? "dark" : ""}`}
        dir={direction}
      >
        <div className="compact-header">
          <h4>Recently Read</h4>
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
              <p>No books marked as read yet</p>
              <button
                className="compact-add-btn"
                onClick={() => {
                  const booksData = getBooksByLanguage("en");
                  if (booksData.length > 0) {
                    handleMarkAsRead(booksData[0].id);
                  }
                }}
              >
                + Add Test Book
              </button>
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
        className={`marked-read-mobile ${isDarkMode ? "dark" : ""}`}
        dir={direction}
      >
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
              <p>No books marked as read yet</p>
              <button
                className="start-reading-btn"
                onClick={() => {
                  const booksData = getBooksByLanguage("en");
                  if (booksData.length > 0) {
                    handleMarkAsRead(booksData[0].id);
                  }
                }}
              >
                Add Test Book
              </button>
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
      className={`marked-read-full ${themeName}`}
    >
      {showHeader && (
        <div className="mr-header">
          <div className="mr-title-section">
            <FiCheckCircle
              className={`mr-header-icon ${getHeaderIconColor()}`}
            />
            <h1 className={`mr-title ${getTextPrimary()}`}>Marked Read</h1>
          </div>
          <p className={`mr-subtitle ${getTextSecondary()}`}>
            Books you've completed reading
          </p>
        </div>
      )}

      {showStats && (
        <div className="mr-stats-grid">
          <StatsCard
            icon={<FiBookOpen />}
            value={stats.totalBooks}
            label="Books Read"
          />
          <StatsCard
            icon={<FiBookOpen />}
            value={stats.totalPages.toLocaleString()}
            label="Total Pages"
          />
          <StatsCard
            icon={<FiStar />}
            value={stats.avgRating}
            label="Avg Rating"
          />
          <StatsCard
            icon={<FiCheckCircle />}
            value={counts.markedRead || 0}
            label="Marked Read"
          />
        </div>
      )}

      {/* Search & Filters */}
      <div
        className={`mr-filters-section ${getCardBackground()} ${getCardBorder()}`}
      >
        <div className="mr-search-bar">
          <FiSearch className="mr-search-icon" />
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`mr-search-input ${getInputBackground()} ${getTextPrimary()} border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-sky-500 focus:border-transparent`}
          />
        </div>

        <div className="mr-filters-row">
          <div className="mr-filter-group">
            <FiFilter className="mr-filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`mr-filter-select ${getInputBackground()} ${getTextPrimary()} border border-gray-200 dark:border-gray-600`}
            >
              {categories.map((cat) => (
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
              className={`mr-filter-select ${getInputBackground()} ${getTextPrimary()} border border-gray-200 dark:border-gray-600`}
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
              className={`mr-filter-select ${getInputBackground()} ${getTextPrimary()} border border-gray-200 dark:border-gray-600`}
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Books List - Passport Style */}
      {filteredBooks.length > 0 ? (
        <div className="mr-books-passport">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onBookClick={handleBookClick}
              isMarkedReadProp={isMarkedRead(book.id)}
              isLiked={isLiked(book.id)}
              isWishlisted={isWishlisted(book.id)}
              size={cardSize}
            />
          ))}
        </div>
      ) : (
        <div
          className={`mr-empty-state ${getCardBackground()} ${getCardBorder()}`}
        >
          <div className="mr-empty-icon">📚</div>
          <h3 className={`mr-empty-title ${getTextPrimary()}`}>
            No books marked as read
          </h3>
          <p className={`mr-empty-text ${getTextSecondary()}`}>
            Mark a book as read from the book details page.
          </p>
          <button
            className={`mr-add-test-btn ${getPrimaryButtonBg()} ${getPrimaryButtonHover()} ${getPrimaryButtonText()}`}
            onClick={() => {
              const booksData = getBooksByLanguage("en");
              if (booksData.length > 0) {
                handleMarkAsRead(booksData[0].id);
                alert(`✅ Marked "${booksData[0].title}" as read!`);
              }
            }}
          >
            + Add Test Book
          </button>
        </div>
      )}
    </div>
  );
};

export default MarkedReadTab;
