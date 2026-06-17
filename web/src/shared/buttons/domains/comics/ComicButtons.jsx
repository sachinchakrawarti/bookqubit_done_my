"use client";

import React from "react";
import {
  FaInfoCircle,
  FaShoppingCart,
  FaHeart,
  FaBookOpen,
  FaFileAlt,
  FaShare,
  FaStar,
  FaUsers,
  FaCalendarAlt,
  FaTrophy,
} from "react-icons/fa";
import { getDetailRoute } from "../../constants/routes";
import "./ComicButtons.css";

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

export const ComicButtons = {
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
      to={getDetailRoute("comic", slug)}
      variant="comic"
      size={size}
      icon={<FaInfoCircle />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Read Digital
  // ============================================
  ReadDigital: ({
    slug,
    size = "md",
    label = "Read Digital",
    className = "",
    ...props
  }) => (
    <BaseButton
      to={`/read/comic/${slug}`}
      variant="comic"
      size={size}
      icon={<FaBookOpen />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Get Comic / Buy
  // ============================================
  GetComic: ({
    url,
    size = "md",
    label = "Get Comic",
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
  // Collector Guide
  // ============================================
  CollectorGuide: ({
    slug,
    size = "md",
    label = "Collector Guide",
    className = "",
    ...props
  }) => (
    <BaseButton
      to={`/comics/${slug}/collectors-guide`}
      variant="warning"
      size={size}
      icon={<FaTrophy />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Comic Summary
  // ============================================
  Summary: ({
    slug,
    size = "md",
    label = "Summary",
    className = "",
    ...props
  }) => (
    <BaseButton
      to={`/comics/${slug}/summary`}
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
      const url = `https://bookqubit.com/comics/${slug}`;
      if (navigator.share) {
        navigator
          .share({
            title: "Check out this comic!",
            text: "I found this amazing comic on BookQubit",
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
  // Rate Comic
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
  // Comic Issues
  // ============================================
  Issues: ({
    slug,
    size = "md",
    label = "View Issues",
    className = "",
    ...props
  }) => (
    <BaseButton
      to={`/comics/${slug}/issues`}
      variant="outline"
      size={size}
      icon={<FaCalendarAlt />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Creators / Artists
  // ============================================
  Creators: ({
    slug,
    size = "md",
    label = "Creators",
    className = "",
    ...props
  }) => (
    <BaseButton
      to={`/comics/${slug}/creators`}
      variant="ghost"
      size={size}
      icon={<FaUsers />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),
};

export default ComicButtons;
