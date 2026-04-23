const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

const closeBtn = document.getElementById('close');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 0;
let isOpen = false;

/* OPEN LIGHTBOX */
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    openLightbox();
  });
});

function openLightbox() {
  isOpen = true;
  lightbox.classList.add('active');
  updateImage();
}

/* UPDATE IMAGE */
function updateImage() {
  const fullSrc = images[currentIndex].dataset.full;

  lightboxImg.src = fullSrc;

  // preload next/prev
  const next = (currentIndex + 1) % images.length;
  const prev = (currentIndex - 1 + images.length) % images.length;

  new Image().src = images[next].dataset.full;
  new Image().src = images[prev].dataset.full;
}

/* NEXT */
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
});

/* PREV */
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
});

/* CLOSE */
function closeLightbox() {
  isOpen = false;
  lightbox.classList.remove('active');
}

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

/* KEYBOARD */
document.addEventListener('keydown', (e) => {
  if (!isOpen) return;

  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'Escape') closeLightbox();
});