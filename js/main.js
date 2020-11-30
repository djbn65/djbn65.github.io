function adjustAboutPage() {
    const quoteButton = $('#about .button-container a.quote');
    const infoButton = $('#about .button-container a.info');

    if(window.localStorage.getItem('activePage') === '#about' && $(window).width() > 700) {
        const leftSide = $('#about .about-content .left-side .box-container');
        const rightSide = $('#about .about-content .right-side');

        quoteButton.css('margin-left', (leftSide.width() - quoteButton.innerWidth()) / 2 + 'px');
        infoButton.css('margin-right', (rightSide.innerWidth() - infoButton.innerWidth()) / 2 + 'px');
    } else {
        quoteButton.css('margin-left', '');
        infoButton.css('margin-right', '');
    }
}

function goToDataLink() {
    window.open($(this).data('link'), '_blank');
}

function smoothScroll(e) {
    if (this.hash !== "") {
        // Prevent default anchor click behavior

        $('.navbar a').removeClass('active');
        $(this).addClass('active');

        e.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top - 200
        }, 800, function() {});
    }
}

$(document).ready(() => {
    $('body').height(window.innerHeight);
    
    var activePage = window.localStorage.getItem('activePage');

    if(!activePage) {
        activePage = '#home';
    }

    $('#portfolio .tabs a').each(function() {
        $(this).html($(this)[0].hash.substr(1));
    });

    const numImages = Math.ceil($('#about .about-content .about-gallery img').length / 3);

    for(i = 0; i < numImages; ++i) {
        var newButton = $('<button />');
        if (i === 0) newButton.addClass('active');

        $('#about .about-content .gallery-buttons').append(newButton);
    }
});

$(window).resize(() => {
    $('body').height(window.innerHeight);
    
    adjustAboutPage();

    if($(window).width() > 991) {
        $('.navbar').removeClass('expanded');
        $('.navbar-collapse').removeClass('expanded');
    } else if($('.navbar-collapse').hasClass('show')) {
        $('.navbar').addClass('expanded');
        $('.navbar-collapse').addClass('expanded');
    }
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

$('.navbar a').click(smoothScroll);
$('#home .home-button-grid a').click(smoothScroll);

$('#about .gallery-buttons').on('click', 'button', function() {
    if($(this).hasClass('active') === false) {
        $('#about .gallery-buttons button').removeClass('active');
        $(this).addClass('active');

        $('#about .about-gallery img:first-child').css('margin-left', -103 * $(this).index() + "%");
    }
});

$('#portfolio a').click(function(e) {
    e.preventDefault();
    
    window.localStorage.setItem('activePortfolioFilter', $(this)[0].hash);
    var classNameToShow = $(this)[0].hash.substr(1);

    $('#portfolio a').removeClass('active');
    $(this).addClass('active');

    $('#portfolio .portfolio-grid .item').each(function() {
        if($(this).hasClass(classNameToShow) || classNameToShow === 'all') {
            $(this).css('display', '');
        } else {
            $(this).css('display', 'none');
        }
    });
});

$('#press .press-grid .large-box').click(goToDataLink);
$('#portfolio .portfolio-grid .item .ig-logo').click(goToDataLink);