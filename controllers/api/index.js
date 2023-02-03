const router = require('express').Router();
const eventRoute = require('./eventRoute');
const userRoute = require('./userRoute');
const trackRoute = require('./trackRoute');
const songRoute = require('./songRoute');

router.use('/events', eventRoute);
router.use('/users', userRoute);
router.use('/tracks', trackRoute);
router.use('/songs', songRoute);


module.exports = router
