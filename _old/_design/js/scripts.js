$(function(){

	/*post-comment__close*/
	if($('.post-comment__close').is('.post-comment__close')) {
		$('.post-comment__close').on('click', function(){
			event.preventDefault();
			$(this).closest('.post-bottom').find('.post-dis').slideDown(300);
			$(this).closest('.post-bottom').find('.post-like').slideDown(300);
			$(this).closest('.post-bottom').removeClass('active');
			$(this).closest('.post-comment').slideUp(300);
		});
	}

	/*creat post*/
	if($('.profile-bottom .profile__add').is('.profile-bottom .profile__add')) {
		$('.profile-bottom .profile__add').on('click', function(){
			event.preventDefault();
			$(this).closest('.profile-bottom').slideUp();
			$(this).closest('.profile').find('.creat-post-form').slideDown(300);
		});
	}

	if($('.creat-post-form .creat-post-form__cancel').is('.creat-post-form .creat-post-form__cancel')) {
		$('.creat-post-form .creat-post-form__cancel').on('click', function(){
			event.preventDefault();
			$(this).closest('.creat-post-form').slideUp();
			$(this).closest('.profile').find('.profile-bottom').slideDown(300);
		});
	}

	/*select2*/
	if($('.select2').is('.select2')) {
		$('.select-parent').each(function(){
			var el = $(this).find('.select2');
			var parent = $(this).find('.select2-drop');
			if($(this).find('.select2').attr('data-placeholder')){
				var placeholder = $(this).find('.select2').attr('data-placeholder');
			}
			else {
				var placeholder="";
			}
			el.select2({
				dropdownParent: parent,
				placeholder: placeholder,
				minimumResultsForSearch: -1,
			});
		});
	}

	/*banner close*/
	if($('.banner').is('.banner')) {
		$('.banner__close').on('click', function(){
			event.preventDefault();
			$(this).closest('.banner').slideUp(300);
		});
	}

	/*connect-wallet-col-body close other click*/
	if($('.connect-wallet-col-body').is('.connect-wallet-col-body')) {
		document.addEventListener('click', function(event) {
			var e = $('.connect-wallet-col-body');
			for(var i=0; i < e.length; i++) {
				if(!e.get(i).contains(event.target)) {
					$(e.get(i)).collapse('hide');
				}
			}
		});
	}

	/*main-sidebar*/
	if($('#left-sidebar').is('#left-sidebar')) {
		var sidebar = new StickySidebar('#left-sidebar', {
			topSpacing: 20,
			bottomSpacing: 20,
			containerSelector: '.main-left',
			innerWrapperSelector: '#left-sidebar',
			resizeSensor: true,
			minWidth: 1199.5,
		});
	}
	if($('#right-sidebar').is('#right-sidebar')) {
		var sidebar = new StickySidebar('#right-sidebar', {
			topSpacing: 20,
			bottomSpacing: 20,
			containerSelector: '.main-right',
			innerWrapperSelector: '#right-sidebar',
			resizeSensor: true,
		});
	}

	/*mobile menu*/
	if($('.header-toggle').is('.header-toggle')) {
		$('.header-toggle').on('click', function(){
			event.preventDefault();
			if($('.header-list').is(':visible')){
				$('.header-list').slideUp(300);
			}
			else {
				$('.header-list').slideDown(300);
			}
		});
		document.addEventListener('click', function(event) {
			var e = $('.header-list');
			for(var i=0; i < e.length; i++) {
				if(!e.get(i).contains(event.target) && !$('.header-toggle').get(0).contains(event.target)) {
					$(e.get(i)).slideUp(300);
				}
			}
		});
	}

	/*modal connect tab*/
	if($('.modal-content__list').is('.modal-content__list')) {
		$('.modal-content__link').on('click', function(){
			event.preventDefault();
			var id = $(this).attr('href');
			$('.modal-content__link').removeClass('active');
			$(this).addClass('active');
			$('.modal-content-wr').removeClass('active');
			$('.modal-content-wr').slideUp(0);
			$(id).fadeIn(300);
			$(id).addClass('active');
		});
	}

	/*connect-wallet__link*/
	if($('.connect-wallet__link-hover').is('.connect-wallet__link-hover')) {
		$('.connect-wallet__link-hover').hover(function(){
			$(this).addClass('active');
			$(this).find('.connect-wallet-col-body').stop(true, true).slideDown(300);
		}, function(){
			$(this).removeClass('active');
			$(this).find('.connect-wallet-col-body').slideUp(300);
		});
	}

	/*click like dis*/
	if($('.post-like').is('.post-like')) {
		$('.post-like').on('click', function(){
			event.preventDefault();
			$(this).closest('.post-like-dis').find('.post-dis').fadeOut(0);
			$(this).closest('.post-bottom').find('.post-comment').fadeIn(300);
			$(this).closest('.post-bottom').addClass('active');
		});
	}

	if($('.post-dis').is('.post-dis')) {
		$('.post-dis').on('click', function(){
			event.preventDefault();
			$(this).closest('.post-bottom').find('.post-comment').fadeIn(300);
			$(this).closest('.post-bottom').addClass('active');
		});
	}

	if($('.main').is('.main')) {
		new ResizeSensor($('.main-center'), function(){ 
			var height_main_right = $('#right-sidebar').height() + 50;
			$('.main-center').css('min-height', height_main_right + 'px');
		});
	}

	if($('.filtr-checkbox').is('.filtr-checkbox')) {
		$('.filtr-checkbox .checkbox').styler();
	}

	if($('.main-page-sliders').is('.main-page-sliders')) {
		var main_page_sliders = new Swiper('.main-page-sliders .swiper', {
			loop: true,
			slidesPerView: 3,
			spaceBetween: 23,
			navigation: {
				nextEl: '.main-page-sliders .swiper-button-next',
				prevEl: '.main-page-sliders .swiper-button-prev',
			},
			breakpoints: {
				360: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
				767: {
					slidesPerView: 3,
					spaceBetween: 23,
				},
			}
		});
	}

});

/*audio init*/
if($('.post-audio-item').is('.post-audio-item')) {
	document.addEventListener('DOMContentLoaded', function() {
		new GreenAudioPlayer('.post-audio-item', { showTooltips: true, showDownloadButton: false, enableKeystrokes: true });
	});
}