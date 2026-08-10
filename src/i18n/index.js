import { createI18n } from 'vue-i18n';
import en from './en';
import fr from './fr';

const savedLocale = localStorage.getItem('locale');
const browserLocale = navigator.language.slice(0, 2);
const defaultLocale = savedLocale || (browserLocale === 'fr' ? 'fr' : 'en');

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: { en, fr }
});

export default i18n;
