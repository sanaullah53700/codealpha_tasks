# FrameGallery 🖼️

A clean, responsive photography gallery web app built with **HTML, CSS, and vanilla JavaScript**. FrameGallery showcases a curated collection of photography across Nature, Travel, Architecture, and People — with category filtering and a full-featured lightbox viewer.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

![FrameGallery hero section preview](screenshots/hero-preview.png)

## Features

- **Responsive layout** — adapts cleanly from mobile to desktop
- **Category filtering** — browse the full collection or filter by Nature, Travel, Architecture, or People
- **Lightbox viewer** — click any image to open a full-size view with title, category, and a counter
- **Keyboard & button navigation** — move between images with Next/Previous controls
- **Smooth UI details** — sticky navbar, hero section with scroll cue, and an animated mobile nav toggle

## Tech Stack

| Layer         | Technology |
|---------------|------------|
| Structure     | HTML5 |
| Styling       | CSS3 (Flexbox/Grid, responsive design) |
| Interactivity | Vanilla JavaScript (DOM manipulation, event handling) |
| Image source  | [Unsplash](https://unsplash.com) |

No frameworks, build tools, or external JS libraries are used — everything is implemented from scratch.

## Project Structure

```
.
├── index.html      # Page markup: navbar, hero, gallery grid, about, footer, lightbox
├── style.css       # All styling, layout, and responsive rules
├── script.js       # Gallery rendering, category filtering, lightbox logic
└── README.md
```

## Getting Started

No build step required — it's a static site.

1. Clone the repository
   ```bash
   git clone https://github.com/sanaullah53700/codealpha_tasks.git
   cd codealpha_tasks/CodeAlpha_ImageGallery
   ```
2. Open `index.html` directly in your browser, **or** serve it locally:
   ```bash
   npx serve .
   ```

## How It Works

- `script.js` holds the image data (title, category, and image URL) and renders the gallery grid dynamically into `#galleryGrid`.
- Clicking a filter button (`data-filter` attribute) re-renders the grid to show only matching images.
- Clicking any gallery image opens the `.lightbox` modal, populating the image, title, category, and position counter (e.g. "3 / 12").
- The lightbox's Next/Previous buttons cycle through the currently filtered image set, wrapping around at both ends.

## About This Project

This project was built as part of the **CodeAlpha** internship tasks.

## License

This project is open source and available for learning purposes.
