$(document).ready(function() {
  $('#fullpage').fullpage({
    //options here
    lockAnchors: true,
    anchors: ['landing', 'about1', 'about2', 'work', 'clients', 'services', 'contact'],
    autoScrolling: true,
    normalScrollElements: '#work-popup'
  });
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