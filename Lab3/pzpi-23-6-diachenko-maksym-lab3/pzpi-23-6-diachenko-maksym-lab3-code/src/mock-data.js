export const resources = [
  { id: 1, type: 'forest', nameUk: 'Лісові ресурси', nameEn: 'Forest resources', territory: 'Kharkiv region', period: '2026-03-01', indicator: 'NDVI', value: 0.67, status: 'verified' },
  { id: 2, type: 'water', nameUk: 'Водні ресурси', nameEn: 'Water resources', territory: 'Kharkiv region', period: '2026-03-02', indicator: 'Water quality index', value: 72, status: 'draft' },
  { id: 3, type: 'land', nameUk: 'Земельні ресурси', nameEn: 'Land resources', territory: 'Chuhuiv district', period: '2026-03-03', indicator: 'Soil degradation risk', value: 31, status: 'verified' },
  { id: 4, type: 'forest', nameUk: 'Лісовий покрив', nameEn: 'Forest coverage', territory: 'Izium district', period: '2026-03-04', indicator: 'Coverage area', value: 18320, status: 'published' }
];

export const users = [
  { id: 1, name: 'Diachenko Maksym', role: 'administrator', active: true },
  { id: 2, name: 'Analyst User', role: 'analyst', active: true },
  { id: 3, name: 'Guest Viewer', role: 'guest', active: true }
];
