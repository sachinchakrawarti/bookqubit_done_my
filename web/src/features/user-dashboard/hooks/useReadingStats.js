"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

export function useReadingStats(readingHistory = [], userId = null) {
  const [stats, setStats] = useState({
    daily: [],
    weekly: [],
    monthly: [],
    yearly: [],
    totals: {
      booksRead: 0,
      pagesRead: 0,
      readingTime: 0,
      averageRating: 0,
      averagePagesPerDay: 0,
    },
    streaks: {
      current: 0,
      longest: 0,
      lastRead: null,
    },
    genres: [],
    authors: [],
  });

  // Calculate reading statistics from history
  const calculateStats = useCallback((history) => {
    if (!history || history.length === 0) {
      return stats;
    }

    // Group by date
    const dailyReads = {};
    const weeklyReads = {};
    const monthlyReads = {};
    const yearlyReads = {};

    let totalPages = 0;
    let totalRating = 0;
    let totalBooks = history.length;

    // Genre distribution
    const genreCount = {};
    const authorCount = {};

    history.forEach((item) => {
      const date = new Date(item.completedAt || item.readAt);
      const dayKey = date.toISOString().split('T')[0];
      const weekKey = `${date.getFullYear()}-W${getWeekNumber(date)}`;
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const yearKey = date.getFullYear().toString();

      // Daily
      dailyReads[dayKey] = (dailyReads[dayKey] || 0) + (item.pages || 0);
      
      // Weekly
      weeklyReads[weekKey] = (weeklyReads[weekKey] || 0) + (item.pages || 0);
      
      // Monthly
      monthlyReads[monthKey] = (monthlyReads[monthKey] || 0) + (item.pages || 0);
      
      // Yearly
      yearlyReads[yearKey] = (yearlyReads[yearKey] || 0) + (item.pages || 0);

      // Totals
      totalPages += item.pages || 0;
      totalRating += item.rating || 0;

      // Genres
      if (item.genre) {
        genreCount[item.genre] = (genreCount[item.genre] || 0) + 1;
      }

      // Authors
      if (item.author) {
        authorCount[item.author] = (authorCount[item.author] || 0) + 1;
      }
    });

    // Calculate streaks
    const streaks = calculateReadingStreaks(history);
    
    // Get top genres
    const topGenres = Object.entries(genreCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Get top authors
    const topAuthors = Object.entries(authorCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      daily: Object.entries(dailyReads).map(([date, pages]) => ({ date, pages })),
      weekly: Object.entries(weeklyReads).map(([week, pages]) => ({ week, pages })),
      monthly: Object.entries(monthlyReads).map(([month, pages]) => ({ month, pages })),
      yearly: Object.entries(yearlyReads).map(([year, pages]) => ({ year, pages })),
      totals: {
        booksRead: totalBooks,
        pagesRead: totalPages,
        readingTime: Math.round(totalPages / 2), // Assume 2 minutes per page
        averageRating: totalBooks > 0 ? (totalRating / totalBooks).toFixed(1) : 0,
        averagePagesPerDay: calculateAveragePagesPerDay(totalPages, history),
      },
      streaks,
      genres: topGenres,
      authors: topAuthors,
    };
  }, []);

  // Helper function to get week number
  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  // Calculate reading streaks
  const calculateReadingStreaks = (history) => {
    if (!history || history.length === 0) {
      return { current: 0, longest: 0, lastRead: null };
    }

    const readDates = history
      .map(item => new Date(item.completedAt || item.readAt).toISOString().split('T')[0])
      .sort();

    let currentStreak = 0;
    let longestStreak = 0;
    let streakCount = 1;
    const lastRead = readDates[readDates.length - 1];

    for (let i = 1; i < readDates.length; i++) {
      const prevDate = new Date(readDates[i - 1]);
      const currDate = new Date(readDates[i]);
      const diffDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        streakCount++;
      } else if (diffDays > 1) {
        longestStreak = Math.max(longestStreak, streakCount);
        streakCount = 1;
      }
    }
    longestStreak = Math.max(longestStreak, streakCount);

    // Calculate current streak
    const today = new Date().toISOString().split('T')[0];
    let streak = 0;
    for (let i = readDates.length - 1; i >= 0; i--) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - streak);
      if (readDates[i] === expectedDate.toISOString().split('T')[0]) {
        streak++;
      } else {
        break;
      }
    }
    currentStreak = streak;

    return { current: currentStreak, longest: longestStreak, lastRead };
  };

  // Calculate average pages per day
  const calculateAveragePagesPerDay = (totalPages, history) => {
    if (!history || history.length === 0) return 0;
    
    const firstRead = new Date(history[0].completedAt || history[0].readAt);
    const lastRead = new Date(history[history.length - 1].completedAt || history[history.length - 1].readAt);
    const daysDiff = Math.ceil((lastRead - firstRead) / (1000 * 60 * 60 * 24));
    
    return daysDiff > 0 ? Math.round(totalPages / daysDiff) : totalPages;
  };

  // Predict next book completion
  const predictCompletion = useCallback((currentBook) => {
    if (!currentBook || !stats.totals.averagePagesPerDay) return null;
    
    const remainingPages = currentBook.totalPages - (currentBook.progress || 0);
    const daysNeeded = Math.ceil(remainingPages / stats.totals.averagePagesPerDay);
    
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + daysNeeded);
    
    return {
      daysNeeded,
      completionDate,
      remainingPages,
      averagePagesPerDay: stats.totals.averagePagesPerDay,
    };
  }, [stats.totals.averagePagesPerDay]);

  // Get reading goal progress
  const getGoalProgress = useCallback((goal = 50) => {
    const current = stats.totals.booksRead;
    const percentage = (current / goal) * 100;
    
    return {
      current,
      goal,
      percentage: Math.min(percentage, 100),
      remaining: Math.max(0, goal - current),
      isComplete: current >= goal,
    };
  }, [stats.totals.booksRead]);

  // Get monthly trend
  const getMonthlyTrend = useCallback(() => {
    const last6Months = stats.monthly.slice(-6);
    const trend = [];
    
    for (let i = 1; i < last6Months.length; i++) {
      const change = last6Months[i].pages - last6Months[i - 1].pages;
      const percentageChange = last6Months[i - 1].pages > 0 
        ? (change / last6Months[i - 1].pages) * 100 
        : 0;
      
      trend.push({
        month: last6Months[i].month,
        change,
        percentageChange,
        isIncrease: change > 0,
      });
    }
    
    return trend;
  }, [stats.monthly]);

  // Update stats when history changes
  useEffect(() => {
    if (readingHistory && readingHistory.length > 0) {
      const newStats = calculateStats(readingHistory);
      setStats(newStats);
    }
  }, [readingHistory, calculateStats]);

  return {
    stats,
    calculateStats,
    predictCompletion,
    getGoalProgress,
    getMonthlyTrend,
    isLoading: !stats.totals.booksRead && readingHistory?.length > 0,
  };
}

// Optional: Export individual statistic calculators
export const calculateReadingSpeed = (pagesRead, timeSpent) => {
  if (!timeSpent || timeSpent === 0) return 0;
  return Math.round(pagesRead / (timeSpent / 60)); // pages per hour
};

export const calculateCompletionRate = (startedBooks, completedBooks) => {
  if (startedBooks === 0) return 0;
  return (completedBooks / startedBooks) * 100;
};

export const getFavoriteReadingTime = (readingSessions) => {
  const hourCount = {};
  
  readingSessions.forEach(session => {
    const hour = new Date(session.timestamp).getHours();
    hourCount[hour] = (hourCount[hour] || 0) + 1;
  });
  
  const favoriteHour = Object.entries(hourCount).sort((a, b) => b[1] - a[1])[0];
  return favoriteHour ? parseInt(favoriteHour[0]) : null;
};