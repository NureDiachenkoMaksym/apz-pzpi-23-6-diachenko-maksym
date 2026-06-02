export const translations = {
  uk: {
    title: 'Програмна система аналізу природних ресурсів',
    role: 'Роль', language: 'Мова', userMode: 'Користувач', adminMode: 'Адміністратор',
    dashboard: 'Аналітична панель', resourceType: 'Тип ресурсу', all: 'Усі',
    forest: 'Ліси', water: 'Вода', land: 'Земля', export: 'Експорт', backup: 'Резервна копія',
    adminPanel: 'Панель адміністрування', users: 'Користувачі', importData: 'Імпорт даних',
    status: 'Статус', period: 'Період', territory: 'Територія', indicator: 'Показник', value: 'Значення',
    direction: 'Напрям введення тексту', ltr: 'Зліва направо', rtl: 'Справа наліво'
  },
  en: {
    title: 'Natural Resources Analysis Software System',
    role: 'Role', language: 'Language', userMode: 'User', adminMode: 'Administrator',
    dashboard: 'Dashboard', resourceType: 'Resource type', all: 'All',
    forest: 'Forest', water: 'Water', land: 'Land', export: 'Export', backup: 'Backup',
    adminPanel: 'Administration panel', users: 'Users', importData: 'Import data',
    status: 'Status', period: 'Period', territory: 'Territory', indicator: 'Indicator', value: 'Value',
    direction: 'Text input direction', ltr: 'Left to right', rtl: 'Right to left'
  }
};

export function t(lang, key) { return translations[lang][key] || key; }
export function formatDate(lang, value) { return new Intl.DateTimeFormat(lang === 'uk' ? 'uk-UA' : 'en-US').format(new Date(value)); }
export function sortByLocalizedName(lang, rows) {
  return [...rows].sort((a, b) => (lang === 'uk' ? a.nameUk : a.nameEn).localeCompare(lang === 'uk' ? b.nameUk : b.nameEn, lang === 'uk' ? 'uk' : 'en'));
}
