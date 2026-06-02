import React, { useMemo, useState } from "react";

const dictionaries = {
  uk: {
    title: "Програмна система аналізу природних ресурсів",
    dashboard: "Аналітична панель",
    admin: "Адміністрування",
    export: "Експорт звіту",
    backup: "Створити резервну копію"
  },
  en: {
    title: "Natural Resources Analysis Software System",
    dashboard: "Analytical dashboard",
    admin: "Administration",
    export: "Export report",
    backup: "Create backup"
  }
};

export default function App() {
  const [locale, setLocale] = useState("uk");
  const [role, setRole] = useState("analyst");
  const t = useMemo(() => dictionaries[locale], [locale]);

  return (
    <main>
      <h1>{t.title}</h1>
      <button onClick={() => setLocale(locale === "uk" ? "en" : "uk")}>UK/EN</button>
      <button onClick={() => setRole(role === "admin" ? "analyst" : "admin")}>Role: {role}</button>
      <section>
        <h2>{t.dashboard}</h2>
        <p>Фільтри: територія, період, тип ресурсу, показник.</p>
        <button>{t.export}</button>
      </section>
      {role === "admin" && (
        <section>
          <h2>{t.admin}</h2>
          <button>Керування користувачами</button>
          <button>{t.backup}</button>
        </section>
      )}
    </main>
  );
}
