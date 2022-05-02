export const profileContentCommentInit = (): void => {
  if ($('.profile-content').is('.profile-content')) {
    $('.profile-content .market-product-ld a').on('click', function (event) {
      event.preventDefault();
      $(this).addClass('active');
      $(this)
        .closest('.profile-content__bottom')
        .find('.profile-content__comment')
        .slideDown(300);
      $(this)
        .closest('.market-product-ld')
        .find('a')
        .not($(this))
        .removeClass('active');
    });
    $('.profile-content__comment-close').on('click', function (event) {
      event.preventDefault();
      $(this).removeClass('active');
      $(this).closest('.profile-content__comment').slideUp(300);
      $(this)
        .closest('.profile-content__bottom')
        .find('.market-product-ld a')
        .removeClass('active');
    });
  }
};
