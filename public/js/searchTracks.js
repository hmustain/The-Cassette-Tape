const searchTracks = async (event) => {
    event.preventDefault();
    const query = document.getElementById("track-q").value;
    const type = document.getElementById("track-type").value;
    const limit = document.getElementById("track-limit").value;

    try {
        console.log(`https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`);

        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`, {
            method: "GET"
        });
        const data = await response.json();
        console.log(response);
        console.log(data);
        console.log("query:", query);
        console.log("type:", type);
        console.log("limit:", limit);

        if (!data.tracks) {
            throw new Error("No tracks found");
        }
        displayTracks(data.tracks);
    } catch (error) {
        // console.error(error);
    }
};

function displayTracks(tracks) {
    console.log(tracks);
    const trackList = document.getElementById("songs-table-body");
    console.log("trackList:", trackList);
    trackList.innerHTML = "";
    tracks.forEach(track => {
      const trackItem = document.createElement("tr");
      console.log("trackItem:", trackItem);
        trackList.appendChild(trackItem);
              trackItem.innerHTML = `
          <td>${track.track}</td>
          <td>${track.artist}</td>
          <td>${track.album ? track.album : ""}</td>
          <td><img class= "img-thumbnail" src=${track.albumPhoto} /></td>
          <td><a href="${track.preview}" target="_blank">Preview</a></td>
          <td><button class="add-button btn-primary">Add</button></td>
        `;

    //   const addButton = trackItem.querySelector(".add-button");
    //   addButton.addEventListener("click", async function() {
    //     // Add the track to the event here
    //     try {
    //       const eventId = document.getElementById("event-id").value;
    //       const response = await fetch(`http://localhost:3001/api/events/${eventId}/songs`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //           track: track.track,
    //           artist: track.artist,
    //           album: track.album,
    //           albumPhoto: track.albumPhoto,
    //           preview: track.preview
    //         })
    //       });
    //       const data = await response.json();
    //       console.log(data);
    //       // Update the song list in the HTML to reflect the added track
    //       const songList = document.getElementById("song-list");
    //       const newSong = document.createElement("li");
    //       newSong.innerHTML = `
    //         <p>Track: ${data.track}</p>
    //         <p>Artist: ${data.artist}</p>
    //         <p>Album: ${data.album}</p>
    //         <img src="${data.albumPhoto}" alt="${data.album} album cover">
    //         <audio src="${data.preview}" controls></audio>
    //       `;
    //       songList.appendChild(newSong);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   });
    });
  };

document.querySelector('#search').addEventListener('click', searchTracks);
