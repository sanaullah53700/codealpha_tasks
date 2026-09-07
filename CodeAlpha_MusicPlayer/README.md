# VibeWave 🎧

**VibeWave** is a modern, premium music-streaming interface built entirely with **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build tools, no backend. It uses the native **HTML5 Audio API** to deliver a full-featured playback experience with a clean, dark, Spotify/Apple-Music-inspired UI.

---

## ✨ Features

### Browsing & Discovery
- **Home** — featured track spotlight, mood categories (Chill, Focus, Workout, Night, Travel, Dreamy), and a full popular-tracks table
- **Discover** — a dedicated search view (search bar lives only here) for finding songs, artists, or albums instantly
- **Favorites** — save/unsave any track with a heart toggle, persisted via `localStorage`
- **Playlists / Albums / Artists** — auto-grouped library browsing generated from the song catalog
- **Up Next queue** — shows the next 6 tracks in play order

### Playback
- Play / Pause, Previous / Next, Shuffle, and 3-state Repeat (off → all → one)
- Draggable/keyboard-seekable progress bar with live current-time / duration display
- Volume control with mute toggle
- Graceful fallback messaging if an audio file is missing or fails to load

### Now Playing (full-screen)
- Click the album art or track info in the bottom player (desktop or mobile) to open a full-screen **Now Playing** view
- Large spinning album-art disc, title/artist/album, seek bar, and all playback controls (play/pause, prev/next, shuffle, repeat, favorite)
- Closes via the ✕ button, backdrop click, or <kbd>Esc</kbd>

### Visual Details
- **Rotating "disc" album art** — the artwork on the bottom player, mobile player, featured card, and Now Playing screen spins like a vinyl record while a track is playing and freezes when paused
- Smooth fade/scale animations, glowing accents, and a fully responsive layout (desktop sidebar + queue panel → mobile hamburger nav + compact bottom player)

### Keyboard Shortcuts
| Key | Action |
|---|---|
| `Space` | Play / Pause |
| `→` / `←` | Next / Previous track (or seek ±5s when a progress bar is focused) |
| `Esc` | Close the Now Playing screen, or the mobile sidebar |

---

## 🛠 Tech Stack

- **HTML5** — semantic markup for the entire interface
- **CSS3** — layout (Flexbox/Grid), custom properties, keyframe animations, responsive media queries
- **JavaScript (ES6+)** — all interactivity and state management, powered by the native `HTMLAudioElement` API

No external libraries, frameworks, or package dependencies are used.

---

## 📁 Project Structure

```
Music Player/
├── index.html              # App markup (sidebar, player, Now Playing modal, etc.)
├── style.css                # All styling and animations
├── script.js                 # App state, rendering, and playback logic
└── assets/
    ├── audio/                # MP3 files for each track
    │   └── README.txt        # Notes + copyright info for audio sources
    └── images/                # Album artwork (SVG placeholders)
        └── README.txt         # Notes on artwork sources
```

---

## 🚀 Getting Started

No installation or build step required.

**Option 1 — Open directly**
Double-click `index.html` to open it in your browser.

**Option 2 — Serve locally (recommended)**
Some browsers restrict audio/asset loading from `file://` paths. Serving over HTTP avoids this:

```bash
# Using Node.js
npx serve .

# ...or using Python
python -m http.server 5173
```

Then visit `http://localhost:5173` (or whichever port your server prints).

---

## 🎨 Customizing the Song Library

Songs are defined in the `SONGS` array near the top of `script.js`:

```js
{
  id: 1,
  title: "Heaven on the Earth",
  artist: "L.D.B",
  album: "Time to Chill",
  category: "dreamy",
  audio: "assets/audio/heaven-on-earth.mp3",
  art: "assets/images/heaven-on-earth.svg",
}
```

**To add or replace a track:**
1. Drop your audio file into `assets/audio/` and your artwork into `assets/images/`.
2. Add or edit the corresponding entry in the `SONGS` array in `script.js`.
3. See `assets/audio/README.txt` and `assets/images/README.txt` for more detail.

---

## ⚠️ Important: Audio Licensing

Some of the audio files currently in `assets/audio/` are **commercially released, copyrighted recordings**, included only for local development/testing. **Do not** publish this repository publicly (GitHub, a portfolio, a course submission, etc.) with those files included — that would be copyright infringement.

Before making this project public:
1. Remove any copyrighted tracks from `assets/audio/`.
2. Replace them with your own royalty-free tracks or original placeholder audio.
3. Update the corresponding `audio` paths in `script.js`.

See `assets/audio/README.txt` for the full breakdown of which files are affected.

---

## 🌐 Browser Support

Works in all modern evergreen browsers (Chrome, Edge, Firefox, Safari) that support the HTML5 Audio API and CSS Grid/Flexbox.

---

## 📄 License

This project's code (HTML/CSS/JS) is free to use and modify. Media assets (audio/images) are subject to their own licensing — see the notices in `assets/audio/README.txt` and `assets/images/README.txt` before redistributing.
