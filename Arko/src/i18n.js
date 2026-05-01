import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import uzTranslation from './locales/uz.json';
import ruTranslation from './locales/ru.json';

i18n
  .use(LanguageDetector) // Brauzer tilini aniqlash uchun
  .use(initReactI18next)
  .init({
    resources: {
      uz: uzTranslation,
      ru: ruTranslation
    },
    fallbackLng: 'uz', // Agar til topilmasa, o'zbekcha chiqadi
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;