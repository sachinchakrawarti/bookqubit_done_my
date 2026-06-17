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
  FaDownload,
  FaGraduationCap,
  FaQuoteRight,
  FaUsers,
  FaBook,
  FaFilePdf,
} from "react-icons/fa";
import { getDetailRoute } from "../../constants/routes";
import "./AcademicButtons.css";

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

export const AcademicButtons = {
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
      to={getDetailRoute("academic", slug)}
      variant="academic"
      size={size}
      icon={<FaInfoCircle />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Read Now
  // ============================================
  ReadNow: ({
    slug,
    size = "md",
    label = "Read Now",
    className = "",
    ...props
  }) => (
    <BaseButton
      to={`/read/academic/${slug}`}
      variant="academic"
      size={size}
      icon={<FaBookOpen />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Download PDF
  // ============================================
  DownloadPDF: ({
    url,
    size = "md",
    label = "Download PDF",
    className = "",
    ...props
  }) => (
    <BaseButton
      href={url}
      variant="success"
      size={size}
      icon={<FaFilePdf />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Add to Library
  // ============================================
  AddToLibrary: ({
    isAdded = false,
    onToggle,
    size = "md",
    className = "",
    label = "Add to Library",
    ...props
  }) => (
    <BaseButton
      variant={isAdded ? "success" : "outline"}
      size={size}
      icon={<FaGraduationCap />}
      onClick={onToggle}
      className={`${className} ${isAdded ? "active" : ""}`}
      {...props}
    >
      {isAdded ? "In Library ✓" : label}
    </BaseButton>
  ),

  // ============================================
  // Cite This Paper
  // ============================================
  Cite: ({ slug, size = "md", label = "Cite", className = "", ...props }) => (
    <BaseButton
      to={`/academic/${slug}/cite`}
      variant="secondary"
      size={size}
      icon={<FaQuoteRight />}
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
      const url = `https://bookqubit.com/academic/${slug}`;
      if (navigator.share) {
        navigator
          .share({
            title: "Check out this academic paper!",
            text: "I found this amazing academic resource on BookQubit",
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
  // Rate Paper
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
  // References / Bibliography
  // ============================================
  References: ({
    slug,
    size = "md",
    label = "References",
    className = "",
    ...props
  }) => (
    <BaseButton
      to={`/academic/${slug}/references`}
      variant="ghost"
      size={size}
      icon={<FaBook />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Related Papers
  // ============================================
  RelatedPapers: ({
    slug,
    size = "md",
    label = "Related Papers",
    className = "",
    ...props
  }) => (
    <BaseButton
      to={`/academic/${slug}/related`}
      variant="outline"
      size={size}
      icon={<FaUsers />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // ============================================
  // Save to Reading List
  // ============================================
  SaveToList: ({
    isSaved = false,
    onToggle,
    size = "md",
    className = "",
    label = "Save to List",
    ...props
  }) => (
    <BaseButton
      variant={isSaved ? "primary" : "outline"}
      size={size}
      icon={<FaBookmark />}
      onClick={onToggle}
      className={`${className} ${isSaved ? "active" : ""}`}
      {...props}
    >
      {isSaved ? "Saved ✓" : label}
    </BaseButton>
  ),
};

export default AcademicButtons;
