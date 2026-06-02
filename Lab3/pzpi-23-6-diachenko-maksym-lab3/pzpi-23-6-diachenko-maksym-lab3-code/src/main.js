import { ApiClient } from './api.js';
import { t, formatDate, sortByLocalizedName } from './i18n.js';

const state = { lang: 'uk', role: 'user', type: 'all', dir: 'ltr', rows: [], users: [] };
const app = document.querySelector('#app');

async function load() {
  state.rows = await ApiClient.getResources(state.type);
  state.users = await ApiClient.getUsers();
  render();
}

function renderToolbar() {
  return `
    <section class="toolbar">
      <label>${t(state.lang, 'language')}
        <select id="lang"><option value="uk">UA</option><option value="en">EN</option></select>
      </label>
      <label>${t(state.lang, 'role')}
        <select id="role"><option value="user">${t(state.lang, 'userMode')}</option><option value="admin">${t(state.lang, 'adminMode')}</option></select>
      </label>
      <label>${t(state.lang, 'direction')}
        <select id="dir"><option value="ltr">${t(state.lang, 'ltr')}</option><option value="rtl">${t(state.lang, 'rtl')}</option></select>
      </label>
      <label>${t(state.lang, 'resourceType')}
        <select id="type">
          <option value="all">${t(state.lang, 'all')}</option>
          <option value="forest">${t(state.lang, 'forest')}</option>
          <option value="water">${t(state.lang, 'water')}</option>
          <option value="land">${t(state.lang, 'land')}</option>
        </select>
      </label>
    </section>`;
}

function renderCards(rows) {
  const verified = rows.filter((row) => row.status === 'verified' || row.status === 'published').length;
  const avg = rows.length ? (rows.reduce((sum, row) => sum + Number(row.value), 0) / rows.length).toFixed(2) : 0;
  return `<section class="cards">
    <article><strong>${rows.length}</strong><span>records</span></article>
    <article><strong>${verified}</strong><span>trusted</span></article>
    <article><strong>${avg}</strong><span>avg value</span></article>
  </section>`;
}

function renderTable(rows) {
  const sorted = sortByLocalizedName(state.lang, rows);
  return `<table>
    <thead><tr><th>${t(state.lang, 'resourceType')}</th><th>${t(state.lang, 'territory')}</th><th>${t(state.lang, 'period')}</th><th>${t(state.lang, 'indicator')}</th><th>${t(state.lang, 'value')}</th><th>${t(state.lang, 'status')}</th></tr></thead>
    <tbody>${sorted.map((row) => `<tr><td>${state.lang === 'uk' ? row.nameUk : row.nameEn}</td><td>${row.territory}</td><td>${formatDate(state.lang, row.period)}</td><td>${row.indicator}</td><td>${row.value}</td><td>${row.status}</td></tr>`).join('')}</tbody>
  </table>`;
}

function renderAdmin() {
  if (state.role !== 'admin') return '';
  return `<section class="panel"><h2>${t(state.lang, 'adminPanel')}</h2>
    <div class="actions"><button id="backup">${t(state.lang, 'backup')}</button><button id="export">${t(state.lang, 'export')}</button><button id="import">${t(state.lang, 'importData')}</button></div>
    <h3>${t(state.lang, 'users')}</h3>
    <ul>${state.users.map((user) => `<li>${user.name} - ${user.role}</li>`).join('')}</ul>
    <textarea dir="${state.dir}" placeholder="${t(state.lang, 'direction')}"></textarea>
  </section>`;
}

function render() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.dir;
  app.innerHTML = `<main><h1>${t(state.lang, 'title')}</h1>${renderToolbar()}<section class="panel"><h2>${t(state.lang, 'dashboard')}</h2>${renderCards(state.rows)}${renderTable(state.rows)}</section>${renderAdmin()}</main>`;
  document.querySelector('#lang').value = state.lang;
  document.querySelector('#role').value = state.role;
  document.querySelector('#type').value = state.type;
  document.querySelector('#dir').value = state.dir;
  document.querySelector('#lang').addEventListener('change', (e) => { state.lang = e.target.value; render(); });
  document.querySelector('#role').addEventListener('change', (e) => { state.role = e.target.value; render(); });
  document.querySelector('#dir').addEventListener('change', (e) => { state.dir = e.target.value; render(); });
  document.querySelector('#type').addEventListener('change', async (e) => { state.type = e.target.value; await load(); });
  document.querySelector('#backup')?.addEventListener('click', async () => alert(JSON.stringify(await ApiClient.createBackup(), null, 2)));
  document.querySelector('#export')?.addEventListener('click', async () => alert(JSON.stringify(await ApiClient.exportAnalytics('json'), null, 2)));
  document.querySelector('#import')?.addEventListener('click', async () => alert(JSON.stringify(await ApiClient.importData('resources.csv'), null, 2)));
}

load();
