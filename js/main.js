const namePctHeight = .06;
const genderPctHeight = .035;
const descriptionHelloButtonPctHeight = 0.045;
const helloButtonPaddingPctHeight = .025;
const helloButtonPaddingPctWidth = .03714;
const extracurricularPctMarginBottom = 0.05;

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

$(document).ready(() => {
    adjustFontSizes();

    var activePage = window.localStorage.getItem('activePage');

    if(!activePage) {
        activePage = '#about';
    }

    $('a[href="' + activePage + '"]').click();
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

    window.localStorage.setItem("activePage", $(this)[0].hash);

    $('.center-page-box').removeClass('active');
    $('.navbar a.active').removeClass('active');
    $(this).addClass('active');
    $($(this)[0].hash).addClass('active');

    if(window.localStorage.getItem('activePage') === '#about') {
        adjustFontSizes();
    }

    adjustBoxWidths();
});

$('#press .press-grid .large-box').click(function() {
    console.log($(this))
    window.open($(this).data('link'), '_blank');

    return false;
});