"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaUserPlus,
  FaHashtag,
  FaFire,
  FaCalendarAlt,
  FaArrowRight,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaDiscord,
  FaYoutube,
  FaBook,
  FaStar,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import "./SidebarRight.css";

export default function SidebarRight({ isOpen }) {
  const pathname = usePathname();
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // ONLY show on home page - /drift, /drift/, or /:lang/drift
  const isHomePage = 
    pathname === "/drift" || 
    pathname === "/drift/" || 
    pathname?.match(/^\/[a-z]{2}\/drift$/) !== null;

  // If not home page, render nothing
  if (!isHomePage) {
    return null;
  }

  // Get theme-aware styles
  const primaryText = theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900");
  const secondaryText = theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600");
  const highlightText = theme.textColors?.highlight || (isDarkMode ? "text-sky-400" : "text-sky-600");
  const cardBg = theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white");
  const sectionBg = theme.background?.section || (isDarkMode ? "bg-gray-700" : "bg-gray-100");
  const primaryButtonBg = theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-500 to-indigo-500";
  const secondaryButtonBg = theme.buttonColors?.secondaryButton?.background || (isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200");
  const primaryIconColor = theme.iconColors?.primary || "text-sky-500";
  const highlightIconColor = theme.iconColors?.highlight || "text-orange-500";

  useEffect(() => {
    // Mock suggested users data
    setSuggestedUsers([
      { id: 1, name: "Priya Sharma", username: "@priya_writer", avatar: "PS", followers: "12.5K", isFollowing: false, role: "Writer" },
      { id: 2, name: "Amit Kumar", username: "@amit_reader", avatar: "AK", followers: "8.2K", isFollowing: true, role: "Reader" },
      { id: 3, name: "Neha Gupta", username: "@neha_author", avatar: "NG", followers: "5.4K", isFollowing: false, role: "Author" },
      { id: 4, name: "Drift Comics", username: "@drift_comics", avatar: "DC", followers: "3.8K", isFollowing: false, role: "Artist" },
    ]);

    // Mock trending topics
    setTrendingTopics([
      { tag: "#BookLovers", posts: "12.5K posts", trend: "up", icon: <FaStar /> },
      { tag: "#DriftCommunity", posts: "8.2K posts", trend: "up", icon: <FaUsers /> },
      { tag: "#NewReleases", posts: "5.4K posts", trend: "stable", icon: <FaBook /> },
      { tag: "#ReadingList", posts: "3.8K posts", trend: "down", icon: <FaChartLine /> },
    ]);

    // Mock upcoming events
    setUpcomingEvents([
      { name: "Book Reading Session", date: "Today, 7 PM", attendees: "120", icon: <FaBook /> },
      { name: "Writers Workshop", date: "Tomorrow, 5 PM", attendees: "85", icon: <FaUsers /> },
      { name: "Comic Con 2024", date: "Dec 15, 10 AM", attendees: "1.2K", icon: <FaStar /> },
    ]);
  }, []);

  const socialLinks = [
    { icon: <FaTwitter />, url: "https://twitter.com/drift", color: "#1DA1F2", name: "Twitter" },
    { icon: <FaInstagram />, url: "https://instagram.com/drift", color: "#E4405F", name: "Instagram" },
    { icon: <FaFacebook />, url: "https://facebook.com/drift", color: "#1877F2", name: "Facebook" },
    { icon: <FaDiscord />, url: "https://discord.gg/drift", color: "#5865F2", name: "Discord" },
    { icon: <FaYoutube />, url: "https://youtube.com/drift", color: "#FF0000", name: "YouTube" },
  ];

  const handleFollow = (userId) => {
    setSuggestedUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  // Apply font family inline style
  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  return (
    <>
      {/* Desktop Sidebar Right */}
      <aside
        dir={direction}
        style={fontStyle}
        className={`drift-sidebar-right
          ${themeName}
          ${direction === 'rtl' ? 'rtl' : ''}
        `}
      >
        <div className="sidebar-right-content">
          {/* Suggested Users Card */}
          <div className={`sidebar-card ${cardBg} ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
            <h3 className={`card-title ${primaryText}`}>
              <FaUserPlus className={`title-icon ${primaryIconColor}`} />
              Suggested for you
            </h3>
            <div className="suggested-users">
              {suggestedUsers.map((user) => (
                <div key={user.id} className="suggested-user">
                  <div className={`user-avatar ${primaryButtonBg} text-white`}>
                    {user.avatar}
                  </div>
                  <div className="user-info">
                    <Link 
                      href={`/drift/profile/${user.id}`} 
                      className={`user-name ${primaryText}`}
                    >
                      {user.name}
                    </Link>
                    <span className={`user-username ${secondaryText}`}>
                      {user.username}
                    </span>
                    <span className={`user-followers ${secondaryText}`}>
                      {user.followers} followers
                    </span>
                  </div>
                  <button
                    className={`follow-btn ${
                      user.isFollowing ? "following" : ""
                    } ${user.isFollowing ? "" : primaryButtonBg}`}
                    onClick={() => handleFollow(user.id)}
                  >
                    {user.isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
            <Link 
              href="/drift/suggestions" 
              className={`card-footer ${highlightText}`}
            >
              Show more <FaArrowRight />
            </Link>
          </div>

          {/* Trending Topics Card */}
          <div className={`sidebar-card ${cardBg} ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
            <h3 className={`card-title ${primaryText}`}>
              <FaFire className={`title-icon ${highlightIconColor}`} />
              Trending
            </h3>
            <div className="trending-list">
              {trendingTopics.map((topic, idx) => (
                <Link 
                  key={idx} 
                  href={`/drift/tag/${topic.tag.slice(1)}`} 
                  className="trending-item"
                >
                  <div className={`trending-rank ${secondaryText}`}>
                    #{idx + 1}
                  </div>
                  <div className="trending-info">
                    <div className={`trending-tag ${primaryText}`}>
                      {topic.tag}
                    </div>
                    <div className={`trending-stats ${secondaryText}`}>
                      {topic.posts}
                    </div>
                  </div>
                  <span className={`trend-arrow ${topic.trend}`}>
                    {topic.trend === "up" ? "↑" : topic.trend === "down" ? "↓" : "→"}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className={`sidebar-card ${cardBg} ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
            <h3 className={`card-title ${primaryText}`}>
              <FaCalendarAlt className={`title-icon ${primaryIconColor}`} />
              Upcoming Events
            </h3>
            <div className="events-list">
              {upcomingEvents.map((event, idx) => (
                <div key={idx} className="event-item">
                  <div className={`event-icon ${sectionBg} ${primaryText}`}>
                    {event.icon}
                  </div>
                  <div className="event-info">
                    <div className={`event-name ${primaryText}`}>
                      {event.name}
                    </div>
                    <div className={`event-details ${secondaryText}`}>
                      {event.date} • {event.attendees} attending
                    </div>
                  </div>
                  <button className={`event-reminder-btn ${secondaryButtonBg} ${secondaryText}`}>
                    Remind
                  </button>
                </div>
              ))}
            </div>
            <Link 
              href="/drift/events" 
              className={`card-footer ${highlightText}`}
            >
              View all events <FaArrowRight />
            </Link>
          </div>

          {/* Social Links Card */}
          <div className={`sidebar-card ${cardBg} ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
            <h3 className={`card-title ${primaryText}`}>
              Follow Drift
            </h3>
            <div className="social-links">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ backgroundColor: social.color }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className={`sidebar-footer ${secondaryText}`}>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/help">Help</Link>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Right */}
      <aside
        dir={direction}
        style={fontStyle}
        className={`drift-sidebar-right-mobile
          ${themeName}
          ${isOpen ? "open" : ""}
          ${direction === 'rtl' ? 'rtl' : ''}
        `}
      >
        <div className={`mobile-right-header ${cardBg} ${theme.border?.default || "border-b border-gray-200 dark:border-gray-700"}`}>
          <h3 className={primaryText}>Discover</h3>
          <button className={`close-btn ${secondaryText}`}>✕</button>
        </div>
        <div className="mobile-right-content">
          <div className="mobile-section">
            <h4 className={primaryText}>Suggested for you</h4>
            {suggestedUsers.slice(0, 3).map((user) => (
              <div key={user.id} className="mobile-suggested-user">
                <div className={`user-avatar ${primaryButtonBg} text-white`}>
                  {user.avatar}
                </div>
                <div className="user-info">
                  <div className={`user-name ${primaryText}`}>{user.name}</div>
                  <div className={`user-username ${secondaryText}`}>{user.username}</div>
                </div>
                <button 
                  className={`follow-btn ${user.isFollowing ? "following" : ""}`}
                  onClick={() => handleFollow(user.id)}
                >
                  {user.isFollowing ? "✓" : "+"}
                </button>
              </div>
            ))}
          </div>
          <div className="mobile-section">
            <h4 className={primaryText}>Trending</h4>
            {trendingTopics.slice(0, 3).map((topic, idx) => (
              <Link key={idx} href="#" className={`mobile-trending-item ${primaryText}`}>
                <span className={`trending-rank ${secondaryText}`}>{idx + 1}</span>
                <span className="trending-tag">{topic.tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}