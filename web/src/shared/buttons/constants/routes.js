// src/shared/buttons/constants/routes.js

/**
 * Route definitions for all domains
 * Centralized routing for all button components
 */

// ============================================
// ROUTE TEMPLATES
// ============================================

export const ROUTES = {
  // Books
  BOOK_DETAIL: '/books/:slug',
  BOOK_READ: '/read/book/:slug',
  BOOK_SUMMARY: '/books/:slug/summary',
  BOOK_COLLECTORS_GUIDE: '/books/:slug/collectors-guide',
  BOOK_REVIEWS: '/books/:slug/reviews',
  BOOK_RATING: '/books/:slug/rate',

  // Comics
  COMIC_DETAIL: '/comics/:slug',
  COMIC_READ: '/read/comic/:slug',
  COMIC_SUMMARY: '/comics/:slug/summary',
  COMIC_COLLECTORS_GUIDE: '/comics/:slug/collectors-guide',
  COMIC_ISSUES: '/comics/:slug/issues',
  COMIC_ARTISTS: '/comics/:slug/artists',

  // Academic
  ACADEMIC_DETAIL: '/academic/:slug',
  ACADEMIC_READ: '/read/academic/:slug',
  ACADEMIC_SUMMARY: '/academic/:slug/summary',
  ACADEMIC_CITE: '/academic/:slug/cite',
  ACADEMIC_PDF: '/academic/:slug/pdf',
  ACADEMIC_REFERENCES: '/academic/:slug/references',

  // Drift (Social Media)
  DRIFT_DETAIL: '/drift/:slug',
  DRIFT_COMMENTS: '/drift/:slug/comments',
  DRIFT_SHARE: '/drift/:slug/share',
  DRIFT_REPORT: '/drift/:slug/report',
  DRIFT_SAVE: '/drift/:slug/save',

  // User
  USER_PROFILE: '/user/profile',
  USER_DASHBOARD: '/user/dashboard',
  USER_SETTINGS: '/user/settings',
  USER_BOOKMARKS: '/user/bookmarks',
  USER_READING_LIST: '/user/reading-list',
  USER_WISHLIST: '/user/wishlist',

  // Common
  HOME: '/',
  SEARCH: '/search',
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
  PRIVACY: '/privacy',
  TERMS: '/terms',
};

// ============================================
// ROUTE TYPES
// ============================================

export const ROUTE_TYPES = {
  BOOK: 'book',
  COMIC: 'comic',
  ACADEMIC: 'academic',
  DRIFT: 'drift',
  USER: 'user',
  COMMON: 'common',
};

// ============================================
// DOMAIN ROUTE MAPS
// ============================================

export const BOOK_ROUTES = {
  detail: ROUTES.BOOK_DETAIL,
  read: ROUTES.BOOK_READ,
  summary: ROUTES.BOOK_SUMMARY,
  collectorsGuide: ROUTES.BOOK_COLLECTORS_GUIDE,
  reviews: ROUTES.BOOK_REVIEWS,
  rating: ROUTES.BOOK_RATING,
};

export const COMIC_ROUTES = {
  detail: ROUTES.COMIC_DETAIL,
  read: ROUTES.COMIC_READ,
  summary: ROUTES.COMIC_SUMMARY,
  collectorsGuide: ROUTES.COMIC_COLLECTORS_GUIDE,
  issues: ROUTES.COMIC_ISSUES,
  artists: ROUTES.COMIC_ARTISTS,
};

export const ACADEMIC_ROUTES = {
  detail: ROUTES.ACADEMIC_DETAIL,
  read: ROUTES.ACADEMIC_READ,
  summary: ROUTES.ACADEMIC_SUMMARY,
  cite: ROUTES.ACADEMIC_CITE,
  pdf: ROUTES.ACADEMIC_PDF,
  references: ROUTES.ACADEMIC_REFERENCES,
};

export const DRIFT_ROUTES = {
  detail: ROUTES.DRIFT_DETAIL,
  comments: ROUTES.DRIFT_COMMENTS,
  share: ROUTES.DRIFT_SHARE,
  report: ROUTES.DRIFT_REPORT,
  save: ROUTES.DRIFT_SAVE,
};

export const USER_ROUTES = {
  profile: ROUTES.USER_PROFILE,
  dashboard: ROUTES.USER_DASHBOARD,
  settings: ROUTES.USER_SETTINGS,
  bookmarks: ROUTES.USER_BOOKMARKS,
  readingList: ROUTES.USER_READING_LIST,
  wishlist: ROUTES.USER_WISHLIST,
};

// ============================================
// HELPERS
// ============================================

/**
 * Replace route parameters with actual values
 * @param {string} route - Route template with :param placeholders
 * @param {object} params - Object with parameter values
 * @returns {string} - Rendered route
 */
export const renderRoute = (route, params = {}) => {
  let rendered = route;
  Object.keys(params).forEach((key) => {
    rendered = rendered.replace(`:${key}`, params[key]);
  });
  return rendered;
};

/**
 * Get route for a specific domain and action
 * @param {string} domain - 'book' | 'comic' | 'academic' | 'drift' | 'user'
 * @param {string} action - 'detail' | 'read' | 'summary' | etc.
 * @param {object} params - Route parameters (slug, id, etc.)
 * @returns {string} - Complete route
 */
export const getRoute = (domain, action, params = {}) => {
  const domainRoutes = {
    book: BOOK_ROUTES,
    comic: COMIC_ROUTES,
    academic: ACADEMIC_ROUTES,
    drift: DRIFT_ROUTES,
    user: USER_ROUTES,
  };

  const route = domainRoutes[domain]?.[action];
  if (!route) {
    console.warn(`Route not found for domain: ${domain}, action: ${action}`);
    return ROUTES.HOME;
  }

  return renderRoute(route, params);
};

/**
 * Get detail route for any domain
 * @param {string} type - 'book' | 'comic' | 'academic' | 'drift'
 * @param {string} slug - Item slug
 * @returns {string} - Detail route
 */
export const getDetailRoute = (type, slug) => {
  return getRoute(type, 'detail', { slug });
};

/**
 * Get read route for any domain
 * @param {string} type - 'book' | 'comic' | 'academic'
 * @param {string} slug - Item slug
 * @returns {string} - Read route
 */
export const getReadRoute = (type, slug) => {
  return getRoute(type, 'read', { slug });
};

/**
 * Get summary route for any domain
 * @param {string} type - 'book' | 'comic' | 'academic'
 * @param {string} slug - Item slug
 * @returns {string} - Summary route
 */
export const getSummaryRoute = (type, slug) => {
  return getRoute(type, 'summary', { slug });
};

// ============================================
// LANGUAGE-AWARE ROUTES (Optional)
// ============================================

/**
 * Get language-aware route
 * @param {string} route - Route template
 * @param {string} lang - Language code (en, hi, ur, etc.)
 * @param {object} params - Route parameters
 * @returns {string} - Language-aware route
 */
export const getLocalizedRoute = (route, lang = 'en', params = {}) => {
  const baseRoute = renderRoute(route, params);
  return lang === 'en' ? baseRoute : `/${lang}${baseRoute}`;
};

/**
 * Get localized detail route
 * @param {string} type - 'book' | 'comic' | 'academic' | 'drift'
 * @param {string} slug - Item slug
 * @param {string} lang - Language code
 * @returns {string} - Localized route
 */
export const getLocalizedDetailRoute = (type, slug, lang = 'en') => {
  const route = getDetailRoute(type, slug);
  return getLocalizedRoute(route, lang);
};

// ============================================
// ROUTE VALIDATION
// ============================================

/**
 * Check if a route is valid
 * @param {string} route - Route to validate
 * @returns {boolean} - Is valid
 */
export const isValidRoute = (route) => {
  if (!route) return false;
  if (typeof route !== 'string') return false;
  if (route.startsWith('http')) return true;
  if (!route.startsWith('/')) return false;
  return true;
};

/**
 * Get all routes for a domain
 * @param {string} domain - 'book' | 'comic' | 'academic' | 'drift' | 'user'
 * @returns {object} - All routes for the domain
 */
export const getDomainRoutes = (domain) => {
  const domainMap = {
    book: BOOK_ROUTES,
    comic: COMIC_ROUTES,
    academic: ACADEMIC_ROUTES,
    drift: DRIFT_ROUTES,
    user: USER_ROUTES,
  };
  return domainMap[domain] || {};
};

// ============================================
// EXPORT ALL
// ============================================

export default {
  ROUTES,
  ROUTE_TYPES,
  BOOK_ROUTES,
  COMIC_ROUTES,
  ACADEMIC_ROUTES,
  DRIFT_ROUTES,
  USER_ROUTES,
  renderRoute,
  getRoute,
  getDetailRoute,
  getReadRoute,
  getSummaryRoute,
  getLocalizedRoute,
  getLocalizedDetailRoute,
  isValidRoute,
  getDomainRoutes,
};