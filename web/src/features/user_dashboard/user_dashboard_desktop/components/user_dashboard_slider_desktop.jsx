"use client";

import "./user_dashboard_slider_desktop.css";
import {
  FiBookOpen,
  FiCheckCircle,
  FiHeart,
  FiBarChart2,
  FiMessageSquare,
  FiThumbsUp,
  FiStar,
  FiSettings,
  FiUsers,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

export default function UserDashboardSliderDesktop({
  activeMenu = "currently_reading",
  setActiveMenu,
  collapsed = false,
  setCollapsed,
}) {
  const menuItems = [
    { id: "currently_reading", label: "Currently Reading", icon: <FiBookOpen /> },
    { id: "marked_read", label: "Marked Read", icon: <FiCheckCircle /> },
    { id: "want_to_read", label: "Want to Read", icon: <FiHeart /> },
    { id: "reading_stats", label: "Reading Stats", icon: <FiBarChart2 /> },
    { id: "comments", label: "Comments", icon: <FiMessageSquare /> },
    { id: "likes", label: "Likes", icon: <FiThumbsUp /> },
    { id: "reviews", label: "Reviews", icon: <FiStar /> },
  ];

  const bottomMenuItems = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "followers", label: "Followers", icon: <FiUsers /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
    { id: "logout", label: "Logout", icon: <FiLogOut />, isLogout: true },
  ];

  return (
    <aside className={`dashboard-slider ${collapsed ? "collapsed" : ""}`}>
      <div className="slider-header">
        {!collapsed && (
          <div className="logo-section">
            <h2 className="logo-title">MyLibrary</h2>
            <p className="logo-subtitle">Reading Journey</p>
          </div>
        )}
        {collapsed && <div className="logo-icon">📚</div>}
      </div>

      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "→" : "←"}
      </button>

      <nav className="slider-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`nav-item ${activeMenu === item.id ? "active" : ""}`}
            title={collapsed ? item.label : ""}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
            {activeMenu === item.id && !collapsed && <span className="active-indicator" />}
          </button>
        ))}
      </nav>

      {!collapsed && <div className="slider-divider"></div>}

      <nav className="slider-nav-bottom">
        {bottomMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === "logout") {
                console.log("Logout clicked");
              } else {
                setActiveMenu(item.id);
              }
            }}
            className={`nav-item ${activeMenu === item.id ? "active" : ""} ${item.isLogout ? "logout" : ""}`}
            title={collapsed ? item.label : ""}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      {!collapsed && (
        <div className="slider-footer">
          <div className="user-info">
            <div className="user-avatar-small">JD</div>
            <div className="user-details">
              <p className="user-name">John Doe</p>
              <p className="user-role">Book Lover</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}