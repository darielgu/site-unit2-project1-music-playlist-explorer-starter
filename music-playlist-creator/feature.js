document.addEventListener("DOMContentLoaded", () => {
  loadFeatured();
});
function loadFeatured() {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        console.log("error");
      }
      // very important here to return response.json
      return response.json();
    })
    .then((data) => {
      let availablePlaylists = data;
      console.log(availablePlaylists);
      let index = Math.floor(Math.random() * 7) + 1;
      let playlistShowing = availablePlaylists[index];
      //holds songs
      let songs = playlistShowing.songs;
      const featuredContainer = document.createElement("div");
      featuredContainer.classList += "feature-container";
      const fatherDiv = document.getElementById("father");
      // add playlist features
      featuredContainer.innerHTML = `
      <div class='info'>
      <img src='${playlistShowing.playlist_art}'>
      <p id='playlist-name'>${playlistShowing.playlist_name}</p>
      </div>
     
      `;

      fatherDiv.appendChild(featuredContainer);
      songs.forEach((song) => {
        makeSongElements(song);
      });
      // do a for each for the playlist.songs
    });
}
function makeSongElements(song) {
  const songElement = document.createElement("div");
  songElement.className = "wrapper";
  const father = document.getElementById("songs-container"); //conatiner of the wrappers
  songElement.innerHTML = ` 
    <img src="${song.img}" alt="" />
    <div class="info">
       <p><strong>Title: </strong>${song.title}</p>
       <p><strong>Artist: </strong>${song.artist}</p>
       <p><strong>Album: </strong>${song.album}</p>
       <p>Duration: ${song.duration}</p>
       </div>`;
  father.appendChild(songElement);
}
