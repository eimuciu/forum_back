const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send('works');
});

module.exports = { userRoutes: router };
