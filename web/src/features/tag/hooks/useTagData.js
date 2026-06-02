"use client";

import { useState, useEffect, useMemo } from "react";
import { getBooksByLanguage } from "@/data/books";

export function useTagData(language = "en") {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const booksData = getBooksByLanguage(language);
        setBooks(booksData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [language]);

  // Extract all unique tags from books
  const allTags = useMemo(() => {
    const tagsMap = new Map();

    books.forEach((book) => {
      if (book.tags && Array.isArray(book.tags)) {
        book.tags.forEach((tag) => {
          if (tagsMap.has(tag)) {
            tagsMap.set(tag, {
              name: tag,
              count: tagsMap.get(tag).count + 1,
              books: [...tagsMap.get(tag).books, book],
            });
          } else {
            tagsMap.set(tag, {
              name: tag,
              count: 1,
              books: [book],
            });
          }
        });
      }
    });

    // Sort tags by count (most popular first)
    return Array.from(tagsMap.values()).sort((a, b) => b.count - a.count);
  }, [books]);

  // Get books by specific tag
  const getBooksByTag = (tagName) => {
    const tag = allTags.find((t) => t.name === tagName);
    return tag ? tag.books : [];
  };

  // Get tag statistics
  const getTagStats = () => {
    const totalTags = allTags.length;
    const totalTaggedBooks = books.filter((book) => book.tags && book.tags.length > 0).length;
    const avgTagsPerBook = totalTaggedBooks > 0 
      ? (books.reduce((sum, book) => sum + (book.tags?.length || 0), 0) / totalTaggedBooks).toFixed(1)
      : 0;

    return {
      totalTags,
      totalTaggedBooks,
      avgTagsPerBook,
      mostPopularTag: allTags[0]?.name || null,
      mostPopularTagCount: allTags[0]?.count || 0,
    };
  };

  // Search tags
  const searchTags = (query) => {
    if (!query) return allTags;
    const lowerQuery = query.toLowerCase();
    return allTags.filter((tag) => 
      tag.name.toLowerCase().includes(lowerQuery)
    );
  };

  // Get related tags (tags that appear together frequently)
  const getRelatedTags = (tagName, limit = 5) => {
    const tagBooks = getBooksByTag(tagName);
    const relatedTagsMap = new Map();

    tagBooks.forEach((book) => {
      if (book.tags && Array.isArray(book.tags)) {
        book.tags.forEach((tag) => {
          if (tag !== tagName) {
            relatedTagsMap.set(tag, (relatedTagsMap.get(tag) || 0) + 1);
          }
        });
      }
    });

    return Array.from(relatedTagsMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  };

  return {
    books,
    allTags,
    loading,
    error,
    getBooksByTag,
    getTagStats,
    searchTags,
    getRelatedTags,
  };
}