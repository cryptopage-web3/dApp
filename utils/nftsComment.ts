export const nftsCommentInit = (): void => {
  if ($('.market-product-ld a').is('.market-product-ld a')) {
    $('.market-product-ld a').on('click', function (event) {
      event.preventDefault();
      $(this).toggleClass('active');
    });
  }
};
