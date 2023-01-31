const router = require('express').Router();
const eventRoute = require('./eventRoute');
const userRoute = require('./userRoute');
const trackRoute = require('./trackRoute');

router.use('/events', eventRoute);
router.use('/users', userRoute);
router.use('/tracks', trackRoute);

module.exports = router
