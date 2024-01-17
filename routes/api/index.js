const router = require('express').Router();
const thoughtRoutes = require('./thoughts');
const usersRoutes = require('./users');

router.use('/thoughts', thoughtRoutes);
router.use('/users', usersRoutes);

module.exports = router;
