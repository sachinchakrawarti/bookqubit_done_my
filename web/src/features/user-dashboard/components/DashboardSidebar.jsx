"use client";

import "./DashboardSidebar.css";
import { useTheme } from "@/themes/useTheme";
import { 
  FiGrid, 
  FiBookOpen, 
  FiCheckCircle, 
  FiStar, 
  FiHeart, 
  FiMessageCircle, 
  FiEdit2, 
  FiBarChart2, 
  FiBookmark, 
  FiUsers, 
  FiUserPlus, 
  FiSettings 
} from "react-icons/fi";

export default function DashboardSidebar({ activeMenu, setActiveMenu }) {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  const menus = [
    { id: "overview", label: "Overview", icon: FiGrid, count: null },
    { id: "currently_reading", label: "Currently Reading", icon: FiBookOpen, count: 3 },
    { id: "marked_read", label: "Marked Read", icon: FiCheckCircle, count: 24 },
    { id: "want_to_read", label: "Want to Read", icon: FiStar, count: 12 },
    { id: "liked_books", label: "Liked Books", icon: FiHeart, count: 45 },
    { id: "comments", label: "Comments", icon: FiMessageCircle, count: 8 },
    { id: "reviews", label: "Reviews", icon: FiEdit2, count: 15 },
    { id: "reading_stats", label: "Reading Stats", icon: FiBarChart2, count: null },
    { id: "bookmarks", label: "Bookmarks", icon: FiBookmark, count: 6 },
    { id: "followers", label: "Followers", icon: FiUsers, count: 128 },
    { id: "following", label: "Following", icon: FiUserPlus, count: 94 },
    { id: "settings", label: "Settings", icon: FiSettings, count: null },
  ];

  // Determine if the menu item is active
  const isActive = (menuId) => activeMenu === menuId;

  return (
    <aside 
      className="dashboard-sidebar"
      style={{
        backgroundColor: theme?.background?.section || (isDarkMode ? '#1f2937' : '#ffffff'),
        borderRight: `1px solid ${theme?.border?.default || (isDarkMode ? '#374151' : '#e5e7eb')}`
      }}
    >
      <div className="sidebar-header">
        <h3 style={{ color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827') }}>
          My Library
        </h3>
      </div>

      <ul className="sidebar-menu">
        {menus.map((menu) => {
          const IconComponent = menu.icon;
          const active = isActive(menu.id);
          
          return (
            <li
              key={menu.id}
              className={`sidebar-menu-item ${active ? "active" : ""}`}
              onClick={() => setActiveMenu(menu.id)}
              style={{
                backgroundColor: active 
                  ? (theme?.buttonColors?.primaryButton?.background || (isDarkMode ? '#0f766e' : '#0284c7'))
                  : 'transparent',
                color: active 
                  ? '#ffffff'
                  : (theme?.textColors?.secondary || (isDarkMode ? '#d1d5db' : '#4b5563')),
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span className="menu-icon">
                <IconComponent size={20} />
              </span>
              <span className="menu-label" style={{
                color: active 
                  ? '#ffffff'
                  : (theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827')),
                fontWeight: active ? 600 : 500
              }}>
                {menu.label}
              </span>
              {menu.count !== null && menu.count > 0 && (
                <span 
                  className="menu-count"
                  style={{
                    backgroundColor: active
                      ? 'rgba(255, 255, 255, 0.2)'
                      : (isDarkMode ? '#374151' : '#e5e7eb'),
                    color: active
                      ? '#ffffff'
                      : (theme?.textColors?.secondary || (isDarkMode ? '#d1d5db' : '#4b5563'))
                  }}
                >
                  {menu.count}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div 
        className="sidebar-footer"
        style={{
          borderTop: `1px solid ${theme?.border?.default || (isDarkMode ? '#374151' : '#e5e7eb')}`
        }}
      >
        <div className="user-info">
          <div className="user-avatar" style={{
            background: `linear-gradient(135deg, ${theme?.buttonColors?.primaryButton?.background || '#0284c7'}, ${theme?.buttonColors?.primaryButton?.hoverBackground || '#0f766e'})`
          }}>
            <span>JD</span>
          </div>
          <div className="user-details">
            <p style={{ 
              color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827'),
              fontWeight: 600,
              margin: 0
            }}>
              John Doe
            </p>
            <small style={{ 
              color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280'),
              fontSize: '0.75rem'
            }}>
              john@example.com
            </small>
          </div>
        </div>
      </div>
    </aside>
  );
}