"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiTrendingUp,
  FiCalendar,
  FiBookOpen,
  FiStar,
  FiClock,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiTarget,
  FiAward,
} from "react-icons/fi";
import StatCard from "./components/StatCard";
import StatsChart from "./components/StatsChart";
import GenrePieChart from "./components/GenrePieChart";
import "./ReadingStatsTab.css";

const ReadingStatsTab = ({ 
  variant = "full", // full, compact, mobile
  showHeader = true,
  userId = null,
}) => {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("year"); // week, month, year, all

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock reading statistics data
  useEffect(() => {
    setLoading(true);
    try {
      const mockStats = {
        overview: {
          totalBooksRead: 127,
          totalPagesRead: 45230,
          averageRating: 4.6,
          readingStreak: 15,
          longestStreak: 42,
          totalReadingTime: 845, // hours
          booksThisYear: 34,
          booksLastYear: 28,
        },
        monthlyData: [
          { month: "Jan", books: 12, pages: 4200, rating: 4.5 },
          { month: "Feb", books: 10, pages: 3800, rating: 4.7 },
          { month: "Mar", books: 14, pages: 5100, rating: 4.4 },
          { month: "Apr", books: 9, pages: 3200, rating: 4.6 },
          { month: "May", books: 11, pages: 4100, rating: 4.8 },
          { month: "Jun", books: 13, pages: 4700, rating: 4.5 },
          { month: "Jul", books: 8, pages: 2900, rating: 4.3 },
          { month: "Aug", books: 15, pages: 5400, rating: 4.7 },
          { month: "Sep", books: 10, pages: 3600, rating: 4.6 },
          { month: "Oct", books: 12, pages: 4400, rating: 4.8 },
          { month: "Nov", books: 7, pages: 2600, rating: 4.4 },
          { month: "Dec", books: 6, pages: 2300, rating: 4.5 },
        ],
        genreDistribution: [
          { name: "Fiction", value: 45, color: "#3b82f6" },
          { name: "Science Fiction", value: 20, color: "#8b5cf6" },
          { name: "Fantasy", value: 15, color: "#10b981" },
          { name: "Mystery", value: 10, color: "#f59e0b" },
          { name: "Non-Fiction", value: 7, color: "#ef4444" },
          { name: "Romance", value: 3, color: "#ec4899" },
        ],
        authorStats: [
          { name: "Stephen King", booksRead: 12, avgRating: 4.7 },
          { name: "J.R.R. Tolkien", booksRead: 8, avgRating: 4.9 },
          { name: "Agatha Christie", booksRead: 15, avgRating: 4.5 },
          { name: "George Orwell", booksRead: 5, avgRating: 4.8 },
          { name: "Jane Austen", booksRead: 6, avgRating: 4.6 },
        ],
        achievements: [
          { name: "Bookworm", progress: 127, target: 200, icon: "📚" },
          { name: "Page Turner", progress: 45230, target: 100000, icon: "📖" },
          { name: "Consistent Reader", progress: 15, target: 30, icon: "🔥" },
          { name: "Genre Explorer", progress: 6, target: 10, icon: "🎯" },
        ],
        readingCalendar: {
          totalActiveDays: 245,
          averagePerDay: 185, // pages
          bestDay: "2024-03-15",
          bestDayPages: 450,
        },
      };
      setStats(mockStats);
    } catch (error) {
      console.error("Error loading reading stats:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const getFilteredMonthlyData = () => {
    if (timeRange === "year") return stats?.monthlyData;
    if (timeRange === "month") return stats?.monthlyData.slice(-1);
    if (timeRange === "week") return stats?.monthlyData.slice(-1);
    return stats?.monthlyData;
  };

  if (loading) {
    return (
      <div className={`stats-loading ${isDarkMode ? "dark" : ""}`}>
        <div className="loading-spinner"></div>
        <p>Loading your reading statistics...</p>
      </div>
    );
  }

  // Mobile variant
  if (variant === "mobile") {
    return (
      <div className={`stats-mobile ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="mobile-header">
          <h2>Reading Statistics</h2>
          <p>Track your reading progress</p>
        </div>

        <div className="time-range-selector">
          <button
            className={`range-btn ${timeRange === "week" ? "active" : ""}`}
            onClick={() => setTimeRange("week")}
          >
            Week
          </button>
          <button
            className={`range-btn ${timeRange === "month" ? "active" : ""}`}
            onClick={() => setTimeRange("month")}
          >
            Month
          </button>
          <button
            className={`range-btn ${timeRange === "year" ? "active" : ""}`}
            onClick={() => setTimeRange("year")}
          >
            Year
          </button>
          <button
            className={`range-btn ${timeRange === "all" ? "active" : ""}`}
            onClick={() => setTimeRange("all")}
          >
            All Time
          </button>
        </div>

        <div className="mobile-stats-grid">
          <div className="mobile-stat-card">
            <FiBookOpen />
            <div>
              <strong>{stats.overview.totalBooksRead}</strong>
              <span>Books Read</span>
            </div>
          </div>
          <div className="mobile-stat-card">
            <FiClock />
            <div>
              <strong>{stats.overview.totalPagesRead.toLocaleString()}</strong>
              <span>Pages</span>
            </div>
          </div>
          <div className="mobile-stat-card">
            <FiStar />
            <div>
              <strong>{stats.overview.averageRating}</strong>
              <span>Avg Rating</span>
            </div>
          </div>
          <div className="mobile-stat-card">
            <FiActivity />
            <div>
              <strong>{stats.overview.readingStreak}</strong>
              <span>Day Streak</span>
            </div>
          </div>
        </div>

        <div className="mobile-chart">
          <h3>Monthly Reading Activity</h3>
          <StatsChart data={getFilteredMonthlyData()} variant="mobile" />
        </div>

        <div className="mobile-genres">
          <h3>Genre Distribution</h3>
          <GenrePieChart data={stats.genreDistribution} variant="mobile" />
        </div>

        <div className="mobile-achievements">
          <h3>Achievements Progress</h3>
          {stats.achievements.map((achievement, idx) => (
            <div key={idx} className="achievement-progress">
              <div className="achievement-header">
                <span className="achievement-icon">{achievement.icon}</span>
                <span className="achievement-name">{achievement.name}</span>
                <span className="achievement-target">
                  {achievement.progress}/{achievement.target}
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={`stats-compact ${isDarkMode ? "dark" : ""}`} dir={direction}>
        <div className="compact-header">
          <h4>Reading Stats</h4>
          <button className="view-all-btn">View All →</button>
        </div>
        <div className="compact-stats">
          <div className="compact-stat">
            <FiBookOpen />
            <div>
              <strong>{stats.overview.totalBooksRead}</strong>
              <span>Books</span>
            </div>
          </div>
          <div className="compact-stat">
            <FiClock />
            <div>
              <strong>{stats.overview.totalPagesRead.toLocaleString()}</strong>
              <span>Pages</span>
            </div>
          </div>
          <div className="compact-stat">
            <FiActivity />
            <div>
              <strong>{stats.overview.readingStreak}</strong>
              <span>Streak</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full variant (default)
  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`stats-full ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      {showHeader && (
        <div className="stats-header">
          <div className="stats-title-section">
            <FiBarChart2 className="stats-header-icon" />
            <h1 className="stats-title">Reading Statistics</h1>
          </div>
          <p className="stats-subtitle">Track your reading journey and achievements</p>
        </div>
      )}

      {/* Time Range Selector */}
      <div className="time-range-selector">
        <button
          className={`range-btn ${timeRange === "week" ? "active" : ""}`}
          onClick={() => setTimeRange("week")}
        >
          This Week
        </button>
        <button
          className={`range-btn ${timeRange === "month" ? "active" : ""}`}
          onClick={() => setTimeRange("month")}
        >
          This Month
        </button>
        <button
          className={`range-btn ${timeRange === "year" ? "active" : ""}`}
          onClick={() => setTimeRange("year")}
        >
          This Year
        </button>
        <button
          className={`range-btn ${timeRange === "all" ? "active" : ""}`}
          onClick={() => setTimeRange("all")}
        >
          All Time
        </button>
      </div>

      {/* Overview Stats */}
      <div className="stats-grid">
        <StatCard 
          icon={<FiBookOpen />}
          value={stats.overview.totalBooksRead}
          label="Total Books Read"
          trend="+12%"
          color="#3b82f6"
        />
        <StatCard 
          icon={<FiClock />}
          value={stats.overview.totalPagesRead.toLocaleString()}
          label="Total Pages Read"
          trend="+8%"
          color="#10b981"
        />
        <StatCard 
          icon={<FiStar />}
          value={stats.overview.averageRating}
          label="Average Rating"
          trend="+0.3"
          color="#f59e0b"
        />
        <StatCard 
          icon={<FiActivity />}
          value={stats.overview.readingStreak}
          label="Current Streak"
          subValue={`Best: ${stats.overview.longestStreak}`}
          color="#ef4444"
        />
        <StatCard 
          icon={<FiTrendingUp />}
          value={stats.overview.booksThisYear}
          label="Books This Year"
          trend={`+${stats.overview.booksThisYear - stats.overview.booksLastYear}`}
          color="#8b5cf6"
        />
        <StatCard 
          icon={<FiCalendar />}
          value={`${Math.floor(stats.overview.totalReadingTime / 24)}d`}
          label="Total Reading Time"
          subValue={`${stats.overview.totalReadingTime} hours`}
          color="#ec4899"
        />
      </div>

      {/* Charts Section */}
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Monthly Reading Activity</h3>
            <p>Books and pages read per month</p>
          </div>
          <StatsChart data={getFilteredMonthlyData()} variant="full" />
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Genre Distribution</h3>
            <p>Breakdown by book categories</p>
          </div>
          <GenrePieChart data={stats.genreDistribution} variant="full" />
        </div>
      </div>

      {/* Author Statistics */}
      <div className="authors-section">
        <div className="section-header">
          <h3>Top Authors</h3>
          <p>Authors you've read the most</p>
        </div>
        <div className="authors-grid">
          {stats.authorStats.map((author, idx) => (
            <div key={idx} className="author-card">
              <div className="author-rank">#{idx + 1}</div>
              <div className="author-info">
                <h4>{author.name}</h4>
                <div className="author-stats">
                  <span><FiBookOpen /> {author.booksRead} books</span>
                  <span><FiStar /> {author.avgRating}</span>
                </div>
              </div>
              <div className="author-progress">
                <div 
                  className="progress-fill"
                  style={{ width: `${(author.booksRead / 20) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievements-section">
        <div className="section-header">
          <h3>Achievements</h3>
          <p>Your reading milestones</p>
        </div>
        <div className="achievements-grid">
          {stats.achievements.map((achievement, idx) => (
            <div key={idx} className="achievement-card">
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-info">
                <h4>{achievement.name}</h4>
                <div className="achievement-progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                  />
                </div>
                <span className="achievement-stats">
                  {achievement.progress} / {achievement.target}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Calendar Stats */}
      <div className="calendar-stats">
        <div className="calendar-card">
          <FiCalendar className="calendar-icon" />
          <div>
            <strong>{stats.readingCalendar.totalActiveDays}</strong>
            <span>Active Reading Days</span>
          </div>
        </div>
        <div className="calendar-card">
          <FiTrendingUp className="calendar-icon" />
          <div>
            <strong>{stats.readingCalendar.averagePerDay}</strong>
            <span>Average Pages/Day</span>
          </div>
        </div>
        <div className="calendar-card">
          <FiAward className="calendar-icon" />
          <div>
            <strong>{stats.readingCalendar.bestDayPages}</strong>
            <span>Best Day: {stats.readingCalendar.bestDay}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingStatsTab;