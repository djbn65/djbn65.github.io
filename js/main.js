var viewsAnimated = false;
const viewMax = 5000000000;

$(document).ready(function() {
  $('#fullpage').fullpage({
    //options here
    lockAnchors: true,
    anchors: ['landing', 'about1', 'about2', 'work', 'clients', 'services', 'contact'],
    autoScrolling: true,
    normalScrollElements: '#work-popup',
    onLeave: function(origin, destination, direction) {
      if(origin.index === 0 && direction === 'down'){
        $('#main-nav').css('opacity', '1');
        $('#main-nav .navbar-brand').css('opacity', '1');
      } else if(origin.index === 1 && direction === 'up') {
        if($(window).width() > 535) {
          $('#main-nav').css('opacity', '0');
        } else {
          $('#main-nav .navbar-brand').css('opacity', '0');
        }
      }

      if(destination.index === 2 && direction === 'down' && !viewsAnimated) {
        viewsAnimated = true;

        var count = 0;

        const interval = setInterval(() => {
            count += 7765432;

            if(count < viewMax) {
              $('.about2 .views').text(count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "+");
            } else {
              $('.about2 .views').text(viewMax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "+");
              clearInterval(interval);
            }
        }, 1);
      }
    }
  });
});

$(window).ready(function() {
  if($(window).width() > 535 && $('.landing').hasClass('active')) {
    $('#main-nav').css('opacity', '0');
  } else if ($(window).width() <= 535 && $('.landing').hasClass('active')) {
    $('#main-nav .navbar-brand').css('opacity', '0');
  }

  $('.landing .section-container .section-info h1').addClass('loaded');
});

$(window).resize(function() {
  $.fn.fullpage.destroy('all');

  $('#fullpage').fullpage({
    //options here
    lockAnchors: true,
    anchors: ['landing', 'about1', 'about2', 'work', 'clients', 'services', 'contact'],
    autoScrolling: true,
    normalScrollElements: '#work-popup',
    onLeave: function(origin, destination, direction) {
      if(origin.index == 0 && direction == 'down'){
        $('#main-nav').css('opacity', '1');
        $('#main-nav .navbar-brand').css('opacity', '1');
      } else if(origin.index == 1 && direction == 'up') {
        if($(window).width() > 535) {
          $('#main-nav').css('opacity', '0');
        } else {
          $('#main-nav .navbar-brand').css('opacity', '0');
        }
      }
    }
  });
  
  if($(window).width() > 535 && $('.landing').hasClass('active')) {
    $('#main-nav').css('opacity', '0');
  } else if ($(window).width() <= 535 && $('.landing').hasClass('active')) {
    $('#main-nav').css('opacity', '1');
    $('#main-nav .navbar-brand').css('opacity', '0');
  }
});

$('.work-grid img').click(function() {
  $('#work-popup .content .title').text($(this).data('title-text'));
  $('#work-popup .content .title').css('color', $(this).data('title-color'));
  $('#work-popup .content .impressions').text($(this).data('impressions'));
  $('#work-popup .content .captures').text($(this).data('captures'));
  $('#work-popup .content .opens').text($(this).data('opens'));
  $('#work-popup .content .shares').text($(this).data('shares'));
  $('#work-popup .content .description').text($(this).data('description'));
  $('#work-popup .content .demo video').attr('src', $(this).data('video-link'));
  $('#work-popup').addClass('open');
});

$('.close-popup').click(() => {
  $('#work-popup').removeClass('open');
});

$('.navbar-nav > li > a').click(() => {
  $('.navbar-collapse').collapse('hide');
});

$('.navbar-brand').click(() => {
  $('.navbar-collapse').collapse('hide');
});