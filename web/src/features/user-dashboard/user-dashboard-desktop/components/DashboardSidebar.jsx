"use client";

import "./DashboardSidebar.css";
import { useTheme } from "@/themes/useTheme";

export default function DashboardSidebar({ activeMenu, setActiveMenu }) {
  const { themeName } = useTheme();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const menuItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "currently_reading", label: "Currently Reading", icon: "📖" },
    { id: "marked_read", label: "Marked Read", icon: "✅" },
    { id: "want_to_read", label: "Want to Read", icon: "🎯" },
    { id: "liked_books", label: "Liked Books", icon: "❤️" },
    { id: "comments", label: "Comments", icon: "💬" },
    { id: "reviews", label: "Reviews", icon: "⭐" },
    { id: "reading_stats", label: "Reading Stats", icon: "📈" },
    { id: "bookmarks", label: "Bookmarks", icon: "🔖" },
    { id: "followers", label: "Followers", icon: "👥" },
    { id: "following", label: "Following", icon: "👤" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className={`dashboard-sidebar ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">My Library</h2>
        <p className="sidebar-subtitle">Manage your reading journey</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`sidebar-nav-item ${
              activeMenu === item.id ? "active" : ""
            }`}
            aria-label={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {activeMenu === item.id && <span className="active-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <p className="user-name">John Doe</p>
            <p className="user-email">john@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
