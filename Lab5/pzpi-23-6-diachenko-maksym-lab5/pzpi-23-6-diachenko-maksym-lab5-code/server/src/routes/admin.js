const router = require('express').Router();
const { authRequired } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const store = require('../data/store');

router.get('/users', authRequired, requireRole('Admin'), (req, res) => {
  const rows = store.users.map(u => ({ id: u.id, full_name: u.full_name, email: u.email, role: store.roles.find(r => r.id === u.role_id)?.name }));
  res.json(rows);
});

router.patch('/measurements/:id/quality', authRequired, requireRole('Admin'), (req, res) => {
  const id = Number(req.params.id);
  const quality_status = String(req.body?.quality_status || '').toLowerCase();
  const allowed = ['draft', 'approved', 'rejected', 'published'];
  if (!allowed.includes(quality_status)) return res.status(400).json({ error: `quality_status must be one of: ${allowed.join(', ')}` });
  const m = store.measurements.find(x => x.id === id);
  if (!m) return res.status(404).json({ error: 'Measurement not found' });
  const prev = m.quality_status;
  m.quality_status = quality_status;
  store.auditLogs.push({
    id: store.auditLogs.length + 1,
    user_id: req.user.id,
    entity: 'measurement',
    entity_id: String(id),
    action: 'quality_update',
    details: { from: prev, to: quality_status },
    created_at: new Date().toISOString()
  });
  res.json({ ok: true, id, quality_status });
});

router.get('/audit', authRequired, requireRole('Admin'), (req, res) => {
  let rows = [...store.auditLogs];
  if (req.query.entity) rows = rows.filter(r => r.entity === req.query.entity);
  if (req.query.action) rows = rows.filter(r => r.action === req.query.action);
  res.json(rows.sort((a,b)=>b.id-a.id).slice(0, 200));
});

router.post('/backup', authRequired, requireRole('Admin'), (req, res) => {
  res.json({ ok: true, created_at: new Date().toISOString(), file: `backup-${Date.now()}.json`, records: store.measurements.length });
});

module.exports = router;
