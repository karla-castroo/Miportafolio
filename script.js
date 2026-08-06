// --- MODO OSCURO / CLARO ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-theme');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// --- EFECTO DE ESCRITURA (TYPING EFFECT) ---
const typedTextSpan = document.getElementById("typed-text");
const textArray = ["Desarrolladora Full Stack", "Desarrolladora Back End", "Analista de Datos"];
const typingDelay = 80;
const erasingDelay = 40;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if (textArray.length) setTimeout(type, newTextDelay);
});

// --- MENÚ HAMBURGUESA (MÓVIL) ---
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
});

// --- SCROLL SPY (ILUMINAR LETRAS DEL MENÚ AL BAJAR) ---
const sections = document.querySelectorAll("section, header");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 250)) { 
            current = section.getAttribute("id");
        }
    });

    navItems.forEach((li) => {
        li.classList.remove("active");
        if (li.getAttribute("href").includes(current)) {
            li.classList.add("active");
        }
    });
});

// --- ANIMACIÓN AL HACER SCROLL (FADE-IN) ---
const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

hiddenElements.forEach((el) => observer.observe(el));

// --- SISTEMA DE GALERÍA Y LIGHTBOX ---
let galleryImages = [];
let galleryCaptions = [];
let currentIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

function openLightbox(imageSrc, captionText) {
    galleryImages = [imageSrc];
    galleryCaptions = [captionText];
    currentIndex = 0;
    updateLightboxUI();
    lightbox.style.display = 'block';
}

function openGallery(imagesArray, captionsArray) {
    galleryImages = imagesArray;
    galleryCaptions = captionsArray || [];
    currentIndex = 0;
    updateLightboxUI();
    lightbox.style.display = 'block';
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function changeGalleryImage(direction) {
    currentIndex += direction;
    if (currentIndex >= galleryImages.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = galleryImages.length - 1;
    }
    updateLightboxUI();
}

function updateLightboxUI() {
    lightboxImg.src = galleryImages[currentIndex];
    
    if(galleryCaptions && galleryCaptions[currentIndex]) {
        lightboxCaption.innerText = galleryCaptions[currentIndex];
    } else {
        lightboxCaption.innerText = '';
    }

    if (galleryImages.length > 1) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
}