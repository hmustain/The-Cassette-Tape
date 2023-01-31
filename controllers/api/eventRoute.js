const router = require ('express').Router();
const { Event } = require('../../models');

// GET all event
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: "Error (500) cannot perform GET request"});
    }
});