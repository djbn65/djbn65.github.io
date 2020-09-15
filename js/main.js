function adjustFontSizes() {
    var centerPageBox = $('.center-page-box');

    if($(window).width() > 814) {
        centerPageBox.css('top', $(window).height() / 2 - $('.center-page-box').height() / 2);
    } else {
        centerPageBox.css('top', '');
    }
}

function adjustBoxWidths() {
    if(window.localStorage.getItem('activePage') === '#education') {
        $('.extracurricular-grid').css('width', $('#education .large-box').innerWidth() + 'px');
    }
}

function setupCenterBoxes() {
    var activePage = window.localStorage.getItem('activePage');

    if(!activePage) {
        activePage = '#about';
    }

    $('.center-page-box').each(function(index, value) {
        if($(this).is($(activePage))) {
            $(this).css('left', '50%');
        }
    });
}

$(document).ready(() => {
    adjustFontSizes();
    setupCenterBoxes();

    var activePage = window.localStorage.getItem('activePage');

    if(!activePage) {
        activePage = '#about';
    }
});

$(window).resize(() => {
    adjustFontSizes();
    adjustBoxWidths();
});

$('.navbar-collapse').on('show.bs.collapse', () => {
    $('.navbar').addClass('expanded');
});

$('.navbar-collapse').on('shown.bs.collapse', () => {
    $('.navbar-collapse').addClass('expanded');
});

$('.navbar-collapse').on('hide.bs.collapse', () => {
    $('.navbar').removeClass('expanded');
    $('.navbar-collapse').removeClass('expanded');    
});

$('.navbar-nav > li > a').click(() => {
    $('.navbar-collapse').collapse('hide');
});

$('.navbar-brand').click(() => {
    $('.navbar-collapse').collapse('hide');
});

$('.navbar a').click(function(e) {
    e.preventDefault();

    var prevActivePage = window.localStorage.getItem('activePage');

    window.localStorage.setItem('activePage', $(this)[0].hash);

    var activePage = window.localStorage.getItem('activePage');

    $('.navbar a.active').removeClass('active');
    $(this).addClass('active');

    adjustBoxWidths();

    if($('.center-page-box').index($(prevActivePage)) > $('.center-page-box').index($(activePage))) {
        $(activePage).css('left', '-150%');
        $(prevActivePage).animate({
            left: '150%',
            opacity: 0
        }, 500);
    } else {
        $(activePage).css('left', '150%');
        $(prevActivePage).animate({
            left: '-150%',
            opacity: 0
        }, 500);
    }

    $(activePage).animate({
        left: '50%',
        opacity: 1
    }, 500);
});

$('#press .press-grid .large-box').click(function() {
    window.open($(this).data('link'), '_blank');
});