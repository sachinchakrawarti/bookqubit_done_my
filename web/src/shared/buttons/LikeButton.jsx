"use client";

import React, { useState } from 'react';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './buttons.css';

export default function LikeButton({ onClick, initialLiked = false, count = 0, className = "", ...props }) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(count);
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const handleClick = (e) => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`like-btn ${liked ? 'liked' : ''} ${className}`}
      style={{ fontFamily: currentFont?.family }}
      {...props}
    >
      {liked ? <FaHeart className="btn-icon" /> : <FaRegHeart className="btn-icon" />}
      <span>{likeCount > 0 ? likeCount : label}</span>
    </button>
  );
}