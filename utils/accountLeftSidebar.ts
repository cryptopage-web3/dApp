/* eslint-disable @typescript-eslint/no-unused-vars */
export const accountLeftSidebarInit = (): void => {
  if ($('.night-mode-link').is('.night-mode-link')) {
    $('.night-mode-link').on('click', function (event) {
      event.preventDefault();
      $(this).toggleClass('night-mode-active');
    });
  }

  if ($('.profile-menu__oc').is('.profile-menu__oc')) {
    $('.profile-menu__oc').on('click', function (event) {
      event.preventDefault();
      $('body').addClass('market-main-filtr-col__body');
      $('.profile-menu-body').slideDown(300);
    });
  }

  if ($('.profile-menu-body__close').is('.profile-menu-body__close')) {
    $('.profile-menu-body__close').on('click', function (event) {
      event.preventDefault();
      $('body').removeClass('market-main-filtr-col__body');
      $('.profile-menu-body').slideUp(300);
    });
  }
};
