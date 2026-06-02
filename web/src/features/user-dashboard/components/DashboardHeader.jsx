"use client";

import "./DashboardHeader.css";
import { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import Link from "next/link";

export default function DashboardHeader() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header 
      className="dashboard-header"
      style={{
        backgroundColor: theme?.background?.section || (isDarkMode ? '#1f2937' : '#ffffff'),
        borderBottom: `1px solid ${theme?.border?.default || (isDarkMode ? '#374151' : '#e5e7eb')}`
      }}
    >
      <div className="header-container">
        <div className="header-left">
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <Link href="/" className="logo">
            <h1 style={{ color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827') }}>
              BookQubit
            </h1>
          </Link>
        </div>

        <div className="header-center">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search your library..." 
              className="search-input"
              style={{
                backgroundColor: theme?.background?.input || (isDarkMode ? '#374151' : '#f3f4f6'),
                color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827')
              }}
            />
          </div>
        </div>

        <div className="header-right">
          <button className="icon-btn" aria-label="Notifications">
            🔔
          </button>
          <button className="icon-btn" aria-label="Messages">
            💬
          </button>
          <div className="user-menu">
            <span className="user-avatar-small">👤</span>
            <span className="user-name">John Doe</span>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </header>
  );
}