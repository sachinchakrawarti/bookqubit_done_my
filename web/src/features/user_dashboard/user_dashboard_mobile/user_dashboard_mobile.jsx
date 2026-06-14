"use client";

import "./user-dashboard-mobile.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiBookOpen,
  FiStar,
  FiHeart,
  FiHome,
  FiCheckCircle,
  FiTrendingUp,
  FiMessageSquare,
  FiThumbsUp,
  FiChevronRight,
  FiUser,
  FiCalendar,
  FiClock,
  FiAward,
  FiBarChart2,
} from "react-icons/fi";

export default function UserDashboardMobile() {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();
  const [mounted, setMounted] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock user stats
  const stats = {
    booksRead: 127,
    reviews: 48,
    following: 156,
    readingStreak: 15,
    pagesRead: 12450,
    avgRating: 4.7,
  };

  // Recent activity data
  const recentActivities = [
    { id: 1, type: "read", book: "Project Hail Mary", date: "2 hours ago", icon: <FiBookOpen /> },
    { id: 2, type: "review", book: "The Way of Kings", date: "Yesterday", icon: <FiStar /> },
    { id: 3, type: "like", book: "Atomic Habits", date: "2 days ago", icon: <FiHeart /> },
  ];

  // Dashboard menu items
  const dashboardMenuItems = [
    { id: "overview", label: "Overview", icon: <FiHome />, link: "/user-dashboard", color: "#3b82f6" },
    { id: "currently_reading", label: "Currently Reading", icon: <FiBookOpen />, link: "/user-dashboard/currently-reading", color: "#10b981" },
    { id: "marked_read", label: "Marked Read", icon: <FiCheckCircle />, link: "/user-dashboard/marked-read", color: "#22c55e" },
    { id: "want_to_read", label: "Want to Read", icon: <FiHeart />, link: "/user-dashboard/want-to-read", color: "#ef4444" },
    { id: "reading_stats", label: "Reading Stats", icon: <FiTrendingUp />, link: "/user-dashboard/reading-stats", color: "#f59e0b" },
    { id: "reviews", label: "My Reviews", icon: <FiStar />, link: "/user-dashboard/reviews", color: "#eab308" },
    { id: "comments", label: "Comments", icon: <FiMessageSquare />, link: "/user-dashboard/comments", color: "#8b5cf6" },
    { id: "likes", label: "Likes", icon: <FiThumbsUp />, link: "/user-dashboard/likes", color: "#06b6d4" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fontStyle = currentFont?.family ? { fontFamily: currentFont.family } : {};

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`user-dashboard-mobile ${themeName}`}
    >
      {/* Header with User Greeting */}
      <div className="dashboard-header">
        <div className="user-greeting">
          <div className={`user-avatar ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}`}>
            <FiUser size={24} className="text-white" />
          </div>
          <div className="user-info">
            <h1 className={`dashboard-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              Welcome back, John! 👋
            </h1>
            <p className={`dashboard-subtitle ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
              Your reading journey continues
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="stats-grid">
        <div className={`stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} ${theme.border?.default || ""}`}>
          <div className="stat-icon" style={{ backgroundColor: `${theme.iconColors?.primary || "#3b82f6"}15`, color: theme.iconColors?.primary || "#3b82f6" }}>
            <FiBookOpen size={24} />
          </div>
          <div className="stat-content">
            <span className={`stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {stats.booksRead}
            </span>
            <span className={`stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
              Books Read
            </span>
          </div>
        </div>

        <div className={`stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} ${theme.border?.default || ""}`}>
          <div className="stat-icon" style={{ backgroundColor: `${theme.iconColors?.starFilled || "#f59e0b"}15`, color: theme.iconColors?.starFilled || "#f59e0b" }}>
            <FiStar size={24} />
          </div>
          <div className="stat-content">
            <span className={`stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {stats.reviews}
            </span>
            <span className={`stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
              Reviews
            </span>
          </div>
        </div>

        <div className={`stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} ${theme.border?.default || ""}`}>
          <div className="stat-icon" style={{ backgroundColor: `${theme.iconColors?.highlight || "#ef4444"}15`, color: theme.iconColors?.highlight || "#ef4444" }}>
            <FiHeart size={24} />
          </div>
          <div className="stat-content">
            <span className={`stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {stats.following}
            </span>
            <span className={`stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
              Following
            </span>
          </div>
        </div>

        <div className={`stat-card ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} ${theme.border?.default || ""}`}>
          <div className="stat-icon" style={{ backgroundColor: `${theme.iconColors?.badge || "#10b981"}15`, color: theme.iconColors?.badge || "#10b981" }}>
            <FiTrendingUp size={24} />
          </div>
          <div className="stat-content">
            <span className={`stat-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {stats.readingStreak}
            </span>
            <span className={`stat-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
              Day Streak
            </span>
          </div>
        </div>
      </div>

      {/* Reading Progress Section */}
      <div className={`progress-section ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} ${theme.border?.default || ""}`}>
        <div className="section-header">
          <FiBarChart2 className={`section-icon ${theme.iconColors?.primary || "text-sky-500"}`} />
          <h3 className={`section-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            Reading Progress
          </h3>
        </div>
        <div className="progress-stats">
          <div className="progress-item">
            <span className={`progress-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
              Yearly Goal
            </span>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: "75%", background: `linear-gradient(90deg, ${theme.iconColors?.primary || "#3b82f6"}, ${theme.iconColors?.starFilled || "#8b5cf6"})` }}></div>
            </div>
            <span className={`progress-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              75/100 books
            </span>
          </div>
          <div className="progress-item">
            <span className={`progress-label ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
              Monthly Goal
            </span>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: "60%", background: `linear-gradient(90deg, ${theme.iconColors?.primary || "#3b82f6"}, ${theme.iconColors?.starFilled || "#8b5cf6"})` }}></div>
            </div>
            <span className={`progress-value ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              6/10 books
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`activity-section ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} ${theme.border?.default || ""}`}>
        <div className="section-header">
          <FiClock className={`section-icon ${theme.iconColors?.primary || "text-sky-500"}`} />
          <h3 className={`section-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
            Recent Activity
          </h3>
        </div>
        <div className="activity-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className={`activity-icon ${theme.background?.badge || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}>
                {activity.icon}
              </div>
              <div className="activity-details">
                <p className={`activity-text ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                  {activity.type === "read" && "Finished reading"}
                  {activity.type === "review" && "Reviewed"}
                  {activity.type === "like" && "Liked"}
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

      {/* Menu List */}
      <div className="menu-list">
        {dashboardMenuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} ${theme.border?.default || ""}`}
            onClick={() => router.push(item.link)}
          >
            <span className="menu-icon" style={{ color: item.color }}>
              {item.icon}
            </span>
            <span className={`menu-label ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {item.label}
            </span>
            <FiChevronRight className={`menu-arrow ${theme.iconColors?.secondary || (isDarkMode ? "text-gray-500" : "text-gray-400")}`} />
          </button>
        ))}
      </div>
    </div>
  );
}