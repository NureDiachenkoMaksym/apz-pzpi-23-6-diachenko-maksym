const router = require('express').Router();
const { authRequired } = require('../middleware/auth');
const store = require('../data/store');

function filterRows(query) {
  return store.measurements.filter(m => {
    if (query.regionId && Number(query.regionId) !== m.region_id) return false;
    if (query.indicatorId && Number(query.indicatorId) !== m.indicator_id) return false;
    if (query.status && String(query.status) !== m.quality_status) return false;
    if (query.dateFrom && m.measured_on < query.dateFrom) return false;
    if (query.dateTo && m.measured_on > query.dateTo) return false;
    return true;
  });
}

router.get('/', authRequired, (req, res) => {
  const rows = filterRows(req.query).map(store.toMeasurementView);
  res.json(rows);
});

router.post('/', authRequired, (req, res) => {
  const { indicator_id, region_id, measured_on, value, data_source_id } = req.body || {};
  if (!indicator_id || !region_id || !measured_on || value === undefined) {
    return res.status(400).json({ error: 'indicator_id, region_id, measured_on and value are required' });
  }
  const created = {
    id: Math.max(...store.measurements.map(m => m.id)) + 1,
    indicator_id: Number(indicator_id),
    region_id: Number(region_id),
    measured_on,
    value: Number(value),
    data_source_id: data_source_id || null,
    quality_status: 'draft',
    created_by: req.user.id,
    created_at: new Date().toISOString(),
    data_source: 'API client'
  };
  store.measurements.push(created);
  store.auditLogs.push({
    id: store.auditLogs.length + 1,
    user_id: req.user.id,
    entity: 'measurement',
    entity_id: String(created.id),
    action: 'create',
    details: { indicator_id, region_id, value },
    created_at: new Date().toISOString()
  });
  res.status(201).json(store.toMeasurementView(created));
});

module.exports = router;
