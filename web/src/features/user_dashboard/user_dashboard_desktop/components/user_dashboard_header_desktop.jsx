"use client";

import "./user_dashboard_header_desktop.css";
import { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import {
  FiMenu,
  FiBell,
  FiMessageSquare,
  FiSearch,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

export default function UserDashboardHeaderDesktop({ activeMenu, onMenuToggle }) {
  const { themeName } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const getTitle = () => {
    const titles = {
      currently_reading: "Currently Reading",
      marked_read: "Marked Read",
      want_to_read: "Want to Read",
      reading_stats: "Reading Statistics",
      comments: "Comments",
      likes: "Likes",
      reviews: "Reviews",
    };
    return titles[activeMenu] || "Dashboard";
  };

  const notifications = [
    { id: 1, message: "New comment on your review", time: "5 min ago", read: false },
    { id: 2, message: "Someone liked your book review", time: "1 hour ago", read: false },
    { id: 3, message: "New follower", time: "2 hours ago", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className={`dashboard-header ${isDarkMode ? "dark" : ""}`}>
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={onMenuToggle}>
          <FiMenu />
        </button>
        <h1 className="header-title">{getTitle()}</h1>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search books, authors, or reviews..."
            className="search-input"
          />
          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="header-right">
        <div className="notification-dropdown">
          <button
            className="header-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FiBell />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          {showNotifications && (
            <div className="dropdown-menu notifications-menu">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <button className="mark-all-btn">Mark all as read</button>
              </div>
              <div className="dropdown-list">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`notification-item ${!notif.read ? "unread" : ""}`}
                  >
                    <div className="notification-content">
                      <p>{notif.message}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button className="view-all-btn">View All Notifications</button>
              </div>
            </div>
          )}
        </div>

        <button className="header-icon-btn">
          <FiMessageSquare />
        </button>

        <div className="user-dropdown">
          <button
            className="user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">
              <FiUser />
            </div>
            <span className="user-name">John Doe</span>
            <FiChevronDown className="dropdown-arrow" />
          </button>

          {showUserMenu && (
            <div className="dropdown-menu user-menu">
              <div className="user-info-header">
                <div className="user-avatar-large">JD</div>
                <div className="user-details">
                  <h4>John Doe</h4>
                  <p>john.doe@example.com</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="user-menu-item">
                <FiUser /> My Profile
              </button>
              <button className="user-menu-item">
                <FiMessageSquare /> Messages
              </button>
              <button className="user-menu-item">
                <FiBell /> Notifications
              </button>
              <div className="dropdown-divider"></div>
              <button className="user-menu-item logout">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}