// STARTING MODAL LOGIC
let dataVAR = [];
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
function openModal(playlist) {
  // songsForShuffle.push(song)
  let songs = playlist.songs;
  document.getElementById("shuffle").addEventListener("click", () => {
    onShuffleClick(playlist.songs);
    console.log(songs);
    document.getElementById("songs-container").innerHTML = "";
    renderSongs(songs);
  });
  modal.style.display = "block";
  document.getElementById("song-name").innerText = playlist.playlist_name;
  document.getElementById("song-img").src = playlist.playlist_art;
  document.getElementById("artist-name").innerText =
    "Made by " + playlist.playlist_author;
  renderSongs(songs);
}

function renderSongs(songs) {
  songs.forEach((song) => {
    makeSongElements(song);
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

modal.addEventListener("click", (e) => {
  if (e.target.classList == modal) {
    modal.style.display = "none";
  }
});

span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
// DONE WITH MODAL LOGIc

// document.querySelector(".playlist-cards").addEventListener("click", openModal);
// end of modal section
function loadPlaylists() {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        console.log("error connecting to data");
      }
      // dataVAR = response.json();
      return response.json();
    })
    .then((data) => {
      const cardsContainer = document.getElementById("cards-container");
      data.forEach((playlist) => {
        console.log(playlist);

        createPlaylistElement(playlist);
      });
      // here I will add the search function
      searchFuncionality(data);
    })
    .catch((error) => {
      console.error("this is the error" + error);
    });
}
function createPlaylistElement(playlist) {
  const cardsContainer = document.getElementById("cards-container");
  const element = document.createElement("div");
  element.innerHTML = `<div class="card">
          <img src="${playlist.playlist_art}" alt="" class="song-cover" />
          <h2>${playlist.playlist_name}</h2>
          <p>${playlist.playlist_author}</p>
          <div class="like-container">
           <span class='heart-icon'>&#x2665; </span> 
          <span id='like-count' class="like-count">${playlist.likes}</span>
          </div>`;
  //   element.addEventListener("click", () => {
  //     openModal(playlist);
  //   });
  element.addEventListener("click", (e) => {
    if (!e.target.classList.contains("heart-icon")) {
      openModal(playlist);
    } else if (e.target.classList.contains("delete")) {
      // do the deletign stuff here
    } else {
      // The click IS on the heart icon
      const heartIcon = e.target;
      const likeContainer = heartIcon.closest(".like-container");
      const likeCountElement = likeContainer.querySelector(".like-count");

      let currentLikes = likeCountElement.innerHTML;

      if (heartIcon.classList.contains("liked")) {
        // If it's currently liked, unlike it
        console.log("unliking");
        heartIcon.classList.remove("liked");
        currentLikes--;
      } else {
        // If it's not liked, like it
        console.log("liking");
        heartIcon.classList.add("liked");
        currentLikes++;
      }

      // Update the displayed count
      likeCountElement.innerText = currentLikes;
    }
  });
  cardsContainer.appendChild(element);
}

loadPlaylists();

//helper function going over shuffle functionality
function onShuffleClick(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// just thinking about the search feature,
// for my script I will need to rerender the cards when a character is typed and display only titles that begin with the same character
// on search we will clear the inner html of the divs holding the cards and
function searchFuncionality(playlistData) {
  const searchBar = document.getElementById("searchInput");
  let filteredData;

  searchBar.addEventListener("input", (event) => {
    const searchTerm = searchBar.value.toLowerCase();

    filteredData = playlistData.filter((playlist) => {
      return playlist.playlist_name.toLowerCase().includes(searchTerm);
    });
    console.log(filteredData);
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";
    filteredData.forEach((playlist) => {
      createPlaylistElement(playlist);
    });
  });
}
