"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import {
  FiUser,
  FiBell,
  FiSettings,
  FiSearch,
  FiLogOut,
  FiUserPlus,
  FiHelpCircle,
  FiChevronDown,
} from "react-icons/fi";

export default function UserDashboardHeaderDesktop() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Apply font family inline style
  const fontStyle = currentFont?.family
    ? {
        fontFamily: currentFont.family,
      }
    : {};

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "New book added",
      message: "The Great Gatsby added to your library",
      time: "5 mins ago",
    },
    {
      id: 2,
      title: "Reading challenge",
      message: "You're 80% through your monthly goal",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "New review",
      message: "Someone liked your review of Dune",
      time: "3 hours ago",
    },
  ];

  return (
    <header
      style={fontStyle}
      className={`
        sticky top-0 z-30
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border-b border-gray-200 dark:border-gray-700"}
        ${theme.shadow?.container || "shadow-sm"}
        transition-all duration-300
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left Side - User Info */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* User Avatar with Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`
                  flex items-center gap-2
                  w-10 h-10 md:w-12 md:h-12 rounded-full 
                  ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                  ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                  ${theme.shadow?.button || "shadow-md"}
                  transition-all duration-300 hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
                `}
                aria-label="User menu"
              >
                <FiUser className="w-5 h-5 md:w-6 md:h-6 mx-auto" />
              </button>

              {/* User Dropdown Menu - HIGH Z-INDEX */}
              {isUserMenuOpen && (
                <div
                  className={`
                    absolute right-0 mt-2 w-56 rounded-lg
                    ${theme.background?.section || "bg-white dark:bg-gray-900"}
                    ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                    ${theme.shadow?.container || "shadow-xl"}
                    z-[100] overflow-hidden
                    min-w-[200px]
                  `}
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    zIndex: 9999, // Highest z-index to ensure it's on top
                  }}
                >
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <p
                      className={`font-medium ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                    >
                      John Doe
                    </p>
                    <p
                      className={`text-sm ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}`}
                    >
                      john.doe@example.com
                    </p>
                  </div>
                  <div className="py-1">
                    {[
                      { icon: FiUser, label: "Profile", onClick: () => {} },
                      {
                        icon: FiSettings,
                        label: "Settings",
                        onClick: () => {},
                      },
                      { icon: FiHelpCircle, label: "Help", onClick: () => {} },
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.onClick();
                          setIsUserMenuOpen(false);
                        }}
                        className={`
                          w-full flex items-center gap-3 px-4 py-2.5 text-sm
                          ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"}
                          hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
                          transition-colors duration-150
                        `}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    ))}
                    <hr
                      className={`my-1 ${theme.border?.default || "border-gray-200 dark:border-gray-700"}`}
                    />
                    <button
                      onClick={() => {
                        console.log("Logout");
                        setIsUserMenuOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400
                        hover:bg-red-50 dark:hover:bg-red-900/20
                        transition-colors duration-150
                      `}
                    >
                      <FiLogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <h1
                  className={`
                    text-lg md:text-xl font-bold
                    ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  `}
                >
                  John Doe
                </h1>
                <span
                  className={`
                    text-xs px-2 py-0.5 rounded-full
                    ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                    ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                  `}
                >
                  Reader
                </span>
              </div>
              <p
                className={`
                  text-xs md:text-sm hidden lg:block
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                `}
              >
                Reader Dashboard • Track your reading journey
              </p>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Button */}
            <button
              className={`
                p-2 rounded-lg
                ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800"}
                ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-700"}
                transition-all duration-200 hover:scale-105
                ${theme.shadow?.button || ""}
                relative z-10
              `}
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Notifications Button with Dropdown - HIGH Z-INDEX */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`
                  p-2 rounded-lg relative
                  ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800"}
                  ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                  hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-700"}
                  transition-all duration-200 hover:scale-105
                  ${theme.shadow?.button || ""}
                  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
                `}
                aria-label="Notifications"
              >
                <FiBell className="w-5 h-5" />
                {/* Notification Badge */}
                <span
                  className={`
                    absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center
                    ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                    ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                    ${theme.shadow?.button || "shadow-md"}
                  `}
                >
                  3
                </span>
              </button>

              {/* Notifications Dropdown - HIGH Z-INDEX */}
              {isNotificationsOpen && (
                <div
                  className={`
                    absolute right-0 mt-2 w-80 rounded-lg
                    ${theme.background?.section || "bg-white dark:bg-gray-900"}
                    ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                    ${theme.shadow?.container || "shadow-xl"}
                    z-[100] overflow-hidden
                  `}
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    zIndex: 9999, // Highest z-index to ensure it's on top
                  }}
                >
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <h3
                      className={`font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                    >
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`
                          px-4 py-3 border-b
                          ${theme.border?.default || "border-gray-100 dark:border-gray-700"}
                          hover:${theme.background?.hover || "hover:bg-gray-50 dark:hover:bg-gray-800"}
                          transition-colors duration-150 cursor-pointer
                        `}
                      >
                        <p
                          className={`text-sm font-medium ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                        >
                          {notif.title}
                        </p>
                        <p
                          className={`text-sm ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                        >
                          {notif.message}
                        </p>
                        <p
                          className={`text-xs mt-1 ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}`}
                        >
                          {notif.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                      className={`
                        w-full text-center text-sm py-1.5 rounded-lg
                        ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                        ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                        ${theme.shadow?.button || "shadow-md"}
                        transition-all duration-200 hover:scale-105
                      `}
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings Button */}
            <button
              className={`
                p-2 rounded-lg
                ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800"}
                ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-700"}
                transition-all duration-200 hover:scale-105
                ${theme.shadow?.button || ""}
                hidden sm:flex
                relative z-10
              `}
              aria-label="Settings"
            >
              <FiSettings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
