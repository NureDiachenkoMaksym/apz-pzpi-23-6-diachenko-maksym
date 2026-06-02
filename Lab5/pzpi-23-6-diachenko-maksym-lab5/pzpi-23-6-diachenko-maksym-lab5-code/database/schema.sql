CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(32) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role_id INTEGER REFERENCES roles(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS regions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  code VARCHAR(40) UNIQUE NOT NULL,
  parent_id INTEGER REFERENCES regions(id)
);

CREATE TABLE IF NOT EXISTS resource_types (
  id SERIAL PRIMARY KEY,
  code VARCHAR(40) UNIQUE NOT NULL,
  name_uk VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS units (
  id SERIAL PRIMARY KEY,
  code VARCHAR(30) UNIQUE NOT NULL,
  name VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS indicators (
  id SERIAL PRIMARY KEY,
  resource_type_id INTEGER REFERENCES resource_types(id),
  unit_id INTEGER REFERENCES units(id),
  code VARCHAR(60) UNIQUE NOT NULL,
  name_uk VARCHAR(160) NOT NULL,
  name_en VARCHAR(160) NOT NULL,
  warning_min NUMERIC,
  warning_max NUMERIC
);

CREATE TABLE IF NOT EXISTS data_sources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  source_type VARCHAR(40) NOT NULL,
  url TEXT,
  reliability_score INTEGER DEFAULT 80
);

CREATE TABLE IF NOT EXISTS measurements (
  id SERIAL PRIMARY KEY,
  indicator_id INTEGER REFERENCES indicators(id),
  region_id INTEGER REFERENCES regions(id),
  measured_on DATE NOT NULL,
  value NUMERIC(14, 4) NOT NULL,
  data_source_id INTEGER REFERENCES data_sources(id),
  quality_status VARCHAR(20) DEFAULT 'draft' CHECK (quality_status IN ('draft', 'approved', 'rejected', 'published')),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  entity VARCHAR(80) NOT NULL,
  entity_id VARCHAR(80),
  action VARCHAR(80) NOT NULL,
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS import_jobs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  file_name VARCHAR(255),
  status VARCHAR(40) DEFAULT 'created',
  records_total INTEGER DEFAULT 0,
  records_ok INTEGER DEFAULT 0,
  records_failed INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
