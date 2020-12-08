import {preloadImages, preloadFonts} from '../utils';
import Cursor from '../cursor';
import LocomotiveScroll from 'locomotive-scroll';

// Initialize Locomotive Scroll (horizontal direction)
const lscroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    direction: 'horizontal'
});

// Preload images and fonts
Promise.all([preloadImages('.gallery__item-imginner'), preloadFonts('vxy2fer')]).then(() => {
    // Remove loader (loading class)
    document.body.classList.remove('loading');

    // Initialize custom cursor
    const cursor = new Cursor(document.querySelector('.cursor'));

    // Mouse effects on all links and others
    [...document.querySelectorAll('a')].forEach(link => {
        link.addEventListener('mouseenter', () => cursor.enter());
        link.addEventListener('mouseleave', () => cursor.leave());
    });
});