/* eslint-disable no-new */
export const marketplaceSlider = (root: HTMLDivElement): void => {
  const slider = $(root).find('.swiper');
  const pagin = $(root).find('.swiper-pagination');
  const n = $(root).find('.swiper-button-next');
  const p = $(root).find('.swiper-button-prev');

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
};
