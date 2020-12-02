const galleyRotationInterval = 5; // In seconds
var numImagesPerAboutGalleryFrame = 3;
var rotationHandle;
var currentWindow = 0;

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

function advanceGallery() {
    currentWindow = (currentWindow + 1) % Math.ceil($('#about .about-gallery img').length / numImagesPerAboutGalleryFrame);

    $('#about .gallery-buttons button').removeClass('active');
    $('#about .about-gallery img:first-child').css('margin-left', -103.5 * currentWindow + "%");
}

$(document).ready(() => {
    $('#portfolio .tabs a').each(function() {
        $(this).html($(this)[0].hash.substr(1));
    });

    $('.navbar li:not(.quote-button) a').each(function() {
        if($(this)[0].hash.startsWith('#')) $(this).html($(this)[0].hash.substr(1));
    });

    if($(window).width() < 450) {
        numImagesPerAboutGalleryFrame = 1;
    }
    else if($(window).width() < 520) {
        numImagesPerAboutGalleryFrame = 2;
    } else {
        numImagesPerAboutGalleryFrame = 3;
    }

    // const numImages = Math.ceil($('#about .about-content .about-gallery img').length / numImagesPerAboutGalleryFrame);

    // for(i = 0; i < numImages; ++i) {
    //     var newButton = $('<button />');
    //     if (i === 0) newButton.addClass('active');

    //     $('#about .about-content .gallery-buttons').append(newButton);
    // }

    $('#portfolio .tabs a:first-child').click();

    rotationHandle = window.setInterval(advanceGallery, galleyRotationInterval * 1000);
});

$(window).resize(() => {
    $('body').height(window.innerHeight);
    
    if($(window).width() > 991) {
        $('.navbar').removeClass('expanded');
        $('.navbar-collapse').removeClass('expanded');
    } else if($('.navbar-collapse').hasClass('show')) {
        $('.navbar').addClass('expanded');
        $('.navbar-collapse').addClass('expanded');
    }

    if($(window).width() < 450) {
        numImagesPerAboutGalleryFrame = 1;
    }
    else if($(window).width() < 520) {
        numImagesPerAboutGalleryFrame = 2;
    } else {
        numImagesPerAboutGalleryFrame = 3;
    }

    if(currentWindow >= Math.ceil($('#about .about-gallery img').length / numImagesPerAboutGalleryFrame)) {
        currentWindow = Math.ceil($('#about .about-gallery img').length / numImagesPerAboutGalleryFrame) - 1;
    }
    
    $('#about .about-gallery img:first-child').css('margin-left', -103.5 * currentWindow + "%");

    // if($('#about .about-content .gallery-buttons button').length !== Math.ceil($('#about .about-content .about-gallery img').length / numImagesPerAboutGalleryFrame)) {
    //     const numNewButtons = Math.ceil($('#about .about-content .about-gallery img').length / numImagesPerAboutGalleryFrame) - $('#about .about-content .gallery-buttons button').length;
        
    //     if(numNewButtons < 0) {
    //         console.log($('#about .about-content .gallery-buttons button.active').index() + 1);
    //         console.log(Math.ceil($('#about .about-content .about-gallery img').length / numImagesPerAboutGalleryFrame));
    //         if($('#about .about-content .gallery-buttons button.active').index() + 1 > Math.ceil($('#about .about-content .about-gallery img').length / numImagesPerAboutGalleryFrame)) {
    //             $('#about .about-content .gallery-buttons').children().eq(Math.ceil($('#about .about-content .about-gallery img').length / numImagesPerAboutGalleryFrame) - 1).click();
    //         }

    //         for(i = 0; i < -numNewButtons; ++i) {
    //             $('#about .about-content .gallery-buttons').children().last().remove();
    //         }
    //     } else {
    //         for(i = 0; i < numNewButtons; ++i) {
    //             var newButton = $('<button />');
    
    //             $('#about .about-content .gallery-buttons').append(newButton);
    //         }
    //     }
    // }
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

$('#about .gallery-buttons .next').click(function() {
    currentWindow = (currentWindow + 1) % Math.ceil($('#about .about-gallery img').length / numImagesPerAboutGalleryFrame);

    $('#about .about-gallery img:first-child').css('margin-left', -103.5 * currentWindow + "%");

    window.clearInterval(rotationHandle);
    rotationHandle = window.setInterval(advanceGallery, galleyRotationInterval * 1000);
});

$('#about .gallery-buttons .prev').click(function() {
    currentWindow--;
    if(currentWindow < 0) currentWindow = Math.ceil($('#about .about-gallery img').length / numImagesPerAboutGalleryFrame) - 1;

    $('#about .about-gallery img:first-child').css('margin-left', -103.5 * currentWindow + "%");

    window.clearInterval(rotationHandle);
    rotationHandle = window.setInterval(advanceGallery, galleyRotationInterval * 1000);
});

// $('#portfolio a').click(function(e) {
//     e.preventDefault();
    
//     window.localStorage.setItem('activePortfolioFilter', $(this)[0].hash);
//     var classNameToShow = $(this)[0].hash.substr(1);

//     $('#portfolio a').removeClass('active');
//     $(this).addClass('active');

//     $('#portfolio .portfolio-grid .item').each(function() {
//         if($(this).hasClass(classNameToShow) || classNameToShow === 'all') {
//             $(this).css('display', '');
//         } else {
//             $(this).css('display', 'none');
//         }
//     });
// });

$('#contact form #submit').click(function(e) {
    e.preventDefault();

    $.ajax({
        url: 'https://formspree.io/f/mbjpapda',
        type: 'POST',
        dataType: "json",
        data: {
            Name: $('#name-input').val(),
            Email: $('#email-input').val(),
            Company: $('#company-input').val(),
            Idea: $('#idea-input').val()
        },
        success: function() {
            $('#contact-form').trigger('reset');
            $('.form-popup').addClass('active');
            $('.form-popup .popup.failed').css('display', 'none');
            $('.form-popup .popup.confirm').css('display', 'flex');

            window.setTimeout(function() {
                $('.form-popup').removeClass('active');
            }, 3000);
        },
        error: function() {
            $('.form-popup').addClass('active');
            $('.form-popup .popup.failed').css('display', 'flex');
            $('.form-popup .popup.confirm').css('display', 'none');

            window.setTimeout(function() {
                $('.form-popup').removeClass('active');
            }, 3000);
        }
    });
});

$('#press .press-grid .large-box').click(goToDataLink);
$('#portfolio .portfolio-content .filter-highlight').click(goToDataLink);
$('#clients .client-gallery img').click(goToDataLink);