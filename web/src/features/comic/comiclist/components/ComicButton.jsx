"use client";

import React from "react";
import { BaseButton, ViewDetailsButton, ButtonGroup } from "@/shared/buttons";
import { FaHeart, FaShare, FaBookOpen, FaShoppingCart, FaFileAlt, FaStar, FaCompass } from "react-icons/fa";
import './ComicButton.css';

// ============================================
// COMIC ACTION BUTTONS (Using Shared System)
// ============================================

export const ComicActionButtons = {
  // Read Digital Button
  ReadDigital: ({ comicSlug, size = "md", className = "", label = "Read Digital", ...props }) => (
    <BaseButton
      to={`/read/comic/${comicSlug}`}
      variant="comic"
      size={size}
      icon={<FaBookOpen />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // Buy Physical Button
  BuyPhysical: ({ url, size = "md", className = "", label = "Buy Physical", ...props }) => (
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

  // Add Wishlist Button
  AddWishlist: ({
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

  // Share Comic Button
  ShareComic: ({ comicSlug, size = "md", className = "", label = "Share", onShare, ...props }) => {
    const handleShare = () => {
      const url = `https://bookqubit.com/comics/${comicSlug}`;
      if (navigator.share) {
        navigator.share({
          title: "Check out this comic!",
          text: "I found this amazing comic on BookQubit",
          url: url,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(url).then(() => {
          alert("Link copied to clipboard!");
        });
      }
      if (onShare) onShare();
    };

    return (
      <BaseButton
        variant="share"
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

  // Collector Guide Button
  CollectorGuide: ({ comicSlug, size = "md", className = "", label = "Collector Guide", ...props }) => (
    <BaseButton
      to={`/comics/${comicSlug}/collectors-guide`}
      variant="warning"
      size={size}
      icon={<FaStar />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // Quick Summary Button
  QuickSummary: ({ comicSlug, size = "md", className = "", label = "Summary", ...props }) => (
    <BaseButton
      to={`/comics/${comicSlug}/summary`}
      variant="secondary"
      size={size}
      icon={<FaFileAlt />}
      className={className}
      {...props}
    >
      {label}
    </BaseButton>
  ),

  // View Details Button (Using Shared ViewDetailsButton)
  ViewDetails: ({ comicSlug, size = "md", className = "", label = "View Details", ...props }) => (
    <ViewDetailsButton
      slug={comicSlug}
      type="comic"
      size={size}
      label={label}
      className={className}
      {...props}
    />
  ),
};

// ============================================
// COMIC BUTTON GROUP
// ============================================

export const ComicButtonGroup = ({ children, direction = "horizontal", className = "" }) => (
  <ButtonGroup direction={direction} className={className}>
    {children}
  </ButtonGroup>
);

// ============================================
// COMIC ACTION BAR
// ============================================

export const ComicActionBar = ({
  comicSlug,
  getComicUrl,
  isWishlisted = false,
  onWishlistToggle,
  onShare,
  showViewDetails = true,
  showReadDigital = true,
  showBuyPhysical = true,
  showWishlist = true,
  showShare = true,
  showCollectorGuide = true,
  showSummary = true,
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

// ============================================
// EXPORT
// ============================================

export default ComicButton;