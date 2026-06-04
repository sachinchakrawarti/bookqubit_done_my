"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaBookOpen,
  FaStar,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
  FaInfoCircle,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { getBooksByLanguage } from "@/data/books";
import { useFont } from "@/contexts/FontContext";

const HeroSectionSlider_mobile = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const router = useRouter();
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [books, setBooks] = useState([]);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const scrollInterval = useRef(null);

  const minSwipeDistance = 50;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  useEffect(() => {
    const booksData = getBooksByLanguage(language);
    setBooks(booksData);
  }, [language]);

  const filteredBooks = books.filter((book) => {
    const wordCount = book.title?.trim().split(/\s+/).length || 0;
    return wordCount <= 5;
  });

  useEffect(() => {
    setCurrentBookIndex(0);
  }, [filteredBooks.length]);

  useEffect(() => {
    if (filteredBooks.length === 0) return;

    scrollInterval.current = setInterval(() => {
      setCurrentBookIndex(
        (prevIndex) => (prevIndex + 1) % filteredBooks.length,
      );
      setIsInWishlist(false);
    }, 5000);

    return () => clearInterval(scrollInterval.current);
  }, [filteredBooks.length]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      navigateBook("next");
    } else if (isRightSwipe) {
      navigateBook("prev");
    }
    
    setTouchStart(null);
    setTouchEnd(null);
    
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
    scrollInterval.current = setInterval(() => {
      setCurrentBookIndex(
        (prevIndex) => (prevIndex + 1) % filteredBooks.length,
      );
      setIsInWishlist(false);
    }, 5000);
  };

  if (filteredBooks.length === 0) {
    return (
      <section
        className={`${theme.background?.section || ""} py-4 px-3`}
        style={{ fontFamily: currentFont?.family }}
      >
        <div className="text-center py-6">
          <h2 className={`text-sm font-bold ${theme.textColors?.primary || ""}`}>
            {t("hero.no_books_available") || "No books available"}
          </h2>
        </div>
      </section>
    );
  }

  const currentBook = filteredBooks[currentBookIndex];

  const handleManualSelect = (index) => {
    setCurrentBookIndex(index);
    setIsInWishlist(false);

    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
    scrollInterval.current = setInterval(() => {
      setCurrentBookIndex(
        (prevIndex) => (prevIndex + 1) % filteredBooks.length,
      );
      setIsInWishlist(false);
    }, 5000);
  };

  const navigateBook = (direction) => {
    const newIndex =
      direction === "prev"
        ? (currentBookIndex - 1 + filteredBooks.length) % filteredBooks.length
        : (currentBookIndex + 1) % filteredBooks.length;
    handleManualSelect(newIndex);
  };

  const handleGetBook = () => {
    if (currentBook?.buttons?.getBook) {
      window.open(currentBook.buttons.getBook, "_blank");
    }
  };

  const handleKnowMore = () => {
    if (currentBook?.slug) {
      router.push(`/books/${currentBook.slug}`);
    } else if (currentBook?.id) {
      router.push(`/books/${currentBook.id}`);
    }
  };

  const handleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`${i < Math.floor(rating || 0) ? theme.iconColors?.starFilled || "text-amber-400" : theme.iconColors?.starEmpty || "text-gray-300"} ${i > 0 ? "ml-0.5" : ""}`}
        size={10}
      />
    ));
  };

  return (
    <section
      className={`${theme.background?.section || ""} py-2 px-2`}
      style={{ fontFamily: currentFont?.family }}
    >
      <div className="w-full max-w-md mx-auto">
        {/* Compact Book Card */}
        <div
          className={`relative ${theme.background?.bookCoverSide || "bg-white dark:bg-gray-800"} ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} ${theme.shadow?.container || "shadow-md"} overflow-hidden rounded-lg`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Small Navigation Arrows */}
          {filteredBooks.length > 1 && (
            <>
              <button
                onClick={() => navigateBook("prev")}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-1 rounded-full shadow-sm active:scale-95"
                aria-label={t("hero.previous_book") || "Previous"}
              >
                <FaChevronLeft
                  className={`w-3 h-3 ${theme.iconColors?.navigationArrow || "text-sky-600 dark:text-sky-400"}`}
                />
              </button>

              <button
                onClick={() => navigateBook("next")}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-1 rounded-full shadow-sm active:scale-95"
                aria-label={t("hero.next_book") || "Next"}
              >
                <FaChevronRight
                  className={`w-3 h-3 ${theme.iconColors?.navigationArrow || "text-sky-600 dark:text-sky-400"}`}
                />
              </button>
            </>
          )}

          <div className="flex flex-row">
            {/* Mini Book Cover - Left side */}
            <div className="w-1/3 p-2 flex items-center justify-center">
              <div
                className={`relative w-full aspect-[2/3] ${theme.shadow?.book || "shadow-md"} rounded-md overflow-hidden`}
              >
                <img
                  src={currentBook.imageUrl}
                  alt={currentBook.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

            {/* Compact Details - Right side */}
            <div className="w-2/3 p-2 flex flex-col justify-between">
              <div>
                {/* Tiny Category Badge */}
                <span
                  className={`inline-block ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"} ${theme.textColors?.badge || "text-sky-700 dark:text-sky-400"} px-1.5 py-0.5 rounded text-[10px] font-medium mb-1`}
                >
                  {currentBook.category}
                </span>

                {/* Small Title */}
                <h1
                  className={`text-sm font-bold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-0.5 leading-tight line-clamp-2`}
                >
                  {currentBook.title}
                </h1>
                
                {/* Small Author */}
                <p
                  className={`text-[10px] ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} mb-1.5 font-medium`}
                >
                  {currentBook.author}
                </p>

                {/* Rating and basic info */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex items-center">
                    <div className="flex">{renderStars(currentBook.rating)}</div>
                    <span className={`text-[9px] ${theme.textColors?.secondary || "text-gray-500"} ml-0.5`}>
                      ({currentBook.rating?.toFixed(1) || "0"})
                    </span>
                  </div>
                  
                  <div className="flex gap-1.5 text-[9px]">
                    <span className={`${theme.textColors?.secondary || "text-gray-500"}`}>
                      {currentBook.pageCount} {t("book.pages") || "pgs"}
                    </span>
                    <span className={`${theme.textColors?.secondary || "text-gray-500"}`}>
                      •
                    </span>
                    <span className={`${theme.textColors?.secondary || "text-gray-500"}`}>
                      {currentBook.published}
                    </span>
                  </div>
                </div>

                {/* Single Key Feature (if exists) */}
                {currentBook.keyPoints && currentBook.keyPoints.length > 0 && (
                  <p className={`text-[9px] ${theme.textColors?.secondary || "text-gray-500"} mb-1.5 line-clamp-1`}>
                    {currentBook.keyPoints[0]}
                  </p>
                )}
              </div>

              {/* Two Action Buttons - Side by side */}
              <div className="flex gap-2 mt-1">
                <button
                  onClick={handleKnowMore}
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded text-[10px] font-medium transition-all active:scale-95 border-2 ${theme.buttonColors?.secondaryButton?.background || "border-sky-500"} ${theme.buttonColors?.secondaryButton?.hoverBackground || "hover:bg-sky-50 dark:hover:bg-sky-900/20"} ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}`}
                >
                  <FaInfoCircle size={8} />
                  {t("book.know_more") || "Know More"}
                </button>

                <button
                  onClick={handleGetBook}
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded text-[10px] font-medium transition-all active:scale-95 ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} ${theme.buttonColors?.primaryButton?.hoverBackground || "hover:from-sky-700 hover:to-sky-600"} ${theme.buttonColors?.primaryButton?.textColor || "text-white"}`}
                >
                  <FaShoppingCart size={8} />
                  {t("book.get_book") || "Get Book"}
                </button>
              </div>

              {/* Optional Wishlist button - small icon version (comment out if not needed) */}
              <button
                onClick={handleWishlist}
                className={`absolute top-2 right-2 p-1 rounded-full transition-all active:scale-95 ${isInWishlist ? "text-rose-500" : "text-gray-400"}`}
                aria-label={t("book.wishlist") || "Add to wishlist"}
              >
                <FaHeart size={10} className={isInWishlist ? "fill-rose-500" : ""} />
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Navigation Dots */}
        {filteredBooks.length > 1 && (
          <div className="flex justify-center mt-1.5">
            <div className="flex space-x-1">
              {filteredBooks.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleManualSelect(index)}
                  className={`transition-all rounded-full ${
                    index === currentBookIndex
                      ? `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} w-3 h-1`
                      : `${theme.background?.navigationDots || "bg-gray-300 dark:bg-gray-600"} w-1 h-1`
                  }`}
                  style={{
                    width: index === currentBookIndex ? "0.75rem" : "0.25rem",
                    height: "0.25rem",
                  }}
                  aria-label={`Go to book ${index + 1}`}
                />
              ))}
              {filteredBooks.length > 5 && (
                <span className={`text-[8px] ${theme.textColors?.secondary || "text-gray-400"} ml-0.5`}>
                  +{filteredBooks.length - 5}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSectionSlider_mobile;