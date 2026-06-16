"use client";

import React, { useState } from 'react';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import './buttons.css';

export default function WantToReadButton({ onClick, initialAdded = false, label = "Want to Read", className = "", ...props }) {
  const [added, setAdded] = useState(initialAdded);
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const handleClick = (e) => {
    setAdded(!added);
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`want-to-read-btn ${added ? 'added' : ''} ${className}`}
      style={{ fontFamily: currentFont?.family }}
      {...props}
    >
      {added ? <FaBookmark className="btn-icon" /> : <FaRegBookmark className="btn-icon" />}
      <span>{added ? "Added to Wishlist" : label}</span>
    </button>
  );
}