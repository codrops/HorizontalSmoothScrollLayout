import {preloadImages, preloadFonts, clamp, map} from '../utils';
import Cursor from '../cursor';
import LocomotiveScroll from 'locomotive-scroll';

// Initialize Locomotive Scroll (horizontal direction)
const lscroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    direction: 'horizontal'
});

lscroll.on('scroll', (obj) => {
    for (const key of Object.keys(obj.currentElements)) {
        if ( obj.currentElements[key].el.classList.contains('gallery__item-imginner') ) {
            let progress = obj.currentElements[key].progress;
            const saturateVal = progress < 0.5 ? clamp(map(progress,0,0.5,0,1),0,1) : clamp(map(progress,0.5,1,1,0),0,1);
            const brightnessVal = progress < 0.5 ? clamp(map(progress,0,0.5,0,1),0,1) : clamp(map(progress,0.5,1,1,0),0,1);
            obj.currentElements[key].el.style.filter = `saturate(${saturateVal}) brightness(${brightnessVal})`
        }
    }
});
lscroll.update();

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