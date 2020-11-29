function adjustBoxWidths() {
    if(window.localStorage.getItem('activePage') === '#education') {
        $('.extracurricular-grid').css('width', $('#education .large-box').innerWidth() + 'px');
    }
}

function goToDataLink() {
    window.open($(this).data('link'), '_blank');
}

$(document).ready(() => {
    adjustBoxWidths();

    var activePage = window.localStorage.getItem('activePage');

    if(!activePage) {
        activePage = '#about';
    }

    $('a[href="' + activePage + '"]').click();
});

$(window).resize(() => {
    adjustBoxWidths();

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
});

$('#education .large-box').click(goToDataLink);
$('#education .extracurricular-grid .small-box').click(goToDataLink);
$('#portfolio .portfolio-grid .portfolio-item').click(goToDataLink);
$('#experience .experiences-grid .large-box').click(goToDataLink);
$('#press .press-grid .large-box').click(goToDataLink);