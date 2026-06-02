const router = require('express').Router();
const { authRequired } = require('../middleware/auth');
const store = require('../data/store');

router.get('/', authRequired, (req, res) => {
  const rows = store.measurements.map(store.toMeasurementView);
  const verified = rows.filter(r => ['approved', 'published'].includes(r.quality_status)).length;
  const highRisk = rows.filter(r => {
    const indicator = r.indicator;
    if (!indicator) return false;
    return Number(r.value) < Number(indicator.warning_min);
  }).length;
  const avg = rows.length ? rows.reduce((s, r) => s + Number(r.value), 0) / rows.length : 0;
  res.json({ total: rows.length, verified, highRisk, average: Number(avg.toFixed(2)), rows });
});

module.exports = router;
