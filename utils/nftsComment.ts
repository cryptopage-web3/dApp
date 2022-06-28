export const nftsCommentInit = (): void => {
  if ($('.market-product-ld a').is('.market-product-ld a')) {
    $('.market-product-ld a').on('click', function (event) {
      event.preventDefault();
      $(this).toggleClass('active');
    });
  }
};

export const profileCommentSelect = (
  elem: EventTarget,
  root: HTMLDivElement,
): void => {
  if (!$(elem).hasClass('active')) {
    $(elem).addClass('active');
    $(root).find('.profile-content__comment').slideDown(300);
    $(root).addClass('active');
    $(elem)
      .closest('.market-product-ld')
      .find('a')
      .not($(elem) as any)
      .removeClass('active');
  } else {
    $(elem).closest('.market-product-ld').find('a').removeClass('active');
    $(root).removeClass('active');
    $(root).find('.profile-content__comment').slideUp(300);
    $(root)
      .find('.profile-content__comment .profile-content__comment-close')
      .removeClass('active');
    $(root)
      .find('.profile-content__comment .profile-content__comment-send')
      .removeClass('active');
  }
};

export const profileCommentControlVisible = (
  value: string,
  root: HTMLDivElement,
): void => {
  if (value.length > 1) {
    $(root).find('.profile-content__comment-close').addClass('active');
    $(root).find('.profile-content__comment-send').addClass('active');
  } else {
    $(root).find('.profile-content__comment-close').removeClass('active');
    $(root).find('.profile-content__comment-send').removeClass('active');
  }
};

export const profileCommentClose = (elem: EventTarget): void => {
  $(elem).removeClass('active');
  $(elem)
    .closest('.profile-content__comment')
    .find('.profile-content__comment-send')
    .removeClass('active');
};
