

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
$(window).on('load resize', function(){
	if ($(window).width() >= '992'){
		$(window).scroll(function() { 
			if ($(this).scrollTop() > 0) { 
					$('.header').addClass('header-scroll');
			} if ($(this).scrollTop() < 100) {
					$('.header').removeClass('header-scroll');
			}
		});
	} else {
		
	}
});


$('.navbar-menu-button').on('click', function(){
  $('.navbar-menu').slideToggle(100);
});  

$(document).ready(function() {
  $('.main-slider').slick({
    // autoplay: true,
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
	$('.portfolio-wrap').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		centerMode: true,
		slidesToShow: 1,
  	slidesToScroll: 1,
		focusOnSelect: true,
		swipe: false,
    pauseOnHover: false,
    draggable: false,
		prevArrow: $('.portfolio-arrow-left'),
		nextArrow: $('.portfolio-arrow-right'),
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
	
	$('.review-wrap').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 4,
		slidesToScroll: 1,
		swipe: false,
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
				swipe: false,
    		pauseOnHover: false,
    		draggable: false,
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
	$slider_current.text( i);
	$slider_all.text('/' + slick.slideCount);
});


$('input[type="file"]').on('change', function() {
  var splittedFakePath = this.value.split('\\');
  $('.file-upload span').text(splittedFakePath[splittedFakePath.length - 1]);
});



// Карта
ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
						zoom: 10,
						controls: ['smallMapDefaultSet']
        }),
    // Создаем геообъект с типом геометрии "Точка".
        myObjects = new ymaps.Placemark([
        ], {
        });

    myMap.geoObjects
        .add(new ymaps.Placemark([55.77356269758877,37.589742499999886], {
          balloonContentBody: '<b>1-я Тверская Ямская</b> <br/>' + '<img src="img/map/1-я тверская ямская.JPG" height="100%" width="220">',
          hintContent: '1-я Тверская Ямская'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
        }))
        .add(new ymaps.Placemark([55.76215556896336,37.56911749999993], {
          balloonContentBody:'<b>GoalCenter ул. Красная Пресня 26с2</b> <br/>' + '<img src="img/map/GoalCenter ул Красная Пресня 26с2.JPG" height="100%" width="220">',
          hintContent: 'GoalCenter ул. Красная Пресня 26с2'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
        }))
        .add(new ymaps.Placemark([55.77020065996976,37.677108499999974], {
          balloonContentBody:'<b>Tribeca</b> <br/>' + '<img src="img/map/Tribeca.JPG" height="100%" width="220">',
          hintContent: 'Tribeca'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.94677135532621,36.873682], {
          balloonContentBody:'<b>Андреевское Истринский р-н</b> <br/>' + '<img src="img/map/андреевское истринский р-н.JPG" height="100%" width="220">',
          hintContent: 'Андреевское Истринский р-н'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.718699508657544,37.271289499999966], {
          balloonContentBody:'<b>Барвиха-клаб</b> <br/>' + '<img src="img/map/барвиха-клаб.JPG" height="100%" width="220">',
          hintContent: 'Барвиха-клаб'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.65668127756559,37.54007449999998], {
          balloonContentBody:'<b>БЦ GeoNeo м. Калужская</b> <br/>' + '<img src="img/map/БЦ  GeoNeo м. Калужская.JPG" height="100%" width="220">',
          hintContent: 'БЦ GeoNeo м. Калужская'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.59334683471375,38.12225049999998], {
          balloonContentBody:'<b>г. жуковский</b> <br/>' + '<img src="img/map/г. жуковский.JPG" height="100%" width="220">',
          hintContent: 'г. жуковский'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([56.00200986461445,38.1617945], {
          balloonContentBody:'<b>Д Здехово Щелковское шоссе</b> <br/>' + '<img src="img/map/Д Здехово Щелковское шоссе.JPG" height="100%" width="220">',
          hintContent: 'Д Здехово Щелковское шоссе'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.88737970738465,37.16358199999992], {
          balloonContentBody:'<b>Д Нефедьево округ. Красногорск</b> <br/>' + '<img src="img/map/Д Нефедьево округ. Красногорск.JPG" height="100%" width="220">',
          hintContent: 'Д Нефедьево округ. Красногорск'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([56.36891051367118,36.961303999999956], {
          balloonContentBody:'<b>Д. Ананьино Каширское шоссе</b> <br/>' + '<img src="img/map/Д. Ананьино Каширское шоссе.JPG" height="100%" width="220">',
          hintContent: 'Д. Ананьино Каширское шоссе'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([58.625272534726314,35.72515449999998], {
          balloonContentBody:'<b>д. дмитровское. красногорский р-н</b> <br/>' + '<img src="img/map/д. дмитровское. красногорский р-н.JPG" height="100%" width="220">',
          hintContent: 'д. дмитровское. красногорский р-н'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.18793610497345,38.21000649999995], {
          balloonContentBody:'<b>д. Ламоново Пятницкое шоссе</b> <br/>' + '<img src="img/map/д. Ламоново Пятницкое шоссе.JPG" height="100%" width="220">',
          hintContent: 'д. Ламоново Пятницкое шоссе'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.670254692530726,36.765030999999894], {
          balloonContentBody:'<b>д. ястребки. можайское шоссе</b> <br/>' + '<img src="img/map/д. ястребки. можайское шоссе.JPG" height="100%" width="220">',
          hintContent: 'д. ястребки. можайское шоссе'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.67363833973206,37.15338999999997], {
          balloonContentBody:'<b>Деревня Никольское. Одинцовский р-н</b> <br/>' + '<img src="img/map/Деревня Никольское. Одинцовский р-н.JPG" height="100%" width="220">',
          hintContent: 'Деревня Никольское. Одинцовский р-н'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.93908383845105,38.71938632958981], {
          balloonContentBody:'<b>ельдигино. ярославское шоссе.JPG</b> <br/>' + '<img src="img/map/ельдигино. ярославское шоссе.JPG" height="100%" width="220">',
          hintContent: 'ельдигино. ярославское шоссе'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([56.95496900126336,40.98031699999998], {
          balloonContentBody:'<b>ЖК Зеленая роща 2. Можайское шоссе</b> <br/>' + '<img src="img/map/ЖК Зеленая роща 2. Можайское шоссе.JPG" height="100%" width="220">',
          hintContent: 'ЖК Зеленая роща 2. Можайское шоссе'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.75766050018169,37.240036999999994], {
          balloonContentBody:'<b>ильинское. красногорский округ</b> <br/>' + '<img src="img/map/ильинское. красногорский округ.JPG" height="100%" width="220">',
          hintContent: 'ильинское. красногорский округ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.89121584203518,37.17922149999999], {
          balloonContentBody:'<b>козино. красногорский р-н</b> <br/>' + '<img src="img/map/козино. красногорский р-н.JPG" height="100%" width="220">',
          hintContent: 'козино. красногорский р-н'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.805067670638024,37.36603049999996], {
          balloonContentBody:'<b>кп береста</b> <br/>' + '<img src="img/map/кп береста.JPG" height="100%" width="220">',
          hintContent: 'кп береста'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.39980352839693,37.36028549999986], {
          balloonContentBody:'<b>кп булгаков подольск</b> <br/>' + '<img src="img/map/кп булгаков подольск.JPG" height="100%" width="220">',
          hintContent: 'кп булгаков подольск'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([56.099997703606086,38.00369500000001], {
          balloonContentBody:'<b>кп визендорф. ярославское шоссе</b> <br/>' + '<img src="img/map/кп визендорф. ярославское шоссе.JPG" height="100%" width="220">',
          hintContent: 'кп визендорф. ярославское шоссе'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.40410506932215,37.4907395], {
          balloonContentBody:'<b>кп европа-3. красногорский округ</b> <br/>' + '<img src="img/map/кп европа-3. красногорский округ.JPG" height="100%" width="220">',
          hintContent: 'кп европа-3. красногорский округ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.354967538342635,37.24084599999998], {
          balloonContentBody:'<b>КП Никольские Озера</b> <br/>' + '<img src="img/map/КП Никольские Озера.JPG" height="100%" width="220">',
          hintContent: 'КП Никольские Озера'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.83707276761228,36.92954399999992], {
          balloonContentBody:'<b>кп новорижский</b> <br/>' + '<img src="img/map/кп новорижский.JPG" height="100%" width="220">',
          hintContent: 'кп новорижский'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.983438568756085,35.852517500000005], {
          balloonContentBody:'<b>кп новорижский1</b> <br/>' + '<img src="img/map/кп новорижский1.JPG" height="100%" width="220">',
          hintContent: 'кп новорижский1'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.983176568755425,35.85270649999996], {
          balloonContentBody:'<b>кп новорижский2</b> <br/>' + '<img src="img/map/кп новорижский2.JPG" height="100%" width="220">',
          hintContent: 'кп новорижский2'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.92330661982343,36.602705499999985], {
          balloonContentBody:'<b>кп оранж клаб</b> <br/>' + '<img src="img/map/кп оранж клаб.JPG" height="100%" width="220">',
          hintContent: 'кп оранж клаб'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.80378987058328,37.11207249999992], {
          balloonContentBody:'<b>кп павлово</b> <br/>' + '<img src="img/map/кп павлово.JPG" height="100%" width="220">',
          hintContent: 'кп павлово'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.8320445785124,37.12242099999994], {
          balloonContentBody:'<b>кп павловы озера</b> <br/>' + '<img src="img/map/кп павловы озера.JPG" height="100%" width="220">',
          hintContent: 'кп павловы озера'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([56.11549655727759,37.601982], {
          balloonContentBody:'<b>кп пестово. мытищинский р-н</b> <br/>' + '<img src="img/map/кп пестово. мытищинский р-н.JPG" height="100%" width="220">',
          hintContent: 'кп пестово. мытищинский р-н'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.4286765149686,36.025438999999956], {
          balloonContentBody:'<b>кп полесье. рублевское шоссе</b> <br/>' + '<img src="img/map/кп пестово. мытищинский р-н.JPG" height="100%" width="220">',
          hintContent: 'кп полесье. рублевское шоссе'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.559832330581216,37.26572499999996], {
          balloonContentBody:'<b>кп променад</b> <br/>' + '<img src="img/map/кп променад.JPG" height="100%" width="220">',
          hintContent: 'кп променад'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.559832330581216,37.26572499999996], {
          balloonContentBody:'<b>кп променад. киевское шоссе</b> <br/>' + '<img src="img/map/кп променад. киевское шоссе.JPG" height="100%" width="220">',
          hintContent: 'кп променад. киевское шоссе'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.9185976654778,37.22740249999997], {
          balloonContentBody:'<b>КП Середниково Пятницкое шоссе</b> <br/>' + '<img src="img/map/КП Середниково Пятницкое шоссе.JPG" height="100%" width="220">',
          hintContent: 'КП Середниково Пятницкое шоссе'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.82824002802805,36.98524799999995], {
          balloonContentBody:'<b>кп старая рига</b> <br/>' + '<img src="img/map/кп старая рига.JPG" height="100%" width="220">',
          hintContent: 'кп старая рига'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.63848506909226,37.66664750000001], {
          balloonContentBody:'<b>москва. ул. кантемировская 16к1</b> <br/>' + '<img src="img/map/москва. ул. кантемировская 16к1.JPG" height="100%" width="220">',
          hintContent: 'москва. ул. кантемировская 16к1'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.918206568827415,37.75912900000001], {
          balloonContentBody:'<b>мытищи. ул. воровского 5</b> <br/>' + '<img src="img/map/мытищи. ул. воровского 5.JPG" height="100%" width="220">',
          hintContent: 'мытищи. ул. воровского 5'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.75229539602204,37.17144650000001], {
          balloonContentBody:'<b>петрово-дальнее. красногорский р-н</b> <br/>' + '<img src="img/map/петрово-дальнее. красногорский р-н.JPG" height="100%" width="220">',
          hintContent: 'петрово-дальнее. красногорский р-н'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([45.977062707307034,41.589954000000006], {
          balloonContentBody:'<b>покровское. красногорский округ</b> <br/>' + '<img src="img/map/покровское. красногорский округ.JPG" height="100%" width="220">',
          hintContent: 'покровское. красногорский округ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.78181777712743,37.5986895], {
          balloonContentBody:'<b>ресторан коптильня. м. менделеевская</b> <br/>' + '<img src="img/map/ресторан коптильня. м. менделеевская.JPG" height="100%" width="220">',
          hintContent: 'ресторан коптильня. м. менделеевская'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.32611265232208,37.97221349999999], {
          balloonContentBody:'<b>снт ветеран. домодедовский р-н</b> <br/>' + '<img src="img/map/снт ветеран. домодедовский р-н.JPG" height="100%" width="220">',
          hintContent: 'снт ветеран. домодедовский р-н'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.75458759585229,37.10179248947138], {
          balloonContentBody:'<b>снт зеленый ветер. красногорский округ</b> <br/>' + '<img src="img/map/снт зеленый ветер. красногорский округ.JPG" height="100%" width="220">',
          hintContent: 'снт зеленый ветер. красногорский округ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.667477561159586,37.14088149999994], {
          balloonContentBody:'<b>СНТ Лапино</b> <br/>' + '<img src="img/map/СНТ Лапино.JPG" height="100%" width="220">',
          hintContent: 'СНТ Лапино'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
				}))
				.add(new ymaps.Placemark([55.667477561159586,37.14088149999994], {
          balloonContentBody:'<b>снт лапино. одинцовский р-н</b> <br/>' + '<img src="img/map/снт лапино. одинцовский р-н.JPG" height="100%" width="220">',
          hintContent: 'снт лапино. одинцовский р-н'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/loc.png',
            iconImageSize: [28, 41],
            iconImageOffset: [-5, -38]
        }))
}