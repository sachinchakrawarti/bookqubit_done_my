"use client";

import { useState, useEffect, useRef } from "react";
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
  FaPalette,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";

export default function Navbar({ onMenuClick, onRightSidebarToggle, isMobileMenuOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const { themeName, setTheme } = useTheme();
  const { currentFont } = useFont();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const themeMenuRef = useRef(null);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/drift/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    router.push("/");
  };

  const toggleTheme = (theme) => {
    setTheme(theme);
    setShowThemeMenu(false);
  };

  const themes = [
    { name: "light", icon: <FaSun />, label: "Light" },
    { name: "dark", icon: <FaMoon />, label: "Dark" },
    { name: "midnight", icon: <FaMoon />, label: "Midnight" },
    { name: "cyberpunk", icon: <FaPalette />, label: "Cyberpunk" },
  ];

  const navLinks = [
    { href: "/drift", label: "Home", icon: <FaHome /> },
    { href: "/drift/explore", label: "Explore", icon: <FaCompass /> },
    { href: "/drift/books", label: "Books", icon: <FaBook /> },
    { href: "/drift/community", label: "Community", icon: <FaUsers /> },
  ];

  return (
    <>
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

          {/* Search Bar - Only ONE */}
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
            <button className="action-btn create-btn" onClick={() => router.push('/drift/create')}>
              <FaPlusCircle />
              <span>Create</span>
            </button>

            {/* Notifications */}
            <div className="action-dropdown" ref={notificationRef}>
              <button
                className="action-btn notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell />
              </button>
            </div>

            {/* Messages */}
            <Link href="/drift/messages" className="action-btn messages-btn">
              <FaEnvelope />
            </Link>

            {/* Theme Toggle */}
            <div className="action-dropdown" ref={themeMenuRef}>
              <button className="action-btn theme-btn" onClick={() => setShowThemeMenu(!showThemeMenu)}>
                <FaPalette />
              </button>
              {showThemeMenu && (
                <div className="dropdown-menu theme-menu">
                  <div className="dropdown-header">
                    <h3>Select Theme</h3>
                  </div>
                  {themes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => toggleTheme(theme.name)}
                      className={`theme-option ${themeName === theme.name ? "active" : ""}`}
                    >
                      {theme.icon}
                      <span>{theme.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="action-dropdown" ref={userMenuRef}>
              <button className="user-menu-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
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

      {/* Mobile Right Sidebar Toggle */}
      <button className="mobile-right-btn" onClick={onRightSidebarToggle}>
        <FaUsers />
      </button>
    </>
  );
}