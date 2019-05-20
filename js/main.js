$(document).ready(function() {
	
	// If the comparison slider is present on the page lets initialise it, this is good you will include this in the main js to prevent the code from running when not needed
	if ($(".comparison-slider")[0]) {
		let compSlider = $(".comparison-slider");
	
		//let's loop through the sliders and initialise each of them
		compSlider.each(function() {
			let compSliderWidth = $(this).width() + "px";
			$(this).find(".resize img").css({ width: compSliderWidth });
      drags($(this).find(".divider"), $(this).find(".resize"), $(this));
		});

		//if the user resizes the windows lets update our variables and resize our images
		$(window).on("resize", function() {
			let compSliderWidth = compSlider.width() + "px";
			compSlider.find(".resize img").css({ width: compSliderWidth });
    });
	}
});

// This is where all the magic happens
// This is a modified version of the pen from Ege Görgülü - https://codepen.io/bamf/pen/jEpxOX - and you should check it out too.
function drags(dragElement, resizeElement, container) {
	
	// This creates a variable that detects if the user is using touch input insted of the mouse.
	let touched = false;
	window.addEventListener('touchstart', function() {
		touched = true;
	});
	window.addEventListener('touchend', function() {
		touched = false;
	});
	
	// clicp the image and move the slider on interaction with the mouse or the touch input
	dragElement.on("mousedown touchstart", function(e) {
			
			//add classes to the emelents - good for css animations if you need it to
			dragElement.addClass("draggable");
			resizeElement.addClass("resizable");
			//create vars
			let startX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
			let dragWidth = dragElement.outerWidth();
			let posX = dragElement.offset().left + dragWidth - startX;
			let containerOffset = container.offset().left;
			let containerWidth = container.outerWidth();
			let minLeft = containerOffset + 10;
			let maxLeft = containerOffset + containerWidth - dragWidth - 10;
			
			//add event listner on the divider emelent
			dragElement.parents().on("mousemove touchmove", function(e) {
				
				// if the user is not using touch input let do preventDefault to prevent the user from slecting the images as he moves the silder arround.
				if ( touched === false ) {
					e.preventDefault();
				}
				
				let moveX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
				let leftValue = moveX + posX - dragWidth;

				// stop the divider from going over the limits of the container
				if (leftValue < minLeft) {
					leftValue = minLeft;
				} else if (leftValue > maxLeft) {
					leftValue = maxLeft;
				}

				let widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + "%";

				$(".draggable").css("left", widthValue).on("mouseup touchend touchcancel", function() {
					$(this).removeClass("draggable");
					resizeElement.removeClass("resizable");
				});
				
				$(".resizable").css("width", widthValue);
				
			}).on("mouseup touchend touchcancel", function() {
				dragElement.removeClass("draggable");
				resizeElement.removeClass("resizable");
				
			});
		
		}).on("mouseup touchend touchcancel", function(e) {
			// stop clicping the image and move the slider
			dragElement.removeClass("draggable");
			resizeElement.removeClass("resizable");
		
		});
	
}



$(window).scroll(function() { 
  if ($(this).scrollTop() > 0) { 
      $('.header').addClass('header-scroll');
  } if ($(this).scrollTop() < 100) {
      $('.header').removeClass('header-scroll');
  }
});



$(window).on('load resize', function(){
	if ($(window).width() >= '768'){
		var p = $( "#el" );
		var offset = p.offset();
		$( ".slide-title" ).css("left",offset.left);
		$( ".slide-subtitle" ).css("left",offset.left);
		$( ".slick-dots" ).css("left",offset.left);
		$( ".slider-count" ).css("right",offset.left);
	} else {
	}
});

$('.navbar-menu-button').on('click', function(){
  $('.navbar-menu').slideToggle(100);
});  

$(document).ready(function() {
  $('.main-slider').slick({
    autoplay: true,
		autoplaySpeed: 5000,
		dots: true,
		swipe: false,
    pauseOnHover: false,
    draggable: false,
    lazyLoad: true,
    focusOnSelect: true,
    prevArrow: $('.arrow-left'),
    nextArrow: $('.arrow-right')
	});
	// $('.portfolio-wrap').slick({
	// 	centerMode: true,
	// 	slidesToShow: 1,
  // 	slidesToScroll: 1,
	// 	// focusOnSelect: true,
	// 	prevArrow: $('.portfolio-arrow-left'),
  //   nextArrow: $('.portfolio-arrow-right')
	// });
	
	$('.review-wrap').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 4,
		slidesToScroll: 1,
		pauseOnHover: false,
    draggable: false,
    lazyLoad: true,
    focusOnSelect: true,
    prevArrow: $('.review-arrow-left'),
		nextArrow: $('.review-arrow-right'),
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	

	$(window).on('load resize', function(){
		if ($(window).width() < '768'){
			$('.team-wrap').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed: 5000,
				lazyLoad: true,
    		focusOnSelect: true,
				prevArrow: $('.team-arrow-left'),
    		nextArrow: $('.team-arrow-right')
			});
		} else {
		}
	});

});





var $slider_current = $('.slider-current');
var $slider_all = $('.slider-all');
var $slickElement = $('.main-slider');

$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
  var i = (currentSlide ? currentSlide : 0) + 1;
	$slider_current.text('0' + i);
	$slider_all.text('/' + '0' + slick.slideCount);
});


$('input[type="file"]').on('change', function() {
  var splittedFakePath = this.value.split('\\');
  $('.file-upload span').text(splittedFakePath[splittedFakePath.length - 1]);
});