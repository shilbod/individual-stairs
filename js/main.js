

$(window).scroll(function() { 
  if ($(this).scrollTop() > 0) { 
      $('.header').addClass('header-scroll');
  } if ($(this).scrollTop() < 100) {
      $('.header').removeClass('header-scroll');
  }
});


$('.navbar__menu-button').on('click', function(){
  $('.navbar__menu').slideToggle(200);
});  

$(document).ready(function() {
  $('.hero-slider').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    draggable: false,
    lazyLoad: true,
    focusOnSelect: true,
    prevArrow: $('.arrow-left'),
    nextArrow: $('.arrow-right')
  });
});