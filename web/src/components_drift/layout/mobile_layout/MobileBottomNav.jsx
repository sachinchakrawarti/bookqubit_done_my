"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  FaHome,
  FaCompass,
  FaBook,
  FaEnvelope,
  FaUser,
  FaPlusCircle,
  FaSearch,
  FaBell,
  FaHeart,
} from 'react-icons/fa';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import './MobileBottomNav.css';

const MobileBottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const navItems = [
    { id: 'home', icon: <FaHome />, label: 'Home', path: '/drift' },
    { id: 'explore', icon: <FaCompass />, label: 'Explore', path: '/drift/explore' },
    { id: 'create', icon: <FaPlusCircle />, label: 'Create', path: null, isCreate: true },
    { id: 'messages', icon: <FaEnvelope />, label: 'Messages', path: '/drift/messages' },
    { id: 'profile', icon: <FaUser />, label: 'Profile', path: '/drift/profile' },
  ];

  const handleNavigation = (path) => {
    if (path) {
      router.push(path);
    }
  };

  const handleCreateClick = () => {
    setShowCreateMenu(!showCreateMenu);
  };

  const handleCreateAction = (type) => {
    setShowCreateMenu(false);
    // Handle create actions
    if (type === 'post') {
      router.push('/drift/create/post');
    } else if (type === 'story') {
      router.push('/drift/create/story');
    } else if (type === 'book') {
      router.push('/drift/create/book');
    }
  };

  const isActive = (path) => {
    if (!path) return false;
    if (path === '/drift' && pathname === '/drift') return true;
    if (path !== '/drift' && pathname?.startsWith(path)) return true;
    return false;
  };

  // Close create menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showCreateMenu && !e.target.closest('.create-menu-container')) {
        setShowCreateMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showCreateMenu]);

  return (
    <>
      <div className={`mobile-bottom-nav ${themeName}`} style={{ fontFamily: currentFont?.family }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${isActive(item.path) ? 'active' : ''} ${item.isCreate ? 'create-btn' : ''}`}
            onClick={item.isCreate ? handleCreateClick : () => handleNavigation(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Create Menu */}
      {showCreateMenu && (
        <div className="create-menu-overlay">
          <div className={`create-menu ${themeName}`}>
            <div className="create-menu-header">
              <h3>Create New</h3>
              <button onClick={() => setShowCreateMenu(false)}>✕</button>
            </div>
            <div className="create-menu-items">
              <button onClick={() => handleCreateAction('post')} className="create-menu-item">
                <span className="create-icon">📝</span>
                <div>
                  <div className="create-title">Create Post</div>
                  <div className="create-desc">Share your thoughts</div>
                </div>
              </button>
              <button onClick={() => handleCreateAction('story')} className="create-menu-item">
                <span className="create-icon">📖</span>
                <div>
                  <div className="create-title">Write Story</div>
                  <div className="create-desc">Share your story</div>
                </div>
              </button>
              <button onClick={() => handleCreateAction('book')} className="create-menu-item">
                <span className="create-icon">📚</span>
                <div>
                  <div className="create-title">Add Book</div>
                  <div className="create-desc">Review a book</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBottomNav;