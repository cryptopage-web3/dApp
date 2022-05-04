export const nftsModalInit = (): void => {
  if (
    $('.market-product__transfer-modal').is('.market-product__transfer-modal')
  ) {
    $('.market-product__transfer-modal .close').on('click', function (event) {
      event.preventDefault();
      $('.profile-my-nfts .market-product').removeClass(
        'market-product_transfer',
      );
      $('.profile-my-nfts').removeClass('market-product_transfer-body');
    });
  }

  if ($('#profile-nfts-modal').is('#profile-nfts-modal')) {
    $('#profile-nfts-modal .global-input').on('keyup', function () {
      const search = $(this).val() as string;
      if (search.length > 0) {
        $(this)
          .closest('.profile-nfts-modal__form')
          .find('.btn-blue')
          .removeClass('disabled');
        $(this)
          .closest('.profile-nfts-modal__form')
          .find('.btn-blue')
          .removeAttr('disabled');
      } else {
        $(this)
          .closest('.profile-nfts-modal__form')
          .find('.btn-blue')
          .addClass('disabled');
        $(this)
          .closest('.profile-nfts-modal__form')
          .find('.btn-blue')
          .attr('disabled');
      }
    });
  }

  if ($('#profile-nfts-board-modal').is('#profile-nfts-board-modal')) {
    $('#profile-nfts-board-modal .global-input').on('keyup', function () {
      const search = $(this).val() as string;
      if (search.length > 0) {
        $(this)
          .closest('.profile-nfts-modal__form')
          .find('.btn-blue')
          .removeClass('disabled');
        $(this)
          .closest('.profile-nfts-modal__form')
          .find('.btn-blue')
          .removeAttr('disabled');
      } else {
        $(this)
          .closest('.profile-nfts-modal__form')
          .find('.btn-blue')
          .addClass('disabled');
        $(this)
          .closest('.profile-nfts-modal__form')
          .find('.btn-blue')
          .attr('disabled');
      }
    });
    $(
      '#profile-nfts-board-modal .global-input-with-close .global-input-close',
    ).on('click', function () {
      $(this)
        .closest('.profile-nfts-modal__form')
        .find('.btn-blue')
        .addClass('disabled');
      $(this)
        .closest('.profile-nfts-modal__form')
        .find('.btn-blue')
        .attr('disabled');
    });
  }

  if ($('.global-input-with-close').is('.global-input-with-close')) {
    $('.global-input-with-close .global-input').on('keyup', function () {
      const search = $(this).val() as string;
      if (search.length > 0) {
        $(this).closest('.global-input-with-close').addClass('active');
      } else {
        $(this).closest('.global-input-with-close').removeClass('active');
      }
    });
    $('.global-input-with-close .global-input-close').on(
      'click',
      function (event) {
        event.preventDefault();
        $(this)
          .closest('.global-input-with-close')
          .find('.global-input')
          .val('');
        $(this).closest('.global-input-with-close').removeClass('active');
      },
    );
  }
};
