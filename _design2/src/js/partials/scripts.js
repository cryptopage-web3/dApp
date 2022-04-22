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

	/*search*/
	if($('.market-header-search').is('.market-header-search')) {
		$('.market-header-search__input').on('keyup', function(){
			var search = $(this).val();
			if(search.length > 1){
				$('.market-header-search__drop').slideDown(300);
				$('.market-header-search').addClass('active');
				$('.body-market').addClass('market-header-search_active');
			}
			else {
				$('.market-header-search__drop').slideUp(300);
				$('.market-header-search').removeClass('active');
				$('.body-market').removeClass('market-header-search_active');
			}
		});
		document.addEventListener('click', function(event) {
			var e = $('.market-header-search__drop');
			for(var i=0; i < e.length; i++) {
				if(!e.get(i).contains(event.target)) {
					$(e.get(i)).slideUp('300');
					$('.market-header-search').removeClass('active');
					$('.body-market').removeClass('market-header-search_active');
				}
			}
		});
		$('.market-header-search__clear').on('click', function(){
			event.preventDefault();
			$(this).closest('.market-header-search__top').find('.market-header-search__input').val(null);
		});
	}

	if($('.drop-down').is('.drop-down')) {
		document.addEventListener('click', function(event) {
			var e = $('.drop-down');
			for(var i=0; i < e.length; i++) {
				if(!e.get(i).contains(event.target)) {
					$(e.get(i)).find('.drop-down__col').collapse('hide');
				}
			}
		});
	}

	if($('.market-header .navbar-collapse').is('.market-header .navbar-collapse')) {
		document.addEventListener('click', function(event) {
			var e = $('.market-header .navbar-collapse');
			for(var i=0; i < e.length; i++) {
				if(!e.get(i).contains(event.target)) {
					$(e.get(i)).collapse('hide');
				}
			}
		});
	}

	if($('.disabled').is('.disabled')) {
		$('.disabled').on('click', function(){
			event.preventDefault();
		});
	}

	if($('.market-product__fav').is('.market-product__fav')) {
		$('.market-product__fav').on('click', function(){
			event.preventDefault();
			$(this).toggleClass('active');
		});
	}

	if($('.market-product-ld a').is('.market-product-ld a')) {
		$('.market-product-ld a').on('click', function(){
			event.preventDefault();
			$(this).toggleClass('active');
		});
	}

	if($('.market-sidebar-wrap').is('.market-sidebar-wrap')) {
		var sidebar2 = new StickySidebar('.market-sidebar-wrap', {
			topSpacing: 20,
			bottomSpacing: 20,
			containerSelector: '.market-main-right',
			innerWrapperSelector: '.market-sidebar-wrap',
			resizeSensor: true,
		});
	}

	if($('.market-main-filtr-oc').is('.market-main-filtr-oc')) {
		$('#market-main-filtr-col').on('show.bs.collapse', function () {
			$('.market-main-default-wrap').slideUp(0);
			$('.market-main-with-filtrs-wr').slideDown({
				start: function(){
					$(this).addClass('active');
				}
			}, 0);
			$('.market-main-with-filtrs-right').addClass('active');
			$('body').addClass('market-main-filtr-col__body');
		})
		$('#market-main-filtr-col').on('hide.bs.collapse', function () {
			setTimeout(function(){
				$('.market-main-with-filtrs-right').removeClass('active');
			}, 0);
			$('.market-main-with-filtrs-wr').removeClass('active');
			$('body').removeClass('market-main-filtr-col__body');
		})
	}

	if($('.market-filtr__link').is('.market-filtr__link')) {
		$('.market-filtr__link').on('click', function(){
			event.preventDefault();
			if($(this).closest('.market-filtr').find('.market-filtr-body').is(':visible')){
				$(this).removeClass('active');
				$(this).closest('.market-filtr').find('.market-filtr-body').slideUp(300);
			}
			else {
				$(this).addClass('active');
				$(this).closest('.market-filtr').find('.market-filtr-body').slideDown(300);
			}
		});
	}

	if($('.market-filtr-select').is('.market-filtr-select')) {
		$('.market-filtr__select').each(function() {
			var placeholder = $(this).attr('data-placeholder');
			var parent = $(this).closest('.market-filtr-select').find('.market-filtr-select-drop');
			if(placeholder){
				$(this).select2({
					placeholder: placeholder,
					minimumResultsForSearch: -1,
					dropdownParent: parent,
				});
			}
			else {
				$(this).select2({
					minimumResultsForSearch: -1,
					dropdownParent: parent,
				});
			}
			
		});
	}

	if($('.market-filtr-ch3__input').is('.market-filtr-ch3__input')) {
		$('.market-filtr-ch3__input').styler();
	}

	if($('.profile-menu-wrap').is('.profile-menu-wrap')) {
		var sidebar = new StickySidebar('.profile-menu-wrap', {
			topSpacing: 20,
			bottomSpacing: 20,
			containerSelector: '.profile-left2',
			innerWrapperSelector: '.profile-menu-wrap',
			resizeSensor: true,
		});
	}

	if($('.night-mode-link').is('.night-mode-link')) {
		$('.night-mode-link').on('click', function(){
			event.preventDefault();
			$(this).toggleClass('night-mode-active');
		});
	}

	if($('.profile-content-drop').is('.profile-content-drop')) {
		$('.profile-content-drop__link').on('click', function(){
			event.preventDefault();
			if(!$(this).closest('.profile-content-drop').find('.drop-down__col').is(':visible')){
				$(this).closest('.profile-content-drop').addClass('active');
			}
			else {
				$(this).closest('.profile-content-drop').removeClass('active');
			}
			$(this).closest('.profile-content-drop').find('.drop-down__col').slideToggle(300);
		});
		document.addEventListener('click', function(event) {
			var e = $('.profile-content-drop');
			for(var i=0; i < e.length; i++) {
				if(!e.get(i).contains(event.target)) {
					$(e.get(i)).find('.drop-down__col').slideUp(300);
					$(e.get(i)).removeClass('active');
				}
			}
		});
	}

	if($('.profile-content').is('.profile-content')) {
		$('.profile-content .market-product-ld a').on('click', function(){
			$(this).closest('.profile-content__bottom').find('.profile-content__comment').slideDown({
				start: function(){
					$(this).addClass('active');
				}
			}, 300);
			$(this).closest('.market-product-ld').find('a').not($(this)).removeClass('active');
		});
		$('.profile-content__comment-close').on('click', function(){
			event.preventDefault();
			$(this).closest('.profile-content__comment').slideUp({
				start: function(){
					$(this).removeClass('active');
				}
			}, 300);
			$(this).closest('.profile-content__bottom').find('.market-product-ld a').removeClass('active');
		});
	}

	if($('.profile-menu__oc').is('.profile-menu__oc')) {
		$('.profile-menu__oc').on('click', function(){
			event.preventDefault();
			$('body').addClass('market-main-filtr-col__body');
			$('.profile-menu-body').slideDown(300);
		});
	}
	if($('.profile-menu-body__close').is('.profile-menu-body__close')) {
		$('.profile-menu-body__close').on('click', function(){
			event.preventDefault();
			$('body').removeClass('market-main-filtr-col__body');
			$('.profile-menu-body').slideUp(300);
		});
	}

	if($('.profile-content__comment-close').is('.profile-content__comment-close')) {
		$('.profile-content__comment-close').on('click', function(){
			event.preventDefault();
			$(this).closest('.profile-content__comment').find('.global-input').val(null);
		});
	}

	if($('.global-copy').is('.global-copy')) {
		new ClipboardJS('.global-copy__link');
		$('.global-copy__link').on('click', function(){
			event.preventDefault();
		});
	}

	if($('.market-product__drop').is('.market-product__drop')) {
		$('.market-product__drop .drop-down__link').on('click', function(){
			event.preventDefault();
			if(!$(this).closest('.market-product__drop').find('.drop-down__col').is(':visible')){
				$(this).closest('.market-product__drop').find('.drop-down__col').slideDown(300);
				$(this).closest('.market-product').addClass('market-product__drop-active');
			}
			else {
				$(this).closest('.market-product__drop').find('.drop-down__col').slideUp(300);
				$(this).closest('.market-product').removeClass('market-product__drop-active');
			}
		});
		document.addEventListener('click', function(event) {
			var e = $('.market-product__drop');
			for(var i=0; i < e.length; i++) {
				if(!e.get(i).contains(event.target)) {
					$(e.get(i)).find('.drop-down__col').slideUp(300);
					$(e.get(i)).closest('.market-product').removeClass('market-product__drop-active');
				}
			}
		});
		$('.market-product').hover(function(){
			$('.drop-down__col').not($(this).find('.drop-down__col')).slideUp(300);
			$('.market-product').not($(this)).removeClass('market-product__drop-active');
		}, function(){

		});
		$('.market-product__drop .drop-down__list a').on('click', function(){
			$(this).closest('.market-product__drop').find('.drop-down__col').slideUp(300);
			$(this).closest('.market-product').removeClass('market-product__drop-active');
		});
	}

	if($('.market-product__drop-copy').is('.market-product__drop-copy')) {
		$('.market-product__drop-copy').on('click', function(){
			event.preventDefault();
			var copy_el = $(this).closest('.market-product').attr('data-copy');
			var $temp = $("<input>");
			$("body").append($temp);
			$temp.val(copy_el).select();
			document.execCommand("copy");
			$temp.remove();
			$(this).closest('.market-product').addClass('copy_active');
		});
		document.addEventListener('click', function(event) {
			var e = $('.market-product');
			for(var i=0; i < e.length; i++) {
				if(!e.get(i).contains(event.target)) {
					$(e.get(i)).removeClass('copy_active');
				}
			}
		});
	}
	
	if($('.market-product__drop-transfer').is('.market-product__drop-transfer')) {
		$('.market-product__drop-transfer').on('click', function(){
			event.preventDefault();
			$('.profile-my-nfts .market-product').removeClass('copy_active');
			$('.profile-my-nfts .market-product').removeClass('market-product__drop-active');
			$(this).closest('.market-product').addClass('market-product_transfer');
			$('.profile-my-nfts').addClass('market-product_transfer-body');
		});
	}

	if($('.market-product__transfer-modal').is('.market-product__transfer-modal')) {
		$('.market-product__transfer-modal .close').on('click', function(){
			event.preventDefault();
			$('.profile-my-nfts .market-product').removeClass('market-product_transfer');
			$('.profile-my-nfts').removeClass('market-product_transfer-body');
		});
	}

	if($('#profile-nfts-modal').is('#profile-nfts-modal')) {
		$('#profile-nfts-modal .global-input').on('keyup', function(){
			var search = $(this).val();
			if(search.length > 0){
				$(this).closest('.profile-nfts-modal__form').find('.btn-blue').removeClass('disabled');
				$(this).closest('.profile-nfts-modal__form').find('.btn-blue').removeAttr('disabled');
			}
			else {
				$(this).closest('.profile-nfts-modal__form').find('.btn-blue').addClass('disabled');
				$(this).closest('.profile-nfts-modal__form').find('.btn-blue').attr('disabled');
			}
		});
	}

	if($('#profile-nfts-board-modal').is('#profile-nfts-board-modal')) {
		$('#profile-nfts-board-modal .global-input').on('keyup', function(){
			var search = $(this).val();
			if(search.length > 0){
				$(this).closest('.profile-nfts-modal__form').find('.btn-blue').removeClass('disabled');
				$(this).closest('.profile-nfts-modal__form').find('.btn-blue').removeAttr('disabled');
			}
			else {
				$(this).closest('.profile-nfts-modal__form').find('.btn-blue').addClass('disabled');
				$(this).closest('.profile-nfts-modal__form').find('.btn-blue').attr('disabled');
			}
		});
		$('#profile-nfts-board-modal .global-input-with-close .global-input-close').on('click', function(){
			$(this).closest('.profile-nfts-modal__form').find('.btn-blue').addClass('disabled');
			$(this).closest('.profile-nfts-modal__form').find('.btn-blue').attr('disabled');
		});
	}

	if($('.global-input-with-close').is('.global-input-with-close')) {
		$('.global-input-with-close .global-input').on('keyup', function(){
			var search = $(this).val();
			if(search.length > 0){
				$(this).closest('.global-input-with-close').addClass('active');
			}
			else {
				$(this).closest('.global-input-with-close').removeClass('active');
			}
		});
		$('.global-input-with-close .global-input-close').on('click', function(){
			event.preventDefault();
			$(this).closest('.global-input-with-close').find('.global-input').val(null);
			$(this).closest('.global-input-with-close').removeClass('active');
		});
	}

	if($('#tokens-modal').is('#tokens-modal')) {
		$('#tokens-modal .tokens-input-init').on('keyup', function(){
			var search = $(this).val();
			if(search.length > 0){
				$(this).closest('.profile-nfts-modal__form').find('.btn-blue').removeClass('disabled');
				$(this).closest('.profile-nfts-modal__form').find('.btn-blue').removeAttr('disabled');
			}
			else {
				$(this).closest('.profile-nfts-modal__form').find('.btn-blue').addClass('disabled');
				$(this).closest('.profile-nfts-modal__form').find('.btn-blue').attr('disabled');
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