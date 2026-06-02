import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

const records = [
  { type: 'forest', territory: 'Kharkiv region', value: 73.4 },
  { type: 'water', territory: 'Kharkiv region', value: 62.1 },
  { type: 'land', territory: 'Kharkiv region', value: 81.8 }
];

export default function App() {
  const { t, i18n } = useTranslation();
  const [role, setRole] = useState('user');

  return (
    <main className="page">
      <header>
        <h1>{t('title')}</h1>
        <button onClick={() => i18n.changeLanguage('uk')}>Українська</button>
        <button onClick={() => i18n.changeLanguage('en')}>English</button>
      </header>
      <section>
        <label>{t('role')}</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="user">{t('user')}</option>
          <option value="admin">{t('admin')}</option>
        </select>
      </section>
      <section>
        <h2>{t('analytics')}</h2>
        <ul>{records.map((r, i) => <li key={i}>{r.type}: {r.value}</li>)}</ul>
      </section>
      {role === 'admin' && <section><h2>{t('adminPanel')}</h2><button>{t('backup')}</button><button>{t('export')}</button></section>}
    </main>
  );
}
