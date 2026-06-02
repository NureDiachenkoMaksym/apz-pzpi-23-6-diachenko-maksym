import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    uk: { translation: { title: 'Аналіз природних ресурсів', role: 'Роль', user: 'Користувач', admin: 'Адміністратор', analytics: 'Аналітика', adminPanel: 'Панель адміністратора', backup: 'Резервна копія', export: 'Експорт' } },
    en: { translation: { title: 'Natural Resources Analysis', role: 'Role', user: 'User', admin: 'Administrator', analytics: 'Analytics', adminPanel: 'Admin Panel', backup: 'Backup', export: 'Export' } }
  },
  lng: 'uk',
  fallbackLng: 'uk',
  interpolation: { escapeValue: false }
});

export default i18n;
