(function ($) {
	"use strict";

/*=============================================
	=    		 Preloader			      =
=============================================*/
function preloader() {
	$('#preloader').delay(0).fadeOut();
};

$(window).on('load', function () {
	preloader();
	mainSlider();
	wowAnimation();
	aosAnimation();
	tg_title_animation();
});



/*=============================================
	=    		Mobile Menu			      =
=============================================*/
//SubMenu Dropdown Toggle
// Ensure the DOM is ready
$(document).ready(function () {
  if ($('.menu-area li.menu-item-has-children ul').length) {
    $('.menu-area .navigation li.menu-item-has-children').append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');
  }

  if ($('.mobile-menu').length) {
    var mobileMenuContent = $('.menu-area .main-menu').html();
    $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);

    // Event delegation for dropdown button
    $('.mobile-menu').on('click touchstart', 'li.menu-item-has-children .dropdown-btn', function (event) {
      event.preventDefault();
      $(this).toggleClass('open');
      $(this).prev('ul, .tg-mega-menu-wrap').slideToggle(300);
    });

    // Event delegation for menu toggle button
    $('.mobile-nav-toggler').on('click touchstart', function () {
      $('body').addClass('mobile-menu-visible');
    });

    // Event delegation for closing the mobile menu
    $('.menu-backdrop, .mobile-menu .close-btn').on('click touchstart', function () {
      $('body').removeClass('mobile-menu-visible');
    });
  }
});


/*=============================================
	=           Data Background             =
=============================================*/
$("[data-background]").each(function () {
	$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
})

/*=============================================
	=           Data Color             =
=============================================*/
$("[data-bg-color]").each(function () {
	$(this).css("background-color", $(this).attr("data-bg-color"));
});


/*=============================================
	=     Menu sticky & Scroll to top      =
=============================================*/
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$("#sticky-header").removeClass("sticky-menu");
        $('.scroll-to-target').removeClass('open');
		$("#header-fixed-height").removeClass("active-height");

	} else {
		$("#sticky-header").addClass("sticky-menu");
        $('.scroll-to-target').addClass('open');
		$("#header-fixed-height").addClass("active-height");
	}
});

/*=============================================
	=    		 Scroll Up  	         =
=============================================*/
if ($('.scroll-to-target').length) {
  $(".scroll-to-target").on('click', function () {
    var target = $(this).attr('data-target');
    // animate
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 1000);

  });
}



/*=============================================
	=    		 Main Slider		      =
=============================================*/
function mainSlider() {
	var BasicSlider = $('.slider-active');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
	BasicSlider.slick({
		autoplay: false,
		autoplaySpeed: 10000,
		dots: false,
		fade: true,
		arrows: false,
		responsive: [
			{ breakpoint: 767, settings: { dots: false, arrows: false } }
		]
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
}


/*=============================================
	=        Faq Active 	       =
=============================================*/
$(".accordion-header").on('click', function () {
	$(".accordion-item").removeClass("active"),
		$(this).parent().addClass("active")
});

/*=============================================
	=        Speech Active 	       =
=============================================*/
$('.speech-btn').on('click', function () {
	$(this).parent().find('.hidden-btn-wrap').slideToggle(300);
	return false;
});


/*=============================================
	=       Related Post Active		      =
=============================================*/
$('.related-post-active').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: true,
	arrows: false,
	slidesToShow: 3,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
});



/*=============================================
	=    		 user Active  	         =
=============================================*/
$('.user-plus-minus span').on("click", function () {
	var $input = $(this).parents('.num-block').find('input.in-num');
	if ($(this).hasClass('minus')) {
		var count = parseFloat($input.val()) - 1;
		count = count < 1 ? 1 : count;
		if (count < 2) {
			$(this).addClass('dis');
		}
		else {
			$(this).removeClass('dis');
		}
		$input.val(count);
	}
	else {
		var count = parseFloat($input.val()) + 1
		$input.val(count);
		if (count > 1) {
			$(this).parents('.num-block').find(('.minus')).removeClass('dis');
		}
	}
	$input.change();
	return false;
});


/*=============================================
	=    		Magnific Popup		      =
=============================================*/
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
		enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});



/*=============================================
	=    		 Wow Active  	         =
=============================================*/
function wowAnimation() {
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
		live: true
	});
	wow.init();
}

/*=============================================
	=           Aos Active       =
=============================================*/
function aosAnimation() {
	AOS.init({
		duration: 800,
		mirror: true,
		once: true,
		disable: 'mobile',
	});
}

})(jQuery);