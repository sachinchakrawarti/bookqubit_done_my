"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiHeart,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiBookOpen,
  FiClock,
  FiTrendingUp,
  FiCalendar,
  FiFlag,
  FiStar,
} from "react-icons/fi";
import WishlistCard from "./components/WishlistCard";
import PriorityBadge from "./components/PriorityBadge";
import "./WantToReadTab.css";

const WantToReadTab = ({ 
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
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock want-to-read books data
  useEffect(() => {
    setLoading(true);
    try {
      const mockWishlistBooks = [
        {
          id: 1,
          title: "Project Hail Mary",
          author: "Andy Weir",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          rating: 4.8,
          category: "Science Fiction",
          addedDate: "2024-01-15",
          priority: "high",
          reason: "Loved The Martian, heard amazing things about this one",
          estimatedPages: 476,
          tags: ["space", "adventure", "science"],
        },
        {
          id: 2,
          title: "The Name of the Wind",
          author: "Patrick Rothfuss",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          rating: 4.7,
          category: "Fantasy",
          addedDate: "2024-01-10",
          priority: "high",
          reason: "One of the best fantasy series ever written",
          estimatedPages: 662,
          tags: ["fantasy", "magic", "adventure"],
        },
        {
          id: 3,
          title: "Becoming",
          author: "Michelle Obama",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          rating: 4.9,
          category: "Biography",
          addedDate: "2024-01-05",
          priority: "medium",
          reason: "Inspiring story from an amazing woman",
          estimatedPages: 448,
          tags: ["memoir", "inspirational"],
        },
        {
          id: 4,
          title: "The Silent Patient",
          author: "Alex Michaelides",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          rating: 4.5,
          category: "Thriller",
          addedDate: "2023-12-28",
          priority: "medium",
          reason: "Heard the twist is incredible",
          estimatedPages: 336,
          tags: ["mystery", "psychological"],
        },
        {
          id: 5,
          title: "Atomic Habits",
          author: "James Clear",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          rating: 4.8,
          category: "Self-Help",
          addedDate: "2023-12-20",
          priority: "low",
          reason: "Want to build better habits",
          estimatedPages: 320,
          tags: ["productivity", "self-improvement"],
        },
        {
          id: 6,
          title: "Dune Messiah",
          author: "Frank Herbert",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          rating: 4.6,
          category: "Science Fiction",
          addedDate: "2023-12-15",
          priority: "high",
          reason: "Loved Dune, need to continue the series",
          estimatedPages: 256,
          tags: ["space opera", "political"],
        },
      ];
      
      const limitedBooks = maxItems ? mockWishlistBooks.slice(0, maxItems) : mockWishlistBooks;
      setBooks(limitedBooks);
      setFilteredBooks(limitedBooks);
    } catch (error) {
      console.error("Error loading wishlist books:", error);
    } finally {
      setLoading(false);
    }
  }, [maxItems]);

  // Filter and sort books
  useEffect(() => {
    let result = [...books];

    if (searchTerm) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedPriority !== "all") {
      result = result.filter(book => book.priority === selectedPriority);
    }

    if (selectedCategory !== "all") {
      result = result.filter(book => book.category === selectedCategory);
    }

    if (sortBy === "date") {
      result = [...result].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      result = [...result].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "title") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedPriority, selectedCategory, sortBy, books]);

  const categories = ["all", ...new Set(books.map(book => book.category))];
  const priorities = ["all", "high", "medium", "low"];

  const stats = {
    totalBooks: filteredBooks.length,
    highPriority: filteredBooks.filter(b => b.priority === "high").length,
    mediumPriority: filteredBooks.filter(b => b.priority === "medium").length,
    lowPriority: filteredBooks.filter(b => b.priority === "low").length,
    totalPages: filteredBooks.reduce((sum, book) => sum + book.estimatedPages, 0),
    avgRating: (filteredBooks.reduce((sum, book) => sum + book.rating, 0) / filteredBooks.length || 0).toFixed(1),
  };

  const handleMoveToReading = (bookId) => {
    if (confirm("Move this book to 'Currently Reading'?")) {
      setBooks(books.filter(book => book.id !== bookId));
      alert("Book moved to Currently Reading!");
    }
  };

  const handleRemove = (bookId) => {
    if (confirm("Remove this book from your wishlist?")) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  const handleUpdatePriority = (bookId, newPriority) => {
    setBooks(books.map(book =>
      book.id === bookId
        ? { ...book, priority: newPriority }
        : book
    ));
  };

  const handleBookClick = (book) => {
    if (onBookClick) {
      onBookClick(book);
    } else {
      window.open(`/books/${book.id}`, "_blank");
    }
  };

  if (loading) {
    return (
      <div className={`wishlist-loading ${isDarkMode ? "dark" : ""}`}>
        <div className="loading-spinner"></div>
        <p>Loading your wishlist...</p>
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={`wishlist-compact ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="compact-header">
          <h4>Want to Read</h4>
          <button className="view-all-btn">View All →</button>
        </div>
        <div className="compact-books-list">
          {filteredBooks.slice(0, 3).map((book) => (
            <div key={book.id} className="compact-book-item" onClick={() => handleBookClick(book)}>
              <img src={book.cover} alt={book.title} />
              <div className="compact-book-info">
                <h5>{book.title}</h5>
                <p>{book.author}</p>
                <PriorityBadge priority={book.priority} size="small" />
              </div>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <div className="compact-empty">
              <p>No books in wishlist</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile variant
  if (variant === "mobile") {
    return (
      <div className={`wishlist-mobile ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="mobile-header">
          <h2>Want to Read</h2>
          <p>Books you're planning to read</p>
        </div>

        <div className="mobile-stats">
          <div className="mobile-stat">
            <FiHeart />
            <div>
              <strong>{stats.totalBooks}</strong>
              <span>Books</span>
            </div>
          </div>
          <div className="mobile-stat">
            <FiFlag />
            <div>
              <strong>{stats.highPriority}</strong>
              <span>High Priority</span>
            </div>
          </div>
          <div className="mobile-stat">
            <FiBookOpen />
            <div>
              <strong>{stats.totalPages.toLocaleString()}</strong>
              <span>Total Pages</span>
            </div>
          </div>
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

        <div className="mobile-filters">
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="mobile-filter-select"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mobile-filter-select"
          >
            <option value="date">Recently Added</option>
            <option value="priority">Priority</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="mobile-books-list">
          {filteredBooks.map((book) => (
            <WishlistCard
              key={book.id}
              book={book}
              variant="mobile"
              onBookClick={handleBookClick}
              onMoveToReading={handleMoveToReading}
              onRemove={handleRemove}
              onUpdatePriority={handleUpdatePriority}
            />
          ))}
          {filteredBooks.length === 0 && (
            <div className="mobile-empty">
              <FiHeart />
              <p>Your wishlist is empty</p>
              <button className="browse-btn">Browse Books</button>
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
      className={`wishlist-full ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      {showHeader && (
        <div className="wishlist-header">
          <div className="wishlist-title-section">
            <FiHeart className="wishlist-header-icon" />
            <h1 className="wishlist-title">Want to Read</h1>
          </div>
          <p className="wishlist-subtitle">Books you're planning to read in the future</p>
        </div>
      )}

      {/* Stats Cards */}
      {showStats && (
        <div className="wishlist-stats-grid">
          <div className="wishlist-stat-card">
            <FiHeart className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{stats.totalBooks}</span>
              <span className="stat-label">Books in Wishlist</span>
            </div>
          </div>
          <div className="wishlist-stat-card">
            <FiFlag className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{stats.highPriority}</span>
              <span className="stat-label">High Priority</span>
            </div>
          </div>
          <div className="wishlist-stat-card">
            <FiBookOpen className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{stats.totalPages.toLocaleString()}</span>
              <span className="stat-label">Total Pages</span>
            </div>
          </div>
          <div className="wishlist-stat-card">
            <FiStar className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{stats.avgRating}</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      )}

      {/* Priority Summary */}
      <div className="priority-summary">
        <div className="priority-item high">
          <span className="priority-label">High Priority</span>
          <span className="priority-count">{stats.highPriority}</span>
        </div>
        <div className="priority-item medium">
          <span className="priority-label">Medium Priority</span>
          <span className="priority-count">{stats.mediumPriority}</span>
        </div>
        <div className="priority-item low">
          <span className="priority-label">Low Priority</span>
          <span className="priority-count">{stats.lowPriority}</span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="wishlist-filters-section">
        <div className="wishlist-search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, author, category, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="wishlist-search-input"
          />
        </div>

        <div className="wishlist-filters-row">
          <div className="filter-group">
            <FiFilter className="filter-icon" />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="filter-select"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority === "all" ? "All Priorities" : `${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="date">Recently Added</option>
              <option value="priority">Priority</option>
              <option value="rating">Top Rated</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>

          <div className="wishlist-view-toggle">
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

      {/* Books Grid/List */}
      {filteredBooks.length > 0 ? (
        <div className={`wishlist-books-${viewMode}`}>
          {filteredBooks.map((book) => (
            <WishlistCard
              key={book.id}
              book={book}
              viewMode={viewMode}
              variant="full"
              onBookClick={handleBookClick}
              onMoveToReading={handleMoveToReading}
              onRemove={handleRemove}
              onUpdatePriority={handleUpdatePriority}
            />
          ))}
        </div>
      ) : (
        <div className="wishlist-empty-state">
          <div className="empty-icon">📚</div>
          <h3 className="empty-title">Your wishlist is empty</h3>
          <p className="empty-text">Start adding books you want to read in the future</p>
          <button className="empty-browse-btn">Browse Books</button>
        </div>
      )}
    </div>
  );
};

export default WantToReadTab;