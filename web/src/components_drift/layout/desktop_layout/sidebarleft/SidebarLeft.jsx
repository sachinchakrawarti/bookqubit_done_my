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
  FaChevronLeft,
  FaChevronRight,
  FaBars,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import { useLanguage } from "@/contexts/LanguageContext";
import SidebarSearch from "./components/SidebarSearch";
import "./SidebarLeft.css";

export default function SidebarLeft({ isMobileOpen }) {
  const pathname = usePathname();
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const { td } = useLanguage(); // Drift translations
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

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
    { href: "/drift", label: td("home"), icon: <FaHome />, exact: true },
    { href: "/drift/explore", label: td("explore"), icon: <FaCompass /> },
    { href: "/drift/books", label: td("myBooks"), icon: <FaBook /> },
    { href: "/drift/community", label: td("community"), icon: <FaUsers /> },
    { href: "/drift/messages", label: td("messages"), icon: <FaEnvelope />, badge: 3 },
    { href: "/drift/notifications", label: td("notifications"), icon: <FaBell />, badge: 5 },
  ];

  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  // Determine if a link is active
  const isActive = (href, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  // Get theme-aware styles
  const sidebarBg = isDarkMode 
    ? "bg-gray-800/95" 
    : theme.background?.section || "bg-white/95";

  const primaryText = theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900");
  const secondaryText = theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600");
  const hoverBg = theme.background?.hover || (isDarkMode ? "bg-gray-700/50" : "bg-gray-100");
  const primaryButtonBg = theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500";

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        dir={direction}
        style={fontStyle}
        className={`drift-sidebar-left
          ${sidebarBg}
          ${theme.border?.default || "border-r border-gray-200 dark:border-gray-700"}
          ${isCollapsed ? "collapsed" : ""}
          ${direction === 'rtl' ? 'rtl' : ''}
        `}
      >
        {/* Collapse/Expand Button - INSIDE the sidebar */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`collapse-toggle-btn ${primaryButtonBg} text-white shadow-lg hover:scale-110 transition-transform`}
          aria-label={isCollapsed ? td("expandTooltip") : td("collapseTooltip")}
        >
          {isCollapsed ? <FaChevronRight size={18} /> : <FaChevronLeft size={18} />}
        </button>

        <div className="sidebar-content">
          {/* Header with Logo */}
          <div className="sidebar-header">
            {!isCollapsed ? (
              <div className="logo-section">
                <Link href="/drift" className="logo-link">
                  <span className="logo-icon">📚</span>
                  <span className={`logo-text ${primaryText}`}>
                    {td("appName")} <span className="logo-subtitle">{td("appSubtitle")}</span>
                  </span>
                </Link>
              </div>
            ) : (
              <div className="logo-section-collapsed">
                <Link href="/drift" className="logo-link-collapsed">
                  <span className="logo-icon">📚</span>
                </Link>
              </div>
            )}
          </div>

          {/* Search Component */}
          <div className="sidebar-search-wrapper">
            <SidebarSearch isCollapsed={isCollapsed} placeholder={td("searchPlaceholder")} />
          </div>

          {/* Main Navigation - Only this menu */}
          <div className="sidebar-section">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${secondaryText} hover:${hoverBg} ${
                  isActive(item.href, item.exact) ? 
                    `${primaryButtonBg} text-white` : 
                    ""
                }`}
                data-tooltip={!isCollapsed ? undefined : item.label}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
                {!isCollapsed && item.badge && (
                  <span className={`sidebar-badge ${primaryButtonBg} text-white`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        dir={direction}
        style={fontStyle}
        className={`drift-sidebar-left-mobile
          ${isDarkMode ? "bg-gray-800" : "bg-white"}
          ${isMobileOpen ? "open" : ""}
          ${direction === 'rtl' ? 'rtl' : ''}
        `}
      >
        <div className={`mobile-sidebar-header ${isDarkMode ? "border-gray-700" : "border-gray-200"} border-b`}>
          <div className="logo">
            <span className="logo-icon">📚</span>
            <div className="logo-text-wrapper">
              <span className={`${primaryText} font-bold text-lg`}>{td("appName")}</span>
              <span className={`${secondaryText} text-xs`}>{td("appSubtitle")}</span>
            </div>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mobile-collapse-btn"
          >
            <FaBars />
          </button>
        </div>
        <div className="mobile-sidebar-content">
          <div className="mobile-search">
            <input
              type="text"
              placeholder={td("mobileSearchPlaceholder")}
              className={`mobile-search-input ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`}
            />
          </div>
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-sidebar-link ${secondaryText} hover:${hoverBg}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
              {item.badge && (
                <span className={`sidebar-badge ${primaryButtonBg} text-white`}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}