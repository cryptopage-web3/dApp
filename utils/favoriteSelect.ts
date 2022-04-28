export const favoriteSelectInit = (): void => {
  if ($('.market-product__fav').is('.market-product__fav')) {
    $('.market-product__fav').on('click', function (event) {
      event.preventDefault();
      $(this).toggleClass('active');
    });
  }
};
