"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";

const ComicButton = ({
  children,
  variant = "primary",
  size = "md",
  href,
  to,
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  className = "",
  fullWidth = false,
  ...props
}) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { currentFont } = useFont();
  const { direction } = useRTL();

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center font-semibold transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    ${theme.border?.button || 'border border-gray-300 dark:border-gray-600'}
    ${theme.shadow?.button || 'shadow-md'}
    ${fullWidth ? "w-full" : ""}
    rounded-lg
    hover:scale-105 active:scale-95
  `;

  const focusRingOffset = isDarkMode
    ? "focus:ring-offset-gray-900"
    : "focus:ring-offset-white";

  const variantStyles = {
    primary: `
      ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'}
      text-white
      ${theme.buttonColors?.primaryButton?.hoverBackground || 'hover:from-sky-700 hover:to-sky-600'}
      focus:ring-sky-500
    `,
    secondary: `
      ${theme.buttonColors?.secondaryButton?.background || 'border-2 border-sky-500 bg-transparent'}
      ${theme.buttonColors?.secondaryButton?.textColor || 'text-sky-600 dark:text-sky-400'}
      ${theme.buttonColors?.secondaryButton?.hoverBackground || 'hover:bg-sky-50 dark:hover:bg-sky-900/20'}
      focus:ring-sky-500
    `,
    digital: `
      bg-gradient-to-r from-emerald-500 to-emerald-600 
      text-white border-emerald-600
      hover:from-emerald-600 hover:to-emerald-700
      focus:ring-emerald-500
    `,
    collector: `
      bg-gradient-to-r from-amber-500 to-amber-600 
      text-white border-amber-600
      hover:from-amber-600 hover:to-amber-700
      focus:ring-amber-500
    `,
    share: `
      ${theme.buttonColors?.shareButton?.background || 'border-2 border-gray-300 dark:border-gray-600 bg-transparent'}
      ${theme.textColors?.shareButton || 'text-gray-700 dark:text-gray-300'}
      ${theme.buttonColors?.shareButton?.hoverBackground || 'hover:bg-gray-50 dark:hover:bg-gray-800'}
      focus:ring-gray-500
    `,
    wishlist: `
      border-2 
      ${theme.buttonColors?.wishlistButton?.defaultBackground || 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}
      ${theme.textColors?.wishlistDefault || 'text-gray-600 dark:text-gray-400'}
      hover:bg-rose-50 hover:border-rose-400 hover:text-rose-600
      dark:hover:bg-rose-900/20 dark:hover:border-rose-600 dark:hover:text-rose-400
      focus:ring-rose-500
    `,
    wishlistActive: `
      ${theme.buttonColors?.wishlistButton?.savedBackground || 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 dark:border-rose-600'}
      ${theme.textColors?.wishlistSaved || 'text-rose-600 dark:text-rose-400'}
      focus:ring-rose-500
    `,
    outline: `
      border-2 border-gray-300 dark:border-gray-600 
      ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}
      hover:bg-gray-50 hover:border-gray-400
      dark:hover:bg-gray-800 dark:hover:border-gray-500
      focus:ring-gray-500
    `,
    ghost: `
      border-2 border-transparent 
      ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}
      hover:bg-gray-100 hover:${theme.textColors?.primary || 'text-gray-900 dark:text-white'}
      dark:hover:bg-gray-800 dark:hover:text-white
      focus:ring-gray-500
    `,
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-sm min-h-[36px] gap-1.5",
    md: "px-4 py-3 text-sm min-h-[44px] gap-2",
    lg: "px-6 py-4 text-base min-h-[52px] gap-2.5",
    xl: "px-8 py-4 text-lg font-bold min-h-[60px] gap-3",
  };

  const buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${focusRingOffset}
    ${className}
  `.trim();

  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const getDisplayText = (text) => {
    if (typeof text === 'string' && (text.startsWith('comic.') || text.startsWith('button.') || text.startsWith('book.'))) {
      return t(text) || text;
    }
    return text;
  };

  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  const buttonContent = (
    <>
      {loading && <LoadingSpinner />}
      {icon && iconPosition === "left" && (
        <span className="mr-1.5 text-lg">{icon}</span>
      )}
      <span className="whitespace-nowrap">{getDisplayText(children)}</span>
      {icon && iconPosition === "right" && (
        <span className="ml-1.5 text-lg">{icon}</span>
      )}
    </>
  );

  if (to) {
    return (
      <Link href={to} className={buttonStyles} style={fontStyle} {...props}>
        {buttonContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={buttonStyles}
        style={fontStyle}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={buttonStyles}
      style={fontStyle}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

// ============================================
// COMIC ACTION BUTTONS
// ============================================

export const ComicActionButtons = {
  // Read Digital Button
  ReadDigital: ({ comicSlug, size = "md", className = "", label = "Read Digital", ...props }) => (
    <ComicButton
      to={`/read/comic/${comicSlug}`}
      variant="digital"
      size={size}
      icon="📖"
      className={className}
      {...props}
    >
      {label}
    </ComicButton>
  ),

  // Buy Physical Button
  BuyPhysical: ({ url, size = "md", className = "", label = "Buy Physical", ...props }) => (
    <ComicButton
      href={url}
      variant="collector"
      size={size}
      icon="🛒"
      className={className}
      {...props}
    >
      {label}
    </ComicButton>
  ),

  // Add Wishlist Button
  AddWishlist: ({
    comicSlug,
    isWishlisted = false,
    onToggle,
    size = "md",
    className = "",
    ...props
  }) => (
    <ComicButton
      variant={isWishlisted ? "wishlistActive" : "wishlist"}
      size={size}
      icon="❤️"
      onClick={onToggle}
      className={className}
      {...props}
    >
      {isWishlisted ? "In Wishlist ❤️" : "Add to Wishlist"}
    </ComicButton>
  ),

  // Share Comic Button
  ShareComic: ({ comicSlug, size = "md", className = "", label = "Share", onShare, ...props }) => {
    const handleShare = () => {
      if (navigator.share) {
        navigator.share({
          title: "Check out this comic!",
          text: "I found this amazing comic on BookQubit",
          url: `https://bookqubit.com/comics/${comicSlug}`,
        });
      } else {
        navigator.clipboard.writeText(`https://bookqubit.com/comics/${comicSlug}`);
        alert("Link copied to clipboard!");
      }
      if (onShare) onShare();
    };

    return (
      <ComicButton
        variant="share"
        size={size}
        icon="↗️"
        onClick={handleShare}
        className={className}
        {...props}
      >
        {label}
      </ComicButton>
    );
  },

  // Collector Guide Button
  CollectorGuide: ({ comicSlug, size = "md", className = "", label = "Collector Guide", ...props }) => (
    <ComicButton
      to={`/comics/${comicSlug}/collectors-guide`}
      variant="collector"
      size={size}
      icon="🧭"
      className={className}
      {...props}
    >
      {label}
    </ComicButton>
  ),

  // Quick Summary Button
  QuickSummary: ({ comicSlug, size = "md", className = "", label = "Quick Summary", ...props }) => (
    <ComicButton
      to={`/comics/${comicSlug}/summary`}
      variant="secondary"
      size={size}
      icon="📝"
      className={className}
      {...props}
    >
      {label}
    </ComicButton>
  ),

  // View Details Button
  ViewDetails: ({ comicSlug, size = "md", className = "", label = "View Details", ...props }) => (
    <ComicButton
      to={`/comics/${comicSlug}`}
      variant="primary"
      size={size}
      icon="👁️"
      className={className}
      {...props}
    >
      {label}
    </ComicButton>
  ),
};

// ============================================
// COMIC BUTTON GROUP
// ============================================

export const ComicButtonGroup = ({
  children,
  direction = "horizontal",
  className = "",
}) => {
  const directionStyles = {
    horizontal: "flex flex-row gap-3 items-stretch flex-wrap",
    vertical: "flex flex-col gap-3",
  };

  return (
    <div className={`${directionStyles[direction]} ${className}`}>
      {children}
    </div>
  );
};

// ============================================
// COMIC ACTION BAR
// ============================================

export const ComicActionBar = ({
  comicSlug,
  getComicUrl,
  isWishlisted = false,
  onWishlistToggle,
  onShare,
  showReadDigital = true,
  showBuyPhysical = true,
  showWishlist = true,
  showShare = true,
  showCollectorGuide = true,
  showSummary = true,
  showViewDetails = false,
  size = "md",
  className = "",
  direction = "horizontal",
}) => {
  const buttons = [];

  if (showViewDetails) {
    buttons.push(
      <ComicActionButtons.ViewDetails
        key="viewDetails"
        comicSlug={comicSlug}
        size={size}
      />
    );
  }

  if (showReadDigital) {
    buttons.push(
      <ComicActionButtons.ReadDigital
        key="readDigital"
        comicSlug={comicSlug}
        size={size}
      />
    );
  }

  if (showBuyPhysical && getComicUrl) {
    buttons.push(
      <ComicActionButtons.BuyPhysical
        key="buyPhysical"
        url={getComicUrl}
        size={size}
      />
    );
  }

  if (showWishlist) {
    buttons.push(
      <ComicActionButtons.AddWishlist
        key="wishlist"
        comicSlug={comicSlug}
        isWishlisted={isWishlisted}
        onToggle={onWishlistToggle}
        size={size}
      />
    );
  }

  if (showShare) {
    buttons.push(
      <ComicActionButtons.ShareComic
        key="share"
        comicSlug={comicSlug}
        size={size}
        onShare={onShare}
      />
    );
  }

  if (showCollectorGuide) {
    buttons.push(
      <ComicActionButtons.CollectorGuide
        key="collectorGuide"
        comicSlug={comicSlug}
        size={size}
      />
    );
  }

  if (showSummary) {
    buttons.push(
      <ComicActionButtons.QuickSummary
        key="summary"
        comicSlug={comicSlug}
        size={size}
      />
    );
  }

  return (
    <ComicButtonGroup direction={direction} className={className}>
      {buttons}
    </ComicButtonGroup>
  );
};

// Default export
export default ComicButton;