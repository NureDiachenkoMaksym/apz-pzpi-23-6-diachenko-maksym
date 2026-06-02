const store = require('../data/store');

function authRequired(req, res, next) {
  const value = req.headers.authorization || '';
  const token = value.startsWith('Bearer ') ? value.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Authorization token required' });
  try {
    req.user = store.verify(token);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { authRequired };
