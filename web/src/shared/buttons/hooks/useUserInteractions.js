// src/shared/buttons/hooks/useUserInteractions.js

"use client";

import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

/**
 * Default state for user interactions
 * All interactions are stored as arrays of IDs
 */
const defaultState = {
  // ===== Reading Status =====
  markedRead: [], // Book/Comic IDs marked as read
  currentlyReading: [], // IDs currently reading
  wantToRead: [], // IDs want to read

  // ===== Interactions =====
  likes: [], // IDs liked
  shares: [], // IDs shared
  wishlist: [], // IDs in wishlist
  saved: [], // IDs saved
  bookmarks: [], // IDs bookmarked
  reported: [], // IDs reported
  followed: [], // User IDs followed
  joined: [], // Community IDs joined
  comments: [], // Comment IDs made
  reviews: [], // Review IDs made
  library: [], // IDs in library

  // ===== Counts =====
  likeCounts: {}, // { id: count }
  shareCounts: {}, // { id: count }
  commentCounts: {}, // { id: count }
};

/**
 * Hook to manage all user interactions with localStorage persistence
 * @returns {Object} - All interaction functions and state
 */
export const useUserInteractions = () => {
  const [interactions, setInteractions] = useState(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  // ============================================
  // LOAD FROM STORAGE
  // ============================================

  useEffect(() => {
    const saved = storage.get();
    if (saved) {
      // Merge with default to handle missing keys
      setInteractions({ ...defaultState, ...saved });
      console.log('📦 Loaded from storage:', saved);
    } else {
      console.log('📦 No saved data found, using default state');
    }
    setIsLoaded(true);
  }, []);

  // ============================================
  // SAVE TO STORAGE
  // ============================================

  useEffect(() => {
    if (isLoaded) {
      storage.set(interactions);
      console.log('💾 Saved to storage:', interactions);
    }
  }, [interactions, isLoaded]);

  // ============================================
  // HELPER: UPDATE SINGLE ARRAY
  // ============================================

  const updateArray = useCallback((key, itemId) => {
    setInteractions((prev) => {
      const current = prev[key] || [];
      const isPresent = current.includes(itemId);
      const newArray = isPresent
        ? current.filter((id) => id !== itemId)
        : [...current, itemId];

      console.log(`🔄 ${key}: ${isPresent ? 'Removed' : 'Added'} ${itemId}`);
      console.log(`📊 New ${key}:`, newArray);

      return { ...prev, [key]: newArray };
    });
  }, []);

  // ============================================
  // HELPER: UPDATE WITH COUNT
  // ============================================

  const updateWithCount = useCallback((arrayKey, countKey, itemId, increment = true) => {
    setInteractions((prev) => {
      const current = prev[arrayKey] || [];
      const isPresent = current.includes(itemId);
      const newArray = isPresent
        ? current.filter((id) => id !== itemId)
        : [...current, itemId];

      const newCounts = { ...(prev[countKey] || {}) };
      newCounts[itemId] = (newCounts[itemId] || 0) + (isPresent ? -1 : 1);

      // Remove count if zero
      if (newCounts[itemId] <= 0) {
        delete newCounts[itemId];
      }

      console.log(`🔄 ${arrayKey}: ${isPresent ? 'Removed' : 'Added'} ${itemId}`);
      console.log(`📊 New ${arrayKey}:`, newArray);

      return {
        ...prev,
        [arrayKey]: newArray,
        [countKey]: newCounts,
      };
    });
  }, []);

  // ============================================
  // READING STATUS FUNCTIONS
  // ============================================

  const markAsRead = useCallback((itemId) => {
    console.log(`📖 Marking as read: ${itemId}`);
    updateArray('markedRead', itemId);
  }, [updateArray]);

  const addToCurrentlyReading = useCallback((itemId) => {
    console.log(`📖 Adding to currently reading: ${itemId}`);
    updateArray('currentlyReading', itemId);
  }, [updateArray]);

  const addToWantToRead = useCallback((itemId) => {
    console.log(`⭐ Adding to want to read: ${itemId}`);
    updateArray('wantToRead', itemId);
  }, [updateArray]);

  // ============================================
  // LIBRARY FUNCTIONS
  // ============================================

  const toggleLibrary = useCallback((itemId) => {
    console.log(`📚 Toggling library: ${itemId}`);
    updateArray('library', itemId);
  }, [updateArray]);

  // ============================================
  // INTERACTION FUNCTIONS
  // ============================================

  const toggleLike = useCallback((itemId) => {
    console.log(`❤️ Toggling like: ${itemId}`);
    updateWithCount('likes', 'likeCounts', itemId);
  }, [updateWithCount]);

  const toggleWishlist = useCallback((itemId) => {
    console.log(`💖 Toggling wishlist: ${itemId}`);
    updateArray('wishlist', itemId);
  }, [updateArray]);

  const toggleSave = useCallback((itemId) => {
    console.log(`💾 Toggling save: ${itemId}`);
    updateArray('saved', itemId);
  }, [updateArray]);

  const toggleBookmark = useCallback((itemId) => {
    console.log(`🔖 Toggling bookmark: ${itemId}`);
    updateArray('bookmarks', itemId);
  }, [updateArray]);

  const toggleFollow = useCallback((userId) => {
    console.log(`👤 Toggling follow: ${userId}`);
    updateArray('followed', userId);
  }, [updateArray]);

  const toggleJoin = useCallback((communityId) => {
    console.log(`🤝 Toggling join: ${communityId}`);
    updateArray('joined', communityId);
  }, [updateArray]);

  const addShare = useCallback((itemId) => {
    console.log(`↗️ Adding share: ${itemId}`);
    setInteractions((prev) => {
      const shares = prev.shares || [];
      const newShares = shares.includes(itemId) ? shares : [...shares, itemId];

      const newCounts = { ...(prev.shareCounts || {}) };
      newCounts[itemId] = (newCounts[itemId] || 0) + 1;

      return {
        ...prev,
        shares: newShares,
        shareCounts: newCounts,
      };
    });
  }, []);

  const addComment = useCallback((itemId) => {
    console.log(`💬 Adding comment: ${itemId}`);
    setInteractions((prev) => {
      const comments = prev.comments || [];
      const newComments = comments.includes(itemId) ? comments : [...comments, itemId];

      const newCounts = { ...(prev.commentCounts || {}) };
      newCounts[itemId] = (newCounts[itemId] || 0) + 1;

      return {
        ...prev,
        comments: newComments,
        commentCounts: newCounts,
      };
    });
  }, []);

  const addReport = useCallback((itemId) => {
    console.log(`🚫 Adding report: ${itemId}`);
    setInteractions((prev) => ({
      ...prev,
      reported: prev.reported?.includes(itemId) ? prev.reported : [...(prev.reported || []), itemId],
    }));
  }, []);

  const addReview = useCallback((itemId) => {
    console.log(`⭐ Adding review: ${itemId}`);
    setInteractions((prev) => ({
      ...prev,
      reviews: prev.reviews?.includes(itemId) ? prev.reviews : [...(prev.reviews || []), itemId],
    }));
  }, []);

  // ============================================
  // CHECK FUNCTIONS
  // ============================================

  const isMarkedRead = useCallback((itemId) => {
    const result = interactions.markedRead?.includes(itemId) || false;
    // console.log(`🔍 isMarkedRead(${itemId}): ${result}`);
    return result;
  }, [interactions]);

  const isCurrentlyReading = useCallback((itemId) => {
    const result = interactions.currentlyReading?.includes(itemId) || false;
    // console.log(`🔍 isCurrentlyReading(${itemId}): ${result}`);
    return result;
  }, [interactions]);

  const isWantToRead = useCallback((itemId) => {
    const result = interactions.wantToRead?.includes(itemId) || false;
    // console.log(`🔍 isWantToRead(${itemId}): ${result}`);
    return result;
  }, [interactions]);

  const isLiked = useCallback((itemId) => {
    const result = interactions.likes?.includes(itemId) || false;
    // console.log(`🔍 isLiked(${itemId}): ${result}`);
    return result;
  }, [interactions]);

  const isWishlisted = useCallback((itemId) => {
    const result = interactions.wishlist?.includes(itemId) || false;
    // console.log(`🔍 isWishlisted(${itemId}): ${result}`);
    return result;
  }, [interactions]);

  const isSaved = useCallback((itemId) => {
    const result = interactions.saved?.includes(itemId) || false;
    // console.log(`🔍 isSaved(${itemId}): ${result}`);
    return result;
  }, [interactions]);

  const isBookmarked = useCallback((itemId) => {
    const result = interactions.bookmarks?.includes(itemId) || false;
    // console.log(`🔍 isBookmarked(${itemId}): ${result}`);
    return result;
  }, [interactions]);

  const isFollowed = useCallback((userId) => {
    const result = interactions.followed?.includes(userId) || false;
    // console.log(`🔍 isFollowed(${userId}): ${result}`);
    return result;
  }, [interactions]);

  const isJoined = useCallback((communityId) => {
    const result = interactions.joined?.includes(communityId) || false;
    // console.log(`🔍 isJoined(${communityId}): ${result}`);
    return result;
  }, [interactions]);

  const isInLibrary = useCallback((itemId) => {
    const result = interactions.library?.includes(itemId) || false;
    // console.log(`🔍 isInLibrary(${itemId}): ${result}`);
    return result;
  }, [interactions]);

  // ============================================
  // GET COUNTS
  // ============================================

  const getLikeCount = useCallback((itemId) => {
    return interactions.likeCounts?.[itemId] || 0;
  }, [interactions]);

  const getShareCount = useCallback((itemId) => {
    return interactions.shareCounts?.[itemId] || 0;
  }, [interactions]);

  const getCommentCount = useCallback((itemId) => {
    return interactions.commentCounts?.[itemId] || 0;
  }, [interactions]);

  const getCounts = useCallback(() => {
    const counts = {
      markedRead: interactions.markedRead?.length || 0,
      currentlyReading: interactions.currentlyReading?.length || 0,
      wantToRead: interactions.wantToRead?.length || 0,
      likes: interactions.likes?.length || 0,
      shares: interactions.shares?.length || 0,
      wishlist: interactions.wishlist?.length || 0,
      saved: interactions.saved?.length || 0,
      bookmarks: interactions.bookmarks?.length || 0,
      followed: interactions.followed?.length || 0,
      joined: interactions.joined?.length || 0,
      comments: interactions.comments?.length || 0,
      reviews: interactions.reviews?.length || 0,
      library: interactions.library?.length || 0,
    };
    console.log('📊 Counts:', counts);
    return counts;
  }, [interactions]);

  // ============================================
  // GET ITEM INTERACTIONS
  // ============================================

  const getItemInteractions = useCallback((itemId) => ({
    isMarkedRead: isMarkedRead(itemId),
    isCurrentlyReading: isCurrentlyReading(itemId),
    isWantToRead: isWantToRead(itemId),
    isLiked: isLiked(itemId),
    isWishlisted: isWishlisted(itemId),
    isSaved: isSaved(itemId),
    isBookmarked: isBookmarked(itemId),
    isInLibrary: isInLibrary(itemId),
    likeCount: getLikeCount(itemId),
    shareCount: getShareCount(itemId),
    commentCount: getCommentCount(itemId),
  }), [
    isMarkedRead,
    isCurrentlyReading,
    isWantToRead,
    isLiked,
    isWishlisted,
    isSaved,
    isBookmarked,
    isInLibrary,
    getLikeCount,
    getShareCount,
    getCommentCount,
  ]);

  // ============================================
  // CLEAR ALL
  // ============================================

  const clearAll = useCallback(() => {
    console.log('🧹 Clearing all interactions');
    setInteractions(defaultState);
    storage.clear();
  }, []);

  // ============================================
  // EXPORT
  // ============================================

  return {
    // ===== State =====
    interactions,
    isLoaded,

    // ===== Reading Status =====
    markAsRead,
    addToCurrentlyReading,
    addToWantToRead,
    isMarkedRead,
    isCurrentlyReading,
    isWantToRead,

    // ===== Library =====
    toggleLibrary,
    isInLibrary,

    // ===== Interactions =====
    toggleLike,
    toggleWishlist,
    toggleSave,
    toggleBookmark,
    toggleFollow,
    toggleJoin,
    addShare,
    addComment,
    addReport,
    addReview,

    // ===== Checkers =====
    isLiked,
    isWishlisted,
    isSaved,
    isBookmarked,
    isFollowed,
    isJoined,

    // ===== Counts =====
    getLikeCount,
    getShareCount,
    getCommentCount,
    getCounts,

    // ===== Utility =====
    getItemInteractions,
    clearAll,
  };
};

export default useUserInteractions;