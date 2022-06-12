export const profileContentDropInit = (): void => {
  if ($('.profile-content-drop').is('.profile-content-drop')) {
    $('.profile-content-drop__link').on('click', function (event) {
      event.preventDefault();

      if (
        !$(this)
          .closest('.profile-content-drop')
          .find('.drop-down__col')
          .is(':visible')
      ) {
        $(this).closest('.profile-content-drop').addClass('active');
      } else {
        $(this).closest('.profile-content-drop').removeClass('active');
      }
      $(this)
        .closest('.profile-content-drop')
        .find('.drop-down__col')
        .slideToggle(300);
    });
    document.addEventListener('click', function (event) {
      const e = $('.profile-content-drop');
      for (let i = 0; i < e.length; i++) {
        if (!e?.get(i)?.contains(event.target as Node)) {
          $(e.get(i) as any)
            .find('.drop-down__col')
            .slideUp(300);
          $(e.get(i) as any).removeClass('active');
        }
      }
    });
  }
};

export const profileContentDropTarget = (targetLink: any): void => {
  $(targetLink).on('click', function (event) {
    event.preventDefault();

    if (
      !$(this)
        .closest('.profile-content-drop')
        .find('.drop-down__col')
        .is(':visible')
    ) {
      $(this).closest('.profile-content-drop').addClass('active');
    } else {
      $(this).closest('.profile-content-drop').removeClass('active');
    }
    $(this)
      .closest('.profile-content-drop')
      .find('.drop-down__col')
      .slideToggle(300);
  });
};
