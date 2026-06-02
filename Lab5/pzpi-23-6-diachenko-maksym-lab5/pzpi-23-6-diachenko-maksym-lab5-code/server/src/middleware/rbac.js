function requireRole(roleName) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Authorization required' });
    if (req.user.role !== roleName) return res.status(403).json({ error: `Role ${roleName} required` });
    next();
  };
}

module.exports = { requireRole };
