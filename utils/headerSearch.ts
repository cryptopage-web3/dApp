export const headerSearchInit = (): void => {
  /* search */
  if ($('.market-header-search').is('.market-header-search')) {
    $('.market-header-search__input').on('keyup', function () {
      const search = $(this).val() as string;
      if (search.length > 1) {
        $('.market-header-search__drop').slideDown(300);
        $('.market-header-search').addClass('active');
        $('.body-market').addClass('market-header-search_active');
      } else {
        $('.market-header-search__drop').slideUp(300);
        $('.market-header-search').removeClass('active');
        $('.body-market').removeClass('market-header-search_active');
      }
    });

    document.addEventListener('click', function (event) {
      const e = $('.market-header-search__drop');
      for (let i = 0; i < e.length; i++) {
        if (!e?.get(i)?.contains(event.target as Node)) {
          $(e?.get(i) as any).slideUp('300');
          $('.market-header-search').removeClass('active');
          $('.body-market').removeClass('market-header-search_active');
        }
      }
    });

    $('.market-header-search__clear').on('click', function (event) {
      event.preventDefault();
      $(this)
        .closest('.market-header-search__top')
        .find('.market-header-search__input')
        .val('');
    });
  }
};
