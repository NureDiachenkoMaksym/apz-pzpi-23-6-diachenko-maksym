const router = require('express').Router();
const { authRequired } = require('../middleware/auth');
const store = require('../data/store');

router.get('/', authRequired, (req, res) => res.json(store.regions));

module.exports = router;
