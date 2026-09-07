/* =========================================================
   FrameGallery — script.js
   Handles: gallery rendering, category filtering, lightbox
   navigation, mobile nav, smooth scroll, keyboard controls.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. GALLERY DATA
     Each image has: id, category, title, caption, src, alt.
     A single source of truth used to render the grid and to
     drive the lightbox (so filtering and navigation stay in sync).
  --------------------------------------------------------- */
  const galleryImages = [
    {
      id: 1,
      category: 'nature',
      title: 'Mountain Sunrise',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80',
      alt: 'Sun rising over a misty mountain range'
    },
    {
      id: 2,
      category: 'nature',
      title: 'Forest Path',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80',
      alt: 'Sunlit path winding through a green forest'
    },
    {
      id: 3,
      category: 'nature',
      title: 'Alpine Reflection',
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=80',
      alt: 'Mountain range reflected in a still lake'
    },
    {
      id: 4,
      category: 'nature',
      title: 'Golden Hour',
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
      alt: 'Warm golden light over a mountain lake at dusk'
    },
    {
      id: 5,
      category: 'travel',
      title: 'Winding Road',
      src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80',
      alt: 'A winding road cutting through green mountains'
    },
    {
      id: 6,
      category: 'travel',
      title: 'Desert Journey',
      src: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1000&q=80',
      alt: 'Rolling sand dunes under a wide desert sky'
    },
    {
      id: 7,
      category: 'travel',
      title: 'Ocean Escape',
      src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
      alt: 'Turquoise ocean water meeting a sandy shore'
    },
    {
      id: 8,
      category: 'travel',
      title: 'Northern Peaks',
      src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80',
      alt: 'Aurora-lit sky above a range of snowy peaks'
    },
    {
      id: 9,
      category: 'architecture',
      title: 'City Lights',
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=80',
      alt: 'City skyline illuminated at night'
    },
    {
      id: 10,
      category: 'architecture',
      title: 'Urban Architecture',
      src: 'https://images.unsplash.com/photo-1470723710355-95304d8aece4?auto=format&fit=crop&w=1000&q=80',
      alt: 'Glass skyscrapers viewed from below'
    },
    {
      id: 11,
      category: 'architecture',
      title: 'Modern Lines',
      src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=80',
      alt: 'Interior of a building with modern geometric lines'
    },
    {
      id: 12,
      category: 'architecture',
      title: 'Facade Study',
      src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80',
      alt: 'Close-up of a building facade pattern'
    },
    {
      id: 13,
      category: 'people',
      title: 'Street Moments',
      src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
      alt: 'A candid moment of people walking on a city street'
    },
    {
      id: 14,
      category: 'people',
      title: 'Quiet Portrait',
      src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
      alt: 'Portrait of a person in soft natural light'
    },
    {
      id: 15,
      category: 'people',
      title: 'Candid Smile',
      src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
      alt: 'Close-up portrait of a person smiling'
    },
    {
      id: 16,
      category: 'people',
      title: 'Everyday Life',
      src: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1000&q=80',
      alt: 'A person captured in an everyday moment'
    }
  ];

  /* ---------------------------------------------------------
     2. DOM REFERENCES
  --------------------------------------------------------- */
  const galleryGrid = document.getElementById('galleryGrid');
  const filtersBar = document.getElementById('filters');
  const filterButtons = filtersBar.querySelectorAll('.filter-btn');

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  const lightbox = document.getElementById('lightbox');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  // Tracks which images are currently visible under the active filter.
  // The lightbox only ever navigates within this list, so Prev/Next
  // stay correct after filtering.
  let visibleImages = [...galleryImages];
  let currentIndex = 0;
  let activeFilter = 'all';

  /* ---------------------------------------------------------
     3. RENDER GALLERY
     Builds one card per image and wires its click-to-open handler.
  --------------------------------------------------------- */
  function renderGallery(images) {
    galleryGrid.innerHTML = '';

    images.forEach((image) => {
      const card = document.createElement('article');
      card.className = 'gallery-card';
      card.dataset.category = image.category;
      card.dataset.id = image.id;
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View ${image.title} in full screen`);

      card.innerHTML = `
        <img class="gallery-card__img" src="${image.src}" alt="${image.alt}" loading="lazy" />
        <span class="gallery-card__view" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </span>
        <div class="gallery-card__overlay">
          <span class="gallery-card__category">${image.category}</span>
          <p class="gallery-card__caption">${image.title}</p>
        </div>
      `;

      // Open the lightbox for this specific image.
      card.addEventListener('click', () => openLightbox(image.id));
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(image.id);
        }
      });

      galleryGrid.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     4. CATEGORY FILTERING
  --------------------------------------------------------- */
  function applyFilter(filter) {
    activeFilter = filter;

    visibleImages = filter === 'all'
      ? [...galleryImages]
      : galleryImages.filter((image) => image.category === filter);

    renderGallery(visibleImages);

    // Update active state + aria-selected on the filter buttons.
    filterButtons.forEach((btn) => {
      const isActive = btn.dataset.filter === filter;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });
  }

  filtersBar.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-btn');
    if (!button) return;
    applyFilter(button.dataset.filter);
  });

  /* ---------------------------------------------------------
     5. LIGHTBOX
  --------------------------------------------------------- */
  function openLightbox(imageId) {
    const index = visibleImages.findIndex((image) => image.id === imageId);
    if (index === -1) return;

    currentIndex = index;
    updateLightboxContent();

    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const image = visibleImages[currentIndex];

    lightboxImage.src = image.src.replace('w=1000', 'w=1600');
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = image.title;
    lightboxCategory.textContent = image.category;
    lightboxCounter.textContent = `${currentIndex + 1} / ${visibleImages.length}`;
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    updateLightboxContent();
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % visibleImages.length;
    updateLightboxContent();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrevImage);
  lightboxNext.addEventListener('click', showNextImage);

  // Keyboard controls: only respond while the lightbox is open.
  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;

    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPrevImage();
    if (event.key === 'ArrowRight') showNextImage();
  });

  /* ---------------------------------------------------------
     6. MOBILE NAVIGATION
  --------------------------------------------------------- */
  function toggleMobileNav() {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  navToggle.addEventListener('click', toggleMobileNav);

  // Close the mobile menu after a link is tapped.
  navMenu.querySelectorAll('.navbar__link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------
     7. NAVBAR SCROLL STATE
     Adds a background/border to the navbar once the page scrolls.
  --------------------------------------------------------- */
  function handleNavbarScroll() {
    navbar.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ---------------------------------------------------------
     8. INIT
  --------------------------------------------------------- */
  renderGallery(galleryImages);
  handleNavbarScroll();
});
