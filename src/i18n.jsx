import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import translationEn from "./locale/en.json";
import translationFr from "./locale/fr.json";

const resources = {
  en: {
    translation: translationEn,
  },
  fr: {
    translation: translationFr,
  },
};

console.log("i18n initilaized")

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: "en",
    detection: {
      order: ["path", "cookie", "htmlTag", "localStorage"],
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
  });

export default i18n;