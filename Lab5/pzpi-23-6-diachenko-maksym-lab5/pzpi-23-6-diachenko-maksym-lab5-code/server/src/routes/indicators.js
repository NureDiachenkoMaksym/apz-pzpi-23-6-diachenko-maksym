const router = require('express').Router();
const { authRequired } = require('../middleware/auth');
const store = require('../data/store');

router.get('/', authRequired, (req, res) => {
  const rows = store.indicators.map(i => ({
    ...i,
    resource_type: store.resourceTypes.find(r => r.id === i.resource_type_id)
  }));
  res.json(rows);
});

module.exports = router;
