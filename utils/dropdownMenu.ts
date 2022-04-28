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
  }
};
