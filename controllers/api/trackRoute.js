const router = require("express").Router();
const spotifyApi = require('spotify-web-api-node');

const api = new spotifyApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET
});

// // GET route to return tracks with "love"
// router.get("/", async (req, res) => {
//     try {
//     const data = await api.clientCredentialsGrant();
//     api.setAccessToken(data.body['access_token']);
//     const searchResult = await api.searchTracks("Love");
//     const tracks = searchResult.body.tracks.items;
//     res.json({ tracks });
//     } catch (err) {
//     console.error(err);
//     res.render("error", { error: err });
//     }
//     });


// GET route to return tracks with whatever the user inputs
router.get("/", async (req, res) => {
    try {
        console.log("Search route hit")
      const data = await api.clientCredentialsGrant();
      api.setAccessToken(data.body.access_token);
      console.log("Request body:", req.body);
      const query = req.body.q;
      if (!query) {
        res.status(400).json({ message: "Search query 'q' is missing" });
        return;
      }
      const searchResult = await api.searchTracks(query);
      const tracks = searchResult.body.tracks.items;
      res.json({ tracks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve tracks", error });
    }
  });
  

module.exports = router;
