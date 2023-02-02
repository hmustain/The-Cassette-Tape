const searchTracks = async (event) => {
    event.preventDefault();
    const query = document.getElementById("track-q").value;
    const type = document.getElementById("track-type").value;
    const limit = document.getElementById("track-limit").value;
    
    try {
      const response = await fetch(`http://localhost:3001/api/tracks/search?q=${query}&type=${type}&limit=${limit}`, {
        method: "GET"
      });
      const data = await response.json();
      if (!data.tracks) {
        throw new Error("No tracks found");
      }
      displayTracks(data.tracks);
    } catch (error) {
      console.error(error);
    }
  };
  
  function displayTracks(tracks) {
    const trackList = document.getElementById("songs-table-body");
    trackList.innerHTML = "";
    tracks.forEach(track => {
      const trackItem = document.createElement("tr");
      let albumImage = "";
      if(track.album && track.album.images.length){
        albumImage = track.album.images[0].url;
      }
      trackItem.innerHTML = `
        <td>${track.name}</td>
        <td>${track.artists[0].name}</td>
        <td>${track.album ? track.album.name : ""}</td>
        <td><img src=${albumImage} /></td>
        <td>${track.preview_url}</td>
      `;
      trackList.appendChild(trackItem);
    });
  }

  document.querySelector('#search').addEventListener('click', searchTracks);
