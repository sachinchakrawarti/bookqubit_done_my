"use client";

import React, { useState } from 'react';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import { FaHeart } from 'react-icons/fa';
import './buttons.css';

export default function WishlistButton({ onClick, initialInWishlist = false, label = "Add to Wishlist", className = "", ...props }) {
  const [inWishlist, setInWishlist] = useState(initialInWishlist);
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const handleClick = (e) => {
    setInWishlist(!inWishlist);
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`wishlist-btn ${inWishlist ? 'in-wishlist' : ''} ${className}`}
      style={{ fontFamily: currentFont?.family }}
      {...props}
    >
      <FaHeart className="btn-icon" />
      <span>{inWishlist ? "In Wishlist ❤️" : label}</span>
    </button>
  );
}