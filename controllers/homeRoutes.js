const router = require('express').Router();
const { Event, User, UserEvent, Playlist } = require('../models');
// const withAuth = require('../utils/auth');


router.get('/', (req, res) => {
  res.render('homepage');
})

router.get('/events', async (req, res) => {
    // try {  
      // Get all projects and JOIN with user data
      const eventData = await Event.findAll({
        include: [
          {
            model: User, through: UserEvent, as: "event_users", 
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const events = eventData.map((event) => event.get({ plain: true }));
    // const events = [
    //     {
    //         "id": 1,
    //         "name": "Elric and Rockbell wedding",
    //         "starting_date": "2023-07-17T00:00:00.000Z",
    //         "ending_date": "2023-07-17T00:00:00.000Z",
    //         "description": "The long awaited wedding of Edrward Elric and Winry Rockbell to be held in July of 2023.",
    //         "created_by": 4,
    //         "createdAt": "2023-02-01T04:08:17.000Z",
    //         "updatedAt": "2023-02-01T04:08:17.000Z"
    //     },
    //     {
    //         "id": 2,
    //         "name": "Penny's Sweet Sixteen",
    //         "starting_date": "2023-02-23T00:00:00.000Z",
    //         "ending_date": "2023-02-23T00:00:00.000Z",
    //         "description": "Penny's turning sixteen and you're all invited. Get your song requests ready. Just make sure they're appropriate for the occassion.",
    //         "created_by": 2,
    //         "createdAt": "2023-02-01T04:08:17.000Z",
    //         "updatedAt": "2023-02-01T04:08:17.000Z"
    //     },
    //     {
    //         "id": 3,
    //         "name": "Cross-country road trip",
    //         "starting_date": "2024-07-17T00:00:00.000Z",
    //         "ending_date": null,
    //         "description": "RV bought and gassed up, the cross country road trip begins! From Texas to Nevada, up to Washington, Montana, and the Dakota's, to the tip of Maine and on down through Virginia, and then to Florida before heading back home. We'rew gonna need a lot of music for this one...",
    //         "created_by": 1,
    //         "createdAt": "2023-02-01T04:08:17.000Z",
    //         "updatedAt": "2023-02-01T04:08:17.000Z"
    //     },
    //     {
    //         "id": 4,
    //         "name": "Wedding",
    //         "starting_date": "2023-07-17T00:00:00.000Z",
    //         "ending_date": "2023-07-17T00:00:00.000Z",
    //         "description": "Something",
    //         "created_by": 4,
    //         "createdAt": "2023-02-01T04:08:37.000Z",
    //         "updatedAt": "2023-02-01T04:08:37.000Z"
    //     }
    // ]
  
      // Pass serialized data and session flag into template
    //   res.json(events);
    console.log(events)
      res.render('event', { 
        // events,
        events: events,
        // loggedIn: true
        logged_in: req.session.logged_in 
      });
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  });

  // view event by id page 
  router.get('/events/:id', async (req, res) => {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.render('viewEvent', { 
        event: event.dataValues 
      });
    } catch (err) {
      res.status(500).json({ message: "Error (500) cannot perform GET request" });
    }
  });
  
  

  // Use withAuth middleware to redirect authenticated users to the dashboard
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// redirect to the post new event page
router.get('/event', (req, res) => {
  res.render('event');
});

router.get("/add", (req, res) => {
  res.render("addEvent");
});


  router.get('/signup', async (req, res) => {
    try {
      // Pass serialized data and session flag into template
      res.render('signUp');
    } catch (err) {
      res.status(404).json(err);
    }
  });

  module.exports = router;