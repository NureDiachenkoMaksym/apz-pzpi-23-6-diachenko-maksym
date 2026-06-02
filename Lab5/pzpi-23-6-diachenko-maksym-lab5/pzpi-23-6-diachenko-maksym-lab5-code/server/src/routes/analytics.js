const router = require('express').Router();
const { authRequired } = require('../middleware/auth');
const store = require('../data/store');

function filtered(query) {
  return store.measurements.filter(m => {
    if (query.indicatorId && Number(query.indicatorId) !== m.indicator_id) return false;
    if (query.regionId && Number(query.regionId) !== m.region_id) return false;
    if (query.dateFrom && m.measured_on < query.dateFrom) return false;
    if (query.dateTo && m.measured_on > query.dateTo) return false;
    if (String(query.onlyApproved || 'false') === 'true' && !['approved', 'published'].includes(m.quality_status)) return false;
    return true;
  }).sort((a, b) => a.measured_on.localeCompare(b.measured_on));
}

router.get('/trend', authRequired, (req, res) => {
  res.json(filtered(req.query).map(m => ({ measured_on: m.measured_on, value: m.value, quality_status: m.quality_status })));
});

router.get('/summary', authRequired, (req, res) => {
  const rows = filtered(req.query);
  const values = rows.map(r => Number(r.value));
  const count = values.length;
  const avg = count ? values.reduce((a, b) => a + b, 0) / count : null;
  const min = count ? Math.min(...values) : null;
  const max = count ? Math.max(...values) : null;
  const first = rows[0] || null;
  const last = rows[rows.length - 1] || null;
  const change_percent = first && last && Number(first.value) !== 0 ? ((Number(last.value) - Number(first.value)) / Number(first.value)) * 100 : null;
  res.json({ count, avg_value: avg, min_value: min, max_value: max, first, last, change_percent });
});

router.get('/anomalies', authRequired, (req, res) => {
  const zLimit = Number(req.query.z || 2);
  const rows = filtered(req.query);
  const values = rows.map(r => Number(r.value));
  if (values.length < 3) return res.json({ mean: null, stdev: null, z: zLimit, anomalies: [] });
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, v) => a + (v - mean) ** 2, 0) / (values.length - 1);
  const stdev = Math.sqrt(variance);
  const anomalies = rows.map((r, i) => ({ ...store.toMeasurementView(r), zscore: stdev ? (values[i] - mean) / stdev : 0 }))
    .filter(p => Math.abs(p.zscore) >= zLimit);
  res.json({ mean, stdev, z: zLimit, anomalies });
});

router.get('/compare-regions', authRequired, (req, res) => {
  const rows = filtered(req.query);
  const groups = new Map();
  for (const m of rows) {
    const key = m.region_id;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(Number(m.value));
  }
  const output = Array.from(groups.entries()).map(([region_id, vals]) => {
    const region = store.regions.find(r => r.id === region_id);
    return { region_id, region_name: region?.name, count: vals.length, avg_value: vals.reduce((a,b)=>a+b,0)/vals.length };
  }).sort((a,b)=>b.avg_value-a.avg_value);
  res.json(output);
});

module.exports = router;
