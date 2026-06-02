const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

const roles = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Analyst' },
  { id: 3, name: 'Operator' },
  { id: 4, name: 'Guest' }
];

const users = [
  { id: 1, full_name: 'Admin User', email: 'admin@nure.ua', password: 'admin123', role_id: 1 },
  { id: 2, full_name: 'Analyst User', email: 'analyst@nure.ua', password: 'analyst123', role_id: 2 },
  { id: 3, full_name: 'Operator User', email: 'operator@nure.ua', password: 'operator123', role_id: 3 }
];

const regions = [
  { id: 1, name: 'Харківська область', code: 'UA-63' },
  { id: 2, name: 'Харківський район', code: 'UA-6312' },
  { id: 3, name: 'Чугуївський район', code: 'UA-6314' },
  { id: 4, name: 'Ізюмський район', code: 'UA-6310' }
];

const resourceTypes = [
  { id: 1, code: 'forest', name_uk: 'Лісові ресурси', name_en: 'Forest resources' },
  { id: 2, code: 'water', name_uk: 'Водні ресурси', name_en: 'Water resources' },
  { id: 3, code: 'land', name_uk: 'Земельні ресурси', name_en: 'Land resources' }
];

const indicators = [
  { id: 1, resource_type_id: 1, code: 'forest_cover', name_uk: 'Лісистість', name_en: 'Forest coverage', unit: '%', warning_min: 12, warning_max: 100 },
  { id: 2, resource_type_id: 2, code: 'water_quality', name_uk: 'Якість води', name_en: 'Water quality', unit: 'score', warning_min: 65, warning_max: 100 },
  { id: 3, resource_type_id: 3, code: 'soil_fertility', name_uk: 'Родючість ґрунту', name_en: 'Soil fertility', unit: 'score', warning_min: 50, warning_max: 100 },
  { id: 4, resource_type_id: 1, code: 'ndvi', name_uk: 'NDVI', name_en: 'NDVI', unit: 'index', warning_min: 0.25, warning_max: 1 },
  { id: 5, resource_type_id: 2, code: 'water_area', name_uk: 'Площа водойм', name_en: 'Water body area', unit: 'km²', warning_min: 1, warning_max: 1000 }
];

let measurements = [
  { id: 1, indicator_id: 1, region_id: 1, measured_on: '2025-01-15', value: 14.8, quality_status: 'approved', data_source: 'Regional report', created_by: 1, created_at: '2026-01-10T10:00:00Z' },
  { id: 2, indicator_id: 2, region_id: 1, measured_on: '2025-01-15', value: 78.0, quality_status: 'approved', data_source: 'Regional report', created_by: 1, created_at: '2026-01-10T10:05:00Z' },
  { id: 3, indicator_id: 3, region_id: 2, measured_on: '2025-01-15', value: 63.5, quality_status: 'draft', data_source: 'Operator entry', created_by: 3, created_at: '2026-01-10T10:10:00Z' },
  { id: 4, indicator_id: 4, region_id: 3, measured_on: '2024-12-20', value: 0.62, quality_status: 'published', data_source: 'Open data portal', created_by: 2, created_at: '2026-01-10T10:15:00Z' },
  { id: 5, indicator_id: 5, region_id: 4, measured_on: '2024-12-20', value: 110.4, quality_status: 'approved', data_source: 'IoT virtual sensor', created_by: 3, created_at: '2026-01-10T10:20:00Z' }
];

let auditLogs = [
  { id: 1, user_id: 1, entity: 'measurement', entity_id: '1', action: 'quality_update', details: { from: 'draft', to: 'approved' }, created_at: '2026-01-10T10:01:00Z' }
];

function sign(user) {
  const role = roles.find(r => r.id === user.role_id)?.name || 'Guest';
  return jwt.sign({ id: user.id, email: user.email, role }, JWT_SECRET, { expiresIn: '8h' });
}

function verify(token) {
  return jwt.verify(token, JWT_SECRET);
}

function toMeasurementView(m) {
  const indicator = indicators.find(i => i.id === m.indicator_id);
  const resource = resourceTypes.find(r => r.id === indicator?.resource_type_id);
  const region = regions.find(r => r.id === m.region_id);
  return {
    ...m,
    indicator,
    resource_type: resource,
    region,
    indicator_name: indicator?.name_uk,
    resource_name: resource?.name_uk,
    region_name: region?.name,
    unit: indicator?.unit
  };
}

module.exports = { roles, users, regions, resourceTypes, indicators, measurements, auditLogs, sign, verify, toMeasurementView };
