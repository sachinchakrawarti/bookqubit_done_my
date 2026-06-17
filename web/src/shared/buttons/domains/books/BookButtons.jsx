// src/shared/buttons/domains/books/BookButtons.jsx

"use client";

import React from "react";
import {
  FaInfoCircle,
  FaShoppingCart,
  FaHeart,
  FaCheckCircle,
  FaBook,
  FaFileAlt,
  FaShare,
  FaStar,
  FaBookOpen,
  FaThumbsUp,
  FaRegThumbsUp,
  FaBookmark,
  FaPlus,
} from "react-icons/fa";
import { getDetailRoute } from "../../constants/routes";
import "./BookButtons.css";

const BaseButton = ({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  onClick,
  icon,
  className = "",
  disabled = false,
  loading = false,
  ...props
}) => {
  const btnClass = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${disabled || loading ? "btn-disabled" : ""}
    ${loading ? "btn-loading" : ""}
    ${className}
  `.trim();

  const content = (
    <>
      {loading && <span className="btn-spinner"></span>}
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-label">{children}</span>
    </>
  );

  if (to) {
    return (
      <a href={to} className={btnClass} {...props}>
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={btnClass}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={btnClass}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
};

export const BookButtons = {
  // ============================================
  // View Details
  // ============================================
  ViewDetails: ({
    slug,
    size = "md",
    label = "View Details",
    className = "",
    ...props
  }) => (
    <BaseButton
      to={getDetailRoute("book", slug)}
      variant="book"
      size={size}
      icon={<FaInfoCircle />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Get Book / Buy
  // ============================================
  GetBook: ({
    url,
    size = "md",
    label = "Get Book",
    className = "",
    ...props
  }) => (
    <BaseButton
      href={url}
      variant="success"
      size={size}
      icon={<FaShoppingCart />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Add to Wishlist
  // ============================================
  Wishlist: ({
    isWishlisted = false,
    onToggle,
    size = "md",
    className = "",
    label = "Add to Wishlist",
    ...props
  }) => (
    <BaseButton
      variant={isWishlisted ? "wishlist-active" : "wishlist"}
      size={size}
      icon={<FaHeart />}
      onClick={onToggle}
      className={`${className} ${isWishlisted ? "active" : ""}`}
      {...props}
    >
      {isWishlisted ? "In Wishlist ❤️" : label}
    </BaseButton>
  ),

  // ============================================
  // Mark as Read (with useUserInteractions integration)
  // ============================================
  MarkAsRead: ({
    itemId,
    isRead = false,
    onToggle,
    size = "md",
    className = "",
    label = "Mark as Read",
    ...props
  }) => {
    // Use the passed onToggle or handle internally
    const handleClick = () => {
      if (onToggle) {
        onToggle();
      } else {
        // Default behavior - just pass through
        console.log("Mark as Read clicked for:", itemId);
      }
    };

    return (
      <BaseButton
        variant={isRead ? "success" : "outline"}
        size={size}
        icon={<FaCheckCircle />}
        onClick={handleClick}
        className={`${className} ${isRead ? "active" : ""}`}
        {...props}
      >
        {isRead ? "Read ✓" : label}
      </BaseButton>
    );
  },

  // ============================================
  // Currently Reading
  // ============================================
  CurrentlyReading: ({
    isReading = false,
    onToggle,
    size = "md",
    className = "",
    label = "Currently Reading",
    ...props
  }) => (
    <BaseButton
      variant={isReading ? "primary" : "outline"}
      size={size}
      icon={<FaBookOpen />}
      onClick={onToggle}
      className={`${className} ${isReading ? "active" : ""}`}
      {...props}
    >
      {isReading ? "Reading Now 📖" : label}
    </BaseButton>
  ),

  // ============================================
  // Want to Read
  // ============================================
  WantToRead: ({
    isWanted = false,
    onToggle,
    size = "md",
    className = "",
    label = "Want to Read",
    ...props
  }) => (
    <BaseButton
      variant={isWanted ? "warning" : "outline"}
      size={size}
      icon={<FaStar />}
      onClick={onToggle}
      className={`${className} ${isWanted ? "active" : ""}`}
      {...props}
    >
      {isWanted ? "⭐ Want to Read" : label}
    </BaseButton>
  ),

  // ============================================
  // Summary
  // ============================================
  Summary: ({
    slug,
    size = "md",
    label = "Summary",
    className = "",
    ...props
  }) => (
    <BaseButton
      to={`/books/${slug}/summary`}
      variant="secondary"
      size={size}
      icon={<FaFileAlt />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Share
  // ============================================
  Share: ({
    slug,
    onShare,
    size = "md",
    label = "Share",
    className = "",
    ...props
  }) => {
    const handleShare = () => {
      const url = `https://bookqubit.com/books/${slug}`;
      if (navigator.share) {
        navigator
          .share({
            title: "Check out this book!",
            text: "I found this amazing book on BookQubit",
            url: url,
          })
          .catch(() => {});
      } else {
        navigator.clipboard.writeText(url).then(() => {
          alert("Link copied to clipboard!");
        });
      }
      if (onShare) onShare();
    };

    return (
      <BaseButton
        variant="outline"
        size={size}
        icon={<FaShare />}
        onClick={handleShare}
        className={className}
        {...props}
      >
        {label}
      </BaseButton>
    );
  },

  // ============================================
  // Rate Book
  // ============================================
  Rate: ({
    rating = 0,
    onRate,
    size = "md",
    className = "",
    label = "Rate",
    ...props
  }) => (
    <BaseButton
      variant="outline"
      size={size}
      icon={<FaStar />}
      onClick={onRate}
      className={className}
      {...props}
    >
      {rating > 0 ? `${rating} ★` : label}
    </BaseButton>
  ),

  // ============================================
  // LIKE BUTTON
  // ============================================
  Like: ({
    isLiked = false,
    count = 0,
    onToggle,
    size = "md",
    className = "",
    label = "Like",
    ...props
  }) => (
    <BaseButton
      variant={isLiked ? "like-active" : "like"}
      size={size}
      icon={isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
      onClick={onToggle}
      className={`${className} ${isLiked ? "active" : ""}`}
      {...props}
    >
      {count > 0 ? count : label}
    </BaseButton>
  ),

  // ============================================
  // ADD TO LIBRARY BUTTON
  // ============================================
  AddToLibrary: ({
    isInLibrary = false,
    onToggle,
    size = "md",
    className = "",
    label = "Add to Library",
    ...props
  }) => (
    <BaseButton
      variant={isInLibrary ? "library-active" : "library"}
      size={size}
      icon={isInLibrary ? <FaBookmark /> : <FaPlus />}
      onClick={onToggle}
      className={`${className} ${isInLibrary ? "active" : ""}`}
      {...props}
    >
      {isInLibrary ? "In Library ✓" : label}
    </BaseButton>
  ),
};

export default BookButtons;
