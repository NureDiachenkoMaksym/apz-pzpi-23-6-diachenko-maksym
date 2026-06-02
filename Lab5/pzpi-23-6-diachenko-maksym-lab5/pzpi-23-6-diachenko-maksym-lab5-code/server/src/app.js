const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const regionRoutes = require('./routes/regions');
const indicatorRoutes = require('./routes/indicators');
const measurementRoutes = require('./routes/measurements');
const analyticsRoutes = require('./routes/analytics');
const adminRoutes = require('./routes/admin');
const dashboardRoutes = require('./routes/dashboard');

function buildApp() {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '2mb' }));

  app.get('/health', (req, res) => res.json({ ok: true, service: 'EcoResource Analytics API' }));

  app.use('/api/auth', authRoutes);
  app.use('/api/regions', regionRoutes);
  app.use('/api/indicators', indicatorRoutes);
  app.use('/api/measurements', measurementRoutes);
  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/dashboard', dashboardRoutes);

  app.use((req, res) => res.status(404).json({ error: 'Endpoint not found' }));
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  });

  return app;
}

module.exports = { buildApp };
