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
} from "react-icons/fi";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";

export default function UserDashboardSliderDesktop({
  activeMenu = "currently_reading",
  setActiveMenu,
}) {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();

  // Check if current theme is dark mode (Matches Navbar_Desktop_First_Row pattern)
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const menuItems = [
    {
      id: "currently_reading",
      label: "Currently Reading",
      icon: <FiBookOpen />,
    },
    { id: "marked_read", label: "Marked Read", icon: <FiCheckCircle /> },
    { id: "want_to_read", label: "Want to Read", icon: <FiHeart /> },
    { id: "reading_stats", label: "Reading Stats", icon: <FiBarChart2 /> },
    { id: "comments", label: "Comments", icon: <FiMessageSquare /> },
    { id: "likes", label: "Likes", icon: <FiThumbsUp /> },
    { id: "reviews", label: "Reviews", icon: <FiStar /> },
  ];

  // Dynamic style selectors mapped from the useTheme Context
  const getSidebarBackground = () => {
    return theme.background?.section || "";
  };

  const getBorderColor = () => {
    return theme.border?.default || "";
  };

  const getTextPrimary = () => {
    if (theme.textColors?.primary) return theme.textColors.primary;
    return isDarkMode ? "text-white" : "text-gray-900";
  };

  const getTextSecondary = () => {
    if (theme.textColors?.secondary) return theme.textColors.secondary;
    return isDarkMode ? "text-gray-400" : "text-gray-500";
  };

  const getIconSecondary = () => {
    return theme.iconColors?.secondary || "";
  };

  const getActiveButtonBg = () => {
    return theme.buttonColors?.primaryButton?.background || "";
  };

  const getActiveButtonTextColor = () => {
    return theme.buttonColors?.primaryButton?.textColor || "text-white";
  };

  // Apply font family inline style
  const fontStyle = currentFont?.family
    ? {
        fontFamily: currentFont.family,
      }
    : {};

  return (
    <aside
      dir={direction}
      style={fontStyle}
      className={`dashboard-slider ${themeName} ${getSidebarBackground()}`}
    >
      <div className={`slider-header ${getBorderColor()}`}>
        <div className="logo-section">
          <h2 className={`logo-title ${getTextPrimary()}`}>MyLibrary</h2>
          <p className={`logo-subtitle ${getTextSecondary()}`}>
            Reading Journey
          </p>
        </div>
      </div>

      <nav className="slider-nav">
        {menuItems.map((item) => {
          const isActive = activeMenu === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`nav-item ${isActive ? "active" : ""} ${getTextSecondary()}`}
              style={{
                // Let style overrides fall back cleanly onto native CSS definitions if background tokens don't match
                background:
                  isActive && getActiveButtonBg()
                    ? getActiveButtonBg()
                    : undefined,
              }}
            >
              <span
                className={`nav-icon ${
                  isActive
                    ? "active-icon-fallback"
                    : `${getIconSecondary()} icon-theme-color`
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`nav-label ${
                  isActive ? getActiveButtonTextColor() : getTextPrimary()
                }`}
              >
                {item.label}
              </span>
              {isActive && <span className="active-indicator" />}
            </button>
          );
        })}
      </nav>

      <div className={`slider-footer ${getBorderColor()} border-t`}>
        <div className="user-info">
          <div
            className={`user-avatar-small ${
              getActiveButtonBg() || "default-avatar-gradient"
            } ${getActiveButtonTextColor()}`}
            style={{
              background: getActiveButtonBg() || undefined,
            }}
          >
            JD
          </div>
          <div className="user-details">
            <p className={`user-name ${getTextPrimary()}`}>John Doe</p>
            <p className={`user-role ${getTextSecondary()}`}>Book Lover</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
