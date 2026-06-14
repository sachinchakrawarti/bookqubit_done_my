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
  FiThumbsUp,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";
import LikedBookCard from "./components/LikedBookCard";
import "./LikesTab.css";

const LikesTab = ({ 
  variant = "full", // full, compact, mobile
  showHeader = true,
  showStats = true,
  maxItems = null,
  onBookClick = null,
}) => {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [likedBooks, setLikedBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock liked books data
  useEffect(() => {
    setLoading(true);
    try {
      const mockLikedBooks = [
        {
          id: 1,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          rating: 4.5,
          category: "Classic",
          likedDate: "2024-01-15",
          description: "A story of decadence and excess, Gatsby explores the darker aspects of the American Dream.",
          pageCount: 180,
          likedBy: 234,
        },
        {
          id: 2,
          title: "1984",
          author: "George Orwell",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          rating: 4.8,
          category: "Dystopian",
          likedDate: "2024-01-10",
          description: "A chilling vision of a totalitarian future that remains eerily relevant today.",
          pageCount: 328,
          likedBy: 189,
        },
        {
          id: 3,
          title: "Dune",
          author: "Frank Herbert",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          rating: 4.7,
          category: "Science Fiction",
          likedDate: "2024-01-05",
          description: "An epic masterpiece of science fiction that continues to inspire generations.",
          pageCount: 412,
          likedBy: 156,
        },
        {
          id: 4,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          rating: 4.9,
          category: "Classic",
          likedDate: "2023-12-28",
          description: "A powerful story of racial injustice and loss of innocence in the American South.",
          pageCount: 281,
          likedBy: 312,
        },
        {
          id: 5,
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
          rating: 4.6,
          category: "Fantasy",
          likedDate: "2023-12-20",
          description: "A timeless fantasy adventure that began it all.",
          pageCount: 310,
          likedBy: 278,
        },
      ];
      
      const limitedBooks = maxItems ? mockLikedBooks.slice(0, maxItems) : mockLikedBooks;
      setLikedBooks(limitedBooks);
      setFilteredBooks(limitedBooks);
    } catch (error) {
      console.error("Error loading liked books:", error);
    } finally {
      setLoading(false);
    }
  }, [maxItems]);

  // Filter and search books
  useEffect(() => {
    let result = [...likedBooks];

    if (searchTerm) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(book => book.category === selectedCategory);
    }

    if (sortBy === "date") {
      result = [...result].sort((a, b) => new Date(b.likedDate) - new Date(a.likedDate));
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "title") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "popular") {
      result = [...result].sort((a, b) => b.likedBy - a.likedBy);
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedCategory, sortBy, likedBooks]);

  const categories = ["all", ...new Set(likedBooks.map(book => book.category))];

  const stats = {
    totalLikes: filteredBooks.length,
    totalPages: filteredBooks.reduce((sum, book) => sum + book.pageCount, 0),
    avgRating: (filteredBooks.reduce((sum, book) => sum + book.rating, 0) / filteredBooks.length || 0).toFixed(1),
    totalLikedBy: filteredBooks.reduce((sum, book) => sum + book.likedBy, 0),
  };

  const handleUnlike = (bookId) => {
    if (confirm("Remove this book from your liked list?")) {
      setLikedBooks(likedBooks.filter(book => book.id !== bookId));
    }
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
      <div className={`likes-loading ${isDarkMode ? "dark" : ""}`}>
        <div className="loading-spinner"></div>
        <p>Loading your liked books...</p>
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={`likes-compact ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="compact-header">
          <h4>Liked Books</h4>
          <button className="view-all-btn">View All →</button>
        </div>
        <div className="compact-books-list">
          {filteredBooks.slice(0, 3).map((book) => (
            <div key={book.id} className="compact-book-item" onClick={() => handleBookClick(book)}>
              <img src={book.cover} alt={book.title} />
              <div className="compact-book-info">
                <h5>{book.title}</h5>
                <p>{book.author}</p>
                <div className="compact-rating">⭐ {book.rating}</div>
              </div>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <div className="compact-empty">
              <p>No liked books yet</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile variant
  if (variant === "mobile") {
    return (
      <div className={`likes-mobile ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="mobile-header">
          <h2>Liked Books</h2>
          <p>Books you've loved</p>
        </div>

        <div className="mobile-stats">
          <div className="mobile-stat">
            <FiHeart />
            <div>
              <strong>{stats.totalLikes}</strong>
              <span>Likes</span>
            </div>
          </div>
          <div className="mobile-stat">
            <FiTrendingUp />
            <div>
              <strong>{stats.avgRating}</strong>
              <span>Avg Rating</span>
            </div>
          </div>
        </div>

        <div className="mobile-search">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search liked books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mobile-filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mobile-filter-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mobile-filter-select"
          >
            <option value="date">Recent</option>
            <option value="rating">Top Rated</option>
            <option value="popular">Most Liked</option>
          </select>
        </div>

        <div className="mobile-books-list">
          {filteredBooks.map((book) => (
            <LikedBookCard
              key={book.id}
              book={book}
              variant="mobile"
              onBookClick={handleBookClick}
              onUnlike={handleUnlike}
            />
          ))}
          {filteredBooks.length === 0 && (
            <div className="mobile-empty">
              <FiHeart />
              <p>No liked books yet</p>
              <button className="start-browsing-btn">Browse Books</button>
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
      className={`likes-full ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      {showHeader && (
        <div className="likes-header">
          <div className="likes-title-section">
            <FiHeart className="likes-header-icon" />
            <h1 className="likes-title">Liked Books</h1>
          </div>
          <p className="likes-subtitle">Books you've loved and appreciated</p>
        </div>
      )}

      {/* Stats Cards */}
      {showStats && (
        <div className="likes-stats-grid">
          <div className="likes-stat-card">
            <FiHeart className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{stats.totalLikes}</span>
              <span className="stat-label">Books Liked</span>
            </div>
          </div>
          <div className="likes-stat-card">
            <FiThumbsUp className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{stats.totalLikedBy.toLocaleString()}</span>
              <span className="stat-label">Total Likes Given</span>
            </div>
          </div>
          <div className="likes-stat-card">
            <FiBookOpen className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{stats.totalPages.toLocaleString()}</span>
              <span className="stat-label">Pages Liked</span>
            </div>
          </div>
          <div className="likes-stat-card">
            <FiTrendingUp className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{stats.avgRating}</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="likes-filters-section">
        <div className="likes-search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search liked books by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="likes-search-input"
          />
        </div>

        <div className="likes-filters-row">
          <div className="filter-group">
            <FiFilter className="filter-icon" />
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
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="title">Sort by Title</option>
              <option value="popular">Sort by Popularity</option>
            </select>
          </div>

          <div className="likes-view-toggle">
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
        <div className={`likes-books-${viewMode}`}>
          {filteredBooks.map((book) => (
            <LikedBookCard
              key={book.id}
              book={book}
              viewMode={viewMode}
              variant="full"
              onBookClick={handleBookClick}
              onUnlike={handleUnlike}
            />
          ))}
        </div>
      ) : (
        <div className="likes-empty-state">
          <div className="empty-icon">❤️</div>
          <h3 className="empty-title">No liked books yet</h3>
          <p className="empty-text">Start liking books to see them here</p>
          <button className="empty-browse-btn">Browse Books</button>
        </div>
      )}
    </div>
  );
};

export default LikesTab;