export default function ($) {
    var scotchPanel = $('#slide-menu').scotchPanel({
        containerSelector: 'body',
        direction: 'left',
        duration: 300,
        transition: 'ease',
        distanceX: '70%',
        forceMinHeight: true,
        minHeight: '2500px',
        enableEscapeKey: true
    }).show(); // show to avoid flash of content

    $('.toggle-slide').click(function() {
        scotchPanel.css('overflow', 'scroll');
        scotchPanel.toggle();
        return false;
    });

    $('.overlay').click(function() {
        // CLOSE ONLY
        scotchPanel.close();
    });
};
