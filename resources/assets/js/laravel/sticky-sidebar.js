export default function ($) {
    const $scotch = $('.scotch-panel-canvas');
    const $footer = $('footer.main');
    const $body = $(document.body);
    const $sidebar = $('.sidebar');
    const $document = $(document);
    const $header = $('nav.main');
    const $window = $(window);

    if ($sidebar.length === 0) {
        return;
    }

    // Since we may need to set the sidebar's position to fixed, we will
    // remove any previously-applied transform on the $scotch element.
    // Otherwise the sidebar will be positioned relative to scotch.
    function resetScotchTransform () {
        $scotch.css('transform', '');
    }

    $document.on('scotch.closed', resetScotchTransform);

    resetScotchTransform();

    const sidebarHeight = $sidebar.outerHeight();
    const footerHeight = $footer.outerHeight();
    const headerHeight = $header.outerHeight();

    let documentHeight = $document.height();
    let windowHeight = $window.height();
    let scrolled = false;
    let position = 0;

    function recalculate () {
        documentHeight = $document.height();
        windowHeight = $window.height();

        onScroll();
    }

    $window.on('scroll', () => scrolled = true);

    $window.on('resize', recalculate);

    // Some stuff, such as Prism, runs asynchronously and change
    // the document height. To make sure our calculations add
    // up, we will recalculate heights after a short delay.
    setTimeout(recalculate, 250);

    setInterval(() => {
        if (scrolled) {
            onScroll();

            scrolled = false;
        }
    }, 100);

    function onScroll () {
        var newPosition = $body.scrollTop();
        var scrollingUp = newPosition < position;

        position = newPosition;

        scrollingUp ? Position.onScrollUp() : Position.onScrollDown();
    }

    const Position = {
        status: 0,

        statuses: {
            static: 0,
            absolute: 1,
            fixedToTop: 2,
            fixedToBottom: 3,
            fixedToFooter: 4,
        },

        toStatus (status, callback) {
            if (this.status === status) return;

            callback();

            this.status = status;
        },

        onScrollDown () {
            if (this.atBottomOfSidebar()) {
                this.atFooter() ? this.affixToFooter() : this.affixToBottom();
            } else if (this.status !== this.statuses.static) {
                this.affixAbsolutelyToCurrentPosition();
            }
        },

        onScrollUp () {
            if (this.status === this.statuses.static) {
                return;
            }

            if (this.atTopOfSidebar()) {
                this.atHeader() ? this.staticallyPosition() : this.affixToTop();
            } else if ( ! this.atFooter()) {
                this.affixAbsolutely();
            }
        },

        staticallyPosition () {
            this.toStatus(this.statuses.static, () => {
                $sidebar.css({
                    position: 'static',
                    bottom: '',
                    top: '',
                });
            });
        },

        affixToTop () {
            this.toStatus(this.statuses.fixedToTop, () => {
                $sidebar.css({
                    position: 'fixed',
                    bottom: '',
                    top: 0,
                });
            });
        },

        affixToBottom () {
            this.toStatus(this.statuses.fixedToBottom, () => {
                $sidebar.css({
                    position: 'fixed',
                    bottom: 0,
                    top: '',
                });
            });
        },

        affixToFooter () {
            this.toStatus(this.statuses.fixedToFooter, () => {
                $sidebar.css({
                    position: 'absolute',
                    bottom: footerHeight,
                    top: '',
                });
            });
        },

        affixAbsolutely () {
            this.toStatus(this.statuses.absolute, () => {
                $sidebar.css({
                    position: 'absolute',
                    top: this.getTopForAbsolutePosition(),
                    bottom: '',
                });
            });
        },

        affixAbsolutelyToCurrentPosition () {
            this.toStatus(this.statuses.absolute, () => {
                $sidebar.css({
                    position: 'absolute',
                    top: position,
                    bottom: '',
                });
            });
        },

        getTopForAbsolutePosition () {
            return position + windowHeight - sidebarHeight;
        },

        atTopOfSidebar () {
            return $sidebar.offset().top >= position;
        },

        atBottomOfSidebar () {
            return position > $sidebar.offset().top + sidebarHeight - windowHeight;
        },

        atHeader () {
            return position <= headerHeight;
        },

        atFooter () {
            return position >= documentHeight - windowHeight - footerHeight;
        },
    };
}
