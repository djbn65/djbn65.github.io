function setCenterPageBoxTop() {
    var centerPageBox = $('.center-page-box');

    if($(window).width() > 814) {
        centerPageBox.css('top', $(window).height() / 2 - $('.center-page-box').height() / 2);
    } else {
        centerPageBox.css('top', '0');
    }
}

function setupCenterBoxes() {
    var activePage = window.localStorage.getItem('activePage');

    if(!activePage) {
        activePage = '#home';
        window.localStorage.setItem('activePage', activePage);
    }

    $('.center-page-box').each(function(index, value) {
        if($(this).is($(activePage))) {
            $(this).css('left', '50%');
        }
    });
}

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

$(document).ready(() => {
    setCenterPageBoxTop();
    setupCenterBoxes();

    $('body').height(window.innerHeight);
    
    var activePage = window.localStorage.getItem('activePage');

    if(!activePage) {
        activePage = '#home';
    }

    $('#portfolio .tabs a').each(function() {
        $(this).html($(this)[0].hash.substr(1));
    });
    
    $('a[href="' + activePage + '"]').click();
});

$(window).resize(() => {
    setCenterPageBoxTop();
    adjustAboutPage();

    $('body').height(window.innerHeight);

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

$('.navbar a').click(function(e) {
    e.preventDefault();

    var prevActivePage = window.localStorage.getItem('activePage');

    window.localStorage.setItem('activePage', $(this)[0].hash);

    var activePage = window.localStorage.getItem('activePage');
    
    adjustAboutPage();

    $('.navbar a.active').removeClass('active');
    $(this).addClass('active');

    if(prevActivePage !== activePage) {
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
    }
    
    if(activePage === '#portfolio') {
        var activePortfolioFilter = window.localStorage.getItem('activePortfolioFilter');

        if(!activePortfolioFilter) {
            activePortfolioFilter = '#all';
        }

        $('#portfolio a[href="' + activePortfolioFilter + '"]').click();
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