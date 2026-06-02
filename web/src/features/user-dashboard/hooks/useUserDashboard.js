"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock API functions - Replace with actual API calls
const fetchUserProfile = async (userId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId || "user123",
        name: "John Doe",
        email: "john@example.com",
        avatar: "👤",
        joinDate: "2024-01-15",
        location: "New York, USA",
        bio: "Avid reader and book enthusiast. Love science fiction and fantasy novels.",
        favoriteGenres: ["Science Fiction", "Fantasy", "Mystery"],
        socialLinks: {
          twitter: "@johndoe",
          instagram: "@johndoe_reads",
          goodreads: "johndoe",
        },
      });
    }, 500);
  });
};

const fetchUserBooks = async (userId, status) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const books = {
        currently_reading: [
          { id: 1, title: "Dune", author: "Frank Herbert", progress: 65, startedAt: "2024-05-01" },
          { id: 2, title: "The Midnight Library", author: "Matt Haig", progress: 30, startedAt: "2024-05-15" },
          { id: 3, title: "Project Hail Mary", author: "Andy Weir", progress: 45, startedAt: "2024-05-20" },
        ],
        marked_read: [
          { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: 4.5, completedAt: "2024-05-10" },
          { id: 5, title: "1984", author: "George Orwell", rating: 5.0, completedAt: "2024-05-05" },
          { id: 6, title: "To Kill a Mockingbird", author: "Harper Lee", rating: 4.8, completedAt: "2024-04-28" },
        ],
        want_to_read: [
          { id: 7, title: "The Name of the Wind", author: "Patrick Rothfuss", addedAt: "2024-05-20" },
          { id: 8, title: "The Martian", author: "Andy Weir", addedAt: "2024-05-18" },
        ],
        liked_books: [
          { id: 9, title: "Pride and Prejudice", author: "Jane Austen", likedAt: "2024-05-15" },
          { id: 10, title: "The Hobbit", author: "J.R.R. Tolkien", likedAt: "2024-05-12" },
        ],
        bookmarks: [
          { id: 11, title: "The Psychology of Money", author: "Morgan Housel", bookmarkedAt: "2024-05-14", page: 45 },
          { id: 12, title: "Atomic Habits", author: "James Clear", bookmarkedAt: "2024-05-10", page: 78 },
        ],
      };
      resolve(books[status] || []);
    }, 500);
  });
};

const fetchUserActivities = async (userId, limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, type: "read", action: "Finished reading 'The Great Gatsby'", timestamp: "2024-05-10T14:30:00Z", book: "The Great Gatsby" },
        { id: 2, type: "review", action: "Added a review for '1984'", timestamp: "2024-05-05T10:15:00Z", book: "1984", rating: 5 },
        { id: 3, type: "want_to_read", action: "Added 'The Name of the Wind' to Want to Read", timestamp: "2024-05-20T09:00:00Z", book: "The Name of the Wind" },
        { id: 4, type: "like", action: "Liked 'Pride and Prejudice'", timestamp: "2024-05-15T16:45:00Z", book: "Pride and Prejudice" },
        { id: 5, type: "comment", action: "Commented on 'Dune'", timestamp: "2024-05-18T11:20:00Z", book: "Dune" },
      ]);
    }, 500);
  });
};

const fetchUserStats = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalBooksRead: 24,
        totalPagesRead: 3847,
        totalReadingTime: 142, // hours
        totalReviews: 15,
        totalComments: 8,
        totalLikes: 45,
        followers: 128,
        following: 94,
        readingStreak: 7, // days
        favoriteAuthor: "Frank Herbert",
        favoriteGenre: "Science Fiction",
        averageRating: 4.6,
        thisYearBooks: 18,
        lastYearBooks: 24,
      });
    }, 500);
  });
};

const fetchFollowers = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Jane Smith", avatar: "👩", bio: "Book lover", followedSince: "2024-01-15" },
        { id: 2, name: "Mike Johnson", avatar: "👨", bio: "Fantasy reader", followedSince: "2024-02-20" },
        { id: 3, name: "Sarah Wilson", avatar: "👩", bio: "Mystery fan", followedSince: "2024-03-10" },
      ]);
    }, 500);
  });
};

const fetchFollowing = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 4, name: "Robert Brown", avatar: "👨", bio: "Sci-fi enthusiast", followedSince: "2024-01-20" },
        { id: 5, name: "Emily Davis", avatar: "👩", bio: "Romance reader", followedSince: "2024-02-15" },
        { id: 6, name: "David Lee", avatar: "👨", bio: "Non-fiction", followedSince: "2024-03-05" },
      ]);
    }, 500);
  });
};

const fetchComments = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, bookTitle: "Dune", comment: "Amazing world-building!", createdAt: "2024-05-18", likes: 12 },
        { id: 2, bookTitle: "1984", comment: "Thought-provoking and relevant", createdAt: "2024-05-05", likes: 8 },
        { id: 3, bookTitle: "The Great Gatsby", comment: "Beautiful prose", createdAt: "2024-05-10", likes: 5 },
      ]);
    }, 500);
  });
};

const fetchReviews = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, bookTitle: "1984", rating: 5, review: "A masterpiece that remains relevant today.", createdAt: "2024-05-05", helpful: 24 },
        { id: 2, bookTitle: "The Great Gatsby", rating: 4.5, review: "Beautifully written but tragic.", createdAt: "2024-05-10", helpful: 15 },
        { id: 3, bookTitle: "To Kill a Mockingbird", rating: 5, review: "Essential reading for everyone.", createdAt: "2024-04-28", helpful: 32 },
      ]);
    }, 500);
  });
};

export function useUserDashboard(userId = null) {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [markedRead, setMarkedRead] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Load all dashboard data
  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [profile, stats, reading, read, want, liked, marks, activities, followersList, followingList, commentsList, reviewsList] = await Promise.all([
        fetchUserProfile(userId),
        fetchUserStats(userId),
        fetchUserBooks(userId, "currently_reading"),
        fetchUserBooks(userId, "marked_read"),
        fetchUserBooks(userId, "want_to_read"),
        fetchUserBooks(userId, "liked_books"),
        fetchUserBooks(userId, "bookmarks"),
        fetchUserActivities(userId),
        fetchFollowers(userId),
        fetchFollowing(userId),
        fetchComments(userId),
        fetchReviews(userId),
      ]);
      
      setUserProfile(profile);
      setUserStats(stats);
      setCurrentlyReading(reading);
      setMarkedRead(read);
      setWantToRead(want);
      setLikedBooks(liked);
      setBookmarks(marks);
      setRecentActivities(activities);
      setFollowers(followersList);
      setFollowing(followingList);
      setComments(commentsList);
      setReviews(reviewsList);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Update book progress
  const updateBookProgress = useCallback(async (bookId, progress) => {
    try {
      // API call to update progress
      // await api.updateProgress(bookId, progress);
      
      // Update local state
      setCurrentlyReading(prev =>
        prev.map(book =>
          book.id === bookId ? { ...book, progress } : book
        )
      );
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, []);

  // Add book to library
  const addBookToLibrary = useCallback(async (bookId, status) => {
    try {
      // API call to add book
      // await api.addBookToLibrary(bookId, status);
      
      // Refresh the specific list
      const updatedList = await fetchUserBooks(userId, status);
      switch (status) {
        case "currently_reading":
          setCurrentlyReading(updatedList);
          break;
        case "marked_read":
          setMarkedRead(updatedList);
          break;
        case "want_to_read":
          setWantToRead(updatedList);
          break;
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [userId]);

  // Remove book from library
  const removeBookFromLibrary = useCallback(async (bookId, status) => {
    try {
      // API call to remove book
      // await api.removeBookFromLibrary(bookId);
      
      // Update local state
      switch (status) {
        case "currently_reading":
          setCurrentlyReading(prev => prev.filter(book => book.id !== bookId));
          break;
        case "marked_read":
          setMarkedRead(prev => prev.filter(book => book.id !== bookId));
          break;
        case "want_to_read":
          setWantToRead(prev => prev.filter(book => book.id !== bookId));
          break;
        case "liked_books":
          setLikedBooks(prev => prev.filter(book => book.id !== bookId));
          break;
        case "bookmarks":
          setBookmarks(prev => prev.filter(book => book.id !== bookId));
          break;
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, []);

  // Add review
  const addReview = useCallback(async (bookId, rating, review) => {
    try {
      // API call to add review
      // await api.addReview(bookId, rating, review);
      
      // Refresh reviews
      const updatedReviews = await fetchReviews(userId);
      setReviews(updatedReviews);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [userId]);

  // Add comment
  const addComment = useCallback(async (bookId, comment) => {
    try {
      // API call to add comment
      // await api.addComment(bookId, comment);
      
      // Refresh comments
      const updatedComments = await fetchComments(userId);
      setComments(updatedComments);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [userId]);

  // Follow user
  const followUser = useCallback(async (userIdToFollow) => {
    try {
      // API call to follow user
      // await api.followUser(userIdToFollow);
      
      // Refresh following list
      const updatedFollowing = await fetchFollowing(userId);
      setFollowing(updatedFollowing);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [userId]);

  // Unfollow user
  const unfollowUser = useCallback(async (userIdToUnfollow) => {
    try {
      // API call to unfollow user
      // await api.unfollowUser(userIdToUnfollow);
      
      // Refresh following list
      const updatedFollowing = await fetchFollowing(userId);
      setFollowing(updatedFollowing);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [userId]);

  // Load data on mount
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return {
    loading,
    error,
    userProfile,
    userStats,
    currentlyReading,
    markedRead,
    wantToRead,
    likedBooks,
    bookmarks,
    recentActivities,
    followers,
    following,
    comments,
    reviews,
    updateBookProgress,
    addBookToLibrary,
    removeBookFromLibrary,
    addReview,
    addComment,
    followUser,
    unfollowUser,
    refreshData: loadDashboardData,
  };
}