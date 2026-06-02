INSERT INTO roles (id, name) VALUES
  (1, 'Admin'), (2, 'Analyst'), (3, 'Operator'), (4, 'Guest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, full_name, email, password_hash, role_id) VALUES
  (1, 'Admin User', 'admin@nure.ua', '$2b$10$demo', 1),
  (2, 'Analyst User', 'analyst@nure.ua', '$2b$10$demo', 2),
  (3, 'Operator User', 'operator@nure.ua', '$2b$10$demo', 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO regions (id, name, code) VALUES
  (1, 'Харківська область', 'UA-63'),
  (2, 'Харківський район', 'UA-6312'),
  (3, 'Чугуївський район', 'UA-6314'),
  (4, 'Ізюмський район', 'UA-6310')
ON CONFLICT (id) DO NOTHING;

INSERT INTO resource_types (id, code, name_uk, name_en) VALUES
  (1, 'forest', 'Лісові ресурси', 'Forest resources'),
  (2, 'water', 'Водні ресурси', 'Water resources'),
  (3, 'land', 'Земельні ресурси', 'Land resources')
ON CONFLICT (id) DO NOTHING;

INSERT INTO units (id, code, name) VALUES
  (1, 'percent', '%'),
  (2, 'score', 'score'),
  (3, 'index', 'index'),
  (4, 'km2', 'km²')
ON CONFLICT (id) DO NOTHING;

INSERT INTO indicators (id, resource_type_id, unit_id, code, name_uk, name_en, warning_min, warning_max) VALUES
  (1, 1, 1, 'forest_cover', 'Лісистість', 'Forest coverage', 12, 100),
  (2, 2, 2, 'water_quality', 'Якість води', 'Water quality', 65, 100),
  (3, 3, 2, 'soil_fertility', 'Родючість ґрунту', 'Soil fertility', 50, 100),
  (4, 1, 3, 'ndvi', 'NDVI', 'NDVI', 0.25, 1),
  (5, 2, 4, 'water_area', 'Площа водойм', 'Water body area', 1, 1000)
ON CONFLICT (id) DO NOTHING;

INSERT INTO data_sources (id, name, source_type, url, reliability_score) VALUES
  (1, 'Regional environmental report', 'report', NULL, 85),
  (2, 'IoT virtual sensor', 'iot', NULL, 75),
  (3, 'Open data portal', 'open_data', 'https://data.gov.ua', 80)
ON CONFLICT (id) DO NOTHING;

INSERT INTO measurements (indicator_id, region_id, measured_on, value, data_source_id, quality_status, created_by) VALUES
  (1, 1, '2025-01-15', 14.8, 1, 'approved', 1),
  (2, 1, '2025-01-15', 78.0, 1, 'approved', 1),
  (3, 2, '2025-01-15', 63.5, 1, 'draft', 3),
  (4, 3, '2024-12-20', 0.62, 3, 'published', 2),
  (5, 4, '2024-12-20', 110.4, 2, 'approved', 3);
