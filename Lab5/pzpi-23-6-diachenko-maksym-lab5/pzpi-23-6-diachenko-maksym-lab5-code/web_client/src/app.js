const state = { lang: 'uk', role: 'user', rows: [], filtered: [] };

const dict = {
  uk: {
    title: 'Програмна система аналізу природних ресурсів',
    subtitle: 'Єдине вікно для збору, перевірки, аналізу та експорту даних про землю, воду і ліси.',
    user: 'Користувач', admin: 'Адміністратор'
  },
  en: {
    title: 'Natural Resources Analysis Software System',
    subtitle: 'Single window for collection, validation, analysis and export of land, water and forest data.',
    user: 'User', admin: 'Administrator'
  }
};

async function loadData() {
  try {
    const response = await fetch('/api/dashboard', { headers: { Authorization: 'Bearer demo' } });
    if (!response.ok) throw new Error('API unavailable');
    const data = await response.json();
    state.rows = data.rows.map(r => ({
      id: r.id,
      resource: r.resource_type?.code || 'unknown',
      resource_uk: r.resource_name,
      territory: r.region_name,
      period: r.measured_on?.slice(0, 7) || '',
      indicator: r.indicator_name,
      value: Number(r.value),
      unit: r.unit || '',
      status: r.quality_status
    }));
  } catch (e) {
    const response = await fetch('demo-data.json');
    const data = await response.json();
    state.rows = data.resources;
  }
  applyFilters();
}

function applyFilters() {
  const resource = document.getElementById('resourceFilter').value;
  const territory = document.getElementById('territoryFilter').value.trim().toLowerCase();
  const period = document.getElementById('periodFilter').value;
  state.filtered = state.rows.filter(row => {
    if (resource !== 'all' && row.resource !== resource) return false;
    if (period !== 'all' && row.period !== period) return false;
    if (territory && !row.territory.toLowerCase().includes(territory)) return false;
    return true;
  });
  render();
}

function render() {
  const rows = state.filtered;
  document.getElementById('totalCount').textContent = rows.length;
  document.getElementById('verifiedCount').textContent = rows.filter(r => ['approved','published'].includes(r.status)).length;
  document.getElementById('riskCount').textContent = rows.filter(r => r.status === 'draft' || r.value < 15).length;
  const avg = rows.length ? rows.reduce((s,r)=>s + Number(r.value),0)/rows.length : 0;
  document.getElementById('avgValue').textContent = avg.toFixed(2);

  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = rows.map(r => `<tr>
    <td>${r.resource_uk}</td><td>${r.territory}</td><td>${r.period}</td><td>${r.indicator}</td><td>${r.value} ${r.unit}</td><td><span class="status ${r.status}">${r.status}</span></td>
  </tr>`).join('');

  document.getElementById('adminPanel').classList.toggle('hidden', state.role !== 'admin');
  drawChart(rows);
}

function drawChart(rows) {
  const canvas = document.getElementById('chart');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const max = Math.max(1, ...rows.map(r => Number(r.value)));
  const colors = { forest: '#d97706', water: '#0f6fb4', land: '#008060' };
  rows.forEach((r, index) => {
    const barW = 44;
    const gap = 24;
    const x = 35 + index * (barW + gap);
    const h = Math.max(4, (Number(r.value) / max) * 180);
    const y = 220 - h;
    ctx.fillStyle = colors[r.resource] || '#64748b';
    ctx.fillRect(x, y, barW, h);
    ctx.fillStyle = '#0f2438';
    ctx.font = '12px Segoe UI';
    ctx.fillText(r.resource, x, 244);
  });
}

function setLanguage() {
  state.lang = state.lang === 'uk' ? 'en' : 'uk';
  document.querySelector('[data-i18n="title"]').textContent = dict[state.lang].title;
  document.querySelector('[data-i18n="subtitle"]').textContent = dict[state.lang].subtitle;
}

function logAdmin(text) {
  const log = document.getElementById('adminLog');
  log.textContent = `[${new Date().toLocaleTimeString()}] ${text}\n` + log.textContent;
}

document.getElementById('resourceFilter').addEventListener('change', applyFilters);
document.getElementById('territoryFilter').addEventListener('input', applyFilters);
document.getElementById('periodFilter').addEventListener('change', applyFilters);
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('resourceFilter').value = 'all';
  document.getElementById('territoryFilter').value = '';
  document.getElementById('periodFilter').value = 'all';
  applyFilters();
});
document.getElementById('langToggle').addEventListener('click', setLanguage);
document.getElementById('roleSelect').addEventListener('change', e => { state.role = e.target.value; render(); });
document.getElementById('approveBtn').addEventListener('click', () => logAdmin('Чернетки позначено як перевірені (demo).'));
document.getElementById('exportBtn').addEventListener('click', () => logAdmin('Підготовлено експорт PDF/Excel (demo).'));
document.getElementById('backupBtn').addEventListener('click', () => logAdmin('Створено резервну копію backup-demo.json (demo).'));
document.getElementById('importBtn').addEventListener('click', () => logAdmin('Імпорт CSV завершено: 5 записів, 0 помилок (demo).'));

loadData();
