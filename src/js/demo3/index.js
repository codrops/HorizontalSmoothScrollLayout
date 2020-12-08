import {preloadImages, preloadFonts, clamp, map} from '../utils';
import Cursor from '../cursor';
import LocomotiveScroll from 'locomotive-scroll';

const lscroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    direction: 'horizontal'
});

// let's scale the images when scrolling.
lscroll.on('scroll', (obj) => {
    for (const key of Object.keys(obj.currentElements)) {
        if ( obj.currentElements[key].el.classList.contains('gallery__item-imginner') ) {
            let progress = obj.currentElements[key].progress;
            const scaleVal = progress < 0.5 ? clamp(map(progress,0,0.5,0.2,1),0.2,1) : clamp(map(progress,0.5,1,1,0.2),0.2,1);
            obj.currentElements[key].el.parentNode.style.transform = `scale(${scaleVal})`
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
    [...document.querySelectorAll('a,.gallery__item-img,.gallery__item-number')].forEach(link => {
        link.addEventListener('mouseenter', () => cursor.enter());
        link.addEventListener('mouseleave', () => cursor.leave());
    });
});