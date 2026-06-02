const router = require('express').Router();
const store = require('../data/store');

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  const user = store.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });
  const token = store.sign(user);
  const role = store.roles.find(r => r.id === user.role_id)?.name;
  res.json({ token, user: { id: user.id, full_name: user.full_name, email: user.email, role } });
});

module.exports = router;
