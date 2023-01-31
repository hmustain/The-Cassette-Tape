const router = require("express").Router();
const spotifyApi = require('spotify-web-api-node');

const api = new spotifyApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET
});

// GET route to return tracks with "love"
router.get("/", async (req, res) => {
    try {
    const data = await api.clientCredentialsGrant();
    api.setAccessToken(data.body['access_token']);
    const searchResult = await api.searchTracks("Love");
    const tracks = searchResult.body.tracks.items;
    res.json({ tracks });
    } catch (err) {
    console.error(err);
    res.render("error", { error: err });
    }
    });

module.exports = router;
