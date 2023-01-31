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
// defining const for query, type, and limit w/ the last 2 having defaults incase the user doesn't submit info
        const query = req.body.q;
        const type = req.body.type || "track";
        const limit = req.body.limit || 10;
// if no query entered return error
        if (!query) {
            return res.status(400).json({ message: "Search query 'q' is missing" });
        }
// else store the returned information in const searchResult
        const searchResult = await api.searchTracks(query, { type, limit });
        const tracks = searchResult.body.tracks.items;
// maps over the array of tracks and for each track creates a new object with desired properties artist name, album name, track name, album photo, track preview
        const filteredTracks = tracks.map(track => ({
            artist: track.artists[0].name,
            album: track.album.name,
            track: track.name,
            albumPhoto: track.album.images[0].url,
            preview: track.preview_url
        }));
//  if good response return the const filtered tracks in json format else return error
        res.json({ tracks: filteredTracks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve tracks", error });
    }
});

  

module.exports = router;
