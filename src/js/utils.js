const imagesLoaded = require('imagesloaded');

// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Gets the mouse position
const getMousePos = e => {
    return { 
        x : e.clientX, 
        y : e.clientY 
    };
};

// Preload images
const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};

// Preload images
const preloadFonts = (id) => {
    return new Promise((resolve) => {
        WebFont.load({
            typekit: {
                id: id
            },
            active: resolve
        });
    });
};

export {
    map, 
    lerp, 
    clamp,
    randomNumber,
    getMousePos,
    preloadImages,
    preloadFonts
};