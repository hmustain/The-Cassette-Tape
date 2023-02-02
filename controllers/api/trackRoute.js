const router = require("express").Router();
const spotifyApi = require('spotify-web-api-node');
const { Event, Playlist, Song } = require('../../models');


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
router.get("/search", async (req, res) => {
    try {
        console.log("Search route hit")
        const data = await api.clientCredentialsGrant();
        api.setAccessToken(data.body.access_token);
        const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/7aEtlGHoiPAfRB084NiDmx`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + data.body.access_token }
        }).then(data => data.json());
        console.log(trackInfo);
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
            song_id: track.id,
            artist: track.artists.name,
            album: track.album.name,
            track: track.name,
            albumPhoto: track.album.images[0].url,
            preview: track.preview_url
        }));
        //  if good response return the const filtered tracks in json format else return error
        res.status(200).json({
            tracks: filteredTracks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve tracks", error });
    }
});
router.post('/', async (req, res) => {
    try {
        const eventId = req.body.id;
        const songId = req.body.id;
        const song = await Song.findOrCreate({
            where: { song_id: songId },
            defaults: {
                song_id: songId
            }
        })
            .then(data => data[0].id);

        const playlist = await Playlist.findOrCreate({
            where: {
                event_id: eventId,
            }
            ,
            defaults: {
                event_id: eventId,
                song_id: song
            }
        });

        res.json({ message: 'Song added to event' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/test', async (req, res) => {
    //stuff to test and return data on
    const song = await Song.findOrCreate({
        where: { song_id: 00003 },
        defaults: {
            song_id: 0003
        }
    })
        .then(data => res.json(data[0].id));
});

module.exports = router;
