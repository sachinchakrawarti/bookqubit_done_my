"use client";

import React, { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiBookOpen,
  FiClock,
  FiPercent,
  FiCalendar,
  FiArrowRight,
  FiTrash2,
  FiEdit2,
  FiStar,
  FiHeart,
  FiBookmark,
  FiShare2,
} from "react-icons/fi";
import "./CurrentlyReadingTab.css";

export default function CurrentlyReadingTab() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const [currentlyReading, setCurrentlyReading] = useState([
    {
      id: 1,
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "/placeholder-book.jpg",
      progress: 65,
      pagesTotal: 496,
      pagesRead: 322,
      startDate: "2024-01-15",
      targetDate: "2024-02-15",
      rating: 0,
      notes: "",
      tags: ["Sci-Fi", "Adventure"],
    },
    {
      id: 2,
      title: "The Way of Kings",
      author: "Brandon Sanderson",
      cover: "/placeholder-book.jpg",
      progress: 35,
      pagesTotal: 1007,
      pagesRead: 352,
      startDate: "2024-01-20",
      targetDate: "2024-03-20",
      rating: 0,
      notes: "",
      tags: ["Fantasy", "Epic"],
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "/placeholder-book.jpg",
      progress: 80,
      pagesTotal: 320,
      pagesRead: 256,
      startDate: "2024-01-25",
      targetDate: "2024-02-10",
      rating: 0,
      notes: "",
      tags: ["Self-Help", "Productivity"],
    },
  ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const handleUpdateProgress = (book) => {
    setSelectedBook(book);
    setProgressValue(book.progress);
    setShowProgressModal(true);
  };

  const handleSaveProgress = () => {
    if (selectedBook) {
      const updatedBooks = currentlyReading.map(book =>
        book.id === selectedBook.id
          ? { 
              ...book, 
              progress: progressValue,
              pagesRead: Math.round((progressValue / 100) * book.pagesTotal)
            }
          : book
      );
      setCurrentlyReading(updatedBooks);
      setShowProgressModal(false);
      setSelectedBook(null);
    }
  };

  const handleRemoveBook = (bookId) => {
    if (confirm("Remove this book from your reading list?")) {
      setCurrentlyReading(currentlyReading.filter(book => book.id !== bookId));
    }
  };

  const handleMarkAsComplete = (book) => {
    if (confirm(`Mark "${book.title}" as completed?`)) {
      // Move to completed books logic here
      setCurrentlyReading(currentlyReading.filter(b => b.id !== book.id));
    }
  };

  const getDaysRemaining = (targetDate) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getStatusColor = (progress) => {
    if (progress < 25) return "#ef4444";
    if (progress < 50) return "#eab308";
    if (progress < 75) return "#f97316";
    return "#22c55e";
  };

  return (
    <div
      dir={direction}
      className={`currently-reading-tab ${themeName}`}
      style={{ fontFamily: currentFont?.family }}
    >
      {/* Header */}
      <div className="cr-header">
        <div className="cr-title-section">
          <FiBookOpen className={`cr-header-icon ${theme.iconColors?.primary || "text-sky-500"}`} />
          <h1 className={`cr-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            Currently Reading
          </h1>
        </div>
        <p className={`cr-subtitle ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
          Track your reading progress and stay on top of your goals
        </p>
      </div>

      {/* Stats Summary */}
      <div className="cr-stats-grid">
        <div className={`cr-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} 
          ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
          <div className="cr-stat-icon">📚</div>
          <div className="cr-stat-info">
            <span className={`cr-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {currentlyReading.length}
            </span>
            <span className={`cr-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Books Reading
            </span>
          </div>
        </div>
        
        <div className={`cr-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} 
          ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
          <div className="cr-stat-icon">📖</div>
          <div className="cr-stat-info">
            <span className={`cr-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {currentlyReading.reduce((sum, book) => sum + book.pagesRead, 0)}
            </span>
            <span className={`cr-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Pages Read
            </span>
          </div>
        </div>
        
        <div className={`cr-stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} 
          ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
          <div className="cr-stat-icon">⭐</div>
          <div className="cr-stat-info">
            <span className={`cr-stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {Math.round(currentlyReading.reduce((sum, book) => sum + book.progress, 0) / currentlyReading.length)}%
            </span>
            <span className={`cr-stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              Average Progress
            </span>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {currentlyReading.length > 0 ? (
        <div className="cr-books-grid">
          {currentlyReading.map((book) => (
            <div
              key={book.id}
              className={`cr-book-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} 
                ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}
            >
              {/* Book Cover */}
              <div className="cr-book-cover-wrapper">
                <img src={book.cover} alt={book.title} className="cr-book-cover" />
                <div className="cr-book-progress-circle">
                  <svg className="cr-progress-svg" viewBox="0 0 36 36">
                    <path
                      className="cr-progress-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      className="cr-progress-fill"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={getStatusColor(book.progress)}
                      strokeWidth="3"
                      strokeDasharray={`${book.progress}, 100`}
                    />
                    <text x="18" y="20.5" className="cr-progress-text" fill={theme.textColors?.primary || (isDarkMode ? "#fff" : "#000")}>
                      {book.progress}%
                    </text>
                  </svg>
                </div>
              </div>

              {/* Book Info */}
              <div className="cr-book-info">
                <h3 className={`cr-book-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                  {book.title}
                </h3>
                <p className={`cr-book-author ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                  by {book.author}
                </p>

                {/* Progress Bar */}
                <div className="cr-progress-section">
                  <div className="cr-progress-stats">
                    <span className={`cr-pages-read ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                      {book.pagesRead} / {book.pagesTotal} pages
                    </span>
                    <span className={`cr-percentage ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                      {book.progress}%
                    </span>
                  </div>
                  <div className="cr-progress-bar">
                    <div 
                      className="cr-progress-bar-fill" 
                      style={{ width: `${book.progress}%`, backgroundColor: getStatusColor(book.progress) }}
                    ></div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="cr-book-meta">
                  <div className="cr-meta-item">
                    <FiCalendar className="cr-meta-icon" />
                    <span className={`cr-meta-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                      Started: {new Date(book.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="cr-meta-item">
                    <FiClock className="cr-meta-icon" />
                    <span className={`cr-meta-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                      {getDaysRemaining(book.targetDate)} days left
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="cr-book-tags">
                  {book.tags.map((tag, idx) => (
                    <span key={idx} className={`cr-tag ${theme.background?.badge || (isDarkMode ? "bg-gray-700" : "bg-gray-100")} 
                      ${theme.textColors?.secondary || (isDarkMode ? "text-gray-300" : "text-gray-600")}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="cr-book-actions">
                  <button
                    onClick={() => handleUpdateProgress(book)}
                    className={`cr-action-btn cr-update-btn ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`}
                  >
                    <FiEdit2 size={16} />
                    Update Progress
                  </button>
                  <button
                    onClick={() => handleMarkAsComplete(book)}
                    className={`cr-action-btn cr-complete-btn ${theme.buttonColors?.secondaryButton?.background || "border border-green-500"} text-green-500`}
                  >
                    <FiBookOpen size={16} />
                    Complete
                  </button>
                  <button
                    onClick={() => handleRemoveBook(book.id)}
                    className="cr-action-btn cr-remove-btn"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`cr-empty-state ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} 
          ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
          <div className="cr-empty-icon">📚</div>
          <h3 className={`cr-empty-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            No books currently reading
          </h3>
          <p className={`cr-empty-text ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
            Add books to your reading list to track your progress
          </p>
          <button className={`cr-add-btn ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`}>
            + Add a Book
          </button>
        </div>
      )}

      {/* Progress Update Modal */}
      {showProgressModal && selectedBook && (
        <div className="cr-modal-overlay" onClick={() => setShowProgressModal(false)}>
          <div className={`cr-modal ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} 
            ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`} onClick={(e) => e.stopPropagation()}>
            <h2 className={`cr-modal-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              Update Reading Progress
            </h2>
            <p className={`cr-modal-book ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              {selectedBook.title} - {selectedBook.author}
            </p>
            
            <div className="cr-progress-input">
              <label className={`cr-input-label ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                Progress: {progressValue}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={progressValue}
                onChange={(e) => setProgressValue(parseInt(e.target.value))}
                className="cr-range-input"
                style={{
                  background: `linear-gradient(90deg, ${getStatusColor(progressValue)} ${progressValue}%, #e5e7eb ${progressValue}%)`
                }}
              />
              <div className="cr-pages-info">
                <span className={theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}>
                  Pages Read: {Math.round((progressValue / 100) * selectedBook.pagesTotal)} / {selectedBook.pagesTotal}
                </span>
              </div>
            </div>

            <div className="cr-modal-actions">
              <button
                onClick={() => setShowProgressModal(false)}
                className={`cr-modal-cancel ${theme.buttonColors?.secondaryButton?.background || "bg-gray-200 dark:bg-gray-700"} 
                  ${theme.textColors?.secondary || (isDarkMode ? "text-gray-300" : "text-gray-700")}`}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProgress}
                className={`cr-modal-save ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`}
              >
                Save Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}