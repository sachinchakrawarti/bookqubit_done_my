"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaBell } from "react-icons/fa";
import { useRTL } from "@/contexts/RTLContext";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Silder_Mobile from "./components/silder_mobile/silder_mobile";
import Control_Mobile_Slider from "./components/control_mobile/Control_Mobile_Slider";
import SearchBar_Mobile from "@/components/searchbar/searchbar_mobile/searchbar_mobile";

import DiscoveryDriftBarMobile from "./components/discovery_drift_bar_mobile/discovery_drift_bar_mobile"; // Import the second row component

import "./Navbar_Mobile.css";

const Navbar_Mobile = () => {
  const router = useRouter();
  const { direction } = useRTL();
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unreadCount] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Detect scroll for sticky navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => router.push("/auth/login");
  const handleNotificationClick = () => router.push("/notifications");
  const handleProfileClick = () => router.push("/profile");

  const getUserInitials = () => {
    if (!user) return "U";
    const displayName = user.displayName || user.email?.split("@")[0] || "User";
    const nameParts = displayName.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
    }
    return displayName.charAt(0).toUpperCase();
  };

  // Enhanced theme variables mapping
  const themeVars = {
    fontFamily: currentFont?.family,

    "--nav-primary-color": theme.textColors?.primary || "inherit",
    "--nav-secondary-color": theme.textColors?.secondary || "inherit",
    "--nav-highlight-color": theme.textColors?.highlight || "#0ea5e9",

    "--nav-bg-color":
      theme.background?.navbar || theme.background?.section || "transparent",
    "--nav-hover-bg": theme.background?.hover || "rgba(156, 163, 175, 0.08)",

    "--nav-border-color": theme.border?.default || "rgba(156, 163, 175, 0.15)",

    "--nav-btn-bg":
      theme.buttonColors?.login?.background ||
      (isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(156, 163, 175, 0.12)"),
    "--nav-btn-text":
      theme.buttonColors?.login?.text || theme.textColors?.primary || "inherit",
    "--nav-btn-hover-bg":
      theme.buttonColors?.login?.hoverBackground ||
      (isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(156, 163, 175, 0.2)"),

    "--nav-avatar-bg":
      theme.buttonColors?.primaryButton?.background ||
      theme.iconColors?.starFilled ||
      "#0ea5e9",
    "--nav-avatar-text":
      theme.buttonColors?.primaryButton?.textColor || "#ffffff",

    "--nav-icon-color":
      theme.iconColors?.default || theme.textColors?.secondary || "inherit",

    "--nav-shadow":
      theme.shadow?.container || "0 1px 3px 0 rgba(0, 0, 0, 0.05)",

    "--nav-logo-color":
      theme.textColors?.logo || theme.textColors?.primary || "inherit",

    // Second row specific variables
    "--nav-second-row-bg": isScrolled
      ? theme.background?.navbar || "rgba(255, 255, 255, 0.95)"
      : "transparent",
  };

  if (loading) {
    return (
      <div className="navbar-mobile-wrapper">
        <nav
          className="navbar-mobile navbar-loading-state h-16 flex items-center px-4 justify-between transition-colors duration-300 w-full max-w-full overflow-hidden box-border"
          dir={direction}
          style={themeVars}
        >
          <div className="navbar-mobile-left flex-shrink-0">
            <div
              className="skeleton-loader w-8 h-8 opacity-20 rounded"
              style={{ backgroundColor: themeVars["--nav-primary-color"] }}
            ></div>
          </div>
          <div className="navbar-mobile-center min-w-0 mx-2">
            <div
              className="skeleton-logo w-20 h-6 opacity-20 rounded"
              style={{ backgroundColor: themeVars["--nav-primary-color"] }}
            ></div>
          </div>
          <div className="navbar-mobile-right flex gap-1.5 flex-shrink-0">
            <div
              className="skeleton-icon w-6 h-6 opacity-20 rounded-full"
              style={{ backgroundColor: themeVars["--nav-primary-color"] }}
            ></div>
            <div
              className="skeleton-icon w-6 h-6 opacity-20 rounded-full"
              style={{ backgroundColor: themeVars["--nav-primary-color"] }}
            ></div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="navbar-mobile-wrapper">
      {/* First Row - Main Navigation */}
      <nav
        className={`navbar-mobile flex items-center justify-between px-3 h-16 sticky top-0 z-50 transition-all duration-300 w-full max-w-full overflow-hidden box-border ${
          isScrolled ? "navbar-scrolled" : ""
        }`}
        dir={direction}
        style={{
          ...themeVars,
          fontFamily: themeVars.fontFamily,
          backgroundColor: themeVars["--nav-bg-color"],
          color: themeVars["--nav-primary-color"],
          borderBottom: `1px solid ${themeVars["--nav-border-color"]}`,
          boxShadow: isScrolled ? themeVars["--nav-shadow"] : "none",
        }}
      >
        {/* Left Section - Menu Icon */}
        <div className="navbar-mobile-left flex items-center flex-shrink-0">
          <Silder_Mobile user={user} />
        </div>

        {/* Center Section - Logo */}
        <div className="navbar-mobile-center flex items-center min-w-0 mx-1">
          <Link
            href="/homepages"
            className="navbar-mobile-logo flex items-center gap-1 no-underline min-w-0"
          >
            <span className="logo-icon text-lg flex-shrink-0">📚</span>
            <span
              className="logo-text font-bold text-base truncate"
              style={{ color: themeVars["--nav-logo-color"] }}
            >
              BookQubit
            </span>
          </Link>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="navbar-mobile-right flex items-center gap-1.5 flex-shrink-0">
          <SearchBar_Mobile />

          <Control_Mobile_Slider />

          {/* Notification Icon */}
          {isLoggedIn && (
            <button
              className="nav-control-btn notification-btn relative p-1.5 rounded-full transition-colors flex-shrink-0"
              onClick={handleNotificationClick}
              aria-label="Notifications"
              style={{ color: themeVars["--nav-icon-color"] }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  themeVars["--nav-hover-bg"];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <FaBell size={16} />
              {unreadCount > 0 && (
                <span className="notification-badge absolute top-0.5 right-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          {/* Profile Avatar */}
          {isLoggedIn && (
            <button
              className="nav-control-btn profile-btn p-0.5 rounded-full overflow-hidden focus:outline-none flex-shrink-0 transition-all hover:scale-105"
              onClick={handleProfileClick}
              aria-label="Profile"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="profile-avatar w-7 h-7 rounded-full object-cover block"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className="profile-initials w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                  style={{
                    backgroundColor: themeVars["--nav-avatar-bg"],
                    color: themeVars["--nav-avatar-text"],
                  }}
                >
                  {getUserInitials()}
                </div>
              )}
            </button>
          )}

          {/* Login Button */}
          {!isLoggedIn && (
            <button
              className="login-btn-nav flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 flex-shrink-0"
              onClick={handleLogin}
              style={{
                backgroundColor: themeVars["--nav-btn-bg"],
                color: themeVars["--nav-btn-text"],
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  themeVars["--nav-btn-hover-bg"];
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  themeVars["--nav-btn-bg"];
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <FaUser size={11} />
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>

      {/* Second Row - Discovery/Drift Navigation Bar */}
      <div
        className={`navbar-second-row ${isScrolled ? "second-row-scrolled" : ""}`}
        style={{
          backgroundColor: themeVars["--nav-second-row-bg"],
          borderBottom: `1px solid ${themeVars["--nav-border-color"]}`,
          transition: "all 0.3s ease",
        }}
      >
        <div className="navbar-second-row-container">
          <DiscoveryDriftBarMobile />
        </div>
      </div>
    </div>
  );
};

export default Navbar_Mobile;
