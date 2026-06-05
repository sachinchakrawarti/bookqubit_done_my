"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaCompass,
  FaBook,
  FaUsers,
  FaEnvelope,
  FaBell,
  FaHeart,
  FaBookmark,
  FaUserFriends,
  FaFire,
  FaCalendarAlt,
  FaStar,
  FaUserPlus,
  FaHashtag,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import "./SidebarLeft.css";

export default function SidebarLeft({ isMobileOpen }) {
  const pathname = usePathname();
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mainNavItems = [
    { href: "/drift", label: "Home", icon: <FaHome />, exact: true },
    { href: "/drift/explore", label: "Explore", icon: <FaCompass /> },
    { href: "/drift/books", label: "My Books", icon: <FaBook /> },
    { href: "/drift/community", label: "Community", icon: <FaUsers /> },
    { href: "/drift/messages", label: "Messages", icon: <FaEnvelope />, badge: 3 },
    { href: "/drift/notifications", label: "Notifications", icon: <FaBell />, badge: 5 },
  ];

  const libraryItems = [
    { href: "/drift/saved", label: "Saved", icon: <FaBookmark /> },
    { href: "/drift/liked", label: "Liked", icon: <FaHeart /> },
    { href: "/drift/following", label: "Following", icon: <FaUserFriends /> },
  ];

  const discoverItems = [
    { href: "/drift/trending", label: "Trending", icon: <FaFire /> },
    { href: "/drift/upcoming", label: "Upcoming", icon: <FaCalendarAlt /> },
    { href: "/drift/recommended", label: "Recommended", icon: <FaStar /> },
    { href: "/drift/suggestions", label: "Suggestions", icon: <FaUserPlus /> },
  ];

  const trendingTags = [
    { name: "#BookLovers", posts: "12.5K" },
    { name: "#DriftCommunity", posts: "8.2K" },
    { name: "#NewReleases", posts: "5.4K" },
    { name: "#ReadingList", posts: "3.8K" },
  ];

  // Apply font family inline style
  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        dir={direction}
        style={fontStyle}
        className={`drift-sidebar-left
          ${theme.background?.section || (isDarkMode ? "bg-gray-800/95" : "bg-white/95")}
          ${theme.border?.default || "border-r border-gray-200 dark:border-gray-700"}
          ${isCollapsed ? "collapsed" : ""}
          ${direction === 'rtl' ? 'rtl' : ''}
        `}
      >
        <div className="sidebar-content">
          {/* Main Navigation */}
          <div className="sidebar-section">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link
                  ${pathname === item.href || (!item.exact && pathname?.startsWith(item.href)) ? 
                    `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white` : 
                    `${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} hover:${theme.background?.hover || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`
                  }
                `}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
                {!isCollapsed && item.badge && (
                  <span className={`sidebar-badge ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-red-500 to-red-600"} text-white`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Library Section */}
          {!isCollapsed && (
            <div className="sidebar-section">
              <h3 className={`sidebar-heading ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
                Library
              </h3>
              {libraryItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} hover:${theme.background?.hover || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Discover Section */}
          {!isCollapsed && (
            <div className="sidebar-section">
              <h3 className={`sidebar-heading ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
                Discover
              </h3>
              {discoverItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} hover:${theme.background?.hover || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Trending Tags */}
          {!isCollapsed && (
            <div className="sidebar-section">
              <h3 className={`sidebar-heading ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
                Trending
              </h3>
              <div className="trending-tags">
                {trendingTags.map((tag, idx) => (
                  <Link
                    key={idx}
                    href={`/drift/tag/${tag.name.slice(1)}`}
                    className={`trending-tag-item ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} hover:${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}`}
                  >
                    <FaHashtag className="tag-icon" />
                    <div>
                      <div className="tag-name">{tag.name}</div>
                      <div className={`tag-posts ${theme.textColors?.secondary || (isDarkMode ? "text-gray-500" : "text-gray-400")}`}>
                        {tag.posts} posts
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`collapse-toggle ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white shadow-lg hover:scale-110 transition-transform`}
        >
          {isCollapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        dir={direction}
        style={fontStyle}
        className={`drift-sidebar-left-mobile
          ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}
          ${isMobileOpen ? "open" : ""}
          ${direction === 'rtl' ? 'rtl' : ''}
        `}
      >
        <div className={`mobile-sidebar-header ${theme.border?.default || "border-b border-gray-200 dark:border-gray-700"}`}>
          <div className="logo">
            <FaBook className={`logo-icon ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`} />
            <span className={`${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} font-bold`}>Drift</span>
          </div>
        </div>
        <div className="mobile-sidebar-content">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-sidebar-link ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} hover:${theme.background?.hover || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
              {item.badge && (
                <span className={`sidebar-badge ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-red-500 to-red-600"} text-white`}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          <div className={`mobile-divider ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}`} />
          {libraryItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-sidebar-link ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} hover:${theme.background?.hover || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          ))}
          <div className={`mobile-divider ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}`} />
          {discoverItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-sidebar-link ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} hover:${theme.background?.hover || (isDarkMode ? "bg-gray-700" : "bg-gray-100")}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}