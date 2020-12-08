import {preloadImages, preloadFonts, clamp, map} from '../utils';
import Cursor from '../cursor';
import LocomotiveScroll from 'locomotive-scroll';

const lscroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    direction: 'horizontal'
});

// let's skew the images when scrolling. The faster we scroll the higher the skew value
// skew interval from -15 to 15
// "fast scrolling" means the distance from the previous scrolling position to the current one is high. We consider a interval of [-50,50] for the min/max distance
let scroll = {cache: 0, current: 0};
const allImgs = [...document.querySelectorAll('.gallery__item-img')];
lscroll.on('scroll', (obj) => {
    scroll.current = obj.scroll.x;
    const distance = scroll.current - scroll.cache;
    scroll.cache = scroll.current;
    const skewVal = map(distance, -50, 50, -15, 15);
    allImgs.forEach(el => el.style.transform = 'skewX('+clamp(skewVal, -15, 15)+'deg)');
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