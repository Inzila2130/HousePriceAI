/*=========================================
HousePriceAI
Premium JavaScript
=========================================*/

/*=========================
Mobile Navigation
=========================*/

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });

}


/*=========================
Smooth Navigation
=========================*/

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/*=====================================
PROPERTY PASSPORT GALLERY
=====================================*/

const images = [

    "/static/images/properties/front-exterior.jpg",
    "/static/images/properties/living-room.jpg",
    "/static/images/properties/modern-kitchen.jpg",
    "/static/images/properties/master-bedroom.jpg",
    "/static/images/properties/back-garden.jpg"

];

const captions = [

    "Front Exterior",
    "Luxury Living Room",
    "Modern Kitchen",
    "Master Bedroom",
    "Back Garden"

];

let current = 0;

const image = document.getElementById("property-image");
const caption = document.getElementById("image-caption");
const counter = document.getElementById("image-counter");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const dots = document.querySelectorAll(".dot");

function updateGallery() {

    if (!image || !caption || !counter) return;

    image.src = images[current];
    caption.textContent = captions[current];
    counter.textContent = `${current + 1} / ${images.length}`;

    dots.forEach(dot => dot.classList.remove("active"));

    if (dots[current]) {

        dots[current].classList.add("active");

    }

}

updateGallery();

if (nextBtn) {

    nextBtn.addEventListener("click", function () {

        current++;

        if (current >= images.length) {

            current = 0;

        }

        updateGallery();

    });

}

if (prevBtn) {

    prevBtn.addEventListener("click", function () {

        current--;

        if (current < 0) {

            current = images.length - 1;

        }

        updateGallery();

    });

}

dots.forEach((dot, index) => {

    dot.addEventListener("click", function () {

        current = index;

        updateGallery();

    });

});


/*=====================================
COUNTER ANIMATION
=====================================*/

function animateCounter(id, target, duration) {

    const element = document.getElementById(id);

    if (!element) return;

    let start = 0;

    const increment = target / (duration / 16);

    function update() {

        start += increment;

        if (start < target) {

            element.innerText = Math.floor(start);

            requestAnimationFrame(update);

        }

        else {

            element.innerText = target;

        }

    }

    update();

}


/*=====================================
STATISTICS OBSERVER
=====================================*/

const stats = document.getElementById("statistics-room");

let played = false;

function playCounters() {

    console.log("playCounters called");

    animateCounter("mae-counter", 210, 1500);
    animateCounter("rmse-counter", 320, 1500);
    animateCounter("r2-counter", 91, 1500);
    animateCounter("dataset-counter", 545, 1800);

}

if (stats) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                playCounters();

            }

        });

    }, {

        threshold: 0.3

    });

    observer.observe(stats);

    // If already visible on page load
    const rect = stats.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {

        playCounters();

    }

}


/*=====================================
SCROLL FADE
=====================================*/

const sections = document.querySelectorAll(

    ".room-section,.directory-section"

);

const fadeObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-up");

        }

    });

}, {

    threshold: 0.15

});

sections.forEach(section => {

    fadeObserver.observe(section);

});


/*=====================================
ACTIVE NAV
=====================================*/

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    document.querySelectorAll("section").forEach(section => {

        const top = section.offsetTop - 120;

        if (window.pageYOffset >= top) {

            currentSection = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});


/*=====================================
IMAGE PRELOAD
=====================================*/

images.forEach(src => {

    const img = new Image();

    img.src = src;

});


/*=====================================
END
=====================================*/


window.addEventListener("load", function () {

    playCounters();

});
console.log("🏠 HousePriceAI Loaded Successfully");