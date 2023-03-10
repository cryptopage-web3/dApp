$(function(){

	/*start header fixed*/
	if($('#header').is('#header')) {
		window.onscroll = function() {myFunction()};

		var header = document.getElementById("header");

		var sticky = header.offsetTop;

		function myFunction() {
			if (window.pageYOffset > sticky) {
				header.classList.add("sticky");
				$('body').addClass('header-fixed');
			} else {
				header.classList.remove("sticky");
				$('body').removeClass('header-fixed');
			}
		} 
	}
	/*end header fixed*/

	/*start init slider on main page*/
	if($('.main-slider').is('.main-slider')) {

		$('.main-slider').each(function(){

			var slider = $(this).find('.swiper');
			var pagin = $(this).find('.swiper-pagination');
			var n = $(this).find('.swiper-button-next');
			var p = $(this).find('.swiper-button-prev');

			new Swiper(slider.get(0), {
				loop: false,
				slidesPerView: 4,
				spaceBetween: 0,
				pagination: {
					el: pagin.get(0),
					type: "progressbar",
				},
				navigation: {
					nextEl: n.get(0),
					prevEl: p.get(0),
				},

				breakpoints: {
					320: {
						slidesPerView: 1,
						spaceBetween: 0
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 0
					},
					1200: {
						slidesPerView: 4,
						spaceBetween: 0
					}
				}

			});

		});

	}
	/*end init slider on main page*/

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
			topSpacing: 115.8,
			bottomSpacing: 0,
			containerSelector: '.main-left',
			innerWrapperSelector: '#left-sidebar',
			resizeSensor: true,
			minWidth: 1199.5,
		});
	}
	if($('#right-sidebar').is('#right-sidebar')) {
		var sidebar = new StickySidebar('#right-sidebar', {
			topSpacing: 115.8,
			bottomSpacing: 0,
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
		$('.market-product-ld a').not($('.profile-content .market-product-ld a')).on('click', function(){
			event.preventDefault();
			$(this).toggleClass('active');
		});
	}

	if($('.market-sidebar-wrap').is('.market-sidebar-wrap')) {
		var sidebar2 = new StickySidebar('.market-sidebar-wrap', {
			topSpacing: 115.8,
			bottomSpacing: 0,
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
			topSpacing: 115.8,
			bottomSpacing: 0,
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
			event.preventDefault();
			if(!$(this).hasClass('active')){
				$(this).addClass('active');
				$(this).closest('.profile-content__bottom').find('.profile-content__comment').slideDown({
					start: function(){
						$(this).addClass('active');
					}
				}, 300);
				$(this).closest('.profile-content__bottom').addClass('active');
				$(this).closest('.market-product-ld').find('a').not($(this)).removeClass('active');
			}
			else {
				$(this).closest('.market-product-ld').find('a').removeClass('active');
				$(this).closest('.profile-content__bottom').removeClass('active');
				$(this).closest('.profile-content__bottom').find('.profile-content__comment').slideUp({
					start: function(){
						$(this).removeClass('active');
					}
				}, 300);
				$(this).closest('.profile-content__bottom').find('.profile-content__comment .global-input').val(null);
				$(this).closest('.profile-content__bottom').find('.profile-content__comment .profile-content__comment-close').removeClass('active');
				$(this).closest('.profile-content__bottom').find('.profile-content__comment .profile-content__comment-send').removeClass('active');
			}
		});
		/*$('.profile-content__comment-close').on('click', function(){
			event.preventDefault();
			$(this).closest('.profile-content__comment').slideUp({
				start: function(){
					$(this).removeClass('active');
				}
			}, 300);
			$(this).closest('.profile-content__bottom').find('.market-product-ld a').removeClass('active');
		});*/
	}

	if($('.profile-content__comment').is('.profile-content__comment')) {
		$('.profile-content__comment .global-input').on('keyup', function(){
			var modal_comment_nft_input = $(this).val();
			if(modal_comment_nft_input.length > 1){
				$(this).closest('.profile-content__comment').find('.profile-content__comment-close').addClass('active');
				$(this).closest('.profile-content__comment').find('.profile-content__comment-send').addClass('active');
			}
			else {
				$(this).closest('.profile-content__comment').find('.profile-content__comment-close').removeClass('active');
				$(this).closest('.profile-content__comment').find('.profile-content__comment-send').removeClass('active');
			}
		});
		$('.profile-content__comment .profile-content__comment-close').on('click', function(){
			event.preventDefault();
			$(this).removeClass('active');
			$(this).closest('.profile-content__comment').find('.profile-content__comment-send').removeClass('active');
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

	if($('.form-creat-focus-js').is('.form-creat-focus-js')) {
		$( ".form-creat-focus-js" ).blur(function() {
			if ($(this).val().trim() === '') {
				$(this).closest('.form-creat').removeClass('input--filled');
				$(this).closest('.form-creat').find('.form-creat-textarea-wrap').slideUp(300);
			}	
		});
		$( ".form-creat-focus-js" ).focus(function() {
			$(this).closest('.form-creat').addClass('input--filled');
			$(this).closest('.form-creat').find('.form-creat-textarea-wrap').slideDown(300);
		});

		$('.form-creat-focus-js').each(function(){
			if($(this).val().trim() !== ''){
				$(this).closest('.form-creat').addClass('input--filled');
				$(this).closest('.form-creat').find('.form-creat-textarea-wrap').slideDown(300);
			}
			else {
				$(this).closest('.form-creat').removeClass('input--filled');
				$(this).closest('.form-creat').find('.form-creat-textarea-wrap').slideUp(300);
			}
		});
	}

	if($('.form-creat-input-js').is('.form-creat-input-js')) {
		$('.form-creat-input-js').on('keyup', function(){
			var all_fill = true;
			if($(this).val().trim().length > 0){
				$('.form-creat-input-js').not($(this)).each(function(){
					if($(this).val().trim().length == 0){
						all_fill = false;
					}
				});
				if(all_fill){
					$('.form-creat__plus').removeClass('disabled');
					$('.form-creat__plus').addClass('btn-blue');
				}
			}
		});
		$(".form-creat-input-js").blur(function() {
			if ($(this).val().trim() === '') {
				$('.form-creat__plus').addClass('disabled');
				$('.form-creat__plus').removeClass('btn-blue');
			}	
		});
	}

	if($('.modal-creat-collapse-link').is('.modal-creat-collapse-link')) {
		$('.modal-creat-collapse-link').on('click', function(){
			event.preventDefault();
			if(!$(this).closest('.modal-creat-collapse').find('.modal-creat-collapse-body').is(':visible')){
				$(this).addClass('active');
				$(this).closest('.modal-creat-collapse').find('.modal-creat-collapse-body').slideDown(300);
			}
			else {
				$(this).removeClass('active');
				$(this).closest('.modal-creat-collapse').find('.modal-creat-collapse-body').slideUp(300);
			}
		});
	}

	if($('.modal-creat-input-js').is('.modal-creat-input-js')) {
		$('.modal-creat-input-js').on('keyup', function(){
			var all_fill = true;
			if($(this).val().trim().length > 0){
				$('.form-creat-avatar').slideDown(300);
				$('.modal-creat-text-content').slideDown(300);
				$('.btn_modal-creat').removeClass('disabled');
				$('.btn_modal-creat').addClass('btn-blue_button');
			}
		});
		$(".modal-creat-input-js").blur(function() {
			if ($(this).val().trim() === '') {
				$('.form-creat-avatar').slideUp(300);
				$('.modal-creat-text-content').slideUp(300);
				$('.btn_modal-creat').addClass('disabled');
				$('.btn_modal-creat').removeClass('btn-blue_button');
			}	
		});
	}

	if($('.form-creat-avatar__close').is('.form-creat-avatar__close')) {
		$('.form-creat-avatar__close').on('click', function(){
			event.preventDefault();
			$('.form-creat-avatar').slideUp(300);
			$('.modal-creat-text-content').slideUp(300);
			$('.modal-creat-input-js').val(null);
			$('.btn_modal-creat').addClass('disabled');
			$('.btn_modal-creat').removeClass('btn-blue_button');
		});
	}

	if($('.modal-creat-add-input-js').is('.modal-creat-add-input-js')) {
		$('.modal-creat-add-input-js').on('keyup', function(){
			var all_fill = true;
			if($(this).val().trim().length > 0){
				$(this).closest('.modal-creat-add-wrap').find('.modal-creat-add-input-js').not($(this)).each(function(){
					if($(this).val().trim().length == 0){
						all_fill = false;
					}
				});
				if(all_fill){
					$(this).closest('.modal-creat-add').find('.modal-creat-add__close').addClass('active');
					$(this).closest('.modal-creat-add').find('.modal-creat-add__close').removeClass('disabled');
					$(this).closest('.modal-creat-add-wrap').find('.btn').addClass('btn-blue_button');
					$(this).closest('.modal-creat-add-wrap').find('.btn').removeClass('disabled');
				}
			}
		});
		$(".modal-creat-add-input-js").blur(function() {
			if ($(this).val().trim() === '') {
				$(this).closest('.modal-creat-add').find('.modal-creat-add__close').removeClass('active');
				$(this).closest('.modal-creat-add').find('.modal-creat-add__close').addClass('disabled');
				$(this).closest('.modal-creat-add-wrap').find('.btn').removeClass('btn-blue_button');
				$(this).closest('.modal-creat-add-wrap').find('.btn').addClass('disabled');
			}	
		});
	}

	if($('.modal-creat-add__close').is('.modal-creat-add__close')) {
		$(document).on('click', '.modal-creat-add__close.active', function(){
			event.preventDefault();
			$(this).closest('.modal-creat-add').find('.global-input').val(null);
			$(this).closest('.modal-creat-add').find('.modal-creat-add__close').removeClass('active');
			$(this).closest('.modal-creat-add').find('.modal-creat-add__close').addClass('disabled');
			$(this).closest('.modal-creat-add').find('.btn').removeClass('btn-blue_button');
			$(this).closest('.modal-creat-add').find('.btn').addClass('disabled');
		});
	}

	if($('.modal-creat-add__btn1').is('.modal-creat-add__btn1')) {
		$('.modal-creat-add__btn1').on('click', function(){
			var state = $(this).closest('.modal-creat-add-wrap').find('input[name="type"]').val();
			var name = $(this).closest('.modal-creat-add-wrap').find('input[name="name"]').val();
			var html_el = "<div class='modal-creat-item1'><span>"+state+": "+name+"</span><a href='#'><img src='img/modal-creat-item1_img.svg' alt=''></a></div>";
			$(this).closest('.modal-creat-add').find('.modal-creat-add-cont').append(html_el);
			$(this).closest('.modal-creat-add-wrap').find('.global-input').val(null);
			$(this).closest('.modal-creat-add').find('.modal-creat-add__close').removeClass('active');
			$(this).closest('.modal-creat-add').find('.modal-creat-add__close').addClass('disabled');
			$(this).closest('.modal-creat-add').find('.btn').removeClass('btn-blue_button');
			$(this).closest('.modal-creat-add').find('.btn').addClass('disabled');
		});
	}

	if($('.modal-creat-add__btn2').is('.modal-creat-add__btn2')) {
		$('.modal-creat-add__btn2').on('click', function(){
			var name = $(this).closest('.modal-creat-add-wrap').find('input[name="name"]').val();
			var from = $(this).closest('.modal-creat-add-wrap').find('input[name="from"]').val();
			var to = $(this).closest('.modal-creat-add-wrap').find('input[name="to"]').val();
			var html_el = "<div class='modal-creat-item1'><span>"+name+": "+from+" of "+to+"</span><a href='#'><img src='img/modal-creat-item1_img.svg' alt=''></a></div>";
			$(this).closest('.modal-creat-add').find('.modal-creat-add-cont').append(html_el);
			$(this).closest('.modal-creat-add-wrap').find('.global-input').val(null);
			$(this).closest('.modal-creat-add').find('.modal-creat-add__close').removeClass('active');
			$(this).closest('.modal-creat-add').find('.modal-creat-add__close').addClass('disabled');
			$(this).closest('.modal-creat-add').find('.btn').removeClass('btn-blue_button');
			$(this).closest('.modal-creat-add').find('.btn').addClass('disabled');
		});
	}

	if($('.modal-creat-add__btn3').is('.modal-creat-add__btn3')) {
		$('.modal-creat-add__btn3').on('click', function(){
			var name = $(this).closest('.modal-creat-add-wrap').find('input[name="name"]').val();
			var from = $(this).closest('.modal-creat-add-wrap').find('input[name="from"]').val();
			var to = $(this).closest('.modal-creat-add-wrap').find('input[name="to"]').val();
			var procent = (from / to) * 100;
			procent = procent + "%";
			var html_el = "<div class='modal-creat-item2'><div class='modal-creat-item2__left'><div class='modal-creat-item2__top'><span>"+name+"</span><span>"+from+" of "+to+"</span></div><div class='modal-creat-item2__progress'><div style='width:"+procent+";'></div></div></div><a href='#'><img src='img/modal-creat-item1_img.svg' alt=''></a></div>";
			$(this).closest('.modal-creat-add').find('.modal-creat-add-cont').append(html_el);
			$(this).closest('.modal-creat-add-wrap').find('.global-input').val(null);
			$(this).closest('.modal-creat-add').find('.modal-creat-add__close').removeClass('active');
			$(this).closest('.modal-creat-add').find('.modal-creat-add__close').addClass('disabled');
			$(this).closest('.modal-creat-add').find('.btn').removeClass('btn-blue_button');
			$(this).closest('.modal-creat-add').find('.btn').addClass('disabled');
		});
	}

	$(document).on('click', '.modal-creat-item1 a', function(){
		event.preventDefault();
		$(this).closest('.modal-creat-item1').remove();
	});
	$(document).on('click', '.modal-creat-item2 a', function(){
		event.preventDefault();
		$(this).closest('.modal-creat-item2').remove();
	});

	if($('.form-creat-files-item').is('.form-creat-files-item')) {
		$('.form-creat-files-item__close').on('click', function(){
			event.preventDefault();
			$(this).closest('.form-creat-files-item').remove();
		});
	}

	if($('.ps-js').is('.ps-js')) {
		var ps_array = [];
		$('.ps-js').each(function(){
			var data_id = $(this).attr('data-id');
			ps_array.push([data_id, new PerfectScrollbar($(this).get(0), {suppressScrollX: true,handlers: ['wheel', 'touch'], wheelPropagation: false,})]);
		});
	}

	if($('.search-people').is('.search-people')) {
		$('.search-people__input').on('keyup', function(e){
			var search = $(this).val();
			if(search.length > 1){
				$(this).closest('.search-people').find('.search-people__drop').slideDown(300);
				$(this).closest('.search-people').addClass('active');
				$.each(ps_array, function(index, value){
					if($(e.target).closest('.search-people').find('.ps-js').attr('data-id') == ps_array[index][0]){
						ps_array[index][1].update();
					}
				});
			}
			else {
				$(this).closest('.search-people').find('.search-people__drop').slideUp(300);
				$(this).closest('.search-people').removeClass('active');
			}
		});
		$('.search-people__clear').on('click', function(){
			event.preventDefault();
			$(this).closest('.search-people__top').find('.search-people__input').val(null);
			$(this).closest('.search-people').find('.search-people__drop').slideUp(300);
			$(this).closest('.search-people').removeClass('active');
		});
	}

	if($('.search-people_single').is('.search-people_single')) {
		$('.search-people_single .market-header-search__list a').on('click', function(){
			event.preventDefault();
			$(this).closest('.search-people__drop').slideUp(300);
			$(this).closest('.search-people').removeClass('active');
			$(this).closest('.modal-body').find('.search-people-result').empty();
			$(this).closest('.search-people').find('.search-people__top .global-input').val(null);
			$(this).closest('.search-people').find('.search-people__top .global-input').addClass('disabled');
			$(this).closest('.search-people').find('.search-people__top .global-input').attr('disabled', 'disabled');
			var inner_html = '<ul class="market-header-search__list"><li><a href="#"><div class="left"><img class="avatar" src="img/market-header-search-avatar1.png" alt=""><span>CryptoPunk</span><img src="img/market-header-search-ident.svg" alt="" class="ident"></div></a><a href="#" class="search-people-result__close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM7.70711 17.7071L17.7071 7.70711L16.2929 6.29289L6.29289 16.2929L7.70711 17.7071ZM6.29289 7.70711L16.2929 17.7071L17.7071 16.2929L7.70711 6.29289L6.29289 7.70711Z" fill="#687684"></path></svg></a></li></ul>';
			$(this).closest('.modal-body').find('.search-people-result').html(inner_html);
			$(this).closest('.modal-body').find('.btn_modal-creat-chat_single').removeClass('disabled btn_default');
			$(this).closest('.modal-body').find('.btn_modal-creat-chat_single').addClass('btn-blue_button');
		});
	}

	$(document).on('click', '.search-people-result__close', function(){
		event.preventDefault();
		$(this).closest('.modal-body').find('.search-people__top .global-input').removeClass('disabled');
		$(this).closest('.modal-body').find('.search-people__top .global-input').removeAttr('disabled');
		if($('.search-people-result .market-header-search__list li').length == 1){
			$(this).closest('.modal-body').find('.btn_modal-creat-chat_single').removeClass('btn-blue_button');
			$(this).closest('.modal-body').find('.btn_modal-creat-chat_single').addClass('disabled btn_default');
			$(this).closest('.search-people-result').html('<div class="global-text text-center"> <p class="fs_14"> The contact list is empty </p> </div>');
		}
		$(this).closest('li').remove();
	});

	if($('.search-people__success').is('.search-people__success')) {
		$('.search-people__success').on('click', function(){
			event.preventDefault();
			$(this).closest('.search-people').find('.search-people__drop').slideUp(300);
			$(this).closest('.search-people').removeClass('active');
			$(this).closest('.modal-body').find('.search-people-result').empty();
			$(this).closest('.search-people').find('.search-people__top .global-input').val(null);
			var inner_html = '<ul class="market-header-search__list"><li><a href="#"><div class="left"><img class="avatar" src="img/market-header-search-avatar1.png" alt=""><span>CryptoPunk</span><img src="img/market-header-search-ident.svg" alt="" class="ident"></div></a><a href="#" class="search-people-result__close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM7.70711 17.7071L17.7071 7.70711L16.2929 6.29289L6.29289 16.2929L7.70711 17.7071ZM6.29289 7.70711L16.2929 17.7071L17.7071 16.2929L7.70711 6.29289L6.29289 7.70711Z" fill="#687684"></path></svg></a></li><li><a href="#"><div class="left"><img class="avatar" src="img/market-header-search-avatar1.png" alt=""><span>CryptoPunk</span><img src="img/market-header-search-ident.svg" alt="" class="ident"></div></a><a href="#" class="search-people-result__close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM7.70711 17.7071L17.7071 7.70711L16.2929 6.29289L6.29289 16.2929L7.70711 17.7071ZM6.29289 7.70711L16.2929 17.7071L17.7071 16.2929L7.70711 6.29289L6.29289 7.70711Z" fill="#687684"></path></svg></a></li><li><a href="#"><div class="left"><img class="avatar" src="img/market-header-search-avatar1.png" alt=""><span>CryptoPunk</span><img src="img/market-header-search-ident.svg" alt="" class="ident"></div></a><a href="#" class="search-people-result__close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM7.70711 17.7071L17.7071 7.70711L16.2929 6.29289L6.29289 16.2929L7.70711 17.7071ZM6.29289 7.70711L16.2929 17.7071L17.7071 16.2929L7.70711 6.29289L6.29289 7.70711Z" fill="#687684"></path></svg></a></li><li><a href="#"><div class="left"><img class="avatar" src="img/market-header-search-avatar1.png" alt=""><span>CryptoPunk</span><img src="img/market-header-search-ident.svg" alt="" class="ident"></div></a><a href="#" class="search-people-result__close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM7.70711 17.7071L17.7071 7.70711L16.2929 6.29289L6.29289 16.2929L7.70711 17.7071ZM6.29289 7.70711L16.2929 17.7071L17.7071 16.2929L7.70711 6.29289L6.29289 7.70711Z" fill="#687684"></path></svg></a></li></ul>';
			$(this).closest('.modal-body').find('.search-people-result').html(inner_html);
			$(this).closest('.modal-body').find('.btn_modal-creat-chat_single').removeClass('disabled btn_default');
			$(this).closest('.modal-body').find('.btn_modal-creat-chat_single').addClass('btn-blue_button');
		});
}

if($('.btn_modal-creat-chat_single').is('.btn_modal-creat-chat_single')) {
	$('.btn_modal-creat-chat_single, .message-creat-search-body .chat-list-item').on('click', function(){
		event.preventDefault();
		$('.message-creat').addClass('active');
		$('.message-creat').removeClass('archive-active2');
		if($('.archive-wrap .chat-list-item-wrap').length == 0){
			$('.message-creat').removeClass('archive-active');
		}
		else {
			$('.message-creat').addClass('archive-active');
		}
		if($(this).closest('.message-creat-search-body')){
			$('.message-creat-search-drop').slideUp(300);
			$('.message-creat-search-wrap').removeClass('active');
			var id_el = $(this).closest('.chat-list-item-wrap').attr('data-id-chat');
			setTimeout(function(){
				$('.chat-list').find('.chat-list-item-wrap[data-id-chat="'+id_el+'"]:eq(0)').addClass('active');
				$('.chat-list').find('.chat-list-item-wrap[data-id-chat="'+id_el+'"]:eq(0) .chat-list-item').addClass('active');
			}, 300);
		}
		$.each(ps_array, function(index, value){
			if($('.chat-list').attr('data-id') == ps_array[index][0]){
				ps_array[index][1].update();
			}
		});
		$('.message-right-sidebar').addClass('active-message-not-select');
	});
}

if($('.chat-list-item').is('.chat-list-item')) {
	$('.chat-list-item').not('.message-creat-search-body .chat-list-item').mousedown(function(event) {
		switch (event.which) {
			case 3:
			$(this)[0].oncontextmenu = function() {return false;};
			var height_top_parent = $('.chat-list').offset().top;
			var height_top_el = $(this).offset().top;
			var scroll_pos = $(this).closest('.chat-list')[0]['scrollTop'];
			if(!$(this).closest('.chat-list-item-wrap').find('.drop-down__col').is(':visible')){
				$('.chat-list-item-wrap .drop-down__col').not($(this).closest('.chat-list-item-wrap').find('.drop-down__col')).slideUp(0);
				if(Math.abs(height_top_parent - height_top_el) < 240){
					$(this).closest('.chat-list-item-wrap').find('.drop-down__col').css('bottom', 'auto');
				}
				else {
					$(this).closest('.chat-list-item-wrap').find('.drop-down__col').css('top', 'auto');
					$(this).closest('.chat-list-item-wrap').find('.drop-down__col').css('bottom', 'calc(100% + 5px)');
				}
				$(this).closest('.chat-list-item-wrap').find('.drop-down__col').slideDown(300);
			}
			else {
				$(this).closest('.chat-list-item-wrap').find('.drop-down__col').slideUp(0);
			}
			break;
		}
	});
	document.addEventListener('click', function(event) {
		var e = $('.chat-list-item-wrap');
		for(var i=0; i < e.length; i++) {
			if(!e.get(i).contains(event.target)) {
				$(e.get(i)).find('.drop-down__col').slideUp(0);
			}
		}
	});


	$('.chat-list-item').longpress(function(e){
		e.preventDefault();
		$(this)[0].oncontextmenu = function() {return false;};
		var height_top_parent = $('.chat-list').offset().top;
		var height_top_el = $(this).offset().top;
		var scroll_pos = $(this).closest('.chat-list')[0]['scrollTop'];
		if(!$(this).closest('.chat-list-item-wrap').find('.drop-down__col').is(':visible')){
			$('.chat-list-item-wrap .drop-down__col').not($(this).closest('.chat-list-item-wrap').find('.drop-down__col')).slideUp(0);
			if(Math.abs(height_top_parent - height_top_el) < 240){
				$(this).closest('.chat-list-item-wrap').find('.drop-down__col').css('bottom', 'auto');
			}
			else {
				$(this).closest('.chat-list-item-wrap').find('.drop-down__col').css('top', 'auto');
				$(this).closest('.chat-list-item-wrap').find('.drop-down__col').css('bottom', 'calc(100% + 5px)');
			}
			$(this).closest('.chat-list-item-wrap').find('.drop-down__col').slideDown(300);
		}
		else {
			$(this).closest('.chat-list-item-wrap').find('.drop-down__col').slideUp(0);
		}
	});

}

if($('.archive-wrap').is('.archive-wrap')) {
	if($('.archive-wrap .chat-list-item-wrap').length == 0){
		$('.message-creat').removeClass('archive-active');
	}
	else {
		$('.message-creat').addClass('archive-active');
	}
}

if($('.btn_archive').is('.btn_archive')) {
	$('.btn_archive').on('click', function(){
		event.preventDefault();
		$('.message-creat').addClass('archive-active2');
	});
}

if($('.archive-chat-back').is('.archive-chat-back')) {
	$('.archive-chat-back').on('click', function(){
		event.preventDefault();
		$(this).closest('.message-creat').removeClass('archive-active2');
	});
}

if($('.chat-archive').is('.chat-archive')) {
	$('.chat-archive').on('click', function(){
		event.preventDefault();
		$(this).closest('.chat-list-item-wrap').prependTo($('.archive-wrap .chat-list'));
		$('.message-creat').addClass('archive-active');
		$(this).closest('.drop-down__col').slideUp(0);
		$('.chat-list').each(function(e){
			var el_this = $(this);
			$.each(ps_array, function(index, value){
				if(el_this.attr('data-id') == ps_array[index][0]){
					ps_array[index][1].update();
				}
			});
		});
	});
}

if($('.chat-archive-delete').is('.chat-archive-delete')) {
	$('.chat-archive-delete').on('click', function(){
		event.preventDefault();
		if($('.archive-wrap .chat-list .chat-list-item-wrap').length == 1){
			$('.message-creat').removeClass('archive-active');
			$('.message-creat').removeClass('archive-active2');
		}
		$(this).closest('.chat-list-item-wrap').prependTo($('.message-creat > .chat-list'));
		$(this).closest('.drop-down__col').slideUp(0);
		$('.chat-list').each(function(e){
			var el_this = $(this);
			$.each(ps_array, function(index, value){
				if(el_this.attr('data-id') == ps_array[index][0]){
					ps_array[index][1].update();
				}
			});
		});
	});
}

if($('.chat-bottom-text__textarea').is('.chat-bottom-text__textarea')) {
	$('.chat-bottom-text__textarea').on('change keyup keydown paste cut', function () {
		$(this).height(24).height(this.scrollHeight);
		if($(this).val()==''){
			$(this).closest('.chat').find('.message-send').slideUp(0);
		}
		else {
			$(this).closest('.chat').find('.message-send').slideDown(0);
		}
	}).find('textarea').change();
}

if($('.chat').is('.chat')) {
	$('.chat').each(function(){
		var el = $(this);
		new ResizeSensor($(this).find('.chat-bottom'), function(e){
			var height_bottom = el.find('.chat-bottom').outerHeight();
			var height_top = el.find('.chat-top').outerHeight();
			var height_parent = el.outerHeight();
			el.find('.chat-middle').css('height', (height_parent - height_bottom - height_top) + 'px');
			$.each(ps_array, function(index, value){
				if(el.find('.ps-js').attr('data-id') == ps_array[index][0]){
					ps_array[index][1].update();
				}
			});
		});
		new ResizeSensor($(this).find('.chat-top'), function(e){
			var height_bottom = el.find('.chat-bottom').outerHeight();
			var height_top = el.find('.chat-top').outerHeight();
			var height_parent = el.outerHeight();
			el.find('.chat-middle').css('height', (height_parent - height_bottom - height_top) + 'px');
			$.each(ps_array, function(index, value){
				if(el.find('.ps-js').attr('data-id') == ps_array[index][0]){
					ps_array[index][1].update();
				}
			});
		});
	});
}

if($('.chat-select').is('.chat-select')) {
	$('.chat-select').on('click', function(){
		event.preventDefault();
		$(this).closest('.chat').find('.global-checkbox3').addClass('active');
		$(this).closest('.profile-content-drop').removeClass('active');
		$(this).closest('.drop-down__col').slideUp(0);
		$(this).closest('.profile-content-drop').slideUp(0);
		$(this).closest('.chat-menu').find('.chat-select-delete').slideDown(0);
		$(this).closest('.chat').find('.chat-bottom').addClass('active-forward');
	});
}

if($('.global-checkbox3').is('.global-checkbox3')) {
	$('.chat').each(function(){
		var count_el = 0;
		$(this).find('.global-checkbox3 input').each(function(){
			if($(this).is(':checked')){
				count_el = count_el + 1;
			}
		});
		$(this).find('.chat-bottom-forward__count span').text(count_el);
	});

	$('.global-checkbox3 input').on('change', function(){
		var count_el = 0;
		$(this).closest('.chat').find('.global-checkbox3 input').each(function(){
			if($(this).is(':checked')){
				count_el = count_el + 1;
			}
		});
		$(this).closest('.chat').find('.chat-bottom-forward__count span').text(count_el);
	});
}

if($('.chat-select-delete').is('.chat-select-delete')) {
	$('.chat-select-delete').on('click', function(){
		event.preventDefault();
		$(this).closest('.chat').find('.global-checkbox3').removeClass('active');
		$(this).closest('.chat').find('.chat-bottom').removeClass('active-forward');
		$(this).closest('.chat-menu').find('.profile-content-drop').slideDown(0);
		$(this).slideUp(0);
	});
}

if($('.chat-bottom-forward__link').is('.chat-bottom-forward__link')) {
	$('.chat-bottom-forward__link').on('click', function(){
		event.preventDefault();
		$(this).closest('.chat').find('.global-checkbox3').removeClass('active');
		$(this).closest('.chat').find('.chat-bottom').removeClass('active-forward');
		$(this).closest('.chat').find('.chat-menu .profile-content-drop').slideDown(0);
		$(this).closest('.chat').find('.chat-select-delete').slideUp(0);
	});
}

if($('#modal-forward').is('#modal-forward')) {
	$('#modal-forward').on('shown.bs.modal', function (e) {
		$.each(ps_array, function(index, value){
			if($('#modal-forward').find('.ps-js').attr('data-id') == ps_array[index][0]){
				ps_array[index][1].update();
			}
		});
	})

	$('#modal-forward .modal-forward-item').on('click', function(){
		event.preventDefault();
		var id_chat = $(this).attr('data-id-chat');
		$(this).closest('.modal').modal('hide');
		$('.chat').removeClass('active');
		$('.chat[data-id-chat="'+id_chat+'"]').addClass('active');
		$('.chat-list-item-wrap').removeClass('active');
		$('.chat-list-item-wrap .chat-list-item').removeClass('active');
		$('.chat-list-item-wrap[data-id-chat="'+id_chat+'"] .chat-list-item').addClass('active');
		$('.chat-list-item-wrap[data-id-chat="'+id_chat+'"]').addClass('active');
	});
}

function scrollToEnd(el) {
	setTimeout(() => {
		var container = el[0];
		container.scrollTop = container.scrollHeight;
	}, 0);
}

if($('.chat-list-item-wrap').is('.chat-list-item-wrap')) {
	$('.chat-list-item-wrap .chat-list-item').on('click', function(){
		event.preventDefault();
		$('.chat-list-item-wrap').removeClass('active');
		$('.chat-list-item-wrap .chat-list-item').removeClass('active');
		$(this).closest('.chat-list-item-wrap').addClass('active');
		$(this).addClass('active');
		var id_el = $(this).closest('.chat-list-item-wrap').attr('data-id-chat');
		$('.chat').removeClass('active');
		$('.chat[data-id-chat="'+id_el+'"]').addClass('active');
		$('.message-right-sidebar').addClass('active');
		$('body').addClass('body-message-hidden');
	});
}

if($('.chat-down').is('.chat-down')) {
	$('.chat-down').on('click', function(){
		event.preventDefault();
		scrollToEnd($(this).closest('.chat-middle').find('.chat-body'));
	});
}

if($('.chat-body').is('.chat-body')) {
	$('.chat-body').each(function(){
		$(this)[0].addEventListener('ps-scroll-y', (event)=> {
			var stm = $(this)[0].scrollHeight - $(this)[0].offsetHeight;
			if((stm - $(this)[0].scrollTop) < 100){
				$(this).closest('.chat-middle').find('.chat-down').slideUp(0);
			}
			else {
				$(this).closest('.chat-middle').find('.chat-down').slideDown(0);
			}
		});
	});
}

if($('.chat-bottom-fm-close').is('.chat-bottom-fm-close')) {
	$('.chat-bottom-fm-close').on('click', function(){
		event.preventDefault();
		$(this).closest('.chat-bottom-fm').remove();
	});
}

if($('.modal-message-foto').is('.modal-message-foto')) {
	$('.modal-message-foto').on('click', function(){
		event.preventDefault();
		$('#modal-input-file-tab1-tab').tab('show');
		$('#modal-input-file').modal('show');
	});
}

if($('.modal-message-file').is('.modal-message-file')) {
	$('.modal-message-file').on('click', function(){
		event.preventDefault();
		$('#modal-input-file-tab2-tab').tab('show');
		$('#modal-input-file').modal('show');
	});
}

if($('.chat-delete').is('.chat-delete')) {
	$('.chat-delete').on('click', function(){
		event.preventDefault();
		$('#modal-delete-chat').modal('show');
	});
}

if($('.clear-history').is('.clear-history')) {
	$('.clear-history').on('click', function(){
		event.preventDefault();
		$('#modal-celar-history').modal('show');
	});
}

if($('.chat-back').is('.chat-back')) {
	$('.chat-back').on('click', function(){
		event.preventDefault();
		$('body').removeClass('body-message-hidden');
		$('.message-right-sidebar').removeClass('active');
		$('.chat').removeClass('active');
	});
}

if($('.message-creat-search-wrap').is('.message-creat-search-wrap')) {
	$('.message-creat-search-wrap .global-input').on('keyup', function(){
		var search = $(this).val();
		if(search.length > 1){
			$('.message-creat-search-drop').slideDown(300);
			$('.message-creat-search-wrap').addClass('active');
			$.each(ps_array, function(index, value){
				if($('.message-creat-search-body').attr('data-id') == ps_array[index][0]){
					ps_array[index][1].update();
				}
			});
		}
		else {
			$('.message-creat-search-drop').slideUp(300);
			$('.message-creat-search-wrap').removeClass('active');
		}
	});
	$('.message-creat-search-close').on('click', function(){
		event.preventDefault();
		$(this).closest('.message-creat-search-wrap').find('.global-input').val(null);
		$('.message-creat-search-drop').slideUp(300);
		$('.message-creat-search-wrap').removeClass('active');
	});
}

if($('.chat-search__link').is('.chat-search__link')) {
	$('.chat-search__link').on('click', function(){
		event.preventDefault();
		if(!$(this).closest('.chat-top').find('.chat-search-drop').is(':visible')){
			$(this).closest('.chat-top').find('.chat-search-drop').slideDown(300);
		}
	});
	$('.chat-search__input').on('keyup', function(e){
		var search = $(this).val();
		if(search.length > 1){
			$(this).closest('.chat-search-body').find('.chat-search-drop2').slideDown(300);
			$(this).closest('.chat-search-body').addClass('active');
			$.each(ps_array, function(index, value){
				if($(e.target).closest('.chat-search-body').find('.ps-js').attr('data-id') == ps_array[index][0]){
					ps_array[index][1].update();
				}
			});
		}
		else {
			$(this).closest('.chat-search-body').find('.chat-search-drop2').slideUp(300);
			$(this).closest('.chat-search-body').removeClass('active');
		}
	});
	$('.chat-search__close').on('click', function(){
		event.preventDefault();
		if(!$(this).closest('.chat-search-body').find('.chat-search-drop2').is(':visible')) {
			$(this).closest('.chat-search-body').find('.chat-search__input').val(null);
			$(this).closest('.chat-search-drop').slideUp(300);
		}
		else {
			$(this).closest('.chat-search-body').find('.chat-search-drop2').slideUp(300);
			$(this).closest('.chat-search-body').removeClass('active');
		}
	});
}

if($('#market-header__wallet-col').is('#market-header__wallet-col')) {
	$('#market-header__wallet-col').on('show.bs.collapse', function() {
		$('#market-header__wallet-col2').collapse('hide');
	})
}
if($('#market-header__wallet-col2').is('#market-header__wallet-col2')) {
	$('#market-header__wallet-col2').on('show.bs.collapse', function() {
		$('#market-header__wallet-col').collapse('hide');
	})
}

if($('.modal-post-turn-link').is('.modal-post-turn-link')) {
	$('.modal-post-turn-link').on('click', function(){
		event.preventDefault();
		if(!$(this).closest('.modal-body').find('.modal-post-comments').is(':visible')){
			$(this).closest('.modal-body').find('.modal-post-comments').slideDown(300);
			$(this).closest('.modal-body').find('.modal-post-bottom__text').slideUp(300);
			$(this).removeClass('active');
		}
		else {
			$(this).closest('.modal-body').find('.modal-post-comments').slideUp(300);
			$(this).closest('.modal-body').find('.modal-post-bottom__text').slideDown(300);
			$(this).addClass('active');
		}
	});
}

if($('.modal-post-delete').is('.modal-post-delete')) {
	$('.modal-post-delete').on('click', function(){
		event.preventDefault();
		$('#modal-delete-post').modal('show');
		$('body').addClass('modal-post-showing');
	});
}
if($('#modal-delete-post').is('#modal-delete-post')) {
	$('#modal-delete-post').on('hidden.bs.modal', function (e) {
		$('body').removeClass('modal-post-showing');
		$('body').addClass('modal-open');
	})
}
if($('.profile-content__image').is('.profile-content__image')) {
	$('.profile-content__image').on('click', function(){
		event.preventDefault();
		if($('#modal-post').is('#modal-post')){
			$('#modal-post').modal('show');
		}
	});
}
if($('.profile-content__desc').is('.profile-content__desc')) {
	$('.profile-content__desc').on('click', function(){
		event.preventDefault();
		if($('#modal-post').is('#modal-post')){
			$('#modal-post').modal('show');
		}
	});
}

if($('.market-product').is('.market-product')) {
	$('.market-product .market-product-ld a').on('click', function(){
		if($('#modal-comment-nft').is('#modal-comment-nft')){
			$('#modal-comment-nft').modal('show');
		}
	});
}

if($('.chat-item').is('.chat-item')) {
	$('.chat-item').mousedown(function(event) {
		switch (event.which) {
			case 3:
			$(this)[0].oncontextmenu = function() {return false;};
			var height_top_parent = $('.chat-body').offset().top;
			var height_top_el = $(this).offset().top;
			var scroll_pos = $(this).closest('.chat-body')[0]['scrollTop'];
			if(!$(this).find('.drop-down__col-chat').is(':visible')){
				$('.chat-item .drop-down__col-chat').not($(this).find('.drop-down__col-chat')).slideUp(0);
				if(Math.abs(height_top_parent - height_top_el) < 240){
					$(this).find('.drop-down__col-chat').css('bottom', 'auto');
				}
				else {
					$(this).find('.drop-down__col-chat').css('top', 'auto');
					$(this).find('.drop-down__col-chat').css('bottom', '0');
				}
				$(this).find('.drop-down__col-chat').slideDown(300);
			}
			else {
				$(this).find('.drop-down__col-chat').slideUp(0);
			}
			break;
		}
	});
	document.addEventListener('click', function(event) {
		var e = $('.chat-item');
		for(var i=0; i < e.length; i++) {
			if(!e.get(i).contains(event.target)) {
				$(e.get(i)).find('.drop-down__col-chat').slideUp(0);
			}
		}
	});


	$('.chat-item').longpress(function(e){
		e.preventDefault();
		$(this)[0].oncontextmenu = function() {return false;};
		var height_top_parent = $('.chat-body').offset().top;
		var height_top_el = $(this).offset().top;
		var scroll_pos = $(this).closest('.chat-body')[0]['scrollTop'];
		if(!$(this).find('.drop-down__col-chat').is(':visible')){
			$('.chat-item .drop-down__col-chat').not($(this).find('.drop-down__col-chat')).slideUp(0);
			if(Math.abs(height_top_parent - height_top_el) < 240){
				$(this).find('.drop-down__col-chat').css('bottom', 'auto');
			}
			else {
				$(this).find('.drop-down__col-chat').css('top', 'auto');
				$(this).find('.drop-down__col-chat').css('bottom', '0');
			}
			$(this).find('.drop-down__col-chat').slideDown(300);
		}
		else {
			$(this).find('.drop-down__col-chat').slideUp(0);
		}
	});

}

if($('.drop-down__col-chat').is('.drop-down__col-chat')) {
	$('.drop-down__col-chat .chat-select').on('click', function(){
		$(this).closest('.chat').find('.chat-menu')
		$(this).closest('.chat').find('.chat-menu .profile-content-drop').removeClass('active');
		$(this).closest('.chat').find('.chat-menu .drop-down__col').slideUp(0);
		$(this).closest('.chat').find('.chat-menu .profile-content-drop').slideUp(0);
		$(this).closest('.chat').find('.chat-menu .chat-select-delete').slideDown(0);
	});
}

/*start cookie*/
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + ((exdays || 365) * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

if (!getCookie("cookieCrypto")) {
	$('.global-cookie').slideDown(0);
	$('.global-cookie-btn1').on('click', function(event){
		event.preventDefault();
		$('.global-cookie').slideUp(300);
		setCookie("cookieCrypto", true, 0.083);
	});
	$('.global-cookie-btn2').on('click', function(event){
		event.preventDefault();
		$('.global-cookie').slideUp(300);
	});
}
/*end cookie*/

});

/*audio init*/
if($('.post-audio-item').is('.post-audio-item')) {
	document.addEventListener('DOMContentLoaded', function() {
		new GreenAudioPlayer('.post-audio-item', { showTooltips: true, showDownloadButton: false, enableKeystrokes: true });
	});
}