"use client";

import React from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiBookOpen,
  FiCheckCircle,
  FiStar,
  FiHeart,
  FiTrendingUp,
  FiCalendar,
  FiClock,
  FiAward,
  FiTarget,
} from "react-icons/fi";
import "./OverviewTab.css";

export default function OverviewTab() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Stats data
  const stats = [
    { id: 1, label: "Currently Reading", value: 3, icon: FiBookOpen, color: "#3b82f6" },
    { id: 2, label: "Marked Read", value: 24, icon: FiCheckCircle, color: "#22c55e" },
    { id: 3, label: "Want to Read", value: 12, icon: FiStar, color: "#eab308" },
    { id: 4, label: "Liked Books", value: 45, icon: FiHeart, color: "#ef4444" },
  ];

  // Recent activity data
  const recentActivities = [
    { id: 1, type: "read", book: "Project Hail Mary", date: "2 hours ago", status: "completed" },
    { id: 2, type: "added", book: "The Way of Kings", date: "Yesterday", status: "want_to_read" },
    { id: 3, type: "liked", book: "Atomic Habits", date: "2 days ago", status: "liked" },
    { id: 4, type: "reviewed", book: "Dune", date: "3 days ago", status: "reviewed", rating: 5 },
  ];

  // Reading goals data
  const readingGoals = {
    yearly: { current: 45, target: 60, percentage: 75 },
    monthly: { current: 8, target: 10, percentage: 80 },
    weekly: { current: 2, target: 3, percentage: 66 },
  };

  // Recommended books
  const recommendedBooks = [
    { id: 1, title: "Fourth Wing", author: "Rebecca Yarros", rating: 4.8, cover: "/placeholder-book.jpg" },
    { id: 2, title: "Iron Flame", author: "Rebecca Yarros", rating: 4.7, cover: "/placeholder-book.jpg" },
    { id: 3, title: "The Covenant of Water", author: "Abraham Verghese", rating: 4.9, cover: "/placeholder-book.jpg" },
  ];

  return (
    <div
      dir={direction}
      className={`overview-tab ${themeName}`}
      style={{ fontFamily: currentFont?.family }}
    >
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className={`welcome-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
          Welcome back, John! 👋
        </h1>
        <p className={`welcome-subtitle ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
          Here's what's happening with your reading journey
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.id}
              className={`stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} 
                ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}
            >
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                <IconComponent size={24} />
              </div>
              <div className="stat-info">
                <h3 className={`stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                  {stat.value}
                </h3>
                <p className={`stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className={`overview-two-column ${flexDirection}`}>
        {/* Left Column */}
        <div className="overview-left-col">
          {/* Reading Goals */}
          <div className={`goal-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} 
            ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
            <div className="goal-header">
              <FiTarget className={`goal-icon ${theme.iconColors?.primary || "text-sky-500"}`} />
              <h2 className={`goal-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                Reading Goals
              </h2>
            </div>
            
            {/* Yearly Goal */}
            <div className="goal-item">
              <div className="goal-info">
                <span className={`goal-label ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                  Yearly Progress
                </span>
                <span className={`goal-value ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                  {readingGoals.yearly.current}/{readingGoals.yearly.target} books
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${readingGoals.yearly.percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Monthly Goal */}
            <div className="goal-item">
              <div className="goal-info">
                <span className={`goal-label ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                  Monthly Progress
                </span>
                <span className={`goal-value ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                  {readingGoals.monthly.current}/{readingGoals.monthly.target} books
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${readingGoals.monthly.percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="goal-item">
              <div className="goal-info">
                <span className={`goal-label ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                  Weekly Progress
                </span>
                <span className={`goal-value ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                  {readingGoals.weekly.current}/{readingGoals.weekly.target} books
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${readingGoals.weekly.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`activity-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} 
            ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
            <div className="activity-header">
              <FiClock className={`activity-icon ${theme.iconColors?.primary || "text-sky-500"}`} />
              <h2 className={`activity-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                Recent Activity
              </h2>
            </div>
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-dot ${activity.status === "completed" ? "completed" : "pending"}`}></div>
                  <div className="activity-details">
                    <p className={`activity-text ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                      {activity.type === "read" && "📖 Finished reading"}
                      {activity.type === "added" && "➕ Added to Want to Read"}
                      {activity.type === "liked" && "❤️ Liked"}
                      {activity.type === "reviewed" && "⭐ Reviewed"}
                      {' '}
                      <span className="activity-book">{activity.book}</span>
                    </p>
                    <span className={`activity-date ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
                      {activity.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="overview-right-col">
          {/* Reading Streak */}
          <div className={`streak-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} 
            ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
            <div className="streak-header">
              <FiTrendingUp className={`streak-icon ${theme.iconColors?.primary || "text-sky-500"}`} />
              <h2 className={`streak-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                Reading Streak
              </h2>
            </div>
            <div className="streak-content">
              <div className="streak-days">
                <span className="streak-number">7</span>
                <span className={`streak-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                  days streak
                </span>
              </div>
              <div className="streak-calendar">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={`streak-day ${i < 5 ? "active" : ""}`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className={`achievement-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} 
            ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
            <div className="achievement-header">
              <FiAward className={`achievement-icon ${theme.iconColors?.primary || "text-sky-500"}`} />
              <h2 className={`achievement-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                Recent Achievements
              </h2>
            </div>
            <div className="achievement-list">
              <div className="achievement-item">
                <div className="achievement-badge">🏆</div>
                <div className="achievement-info">
                  <p className={`achievement-name ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                    Quick Reader
                  </p>
                  <p className={`achievement-desc ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                    Read 5 books in one month
                  </p>
                </div>
              </div>
              <div className="achievement-item">
                <div className="achievement-badge">⭐</div>
                <div className="achievement-info">
                  <p className={`achievement-name ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                    Book Lover
                  </p>
                  <p className={`achievement-desc ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                    Added 20 books to your library
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Books */}
          <div className={`recommended-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} 
            ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
            <div className="recommended-header">
              <FiStar className={`recommended-icon ${theme.iconColors?.primary || "text-sky-500"}`} />
              <h2 className={`recommended-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                Recommended for You
              </h2>
            </div>
            <div className="recommended-list">
              {recommendedBooks.map((book) => (
                <div key={book.id} className="recommended-item">
                  <img src={book.cover} alt={book.title} className="recommended-cover" />
                  <div className="recommended-info">
                    <p className={`recommended-book-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                      {book.title}
                    </p>
                    <p className={`recommended-author ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                      {book.author}
                    </p>
                    <div className="recommended-rating">
                      <span className="rating-stars">⭐</span>
                      <span className={`rating-value ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
                        {book.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}