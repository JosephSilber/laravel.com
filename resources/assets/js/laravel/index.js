import stickySidebar from './sticky-sidebar.js';
import headingLinks from './heading-links.js';
import smoothScroll from './smooth-scroll.js';
import quoteStyles from './quote-styles.js';
import slideMenu from './slide-menu.js';
import search from './search.js';

jQuery(function ($) {
    // The sticky sidebar has to override some styles
    // applied by Scotch so we'll make sure to run
    // scotch before running the sticky sidebar.
    slideMenu($);
    stickySidebar($);
    headingLinks($);
    smoothScroll($);
    quoteStyles($);
    search($);
});
