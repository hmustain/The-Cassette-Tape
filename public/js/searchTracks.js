const searchTracks = async (event) => {
    event.preventDefault();
    const query = document.getElementById("track-q").value;
    const type = document.getElementById("track-type").value;
    const limit = document.getElementById("track-limit").value;

    try {
        console.log(`http://localhost:3001/api/tracks/search?q=${query}&type=${type}&limit=${limit}`);

        const response = await fetch(`http://localhost:3001/api/tracks/search?q=${query}&type=${type}&limit=${limit}`, {
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
          <td><img src=${track.albumPhoto} /></td>
          <td>${track.preview}</td>
        `;
    });
  };
  

document.querySelector('#search').addEventListener('click', searchTracks);
