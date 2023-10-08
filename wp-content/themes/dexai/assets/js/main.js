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


// Function to toggle the mobile menu
function toggleMobileMenu() {
  var mobileMenu = document.querySelector('.mobile-menu');
  var menuBackdrop = document.querySelector('.menu-backdrop');
  var mobileNavToggler = document.querySelector('.mobile-nav-toggler');
  
  mobileNavToggler.addEventListener('click', function () {
    mobileMenu.classList.add('mobile-menu-visible');
  });

  menuBackdrop.addEventListener('click', function () {
    mobileMenu.classList.remove('mobile-menu-visible');
  });
}

// Function to handle dropdown menus
function handleDropdowns() {
  var dropdownBtns = document.querySelectorAll('.mobile-menu li.menu-item-has-children .dropdown-btn');

  dropdownBtns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      this.classList.toggle('open');
      var submenu = this.previousElementSibling;
      if (submenu) {
        submenu.style.maxHeight = submenu.style.maxHeight ? null : submenu.scrollHeight + 'px';
      }
    });
  });
}

// Initialize mobile menu and dropdowns
document.addEventListener('DOMContentLoaded', function () {
  toggleMobileMenu();
  handleDropdowns();
});



// if ($('.menu-area li.menu-item-has-children ul').length) {
// 	$('.menu-area .navigation li.menu-item-has-children').append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');

// }

// //Mobile Nav Hide Show
// if ($('.mobile-menu').length) {

// 	var mobileMenuContent = $('.menu-area .main-menu').html();
// 	$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);

// 	//Dropdown Button
// 	$('.mobile-menu li.menu-item-has-children .dropdown-btn').on('click', function () {
// 		$(this).toggleClass('open');
// 		$(this).prev('ul, .tg-mega-menu-wrap').slideToggle(300);
// 	});
// 	//Menu Toggle Btn
// 	$('.mobile-nav-toggler').on('click', function () {
// 		$('body').addClass('mobile-menu-visible');
// 	});

// 	//Menu Toggle Btn
// 	$('.menu-backdrop, .mobile-menu .close-btn').on('click', function () {
// 		$('body').removeClass('mobile-menu-visible');
// 	});
// }


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