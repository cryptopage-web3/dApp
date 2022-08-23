/* eslint-disable no-new */
export const marketplaceSlider = (): void => {
  if ($('.main-slider').is('.main-slider')) {
    $('.main-slider').each(function () {
      const slider = $(this).find('.swiper');
      const pagin = $(this).find('.swiper-pagination');
      const n = $(this).find('.swiper-button-next');
      const p = $(this).find('.swiper-button-prev');

      new (window as any).Swiper(slider.get(0), {
        loop: false,
        slidesPerView: 4,
        spaceBetween: 0,
        pagination: {
          el: pagin.get(0),
          type: 'progressbar',
        },
        navigation: {
          nextEl: n.get(0),
          prevEl: p.get(0),
        },

        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        },
      });
    });
  }
};
