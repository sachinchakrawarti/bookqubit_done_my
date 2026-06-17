// src/shared/user_dashboard/MarkedReadTab/components/BookCard.jsx

"use client";

import React from "react";
import {
  FiStar,
  FiHeart,
  FiShare2,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";
import { useTheme } from "@/themes/useTheme";
import { useUserInteractions } from "@/shared/buttons";
import "./BookCard.css";

const BookCard = ({
  book,
  viewMode,
  onBookClick,
  isMarkedReadProp,
  isLiked: isLikedProp,
  isWishlisted: isWishlistedProp,
  size = "passport",
}) => {
  const { theme, themeName } = useTheme();
  const {
    isMarkedRead,
    isLiked,
    isWishlisted,
    toggleLike,
    toggleWishlist,
    markAsRead,
  } = useUserInteractions();

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const isRead =
    isMarkedReadProp !== undefined ? isMarkedReadProp : isMarkedRead(book.id);
  const liked = isLikedProp !== undefined ? isLikedProp : isLiked(book.id);
  const wishlisted =
    isWishlistedProp !== undefined ? isWishlistedProp : isWishlisted(book.id);

  // Theme helper functions (following Navbar_Desktop_First_Row pattern)
  const getCardBackground = () => {
    return theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white");
  };

  const getCardBorder = () => {
    return (
      theme.border?.default || "border border-gray-200 dark:border-gray-700"
    );
  };

  const getTextPrimary = () => {
    return (
      theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")
    );
  };

  const getTextSecondary = () => {
    return (
      theme.textColors?.secondary ||
      (isDarkMode ? "text-gray-400" : "text-gray-600")
    );
  };

  const getTextMuted = () => {
    return (
      theme.textColors?.secondary ||
      (isDarkMode ? "text-gray-500" : "text-gray-400")
    );
  };

  const getIconPrimary = () => {
    return theme.iconColors?.primary || "text-sky-500";
  };

  const getStarFilled = () => {
    return theme.iconColors?.starFilled || "text-amber-400";
  };

  const getStarEmpty = () => {
    return theme.iconColors?.starEmpty || "text-gray-300";
  };

  const getPrimaryButtonBg = () => {
    return (
      theme.buttonColors?.primaryButton?.background ||
      "bg-gradient-to-r from-sky-600 to-sky-500"
    );
  };

  const getPrimaryButtonHoverBg = () => {
    return (
      theme.buttonColors?.primaryButton?.hoverBackground ||
      "hover:from-sky-700 hover:to-sky-600"
    );
  };

  const getPrimaryButtonText = () => {
    return theme.buttonColors?.primaryButton?.textColor || "text-white";
  };

  const getPhotoBackground = () => {
    return (
      theme.background?.bookCoverSide ||
      (isDarkMode ? "bg-gray-700" : "bg-gray-50")
    );
  };

  // If not marked as read, show mini mark option
  if (!isRead) {
    return (
      <div
        className={`book-card not-read ${getCardBackground()} ${getCardBorder()}`}
        onClick={() => onBookClick(book)}
      >
        <div className="book-cover">
          <img src={book.imageUrl} alt={book.title} />
        </div>
        <div className="book-info">
          <div className={`book-title ${getTextPrimary()}`}>{book.title}</div>
          <div className={`book-author ${getTextSecondary()}`}>
            {book.author}
          </div>
          <button
            className={`mark-read-btn ${getPrimaryButtonBg()} ${getPrimaryButtonHoverBg()} ${getPrimaryButtonText()}`}
            onClick={(e) => {
              e.stopPropagation();
              markAsRead(book.id);
              window.dispatchEvent(new Event("storage"));
              setTimeout(() => window.location.reload(), 300);
            }}
          >
            <FiCheckCircle /> Mark Read
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // PASSPORT PHOTO STYLE - MAIN VIEW
  // ============================================
  return (
    <div
      className={`book-card passport ${getCardBackground()} ${getCardBorder()}`}
      onClick={() => onBookClick(book)}
      title={`${book.title} by ${book.author}`}
    >
      {/* Passport Photo */}
      <div className={`book-cover passport-photo ${getPhotoBackground()}`}>
        <img src={book.imageUrl} alt={book.title} />
        <span className={`photo-rating ${getStarFilled()}`}>
          ⭐{book.rating}
        </span>
        <span className={`photo-read-badge ${getPrimaryButtonBg()}`}>
          <FiCheckCircle size={10} />
        </span>
      </div>

      {/* Passport Info */}
      <div className="book-info passport-info">
        <div className={`book-title passport-title ${getTextPrimary()}`}>
          {book.title}
        </div>
        <div className={`book-author passport-author ${getTextSecondary()}`}>
          {book.author}
        </div>
        <div className={`passport-meta ${getTextMuted()}`}>
          <span>{book.pageCount} pgs</span>
          <span>•</span>
          <span>{book.published?.split("-")[0]}</span>
        </div>
        <div className="passport-actions">
          <button
            className={`action-btn like ${liked ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              handleLike(e);
            }}
            title="Like"
          >
            <FiHeart className={liked ? "active" : ""} size={12} />
          </button>
          <button
            className={`action-btn wishlist ${wishlisted ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWishlist(e);
            }}
            title="Wishlist"
          >
            <FiStar className={wishlisted ? "active" : ""} size={12} />
          </button>
          <button
            className="action-btn share"
            onClick={(e) => {
              e.stopPropagation();
              handleShare(e);
            }}
            title="Share"
          >
            <FiShare2 size={12} />
          </button>
          <button
            className="action-btn remove"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFromRead(e);
            }}
            title="Remove"
          >
            <FiTrash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );

  // Helper functions
  function handleRemoveFromRead(e) {
    if (confirm(`Remove "${book.title}" from your read list?`)) {
      markAsRead(book.id);
      window.dispatchEvent(new Event("storage"));
      setTimeout(() => window.location.reload(), 300);
    }
  }

  function handleAddToWishlist(e) {
    toggleWishlist(book.id);
  }

  function handleLike(e) {
    toggleLike(book.id);
  }

  function handleShare(e) {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `I just finished reading "${book.title}" by ${book.author}`,
      });
    } else {
      navigator.clipboard.writeText(`${book.title} by ${book.author}`);
      alert("Copied to clipboard!");
    }
  }
};

export default BookCard;
