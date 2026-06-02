const translations = {
  uk: {
    title: 'Програмна система аналізу природних ресурсів',
    subtitle: 'Вебклієнт для аналітиків, адміністраторів та відкритого перегляду даних',
    userMode: 'Користувач',
    adminMode: 'Адміністратор',
    language: 'Мова',
    dashboard: 'Аналітична панель',
    observations: 'Спостереження',
    admin: 'Адміністрування',
    total: 'Усього записів',
    forest: 'Ліси',
    water: 'Вода',
    soil: 'Ґрунти',
    risk: 'Рівень ризику',
    export: 'Експорт JSON',
    import: 'Імпорт даних',
    backup: 'Створити резервну копію',
    users: 'Управління користувачами',
    dictionaries: 'Довідники ресурсів',
    filter: 'Фільтр за ресурсом',
    all: 'Усі',
    date: 'Дата',
    territory: 'Територія',
    type: 'Тип ресурсу',
    indicator: 'Показник',
    value: 'Значення'
  },
  en: {
    title: 'Natural Resources Analysis Software System',
    subtitle: 'Web client for analysts, administrators and public data access',
    userMode: 'User',
    adminMode: 'Administrator',
    language: 'Language',
    dashboard: 'Dashboard',
    observations: 'Observations',
    admin: 'Administration',
    total: 'Total records',
    forest: 'Forest',
    water: 'Water',
    soil: 'Soil',
    risk: 'Risk level',
    export: 'Export JSON',
    import: 'Import data',
    backup: 'Create backup',
    users: 'User management',
    dictionaries: 'Resource dictionaries',
    filter: 'Resource filter',
    all: 'All',
    date: 'Date',
    territory: 'Territory',
    type: 'Resource type',
    indicator: 'Indicator',
    value: 'Value'
  }
};

const observations = [
  { id: 1, date: '2025-04-10', territory: 'Харківська область', type: 'forest', indicator: 'Лісовий покрив', value: 44.8, unit: '%' },
  { id: 2, date: '2025-04-12', territory: 'Харківська область', type: 'water', indicator: 'Індекс забруднення', value: 61.4, unit: 'index' },
  { id: 3, date: '2025-04-15', territory: 'Полтавська область', type: 'soil', indicator: 'Індекс деградації', value: 38.1, unit: 'index' },
  { id: 4, date: '2025-04-18', territory: 'Сумська область', type: 'forest', indicator: 'NDVI', value: 0.63, unit: 'ratio' }
];

let state = { lang: 'uk', mode: 'user', filter: 'all' };

function t(key) { return translations[state.lang][key]; }

function formatDate(value) {
  return new Intl.DateTimeFormat(state.lang === 'uk' ? 'uk-UA' : 'en-US').format(new Date(value));
}

function resourceLabel(type) {
  if (type === 'forest') return t('forest');
  if (type === 'water') return t('water');
  if (type === 'soil') return t('soil');
  return type;
}

function filteredObservations() {
  return state.filter === 'all' ? observations : observations.filter(item => item.type === state.filter);
}

function makeBackup() {
  const backup = {
    generatedAt: new Date().toISOString(),
    locale: state.lang,
    records: observations
  };
  download('natural-resources-backup.json', JSON.stringify(backup, null, 2));
}

function download(name, content) {
  const blob = new Blob([content], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
}

function render() {
  const list = filteredObservations();
  const total = observations.length;
  const forestAverage = average(observations.filter(x => x.type === 'forest').map(x => x.value));
  const waterAverage = average(observations.filter(x => x.type === 'water').map(x => x.value));
  const soilAverage = average(observations.filter(x => x.type === 'soil').map(x => x.value));

  document.getElementById('app').innerHTML = `
    <header class="hero">
      <div>
        <h1>${t('title')}</h1>
        <p>${t('subtitle')}</p>
      </div>
      <div class="toolbar">
        <label>${t('language')}
          <select id="lang">
            <option value="uk" ${state.lang === 'uk' ? 'selected' : ''}>Українська</option>
            <option value="en" ${state.lang === 'en' ? 'selected' : ''}>English</option>
          </select>
        </label>
        <button id="userMode" class="${state.mode === 'user' ? 'active' : ''}">${t('userMode')}</button>
        <button id="adminMode" class="${state.mode === 'admin' ? 'active' : ''}">${t('adminMode')}</button>
      </div>
    </header>

    <main>
      <section class="panel">
        <h2>${t('dashboard')}</h2>
        <div class="cards">
          <article><strong>${total}</strong><span>${t('total')}</span></article>
          <article><strong>${forestAverage.toFixed(2)}</strong><span>${t('forest')}</span></article>
          <article><strong>${waterAverage.toFixed(2)}</strong><span>${t('water')}</span></article>
          <article><strong>${soilAverage.toFixed(2)}</strong><span>${t('soil')}</span></article>
        </div>
      </section>

      <section class="panel">
        <div class="section-title">
          <h2>${t('observations')}</h2>
          <label>${t('filter')}
            <select id="filter">
              <option value="all" ${state.filter === 'all' ? 'selected' : ''}>${t('all')}</option>
              <option value="forest" ${state.filter === 'forest' ? 'selected' : ''}>${t('forest')}</option>
              <option value="water" ${state.filter === 'water' ? 'selected' : ''}>${t('water')}</option>
              <option value="soil" ${state.filter === 'soil' ? 'selected' : ''}>${t('soil')}</option>
            </select>
          </label>
        </div>
        <table>
          <thead>
            <tr><th>${t('date')}</th><th>${t('territory')}</th><th>${t('type')}</th><th>${t('indicator')}</th><th>${t('value')}</th></tr>
          </thead>
          <tbody>
            ${list.map(item => `<tr><td>${formatDate(item.date)}</td><td>${item.territory}</td><td>${resourceLabel(item.type)}</td><td>${item.indicator}</td><td>${item.value} ${item.unit}</td></tr>`).join('')}
          </tbody>
        </table>
      </section>

      ${state.mode === 'admin' ? `
      <section class="panel admin">
        <h2>${t('admin')}</h2>
        <div class="admin-grid">
          <button>${t('users')}</button>
          <button>${t('dictionaries')}</button>
          <button onclick="alert(JSON.stringify(observations, null, 2))">${t('export')}</button>
          <button>${t('import')}</button>
          <button id="backup">${t('backup')}</button>
        </div>
      </section>` : ''}
    </main>
  `;

  document.getElementById('lang').addEventListener('change', event => { state.lang = event.target.value; render(); });
  document.getElementById('filter').addEventListener('change', event => { state.filter = event.target.value; render(); });
  document.getElementById('userMode').addEventListener('click', () => { state.mode = 'user'; render(); });
  document.getElementById('adminMode').addEventListener('click', () => { state.mode = 'admin'; render(); });
  const backup = document.getElementById('backup');
  if (backup) backup.addEventListener('click', makeBackup);
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

render();

