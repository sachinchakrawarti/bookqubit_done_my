// src/shared/buttons/index.js

// ============================================
// IMPORTS FIRST
// ============================================

// Hooks
import useUserInteractions from './hooks/useUserInteractions';

// Utils
import storage from './utils/storage';

// Constants - re-export
export * from './constants/routes';

// Domain Buttons - import first
import BookButtons from './domains/books/BookButtons';
import ComicButtons from './domains/comics/ComicButtons';
import AcademicButtons from './domains/academic/AcademicButtons';
import DriftButtons from './domains/drift/DriftButtons';

// ============================================
// EXPORTS
// ============================================

// Hooks
export { useUserInteractions };

// Utils
export { storage };

// Domain Buttons
export { BookButtons, ComicButtons, AcademicButtons, DriftButtons };

// All Buttons in One Object
export const Buttons = {
  books: BookButtons,
  comics: ComicButtons,
  academic: AcademicButtons,
  drift: DriftButtons,
};

// Default Export
export default {
  useUserInteractions,
  storage,
  BookButtons,
  ComicButtons,
  AcademicButtons,
  DriftButtons,
  Buttons,
};