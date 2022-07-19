/* eslint-disable @typescript-eslint/no-empty-function */
export const marketProductDropInit = (): void => {
  if ($('.market-product__drop').is('.market-product__drop')) {
    $('.market-product__drop .drop-down__link').on('click', function (event) {
      event.preventDefault();
      if (
        !$(this)
          .closest('.market-product__drop')
          .find('.drop-down__col')
          .is(':visible')
      ) {
        $(this)
          .closest('.market-product__drop')
          .find('.drop-down__col')
          .slideDown(300);
        $(this)
          .closest('.market-product')
          .addClass('market-product__drop-active');
      } else {
        $(this)
          .closest('.market-product__drop')
          .find('.drop-down__col')
          .slideUp(300);
        $(this)
          .closest('.market-product')
          .removeClass('market-product__drop-active');
      }
    });
    document.addEventListener('click', function (event) {
      const e = $('.market-product__drop');
      for (let i = 0; i < e.length; i++) {
        if (!e.get(i)?.contains(event.target as Node)) {
          $(e.get(i) as any)
            .find('.drop-down__col')
            .slideUp(300);
          $(e.get(i) as any)
            .closest('.market-product')
            .removeClass('market-product__drop-active');
        }
      }
    });
    $('.market-product').hover(
      function () {
        $('.drop-down__col').not($(this).find('.drop-down__col')).slideUp(300);
        $('.market-product')
          .not($(this))
          .removeClass('market-product__drop-active');
      },
      function () {},
    );
    $('.market-product__drop .drop-down__list a').on('click', function () {
      $(this)
        .closest('.market-product__drop')
        .find('.drop-down__col')
        .slideUp(300);
      $(this)
        .closest('.market-product')
        .removeClass('market-product__drop-active');
    });
  }

  if ($('.market-product__drop-copy').is('.market-product__drop-copy')) {
    $('.market-product__drop-copy').on('click', function (event) {
      event.preventDefault();
      const copy_el =
        $(this).closest('.market-product').attr('data-copy') || '';
      const $temp = $('<input>');
      $('body').append($temp);
      $temp.val(copy_el).select();
      document.execCommand('copy');
      $temp.remove();
      $(this).closest('.market-product').addClass('copy_active');
    });
    document.addEventListener('click', function (event) {
      const e = $('.market-product');
      for (let i = 0; i < e.length; i++) {
        if (!e.get(i)?.contains(event.target as Node)) {
          $(e.get(i) as any).removeClass('copy_active');
        }
      }
    });
  }

  if (
    $('.market-product__drop-transfer').is('.market-product__drop-transfer')
  ) {
    $('.market-product__drop-transfer').on('click', function (event) {
      event.preventDefault();
      $('.profile-my-nfts .market-product').removeClass('copy_active');
      $('.profile-my-nfts .market-product').removeClass(
        'market-product__drop-active',
      );
      $(this).closest('.market-product').addClass('market-product_transfer');
      $('.profile-my-nfts').addClass('market-product_transfer-body');
    });
  }
};

export const marketProductDropTarget = (targetLink: any): void => {
  $(targetLink).on('click', function (event) {
    event.preventDefault();
    if (
      !$(this)
        .closest('.market-product__drop')
        .find('.drop-down__col')
        .is(':visible')
    ) {
      $(this)
        .closest('.market-product__drop')
        .find('.drop-down__col')
        .slideDown(300);
      $(this)
        .closest('.market-product')
        .addClass('market-product__drop-active');
    } else {
      $(this)
        .closest('.market-product__drop')
        .find('.drop-down__col')
        .slideUp(300);
      $(this)
        .closest('.market-product')
        .removeClass('market-product__drop-active');
    }
  });

  document.addEventListener('click', function (event) {
    const e = $(targetLink).closest('.market-product__drop');

    for (let i = 0; i < e.length; i++) {
      if (!e.get(i)?.contains(event.target as Node)) {
        $(e.get(i) as any)
          .find('.drop-down__col')
          .slideUp(300);
        $(e.get(i) as any)
          .closest('.market-product')
          .removeClass('market-product__drop-active');
      }
    }
  });
};
