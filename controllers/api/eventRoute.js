const router = require ('express').Router();
const { UserEvent } = require('../../models');

// GET all event
router.get('/', async (req, res) => {
    try {
        const userEvents = await userEvent.findAll();
        res.json(userEvents);
    } catch (err) {
        res.status(500).json({ message: "Error (500) cannot perform GET request"});
    }
});