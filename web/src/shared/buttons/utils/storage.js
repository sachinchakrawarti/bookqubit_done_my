// src/shared/buttons/utils/storage.js

"use client";

/**
 * Storage utility for managing user interactions in localStorage
 * Provides simple get, set, clear operations with error handling
 */

const STORAGE_KEY = 'userInteractions';

export const storage = {
  /**
   * Get interactions data from localStorage
   * @returns {Object|null} - Parsed data or null if not found
   */
  get: () => {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  /**
   * Save interactions data to localStorage
   * @param {Object} data - Data to save
   */
  set: (data) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  /**
   * Remove interactions data from localStorage
   */
  clear: () => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },

  /**
   * Check if data exists in localStorage
   * @returns {boolean} - True if data exists
   */
  exists: () => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      return false;
    }
  },

  /**
   * Get all stored keys (for debugging)
   * @returns {string[]} - Array of keys
   */
  getAllKeys: () => {
    if (typeof window === 'undefined') return [];
    try {
      return Object.keys(localStorage);
    } catch {
      return [];
    }
  },

  /**
   * Get storage size (for debugging)
   * @returns {number} - Size in bytes
   */
  getSize: () => {
    if (typeof window === 'undefined') return 0;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? new Blob([data]).size : 0;
    } catch {
      return 0;
    }
  },
};

export default storage;