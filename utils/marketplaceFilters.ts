export const marketplaceFiltersInit = (): void => {
  if ($('.market-main-filtr-oc').is('.market-main-filtr-oc')) {
    $('#market-main-filtr-col').on('show.bs.collapse', function () {
      $('.market-main-default-wrap').slideUp(0);
      $('.market-main-with-filtrs-wr').slideDown(0);
      $('.market-main-with-filtrs-wr').addClass('active');
      $('.market-main-with-filtrs-right').addClass('active');
      $('body').addClass('market-main-filtr-col__body');
    });
    $('#market-main-filtr-col').on('hide.bs.collapse', function () {
      $('.market-main-with-filtrs-wr').removeClass('active');
      $('.market-main-with-filtrs-right').removeClass('active');
      // $('.market-main-default-wrap').slideDown(0);
      $('body').removeClass('market-main-filtr-col__body');
    });
  }

  if ($('.market-filtr__link').is('.market-filtr__link')) {
    $('.market-filtr__link').on('click', function (event) {
      event.preventDefault();

      if (
        $(this)
          .closest('.market-filtr')
          .find('.market-filtr-body')
          .is(':visible')
      ) {
        $(this).removeClass('active');
        $(this)
          .closest('.market-filtr')
          .find('.market-filtr-body')
          .slideUp(300);
      } else {
        $(this).addClass('active');
        $(this)
          .closest('.market-filtr')
          .find('.market-filtr-body')
          .slideDown(300);
      }
    });
  }

  if ($('.market-filtr-ch3__input').is('.market-filtr-ch3__input')) {
    ($('.market-filtr-ch3__input') as any).styler();
  }
};
