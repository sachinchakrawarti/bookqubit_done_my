"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import {
  KnowMoreButton,
  ShareButton,
  SummaryButton,
  WishlistButton,
  CurrentlyReadingButton,
  MarkedReadButton,
} from "@/shared/buttons";

const ComicSquareCard = ({
  comic,
  onTagClick,
  onWishlistToggle,
  currentLang: propLang,
  showActions = true,
  size = "md",
}) => {
  const { theme, themeName } = useTheme();
  const { t, language: contextLanguage } = useLanguage();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const params = useParams();
  const pathname = usePathname();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get language from URL
  const getCurrentLanguage = () => {
    if (propLang) return propLang;
    const segments = pathname?.split("/").filter(Boolean);
    const firstSegment = segments?.[0];
    const supportedLanguages = [
      "en", "es", "fr", "de", "ja", "zh", "hi", "ar",
      "ur", "bn", "pt", "ru", "it", "ko",
    ];
    if (firstSegment && supportedLanguages.includes(firstSegment)) {
      return firstSegment;
    }
    return params?.lang || contextLanguage || "en";
  };

  const currentLanguage = getCurrentLanguage();

  // Guard against undefined theme
  if (!theme || !comic) {
    return null;
  }

  // Function to render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = (rating / 2) % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className={`w-3 h-3 ${theme.iconColors?.starFilled || "text-amber-400"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            key="half"
            className={`w-3 h-3 ${theme.iconColors?.starFilled || "text-amber-400"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id={`half-star-${comic.id}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#cbd5e1" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-star-${comic.id})`}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className={`w-3 h-3 ${theme.iconColors?.starEmpty || "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span
          className={`text-xs ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} ml-1`}
        >
          {comic.rating}
        </span>
      </div>
    );
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    if (onWishlistToggle) {
      onWishlistToggle(comic.id, newWishlistState);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: comic.title,
        text: `Check out this comic: ${comic.title}`,
        url: `/${currentLanguage}/comics/${comicSlug}`,
      });
    } else {
      navigator.clipboard.writeText(`/${currentLanguage}/comics/${comicSlug}`);
      alert("Link copied to clipboard!");
    }
  };

  // Get the correct slug
  const getComicSlug = () => {
    if (currentLanguage === "hi") return comic.hindiSlug || comic.slug;
    if (currentLanguage === "ur") return comic.urduSlug || comic.slug;
    if (currentLanguage === "ar") return comic.arabicSlug || comic.slug;
    if (currentLanguage === "bn") return comic.bengaliSlug || comic.slug;
    return comic.slug;
  };

  const comicSlug = getComicSlug();

  // Apply font style
  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`
        w-full max-w-sm mx-auto 
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
        ${theme.shadow?.book || "shadow-2xl"} 
        ${theme.background?.section || "bg-white dark:bg-gray-800"} 
        overflow-hidden rounded-xl 
        transition-all duration-300 hover:scale-105 hover:shadow-xl
      `}
    >
      {/* Comic Cover Image with Overlays */}
      <div className="relative">
        <div
          className={`
            h-64 
            ${theme.background?.bookCoverSide || "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"} 
            flex items-center justify-center p-4 overflow-hidden
          `}
        >
          <img
            src={comic.image}
            alt={comic.title}
            className="h-full w-full object-contain max-h-full max-w-full transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Category Badge */}
        <div
          className={`
            absolute top-3 left-3 
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-700"} 
            ${theme.textColors?.badge || "text-sky-800 dark:text-sky-400"} 
            px-2 py-1 
            ${theme.border?.button || "border border-gray-200 dark:border-gray-600"} 
            ${theme.shadow?.navigationDotContainer || "shadow-sm"} 
            font-semibold text-xs rounded-full backdrop-blur-sm
          `}
        >
          {comic.category}
        </div>

        {/* Wishlist Button - Using Shared WishlistButton */}
        <div className="absolute top-3 right-3">
          <WishlistButton
            initialInWishlist={isWishlisted}
            onClick={handleWishlistToggle}
            size="sm"
            className="backdrop-blur-sm"
          />
        </div>

        {/* Value Badge */}
        {comic.valueToday && (
          <div
            className={`
              absolute bottom-3 left-3 
              ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-700"} 
              ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} 
              px-2 py-1 
              ${theme.border?.button || "border border-gray-200 dark:border-gray-600"} 
              ${theme.shadow?.navigationDotContainer || "shadow-sm"} 
              font-bold text-xs rounded-full backdrop-blur-sm
            `}
          >
            💎 {comic.valueToday.split(" ")[0]}
          </div>
        )}
      </div>

      {/* Comic Details */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3
            className={`text-lg font-bold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} pr-2 line-clamp-2 flex-1`}
          >
            {comic.title}
          </h3>
          {renderStars(comic.rating)}
        </div>

        {/* Publisher and Date */}
        <div className="mb-3">
          <p
            className={`text-sm ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"} mb-1`}
          >
            {comic.publisher}
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
            >
              {comic.publicationDate}
            </span>
            {comic.coverPrice && (
              <>
                <span
                  className={`text-xs ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                >
                  •
                </span>
                <span
                  className={`text-xs ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} font-semibold`}
                >
                  {comic.coverPrice}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <p
          className={`text-sm ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"} mb-3 line-clamp-2`}
        >
          {comic.description}
        </p>

        {/* Key Characters */}
        {comic.charactersIntroduced &&
          comic.charactersIntroduced.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {comic.charactersIntroduced
                  .slice(0, 2)
                  .map((character, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onTagClick && onTagClick(character);
                      }}
                      className={`
                        text-xs px-2 py-1 
                        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
                        ${theme.textColors?.badge || "text-sky-800 dark:text-sky-400"} 
                        ${isDarkMode ? "bg-sky-900/30 hover:bg-sky-800/40" : "bg-sky-50 hover:bg-sky-100"} 
                        rounded-full transition-colors
                      `}
                    >
                      {character}
                    </button>
                  ))}
                {comic.charactersIntroduced.length > 2 && (
                  <span
                    className={`text-xs ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                  >
                    +{comic.charactersIntroduced.length - 2}{" "}
                    {t("book.more") || "more"}
                  </span>
                )}
              </div>
            </div>
          )}

        {/* Action Buttons - Using Shared Buttons */}
        {showActions && (
          <div className="flex flex-col gap-2">
            {/* Know More Button */}
            <KnowMoreButton
              onClick={() => window.open(`/${currentLanguage}/comics/${comicSlug}`, "_blank")}
              size={size}
              fullWidth
            />

            {/* Action Row */}
            <div className="flex gap-2">
              <SummaryButton
                onClick={() => window.open(`/${currentLanguage}/comics/${comicSlug}/summary`, "_blank")}
                size={size}
                className="flex-1"
              />
              <ShareButton
                onClick={handleShare}
                size={size}
                className="flex-1"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicSquareCard;