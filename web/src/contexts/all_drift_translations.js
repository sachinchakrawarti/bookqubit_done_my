// Import sidebar left desktop translations
import sidebarLeftDesktopTranslations from "@/translations_drift/siderbar_left_desktop_translations";

// Merge all Drift translations for all languages
export const allDriftTranslations = {
  en: {
    ...sidebarLeftDesktopTranslations.en,
  },
  hi: {
    ...sidebarLeftDesktopTranslations.hi,
  },
  ur: {
    ...sidebarLeftDesktopTranslations.ur,
  },
  ar: {
    ...sidebarLeftDesktopTranslations.ar,
  },
  bn: {
    ...sidebarLeftDesktopTranslations.bn,
  },
  mr: {
    ...sidebarLeftDesktopTranslations.mr,
  },
  ta: {
    ...sidebarLeftDesktopTranslations.ta,
  },
  kn: {
    ...sidebarLeftDesktopTranslations.kn,
  },
  te: {
    ...sidebarLeftDesktopTranslations.te,
  },
  ml: {
    ...sidebarLeftDesktopTranslations.ml,
  },
  ps: {
    ...sidebarLeftDesktopTranslations.ps,
  },
  es: {
    ...sidebarLeftDesktopTranslations.es,
  },
  zh: {
    ...sidebarLeftDesktopTranslations.zh,
  },
  fr: {
    ...sidebarLeftDesktopTranslations.fr,
  },
  de: {
    ...sidebarLeftDesktopTranslations.de,
  },
  it: {
    ...sidebarLeftDesktopTranslations.it,
  },
  ja: {
    ...sidebarLeftDesktopTranslations.ja,
  },
  ko: {
    ...sidebarLeftDesktopTranslations.ko,
  },
  fa: {
    ...sidebarLeftDesktopTranslations.fa,
  },
  ru: {
    ...sidebarLeftDesktopTranslations.ru,
  },
};

// Helper function to get Drift translations by language code
export const getDriftTranslationsByLanguage = (languageCode = 'en') => {
  return allDriftTranslations[languageCode] || allDriftTranslations.en;
};

// List of available languages for Drift
export const driftAvailableLanguages = Object.keys(allDriftTranslations);

// RTL languages list (Right-to-Left scripts)
export const driftRtlLanguages = ["ur", "ar", "fa", "ps"];

// Default export
export default allDriftTranslations;