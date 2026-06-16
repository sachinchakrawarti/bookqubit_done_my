// Index file for Drift Desktop Left Sidebar Translations

import english from "./siderbar_left_desktop_translations_english";
import hindi from "./siderbar_left_desktop_translations_hindi";
import urdu from "./siderbar_left_desktop_translations_urdu";

const translations = {
  en: english,
  hi: hindi,
  ur: urdu,
};

export const getSidebarLeftTranslations = (lang = "en") => {
  return translations[lang] || translations.en;
};

export default translations;