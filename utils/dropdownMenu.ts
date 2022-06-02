export const dropdownMenuInit = (): void => {
  if ($('.drop-down').is('.drop-down')) {
    document.addEventListener('click', function (event) {
      const e = $('.drop-down');
      for (let i = 0; i < e.length; i++) {
        if (!e?.get(i)?.contains(event.target as Node)) {
          ($(e?.get(i) as any).find('.drop-down__col') as any).collapse('hide');
        }
      }
    });

    $('.drop-down__list li').on('click', function () {
      ($(this).closest('.drop-down__col') as any).collapse('hide');
    });
  }

  if (
    $('.market-header .navbar-collapse').is('.market-header .navbar-collapse')
  ) {
    document.addEventListener('click', function (event) {
      const e = $('.market-header .navbar-collapse');
      for (let i = 0; i < e.length; i++) {
        if (!e?.get(i)?.contains(event.target as Node)) {
          ($(e.get(i) as any) as any).collapse('hide');
        }
      }
    });
  }
};
