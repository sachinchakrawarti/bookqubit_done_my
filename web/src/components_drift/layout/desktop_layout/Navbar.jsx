"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaBook,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaCompass,
  FaHeart,
  FaPlusCircle,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";

export default function Navbar({ onMenuClick, isMobileMenuOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, themeName, setTheme } = useTheme();
  const { currentFont } = useFont();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [unreadMessages, setUnreadMessages] = useState(2);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const navLinks = [
    { href: "/drift", label: "Home", icon: <FaHome /> },
    { href: "/drift/explore", label: "Explore", icon: <FaCompass /> },
    { href: "/drift/books", label: "Books", icon: <FaBook /> },
    { href: "/drift/community", label: "Community", icon: <FaUsers /> },
  ];

  const notifications = [
    { id: 1, type: "like", user: "Priya Sharma", message: "liked your post", time: "5 min ago", read: false, avatar: null },
    { id: 2, type: "comment", user: "Amit Kumar", message: "commented on your story", time: "1 hour ago", read: false, avatar: null },
    { id: 3, type: "follow", user: "Neha Gupta", message: "started following you", time: "3 hours ago", read: false, avatar: null },
    { id: 4, type: "mention", user: "Drift Comics", message: "mentioned you in a post", time: "Yesterday", read: true, avatar: null },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/drift/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    // Handle logout logic
    router.push("/");
  };

  const toggleTheme = () => {
    const themes = ["light", "dark", "midnight", "cyberpunk"];
    const currentIndex = themes.indexOf(themeName);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`drift-navbar ${themeName}`} style={{ fontFamily: currentFont?.family }}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <Link href="/drift">
              <div className="logo-icon">
                <FaBook className="logo-icon-svg" />
              </div>
              <span className="logo-text">Drift</span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="navbar-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search Drift..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </form>

          {/* Navigation Links */}
          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-label">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            {/* Create Post Button */}
            <button className="action-btn create-btn">
              <FaPlusCircle />
              <span>Create</span>
            </button>

            {/* Notifications */}
            <div className="action-dropdown">
              <button
                className={`action-btn notification-btn ${unreadNotifications > 0 ? "has-badge" : ""}`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell />
                {unreadNotifications > 0 && (
                  <span className="badge">{unreadNotifications}</span>
                )}
              </button>
              
              {showNotifications && (
                <div className="dropdown-menu notifications-menu">
                  <div className="dropdown-header">
                    <h3>Notifications</h3>
                    <button className="mark-all-read">Mark all read</button>
                  </div>
                  <div className="dropdown-list">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`notification-item ${!notif.read ? "unread" : ""}`}>
                        <FaUserCircle className="notification-avatar" />
                        <div className="notification-content">
                          <p>
                            <strong>{notif.user}</strong> {notif.message}
                          </p>
                          <span className="notification-time">{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="dropdown-footer">
                    <Link href="/drift/notifications">View all notifications</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <Link href="/drift/messages" className="action-btn messages-btn">
              <FaEnvelope />
              {unreadMessages > 0 && (
                <span className="badge">{unreadMessages}</span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button className="action-btn theme-btn" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* User Menu */}
            <div className="action-dropdown">
              <button
                className="user-menu-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <FaUserCircle className="user-avatar" />
                <span className="user-name">Alex</span>
              </button>

              {showUserMenu && (
                <div className="dropdown-menu user-menu">
                  <Link href="/drift/profile" className="menu-item">
                    <FaUserCircle /> Profile
                  </Link>
                  <Link href="/drift/settings" className="menu-item">
                    <FaCog /> Settings
                  </Link>
                  <Link href="/drift/saved" className="menu-item">
                    <FaHeart /> Saved
                  </Link>
                  <hr className="menu-divider" />
                  <button onClick={handleLogout} className="menu-item logout">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={onMenuClick}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </>
  );
}