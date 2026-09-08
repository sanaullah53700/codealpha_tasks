/* ===========================================================
   VibeWave — script.js
   Vanilla JavaScript music player (HTML5 Audio API)
   =========================================================== */

/* ---------- SONG DATA ---------- */

const SONGS = [
  {
    id: 1,
    title: "Heaven on the Earth",
    artist: "L.D.B",
    album: "Time to Chill",
    category: "dreamy",
    audio: "assets/audio/heaven-on-earth.mp3",
    art: "assets/images/heaven-on-earth.svg",
  },
  {
    id: 2,
    title: "In the Clouds",
    artist: "L.D.B",
    album: "Time to Chill",
    category: "dreamy",
    audio: "assets/audio/in-the-clouds.mp3",
    art: "assets/images/in-the-clouds.svg",
  },
  {
    id: 3,
    title: "Memories",
    artist: "The Midnight",
    album: "Single",
    category: "night",
    audio: "assets/audio/memories.mp3",
    art: "assets/images/memories.svg",
  },
  {
    id: 5,
    title: "Jaan Se Guzarte Hain",
    artist: "Shashwat Sachdev, Khan Saab",
    album: "Dhurandhar: The Revenge (OST)",
    category: "chill",
    audio: "assets/audio/jaan-se-guzarte-hain.mp3",
    art: "assets/images/jaan-se-guzarte-hain.svg",
  },
  {
    id: 6,
    title: "Mere Rashke Qamar",
    artist: "Nusrat Fateh Ali Khan, Rahat Fateh Ali Khan",
    album: "Baadshaho (OST)",
    category: "travel",
    audio: "assets/audio/mere-rashke-qamar.mp3",
    art: "assets/images/mere-rashke-qamar.svg",
  },
  {
    id: 7,
    title: "Birds of a Feather",
    artist: "Billie Eilish",
    album: "Hit Me Hard and Soft",
    category: "night",
    audio: "assets/audio/birds-of-a-feather.mp3",
    art: "assets/images/birds-of-a-feather.svg",
  },
  {
    id: 8,
    title: "Die with a Smile",
    artist: "Lady Gaga, Bruno Mars",
    album: "Die with a Smile (Single)",
    category: "focus",
    audio: "assets/audio/die-with-a-smile.mp3",
    art: "assets/images/die-with-a-smile.svg",
  },
];

const FALLBACK_ART = "assets/images/heaven-on-earth.svg";

/* ---------- STATE ---------- */

const state = {
  audio: new Audio(),
  currentIndex: 0,
  isPlaying: false,
  shuffle: false,
  repeatMode: "off", // 'off' | 'all' | 'one'
  favorites: new Set(JSON.parse(localStorage.getItem("vibewave_favorites") || "[]")),
  searchTerm: "",
  activeCategory: "all",
  activeView: "home", // 'home' | 'favorites' | 'playlists' | 'albums' | 'artists'
  playlistFilter: null, // selected category key inside the Playlists view
  albumFilter: null, // selected album name inside the Albums view
  artistFilter: null, // selected artist name inside the Artists view
  volume: 80,
  muted: false,
  lastVolume: 80,
  wasSeeking: false,
};

const CATEGORY_LABELS = {
  chill: "Chill Mix",
  focus: "Focus Mix",
  workout: "Workout Mix",
  night: "Night Mix",
  travel: "Travel Mix",
  dreamy: "Dreamy Mix",
  nature: "Nature Mix",
};

/* ---------- DOM REFERENCES ---------- */

const el = {
  // header / search
  searchInput: document.getElementById("searchInput"),
  searchBarWrap: document.getElementById("searchBarWrap"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  searchStatus: document.getElementById("searchStatus"),
  greetingBlock: document.getElementById("greetingBlock"),
  greetingText: document.getElementById("greetingText"),
  discoverHint: document.getElementById("discoverHint"),

  // featured
  featuredSection: document.getElementById("featuredSection"),
  featuredArt: document.getElementById("featuredArt"),
  featuredTitle: document.getElementById("featuredTitle"),
  featuredArtist: document.getElementById("featuredArtist"),
  featuredAlbum: document.getElementById("featuredAlbum"),
  featuredPlayBtn: document.getElementById("featuredPlayBtn"),
  featuredPlayPillBtn: document.getElementById("featuredPlayPillBtn"),
  featuredFavBtn: document.getElementById("featuredFavBtn"),

  // categories
  categorySection: document.getElementById("categorySection"),
  categoryPills: document.getElementById("categoryPills"),

  // browse (playlists / albums / artists)
  browseSection: document.getElementById("browseSection"),
  browseHeading: document.getElementById("browseHeading"),
  browseGrid: document.getElementById("browseGrid"),

  // tracks table
  tracksSection: document.getElementById("tracksSection"),
  tracksHeading: document.getElementById("tracksHeading"),
  tracksTableBody: document.getElementById("tracksTableBody"),
  noResultsMsg: document.getElementById("noResultsMsg"),

  // queue
  queueList: document.getElementById("queueList"),

  // sidebar / nav
  navItems: document.querySelectorAll(".nav-item"),
  sidebar: document.getElementById("sidebar"),
  sidebarOverlay: document.getElementById("sidebarOverlay"),
  hamburgerBtn: document.getElementById("hamburgerBtn"),
  mobileSearchBtn: document.getElementById("mobileSearchBtn"),

  // desktop player bar
  playerNowPlaying: document.getElementById("playerNowPlaying"),
  playerArt: document.getElementById("playerArt"),
  playerTitle: document.getElementById("playerTitle"),
  playerArtist: document.getElementById("playerArtist"),
  playerFavBtn: document.getElementById("playerFavBtn"),
  playPauseBtn: document.getElementById("playPauseBtn"),
  playIcon: document.getElementById("playIcon"),
  pauseIcon: document.getElementById("pauseIcon"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  shuffleBtn: document.getElementById("shuffleBtn"),
  repeatBtn: document.getElementById("repeatBtn"),
  repeatOneDot: document.getElementById("repeatOneDot"),
  progressBar: document.getElementById("progressBar"),
  progressFill: document.getElementById("progressFill"),
  progressHandle: document.getElementById("progressHandle"),
  currentTimeEl: document.getElementById("currentTimeEl"),
  durationEl: document.getElementById("durationEl"),
  audioStatus: document.getElementById("audioStatus"),
  muteBtn: document.getElementById("muteBtn"),
  volIconHigh: document.getElementById("volIconHigh"),
  volIconMuted: document.getElementById("volIconMuted"),
  volumeSlider: document.getElementById("volumeSlider"),

  // mobile player
  mobilePlayer: document.getElementById("mobilePlayer"),
  mobilePlayerTap: document.getElementById("mobilePlayerTap"),
  mobilePlayerArt: document.getElementById("mobilePlayerArt"),
  mobilePlayerTitle: document.getElementById("mobilePlayerTitle"),
  mobilePlayerArtist: document.getElementById("mobilePlayerArtist"),
  mobilePlayPauseBtn: document.getElementById("mobilePlayPauseBtn"),
  mobilePlayIcon: document.getElementById("mobilePlayIcon"),
  mobilePauseIcon: document.getElementById("mobilePauseIcon"),
  mobilePrevBtn: document.getElementById("mobilePrevBtn"),
  mobileNextBtn: document.getElementById("mobileNextBtn"),
  mobileProgressFill: document.getElementById("mobileProgressFill"),

  // now playing (full screen)
  nowPlayingModal: document.getElementById("nowPlayingModal"),
  nowPlayingBackdrop: document.getElementById("nowPlayingBackdrop"),
  npCloseBtn: document.getElementById("npCloseBtn"),
  npArt: document.getElementById("npArt"),
  npTitle: document.getElementById("npTitle"),
  npArtist: document.getElementById("npArtist"),
  npAlbum: document.getElementById("npAlbum"),
  npFavBtn: document.getElementById("npFavBtn"),
  npShuffleBtn: document.getElementById("npShuffleBtn"),
  npPrevBtn: document.getElementById("npPrevBtn"),
  npPlayPauseBtn: document.getElementById("npPlayPauseBtn"),
  npPlayIcon: document.getElementById("npPlayIcon"),
  npPauseIcon: document.getElementById("npPauseIcon"),
  npNextBtn: document.getElementById("npNextBtn"),
  npRepeatBtn: document.getElementById("npRepeatBtn"),
  npRepeatOneDot: document.getElementById("npRepeatOneDot"),
  npProgressBar: document.getElementById("npProgressBar"),
  npProgressFill: document.getElementById("npProgressFill"),
  npProgressHandle: document.getElementById("npProgressHandle"),
  npCurrentTimeEl: document.getElementById("npCurrentTimeEl"),
  npDurationEl: document.getElementById("npDurationEl"),
};

/* ===========================================================
   INITIALIZATION
   =========================================================== */

function initializePlayer() {
  buildGreeting();
  setInterval(buildGreeting, 1000);
  renderTracksTable();
  renderQueue();
  loadSong(state.currentIndex, { autoplay: false });
  attachEventListeners();
  el.volumeSlider.value = state.volume;
  state.audio.volume = state.volume / 100;
  updateVolumeUI();
}

function buildGreeting() {
  const hour = new Date().getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  el.greetingText.textContent = greeting;
}

/* ===========================================================
   FILTERING (search + category + favorites view)
   =========================================================== */

function getFilteredSongs() {
  let list = SONGS;

  if (state.activeView === "favorites") {
    list = list.filter((s) => state.favorites.has(s.id));
  } else if (state.activeView === "playlists") {
    list = state.playlistFilter ? list.filter((s) => s.category === state.playlistFilter) : [];
  } else if (state.activeView === "albums") {
    list = state.albumFilter ? list.filter((s) => s.album === state.albumFilter) : [];
  } else if (state.activeView === "artists") {
    list = state.artistFilter ? list.filter((s) => s.artist === state.artistFilter) : [];
  } else if (state.activeView === "discover") {
    // Discover searches the full library regardless of any leftover Home category selection.
  } else if (state.activeCategory !== "all") {
    list = list.filter((s) => s.category === state.activeCategory);
  }

  const term = state.searchTerm.trim().toLowerCase();
  if (term) {
    list = list.filter(
      (s) =>
        s.title.toLowerCase().includes(term) ||
        s.artist.toLowerCase().includes(term) ||
        s.album.toLowerCase().includes(term)
    );
  }

  return list;
}

function searchSongs(term) {
  state.searchTerm = term;
  el.clearSearchBtn.hidden = term.length === 0;
  filterSongs();
}

function getEmptyStateMessage() {
  if (state.searchTerm.trim()) return "No songs found. Try a different search.";
  switch (state.activeView) {
    case "favorites":
      return "No favorites yet. Tap the heart on any song to save it here.";
    case "playlists":
      return state.playlistFilter ? "No songs in this playlist yet." : "Select a playlist above to see its songs.";
    case "albums":
      return state.albumFilter ? "No songs in this album yet." : "Select an album above to see its songs.";
    case "artists":
      return state.artistFilter ? "No songs from this artist yet." : "Select an artist above to see their songs.";
    default:
      return "No songs in this category yet.";
  }
}

function getTracksHeadingText() {
  switch (state.activeView) {
    case "discover":
      return "Search Results";
    case "favorites":
      return "Your Favorites";
    case "playlists":
      return state.playlistFilter ? CATEGORY_LABELS[state.playlistFilter] || "Playlist" : "Playlists";
    case "albums":
      return state.albumFilter || "Albums";
    case "artists":
      return state.artistFilter || "Artists";
    default:
      return "Popular Tracks";
  }
}

function isLibraryView(view = state.activeView) {
  return view === "home" || view === "settings";
}

function filterSongs() {
  const results = getFilteredSongs();
  renderTracksTable(results);
  el.tracksHeading.textContent = getTracksHeadingText();

  const term = state.searchTerm.trim();
  if (term) {
    if (results.length === 0) {
      el.searchStatus.hidden = false;
      el.searchStatus.textContent = `No results for "${term}". Try a different search.`;
    } else {
      el.searchStatus.hidden = false;
      el.searchStatus.textContent = `${results.length} result${results.length === 1 ? "" : "s"} for "${term}"`;
    }
  } else {
    el.searchStatus.hidden = true;
  }

  el.featuredSection.style.display = isLibraryView() && !term ? "" : "none";

  const isDiscoverIdle = state.activeView === "discover" && !term;
  el.greetingBlock.style.display = state.activeView === "discover" ? "none" : "";
  el.searchBarWrap.style.display = state.activeView === "discover" ? "" : "none";
  el.discoverHint.hidden = !isDiscoverIdle;
  el.tracksSection.hidden = isDiscoverIdle;
  document.body.classList.toggle("discover-mode", state.activeView === "discover");
}

/* ===========================================================
   RENDER: POPULAR TRACKS TABLE
   =========================================================== */

function renderTracksTable(list = getFilteredSongs()) {
  el.tracksTableBody.innerHTML = "";
  el.noResultsMsg.hidden = list.length !== 0;
  if (list.length === 0) {
    el.noResultsMsg.textContent = getEmptyStateMessage();
  }

  list.forEach((song, i) => {
    const globalIndex = SONGS.findIndex((s) => s.id === song.id);
    const isPlaying = globalIndex === state.currentIndex;
    const isFav = state.favorites.has(song.id);

    const row = document.createElement("div");
    row.className = "track-row" + (isPlaying ? " playing" : "");
    row.setAttribute("role", "row");
    row.innerHTML = `
      <div class="track-num" role="cell">
        <button class="track-num-btn" aria-label="Play ${escapeHtml(song.title)}" data-action="play" data-index="${globalIndex}">
          <span class="track-num-text">${i + 1}</span>
          <svg class="track-num-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
      <button class="track-main" role="cell" data-action="play" data-index="${globalIndex}">
        <img class="track-art" src="${song.art}" alt="${escapeHtml(song.title)} album artwork" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_ART}';" />
        <span class="track-text">
          <p class="track-title">${escapeHtml(song.title)}</p>
          <p class="track-artist">${escapeHtml(song.artist)}</p>
        </span>
      </button>
      <span class="track-album" role="cell">${escapeHtml(song.album)}</span>
      <span class="track-duration" role="cell" data-duration-for="${song.id}">--:--</span>
      <div class="track-actions" role="cell">
        <button class="icon-btn favorite-btn${isFav ? " active" : ""} small" aria-label="${isFav ? "Remove from" : "Add to"} favorites" aria-pressed="${isFav}" data-action="favorite" data-id="${song.id}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </button>
        <button class="track-play-btn" aria-label="Play ${escapeHtml(song.title)}" data-action="play" data-index="${globalIndex}">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
    `;
    el.tracksTableBody.appendChild(row);
    primeDuration(song);
  });
}

/* Preload metadata to display durations in the list without playing */
const durationCache = new Map();
function primeDuration(song) {
  if (durationCache.has(song.id)) {
    setDurationText(song.id, durationCache.get(song.id));
    return;
  }
  const probe = new Audio();
  probe.preload = "metadata";
  probe.src = song.audio;
  probe.addEventListener("loadedmetadata", () => {
    durationCache.set(song.id, probe.duration);
    setDurationText(song.id, probe.duration);
  });
  probe.addEventListener("error", () => {
    durationCache.set(song.id, null);
    setDurationText(song.id, null);
  });
}

function setDurationText(songId, duration) {
  const cell = document.querySelector(`[data-duration-for="${songId}"]`);
  if (!cell) return;
  cell.textContent = duration ? formatTime(duration) : "--:--";
}

/* ===========================================================
   RENDER: BROWSE GRID (Playlists / Albums / Artists)
   =========================================================== */

function getPlaylistGroups() {
  const categories = [...new Set(SONGS.map((s) => s.category))];
  return categories.map((key) => {
    const songs = SONGS.filter((s) => s.category === key);
    return { key, label: CATEGORY_LABELS[key] || key, art: songs[0].art, count: songs.length };
  });
}

function getAlbumGroups() {
  const albums = [...new Set(SONGS.map((s) => s.album))];
  return albums.map((name) => {
    const songs = SONGS.filter((s) => s.album === name);
    return { name, artist: songs[0].artist, art: songs[0].art, count: songs.length };
  });
}

function getArtistGroups() {
  const artists = [...new Set(SONGS.map((s) => s.artist))];
  return artists.map((name) => {
    const songs = SONGS.filter((s) => s.artist === name);
    return { name, art: songs[0].art, count: songs.length };
  });
}

function renderBrowseGrid() {
  const view = state.activeView;
  if (!["playlists", "albums", "artists"].includes(view)) {
    el.browseSection.hidden = true;
    return;
  }

  el.browseSection.hidden = false;
  el.browseGrid.innerHTML = "";

  if (view === "playlists") {
    el.browseHeading.textContent = "Playlists";
    getPlaylistGroups().forEach((group) => {
      el.browseGrid.appendChild(
        buildBrowseCard({
          value: group.key,
          isActive: state.playlistFilter === group.key,
          art: group.art,
          title: group.label,
          sub: `${group.count} song${group.count === 1 ? "" : "s"}`,
          round: false,
        })
      );
    });
  } else if (view === "albums") {
    el.browseHeading.textContent = "Albums";
    getAlbumGroups().forEach((group) => {
      el.browseGrid.appendChild(
        buildBrowseCard({
          value: group.name,
          isActive: state.albumFilter === group.name,
          art: group.art,
          title: group.name,
          sub: group.artist,
          round: false,
        })
      );
    });
  } else if (view === "artists") {
    el.browseHeading.textContent = "Artists";
    getArtistGroups().forEach((group) => {
      el.browseGrid.appendChild(
        buildBrowseCard({
          value: group.name,
          isActive: state.artistFilter === group.name,
          art: group.art,
          title: group.name,
          sub: `${group.count} song${group.count === 1 ? "" : "s"}`,
          round: true,
        })
      );
    });
  }
}

function buildBrowseCard({ value, isActive, art, title, sub, round }) {
  const card = document.createElement("button");
  card.className = "browse-card" + (isActive ? " active" : "");
  card.dataset.value = value;
  card.setAttribute("aria-pressed", String(isActive));
  card.innerHTML = `
    <img class="browse-card-art${round ? " round" : ""}" src="${art}" alt="${escapeHtml(title)}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_ART}';" />
    <p class="browse-card-title">${escapeHtml(title)}</p>
    <p class="browse-card-sub">${escapeHtml(sub)}</p>
  `;
  return card;
}

function selectBrowseItem(value) {
  if (state.activeView === "playlists") state.playlistFilter = value;
  else if (state.activeView === "albums") state.albumFilter = value;
  else if (state.activeView === "artists") state.artistFilter = value;

  renderBrowseGrid();
  filterSongs();
}

/* ===========================================================
   RENDER: FEATURED CARD
   =========================================================== */

function renderFeatured() {
  const song = SONGS[state.currentIndex];
  el.featuredArt.src = song.art;
  el.featuredArt.alt = `Album artwork for ${song.title}`;
  el.featuredTitle.textContent = song.title;
  el.featuredArtist.textContent = song.artist;
  el.featuredAlbum.textContent = song.album;
  const isFav = state.favorites.has(song.id);
  setFavButtonState(el.featuredFavBtn, isFav, song.title);
}

/* ===========================================================
   RENDER: QUEUE ("Up Next")
   =========================================================== */

function renderQueue() {
  const upcoming = getUpcomingQueue();
  el.queueList.innerHTML = "";

  if (upcoming.length === 0) {
    el.queueList.innerHTML = `<p class="queue-empty">No more songs queued.</p>`;
    return;
  }

  upcoming.forEach((song, i) => {
    const globalIndex = SONGS.findIndex((s) => s.id === song.id);
    const item = document.createElement("button");
    item.className = "queue-item";
    item.dataset.index = globalIndex;
    item.innerHTML = `
      <span class="queue-item-num">${String(i + 1).padStart(2, "0")}</span>
      <img class="queue-item-art" src="${song.art}" alt="${escapeHtml(song.title)} album artwork" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_ART}';" />
      <span class="queue-item-text">
        <p class="queue-item-title">${escapeHtml(song.title)}</p>
        <p class="queue-item-artist">${escapeHtml(song.artist)}</p>
      </span>
    `;
    item.addEventListener("click", () => loadSong(globalIndex, { autoplay: true }));
    el.queueList.appendChild(item);
  });
}

function getUpcomingQueue() {
  // Show the next 6 songs in playlist order following the current track
  const upcoming = [];
  const total = SONGS.length;
  for (let i = 1; i < total && upcoming.length < 6; i++) {
    const idx = (state.currentIndex + i) % total;
    upcoming.push(SONGS[idx]);
  }
  return upcoming;
}

/* ===========================================================
   SONG LOADING / PLAYBACK
   =========================================================== */

function loadSong(index, { autoplay } = { autoplay: false }) {
  if (index < 0 || index >= SONGS.length) return;
  state.currentIndex = index;
  const song = SONGS[index];

  state.audio.src = song.audio;
  state.audio.load();
  clearAudioStatus();

  el.currentTimeEl.textContent = "0:00";
  el.durationEl.textContent = "0:00";
  el.npCurrentTimeEl.textContent = "0:00";
  el.npDurationEl.textContent = "0:00";
  setProgressUI(0);

  updatePlayerUI(song);
  renderFeatured();
  renderTracksTable();
  renderQueue();

  if (autoplay) {
    playSong();
  } else {
    setPlayingUI(false);
  }
}

function updatePlayerUI(song) {
  el.playerArt.src = song.art;
  el.playerArt.alt = `${song.title} album artwork`;
  el.playerTitle.textContent = song.title;
  el.playerArtist.textContent = song.artist;
  setFavButtonState(el.playerFavBtn, state.favorites.has(song.id), song.title);

  el.mobilePlayerArt.src = song.art;
  el.mobilePlayerTitle.textContent = song.title;
  el.mobilePlayerArtist.textContent = song.artist;

  el.npArt.src = song.art;
  el.npArt.alt = `${song.title} album artwork`;
  el.npTitle.textContent = song.title;
  el.npArtist.textContent = song.artist;
  el.npAlbum.textContent = song.album;
  setFavButtonState(el.npFavBtn, state.favorites.has(song.id), song.title);
}

function playSong() {
  const playPromise = state.audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        state.isPlaying = true;
        setPlayingUI(true);
        clearAudioStatus();
      })
      .catch(() => {
        // Missing/blocked audio file — fail gracefully, no console crash
        state.isPlaying = false;
        setPlayingUI(false);
        showAudioStatus("Audio file unavailable. Add the MP3 to assets/audio/");
      });
  }
}

function pauseSong() {
  state.audio.pause();
  state.isPlaying = false;
  setPlayingUI(false);
}

function togglePlayPause() {
  if (state.isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function setPlayingUI(isPlaying) {
  el.playIcon.hidden = isPlaying;
  el.pauseIcon.hidden = !isPlaying;
  el.mobilePlayIcon.hidden = isPlaying;
  el.mobilePauseIcon.hidden = !isPlaying;
  el.npPlayIcon.hidden = isPlaying;
  el.npPauseIcon.hidden = !isPlaying;
  el.playPauseBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  el.mobilePlayPauseBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  el.npPlayPauseBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  el.playerArt.classList.toggle("playing", isPlaying);
  el.mobilePlayerArt.classList.toggle("playing", isPlaying);
  el.npArt.classList.toggle("playing", isPlaying);
  el.featuredArt.classList.toggle("playing", isPlaying);
}

/* ===========================================================
   NEXT / PREVIOUS
   =========================================================== */

function nextSong() {
  let nextIndex;
  if (state.shuffle) {
    nextIndex = getRandomIndex(state.currentIndex);
  } else {
    nextIndex = (state.currentIndex + 1) % SONGS.length;
  }
  loadSong(nextIndex, { autoplay: true });
}

function previousSong() {
  // If more than ~3s in, restart current song instead of going back
  if (state.audio.currentTime > 3) {
    state.audio.currentTime = 0;
    if (!state.isPlaying) playSong();
    return;
  }
  let prevIndex;
  if (state.shuffle) {
    prevIndex = getRandomIndex(state.currentIndex);
  } else {
    prevIndex = (state.currentIndex - 1 + SONGS.length) % SONGS.length;
  }
  loadSong(prevIndex, { autoplay: true });
}

function getRandomIndex(excludeIndex) {
  if (SONGS.length <= 1) return excludeIndex;
  let idx;
  do {
    idx = Math.floor(Math.random() * SONGS.length);
  } while (idx === excludeIndex);
  return idx;
}

/* ===========================================================
   PROGRESS BAR
   =========================================================== */

function updateProgress() {
  const { currentTime, duration } = state.audio;
  if (!isFinite(duration) || duration === 0) return;

  const percent = (currentTime / duration) * 100;
  setProgressUI(percent);

  el.currentTimeEl.textContent = formatTime(currentTime);
  el.durationEl.textContent = formatTime(duration);
  el.progressBar.setAttribute("aria-valuenow", Math.round(percent));

  el.npCurrentTimeEl.textContent = formatTime(currentTime);
  el.npDurationEl.textContent = formatTime(duration);
  el.npProgressBar.setAttribute("aria-valuenow", Math.round(percent));
}

function setProgressUI(percent) {
  el.progressFill.style.width = `${percent}%`;
  el.progressHandle.style.left = `${percent}%`;
  el.mobileProgressFill.style.width = `${percent}%`;
  el.npProgressFill.style.width = `${percent}%`;
  el.npProgressHandle.style.left = `${percent}%`;
}

function setProgress(clientX, bar = el.progressBar) {
  const rect = bar.getBoundingClientRect();
  const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
  const duration = state.audio.duration;
  if (isFinite(duration) && duration > 0) {
    state.audio.currentTime = ratio * duration;
    setProgressUI(ratio * 100);
  }
}

function seekByStep(deltaSeconds) {
  const duration = state.audio.duration;
  if (!isFinite(duration) || duration === 0) return;
  state.audio.currentTime = Math.min(Math.max(state.audio.currentTime + deltaSeconds, 0), duration);
}

let draggingBar = null;

function setupSeekBar(bar) {
  bar.addEventListener("mousedown", (e) => {
    draggingBar = bar;
    setProgress(e.clientX, bar);
  });
  bar.addEventListener("touchstart", (e) => setProgress(e.touches[0].clientX, bar), { passive: true });
  bar.addEventListener("touchmove", (e) => setProgress(e.touches[0].clientX, bar), { passive: true });
  bar.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { seekByStep(5); e.preventDefault(); }
    if (e.key === "ArrowLeft") { seekByStep(-5); e.preventDefault(); }
  });
}

/* ===========================================================
   NOW PLAYING (FULL SCREEN MODAL)
   =========================================================== */

function isNowPlayingOpen() {
  return el.nowPlayingModal.classList.contains("open");
}

function openNowPlaying() {
  el.nowPlayingModal.hidden = false;
  el.nowPlayingModal.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.nowPlayingModal.classList.add("open"));
  });
}

function closeNowPlaying() {
  el.nowPlayingModal.classList.remove("open");
  el.nowPlayingModal.setAttribute("aria-hidden", "true");
  setTimeout(() => {
    el.nowPlayingModal.hidden = true;
  }, 320);
}

/* ===========================================================
   VOLUME
   =========================================================== */

function setVolume(value) {
  state.volume = value;
  state.muted = value === 0;
  state.audio.volume = value / 100;
  state.audio.muted = false;
  if (value > 0) state.lastVolume = value;
  updateVolumeUI();
}

function toggleMute() {
  if (state.muted) {
    state.muted = false;
    setVolume(state.lastVolume || 80);
  } else {
    state.lastVolume = state.volume || state.lastVolume;
    state.muted = true;
    state.audio.volume = 0;
    updateVolumeUI();
  }
}

function updateVolumeUI() {
  const displayValue = state.muted ? 0 : state.volume;
  el.volumeSlider.value = displayValue;
  el.volumeSlider.style.background = `linear-gradient(to right, var(--accent) ${displayValue}%, var(--secondary) ${displayValue}%)`;
  el.volIconHigh.hidden = state.muted || displayValue === 0;
  el.volIconMuted.hidden = !(state.muted || displayValue === 0);
  el.muteBtn.setAttribute("aria-label", state.muted || displayValue === 0 ? "Unmute" : "Mute");
}

/* ===========================================================
   SHUFFLE / REPEAT
   =========================================================== */

function toggleShuffle() {
  state.shuffle = !state.shuffle;
  el.shuffleBtn.setAttribute("aria-pressed", String(state.shuffle));
  el.npShuffleBtn.setAttribute("aria-pressed", String(state.shuffle));
}

function toggleRepeat() {
  const modes = ["off", "all", "one"];
  const nextIdx = (modes.indexOf(state.repeatMode) + 1) % modes.length;
  state.repeatMode = modes[nextIdx];
  el.repeatBtn.dataset.mode = state.repeatMode;
  el.repeatOneDot.hidden = state.repeatMode !== "one";
  el.npRepeatBtn.dataset.mode = state.repeatMode;
  el.npRepeatOneDot.hidden = state.repeatMode !== "one";
  const labels = { off: "Repeat off", all: "Repeat playlist on", one: "Repeat current song on" };
  el.repeatBtn.setAttribute("aria-label", labels[state.repeatMode]);
  el.npRepeatBtn.setAttribute("aria-label", labels[state.repeatMode]);
}

/* ===========================================================
   FAVORITES / LOCALSTORAGE
   =========================================================== */

function toggleFavorite(songId) {
  if (state.favorites.has(songId)) {
    state.favorites.delete(songId);
  } else {
    state.favorites.add(songId);
  }
  localStorage.setItem("vibewave_favorites", JSON.stringify([...state.favorites]));

  renderTracksTable();
  renderFeatured();
  const song = SONGS[state.currentIndex];
  if (song) {
    setFavButtonState(el.playerFavBtn, state.favorites.has(song.id), song.title);
    setFavButtonState(el.npFavBtn, state.favorites.has(song.id), song.title);
  }

  if (state.activeView === "favorites") filterSongs();
}

function setFavButtonState(button, isActive, songTitle) {
  button.classList.toggle("active", isActive);
  button.setAttribute("aria-pressed", String(isActive));
  button.setAttribute("aria-label", `${isActive ? "Remove" : "Add"} ${songTitle} ${isActive ? "from" : "to"} favorites`);
}

function popHeart(button) {
  button.classList.remove("pop");
  void button.offsetWidth; // restart animation
  button.classList.add("pop");
}

/* ===========================================================
   CATEGORY FILTERING
   =========================================================== */

function setActiveCategory(category) {
  state.activeCategory = category;
  document.querySelectorAll(".category-pill").forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.category === category);
  });
  filterSongs();
}

/* ===========================================================
   SIDEBAR NAVIGATION (Home / Favorites / etc.)
   =========================================================== */

function setActiveView(view) {
  state.activeView = view;
  el.navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === view);
  });

  el.categorySection.hidden = !isLibraryView(view);
  renderBrowseGrid();

  filterSongs();
  closeSidebar();
}

/* ===========================================================
   MOBILE SIDEBAR
   =========================================================== */

function openSidebar() {
  el.sidebar.classList.add("open");
  el.sidebarOverlay.classList.add("open");
  el.hamburgerBtn.setAttribute("aria-expanded", "true");
}

function closeSidebar() {
  el.sidebar.classList.remove("open");
  el.sidebarOverlay.classList.remove("open");
  el.hamburgerBtn.setAttribute("aria-expanded", "false");
}

function toggleSidebar() {
  el.sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
}

/* ===========================================================
   AUDIO STATUS / ERROR HANDLING
   =========================================================== */

function showAudioStatus(message) {
  el.audioStatus.textContent = message;
  el.audioStatus.hidden = false;
}

function clearAudioStatus() {
  el.audioStatus.hidden = true;
  el.audioStatus.textContent = "";
}

/* ===========================================================
   HELPERS
   =========================================================== */

function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ===========================================================
   EVENT LISTENERS
   =========================================================== */

function attachEventListeners() {
  // Fall back to a known-good image if any artwork fails to load
  [el.featuredArt, el.playerArt, el.mobilePlayerArt, el.npArt].forEach((img) => {
    img.addEventListener("error", () => {
      if (!img.src.endsWith(FALLBACK_ART)) img.src = FALLBACK_ART;
    });
  });

  // Audio element events
  state.audio.addEventListener("timeupdate", updateProgress);
  state.audio.addEventListener("loadedmetadata", updateProgress);
  state.audio.addEventListener("ended", handleSongEnded);
  state.audio.addEventListener("error", () => {
    state.isPlaying = false;
    setPlayingUI(false);
    showAudioStatus("Audio file unavailable. Add the MP3 to assets/audio/");
  });

  // Play/Pause
  el.playPauseBtn.addEventListener("click", togglePlayPause);
  el.mobilePlayPauseBtn.addEventListener("click", togglePlayPause);

  // Next / Previous
  el.nextBtn.addEventListener("click", nextSong);
  el.prevBtn.addEventListener("click", previousSong);
  el.mobileNextBtn.addEventListener("click", nextSong);
  el.mobilePrevBtn.addEventListener("click", previousSong);

  // Featured card
  el.featuredPlayBtn.addEventListener("click", () => loadSong(state.currentIndex, { autoplay: true }));
  el.featuredPlayPillBtn.addEventListener("click", () => loadSong(state.currentIndex, { autoplay: true }));
  el.featuredFavBtn.addEventListener("click", () => {
    toggleFavorite(SONGS[state.currentIndex].id);
    popHeart(el.featuredFavBtn);
  });

  // Player-bar favorite
  el.playerFavBtn.addEventListener("click", () => {
    toggleFavorite(SONGS[state.currentIndex].id);
    popHeart(el.playerFavBtn);
  });

  // Shuffle / Repeat
  el.shuffleBtn.addEventListener("click", toggleShuffle);
  el.repeatBtn.addEventListener("click", toggleRepeat);

  // Progress bar (click + drag) — desktop bar and Now Playing modal bar
  setupSeekBar(el.progressBar);
  setupSeekBar(el.npProgressBar);
  window.addEventListener("mousemove", (e) => {
    if (draggingBar) setProgress(e.clientX, draggingBar);
  });
  window.addEventListener("mouseup", () => {
    draggingBar = null;
  });

  // Volume
  el.volumeSlider.addEventListener("input", (e) => setVolume(Number(e.target.value)));
  el.muteBtn.addEventListener("click", toggleMute);

  // Search
  el.searchInput.addEventListener("input", (e) => searchSongs(e.target.value));
  el.clearSearchBtn.addEventListener("click", () => {
    el.searchInput.value = "";
    searchSongs("");
    el.searchInput.focus();
  });

  // Categories
  el.categoryPills.addEventListener("click", (e) => {
    const pill = e.target.closest(".category-pill");
    if (pill) setActiveCategory(pill.dataset.category);
  });

  el.browseGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".browse-card");
    if (card) selectBrowseItem(card.dataset.value);
  });

  // Sidebar nav
  el.navItems.forEach((item) => {
    item.addEventListener("click", () => setActiveView(item.dataset.view));
  });

  // Track table delegation (play + favorite)
  el.tracksTableBody.addEventListener("click", (e) => {
    const favBtn = e.target.closest('[data-action="favorite"]');
    if (favBtn) {
      toggleFavorite(Number(favBtn.dataset.id));
      popHeart(favBtn);
      return;
    }
    const playTarget = e.target.closest('[data-action="play"]');
    if (playTarget) {
      const index = Number(playTarget.dataset.index);
      loadSong(index, { autoplay: true });
    }
  });

  // Mobile sidebar toggle
  el.hamburgerBtn.addEventListener("click", toggleSidebar);
  el.sidebarOverlay.addEventListener("click", closeSidebar);
  el.mobileSearchBtn.addEventListener("click", () => {
    setActiveView("discover");
    requestAnimationFrame(() => el.searchInput.focus());
  });

  // Now Playing (full screen)
  const openNowPlayingFromTrigger = (e) => {
    if (e.target.closest(".favorite-btn")) return;
    openNowPlaying();
  };
  el.playerNowPlaying.addEventListener("click", openNowPlayingFromTrigger);
  el.playerNowPlaying.addEventListener("keydown", (e) => {
    if (e.key === "Enter") openNowPlayingFromTrigger(e);
  });
  el.mobilePlayerTap.addEventListener("click", () => openNowPlaying());
  el.mobilePlayerTap.addEventListener("keydown", (e) => {
    if (e.key === "Enter") openNowPlaying();
  });
  el.npCloseBtn.addEventListener("click", closeNowPlaying);
  el.nowPlayingBackdrop.addEventListener("click", closeNowPlaying);
  el.npPlayPauseBtn.addEventListener("click", togglePlayPause);
  el.npPrevBtn.addEventListener("click", previousSong);
  el.npNextBtn.addEventListener("click", nextSong);
  el.npShuffleBtn.addEventListener("click", toggleShuffle);
  el.npRepeatBtn.addEventListener("click", toggleRepeat);
  el.npFavBtn.addEventListener("click", () => {
    toggleFavorite(SONGS[state.currentIndex].id);
    popHeart(el.npFavBtn);
  });

  // Keyboard controls
  document.addEventListener("keydown", handleKeyboardShortcuts);
}

function handleSongEnded() {
  if (state.repeatMode === "one") {
    state.audio.currentTime = 0;
    playSong();
    return;
  }

  const isLastSong = state.currentIndex === SONGS.length - 1;
  if (isLastSong && !state.shuffle && state.repeatMode === "off") {
    // Stop after the final track when not repeating
    setPlayingUI(false);
    state.isPlaying = false;
    return;
  }

  nextSong();
}

function handleKeyboardShortcuts(e) {
  const activeTag = document.activeElement.tagName;
  const isTyping = activeTag === "INPUT" || activeTag === "TEXTAREA";

  if (e.key === "Escape") {
    if (isNowPlayingOpen()) {
      closeNowPlaying();
      return;
    }
    closeSidebar();
    if (isTyping) document.activeElement.blur();
    return;
  }

  if (isTyping) return;

  const onSeekBar = document.activeElement === el.progressBar || document.activeElement === el.npProgressBar;

  if (e.code === "Space") {
    e.preventDefault();
    togglePlayPause();
  } else if (e.key === "ArrowRight" && !onSeekBar) {
    nextSong();
  } else if (e.key === "ArrowLeft" && !onSeekBar) {
    previousSong();
  }
}

/* ===========================================================
   START
   =========================================================== */

document.addEventListener("DOMContentLoaded", initializePlayer);
