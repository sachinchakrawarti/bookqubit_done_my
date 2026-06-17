"use client";

import React from "react";
import {
  FaShare,
  FaHeart,
  FaRegHeart,
  FaBook,
  FaBookOpen,
  FaCheck,
  FaBookmark,
  FaPlus,
  FaThumbsUp,
  FaRegThumbsUp,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserInteractions } from "@/shared/buttons";

const BookActions = ({
  book,
  bookStatus = "unread",
  isInWishlist = false,
  isInCollection = false,
  isLiked = false,
  onGetBook,
  onScrollToSummary,
  onWishlist,
  onShare,
  onAddToLibrary,
  onReadStatus,
  onLike,
}) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();

  // Get user interactions
  const {
    markAsRead,
    isMarkedRead,
    addToCurrentlyReading,
    isCurrentlyReading,
    addToWantToRead,
    isWantToRead,
    toggleLike,
    isLiked: isBookLiked,
    toggleWishlist,
    isWishlisted: isBookWishlisted,
    toggleLibrary,
    isInLibrary,
    getCounts,
  } = useUserInteractions();

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  // Get real-time status from localStorage
  const isRead = isMarkedRead(book?.id);
  const isReading = isCurrentlyReading(book?.id);
  const isWanted = isWantToRead(book?.id);
  const liked = isBookLiked(book?.id);
  const wishlisted = isBookWishlisted(book?.id);
  const inLibrary = isInLibrary(book?.id);

  // Determine book status from localStorage
  const getBookStatus = () => {
    if (isRead) return "read";
    if (isReading) return "currently_reading";
    if (isWanted) return "want_to_read";
    return "unread";
  };

  const currentStatus = getBookStatus();

  const handleSummaryClick = () => {
    if (onScrollToSummary) {
      onScrollToSummary();
    } else if (book?.buttons?.readSummary) {
      window.open(book.buttons.readSummary, "_blank");
    }
  };

  // Handle Mark as Read toggle
  const handleMarkAsReadToggle = () => {
    if (isRead) {
      // If already read, unmark it
      markAsRead(book.id);
    } else {
      // Mark as read
      markAsRead(book.id);
      // Remove from other statuses if needed
      if (isReading) {
        // If it was in currently reading, you might want to keep it or remove
        // For now, we'll just mark as read
      }
    }
    // Force refresh
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  // Handle Currently Reading toggle
  const handleCurrentlyReadingToggle = () => {
    if (isReading) {
      // If already reading, unmark
      addToCurrentlyReading(book.id);
    } else {
      // Mark as currently reading
      addToCurrentlyReading(book.id);
      // Remove from read if it was marked read
      if (isRead) {
        markAsRead(book.id);
      }
    }
    window.dispatchEvent(new Event("storage"));
  };

  // Handle Want to Read toggle
  const handleWantToReadToggle = () => {
    addToWantToRead(book.id);
    window.dispatchEvent(new Event("storage"));
  };

  // Handle Like toggle
  const handleLikeToggle = () => {
    toggleLike(book.id);
    window.dispatchEvent(new Event("storage"));
  };

  // Handle Wishlist toggle
  const handleWishlistToggle = () => {
    toggleWishlist(book.id);
    window.dispatchEvent(new Event("storage"));
  };

  // Handle Library toggle
  const handleLibraryToggle = () => {
    toggleLibrary(book.id);
    window.dispatchEvent(new Event("storage"));
  };

  // Handle Share
  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      const url = `https://bookqubit.com/books/${book.slug}`;
      if (navigator.share) {
        navigator.share({
          title: book.title,
          text: `Check out "${book.title}" by ${book.author}`,
          url: url,
        });
      } else {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-3 pt-4">
      {/* Get Book Button */}
      {book?.buttons?.getBook && (
        <button
          onClick={() => window.open(book.buttons.getBook, "_blank")}
          className={`flex-1 min-w-[140px] px-4 py-3 
            ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
            ${theme.buttonColors?.primaryButton?.hoverBackground || "hover:from-sky-700 hover:to-sky-600"}
            text-white rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          `}
        >
          <FaBook className="inline mr-2" />
          {t("book.get_book") || "Get Book"}
        </button>
      )}

      {/* Summary Button */}
      {(book?.summary || book?.buttons?.readSummary) && (
        <button
          onClick={handleSummaryClick}
          className={`flex-1 min-w-[140px] px-4 py-3 
            ${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"}
            ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}
            rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          `}
        >
          <FaBookOpen className="inline mr-2" />
          {t("book.summary") || "Summary"}
        </button>
      )}

      {/* Mark as Read Button */}
      <button
        onClick={handleMarkAsReadToggle}
        className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          ${
            isRead
              ? "bg-green-500 text-white hover:bg-green-600"
              : `${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} 
               ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}`
          }
        `}
      >
        <FaCheck className="inline mr-2" />
        {isRead ? "Read ✓" : "Mark as Read"}
      </button>

      {/* Currently Reading Button */}
      <button
        onClick={handleCurrentlyReadingToggle}
        className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          ${
            isReading
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : `${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} 
               ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}`
          }
        `}
      >
        <FaBookOpen className="inline mr-2" />
        {isReading ? "Reading Now" : "Currently Reading"}
      </button>

      {/* Want to Read Button */}
      <button
        onClick={handleWantToReadToggle}
        className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          ${
            isWanted
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : `${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} 
               ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}`
          }
        `}
      >
        <FaHeart className="inline mr-2" />
        {isWanted ? "Wanted ✓" : "Want to Read"}
      </button>

      {/* Like Button */}
      <button
        onClick={handleLikeToggle}
        className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          ${
            liked
              ? "bg-rose-500 text-white hover:bg-rose-600"
              : `${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} 
               ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}`
          }
        `}
      >
        <FaThumbsUp className="inline mr-2" />
        {liked ? "Liked" : "Like"}
      </button>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          ${
            wishlisted
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : `${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} 
               ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}`
          }
        `}
      >
        <FaHeart className="inline mr-2" />
        {wishlisted ? "Wishlisted" : "Wishlist"}
      </button>

      {/* Add to Library Button */}
      <button
        onClick={handleLibraryToggle}
        className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          ${
            inLibrary
              ? "bg-purple-500 text-white hover:bg-purple-600"
              : `${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} 
               ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}`
          }
        `}
      >
        <FaBookmark className="inline mr-2" />
        {inLibrary ? "In Library" : "Add to Library"}
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          ${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"}
          ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}
        `}
      >
        <FaShare className="inline mr-2" />
        {t("book.share") || "Share"}
      </button>
    </div>
  );
};

export default BookActions;
