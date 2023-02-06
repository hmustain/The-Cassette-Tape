const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, Song, UserEvent, User } = require('../../models');
const { create } = require('../../models/User');


// GET route to get list of songs
router.get("/", async (req, res) => {
    try {
        const songs = await Song.findAll();
        res.json({ songs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// POST route to add a new song to an event
router.post("/", async (req, res) => {
    try {
      // Get the song_id and event_id from the request body
      const { song_id, event_id } = req.body;
  
      // Create a new song with the given song_id
      const newSong = await Song.create({ song_id });
      const newEventSong = await UserEvent.create({
        event_id, esong_id: newSong.id
      });

      // Find the event with the given id
      const eventDetails = await Event.findOne({
        where: {id: event_id},
        attributes: [
            'id', 'name', 'starting_date', 'ending_date', 'description',
            // [sequelize.literal(`(SELECT * FROM userEvent WHERE userEvent.event_id = ${event_id})`), 'event_songs']
        ],
        include: [
            {model: Song, through: UserEvent, as: 'event_songs'},
            {model: User, through: UserEvent, as: 'event_users'}
        ]
      });
  
      // Respond with the event details
      res.json(eventDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  });
  

module.exports = router;