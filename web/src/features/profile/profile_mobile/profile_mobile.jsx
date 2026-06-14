"use client";

import "./profile_mobile.css";
import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  FiUser,
  FiBookOpen,
  FiStar,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiHeart,
  FiCalendar,
  FiMail,
  FiEdit2,
  FiChevronRight,
  FiHome,
  FiTrendingUp,
  FiAward,
  FiBookmark,
  FiMessageSquare,
  FiBell,
  FiHelpCircle,
  FiShare2,
  FiGrid,
  FiLock,
  FiMapPin,
  FiActivity,
  FiBarChart2,
  FiTarget,
  FiZap,
  FiTrophy,
  FiCheckCircle,   
  FiThumbsUp,      
} from "react-icons/fi";
// Check if Trophy exists, if not use a different icon
const TrophyIcon = FiTrophy || FiAward;

export default function ProfileMobile() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [activeTab, setActiveTab] = useState("profile"); // profile, dashboard, bookworm
  const [mounted, setMounted] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff&size=120",
    joinDate: "January 2024",
    bio: "Passionate reader and book lover. Always looking for the next great story to dive into.",
    location: "New York, USA",
    stats: {
      booksRead: 127,
      reviews: 48,
      followers: 342,
      following: 156,
      readingStreak: 15,
      totalPages: 45230,
      badges: 12,
      ranking: 42,
    },
    favoriteGenres: ["Fiction", "Science Fiction", "Fantasy", "Mystery"],
  };

  // Profile Menu Items
  const profileMenuItems = [
    { id: "edit_profile", label: "Edit Profile", icon: <FiEdit2 />, link: "/profile/edit" },
    { id: "settings", label: "Settings", icon: <FiSettings />, link: "/profile/settings" },
    { id: "notifications", label: "Notifications", icon: <FiBell />, link: "/profile/notifications", badge: 3 },
    { id: "privacy", label: "Privacy", icon: <FiLock />, link: "/profile/privacy" },
    { id: "help", label: "Help & Support", icon: <FiHelpCircle />, link: "/profile/help" },
    { id: "logout", label: "Logout", icon: <FiLogOut />, link: "/logout", isLogout: true },
  ];

  // Dashboard Menu Items (including new "Our Tab")
// Dashboard Menu Items - all now point to /user-dashboard/... routes
// Dashboard Menu Items (including all needed tabs)
const dashboardMenuItems = [
  { id: "overview", label: "Overview", icon: <FiHome />, link: "/user-dashboard" },
  { id: "currently_reading", label: "Currently Reading", icon: <FiBookOpen />, link: "/user-dashboard/currently-reading" },
  { id: "marked_read", label: "Marked Read", icon: <FiCheckCircle />, link: "/user-dashboard/marked-read" },
  { id: "want_to_read", label: "Want to Read", icon: <FiHeart />, link: "/user-dashboard/want-to-read" },
  { id: "reading_stats", label: "Reading Stats", icon: <FiTrendingUp />, link: "/user-dashboard/reading-stats" },
  { id: "reviews", label: "My Reviews", icon: <FiStar />, link: "/user-dashboard/reviews" },
  { id: "comments", label: "Comments", icon: <FiMessageSquare />, link: "/user-dashboard/comments" },
  { id: "likes", label: "Likes", icon: <FiThumbsUp />, link: "/user-dashboard/likes" },

];

  // Bookworm Ranking Menu Items
  const bookwormMenuItems = [
    { id: "my_rank", label: "My Rank", icon: <FiAward />, link: "/bookworm/rank", value: `#${user.stats.ranking}` },
    { id: "leaderboard", label: "Leaderboard", icon: <FiBarChart2 />, link: "/bookworm/leaderboard" },
    { id: "achievements", label: "Achievements", icon: <FiAward />, link: "/bookworm/achievements", count: user.stats.badges },
    { id: "reading_challenge", label: "Reading Challenge", icon: <FiTarget />, link: "/bookworm/challenge" },
    { id: "reading_streak", label: "Reading Streak", icon: <FiZap />, link: "/bookworm/streak", value: `${user.stats.readingStreak} days` },
    { id: "badges", label: "Badges", icon: <FiAward />, link: "/bookworm/badges", count: user.stats.badges },
    { id: "bookworm_points", label: "Bookworm Points", icon: <FiActivity />, link: "/bookworm/points", value: "2,450" },
    { id: "share_progress", label: "Share Progress", icon: <FiShare2 />, link: "/bookworm/share" },
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
      className={`profile-mobile ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      <header className="mobile-profile-header">
        <div className="header-content">
          <img src={user.avatar} alt={user.name} className="profile-avatar" />
          <div className="profile-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card-mini">
          <FiBookOpen />
          <div>
            <strong>{user.stats.booksRead}</strong>
            <span>Books</span>
          </div>
        </div>
        <div className="stat-card-mini">
          <FiStar />
          <div>
            <strong>{user.stats.reviews}</strong>
            <span>Reviews</span>
          </div>
        </div>
        <div className="stat-card-mini">
          <FiUsers />
          <div>
            <strong>{user.stats.followers}</strong>
            <span>Followers</span>
          </div>
        </div>
        <div className="stat-card-mini">
          <FiTrendingUp />
          <div>
            <strong>#{user.stats.ranking}</strong>
            <span>Rank</span>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="tab-bar">
        <button
          className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <FiUser />
          <span>Profile</span>
        </button>
        <button
          className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          <FiGrid />
          <span>Dashboard</span>
        </button>
        <button
          className={`tab-btn ${activeTab === "bookworm" ? "active" : ""}`}
          onClick={() => setActiveTab("bookworm")}
        >
          <FiAward />
          <span>Bookworm Rank</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="profile-tab">
            {/* Info Card */}
            <div className="info-card">
              <div className="info-card-header">
                <h3>About Me</h3>
                <button className="edit-btn">
                  <FiEdit2 /> Edit
                </button>
              </div>
              <p className="bio-text">{user.bio}</p>
              <div className="user-meta">
                <div className="meta-item">
                  <FiCalendar />
                  <span>Joined {user.joinDate}</span>
                </div>
                <div className="meta-item">
                  <FiMapPin />
                  <span>{user.location}</span>
                </div>
                <div className="meta-item">
                  <FiHeart />
                  <span>{user.stats.readingStreak} day streak</span>
                </div>
              </div>
              <div className="genres-section">
                <div className="genres-list">
                  {user.favoriteGenres.map((genre, index) => (
                    <span key={index} className="genre-tag">{genre}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Menu Items */}
            <div className="menu-list">
              {profileMenuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className={`menu-item ${item.isLogout ? "logout" : ""}`}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                  {item.badge && <span className="menu-badge">{item.badge}</span>}
                  <FiChevronRight className="menu-arrow" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="dashboard-tab">
            {/* Dashboard Summary */}
            <div className="dashboard-summary">
              <div className="summary-item">
                <FiBookOpen />
                <div>
                  <span>Total Books</span>
                  <strong>{user.stats.booksRead}</strong>
                </div>
              </div>
              <div className="summary-item">
                <FiStar />
                <div>
                  <span>Reviews</span>
                  <strong>{user.stats.reviews}</strong>
                </div>
              </div>
              <div className="summary-item">
                <FiHeart />
                <div>
                  <span>Following</span>
                  <strong>{user.stats.following}</strong>
                </div>
              </div>
            </div>

            {/* Dashboard Menu Items (with external link support) */}
            <div className="menu-list">
              {dashboardMenuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className="menu-item"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                  {item.count && <span className="menu-count">{item.count}</span>}
                  <FiChevronRight className="menu-arrow" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Bookworm Ranking Tab */}
        {activeTab === "bookworm" && (
          <div className="bookworm-tab">
            {/* Ranking Card */}
            <div className="ranking-card">
              <div className="ranking-header">
                <FiAward className="ranking-icon" />
                <h3>Your Bookworm Ranking</h3>
              </div>
              <div className="ranking-value">#{user.stats.ranking}</div>
              <div className="ranking-progress">
                <div className="progress-label">
                  <span>Top 10%</span>
                  <span>Next Rank: #{user.stats.ranking - 10}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div className="ranking-stats">
                <div className="rank-stat">
                  <span>Points</span>
                  <strong>2,450</strong>
                </div>
                <div className="rank-stat">
                  <span>Badges</span>
                  <strong>{user.stats.badges}</strong>
                </div>
                <div className="rank-stat">
                  <span>Streak</span>
                  <strong>{user.stats.readingStreak}</strong>
                </div>
              </div>
            </div>

            {/* Bookworm Menu Items */}
            <div className="menu-list">
              {bookwormMenuItems.map((item) => (
                <a key={item.id} href={item.link} className="menu-item">
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                  {item.count && <span className="menu-count">{item.count}</span>}
                  {item.value && <span className="menu-value">{item.value}</span>}
                  <FiChevronRight className="menu-arrow" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}