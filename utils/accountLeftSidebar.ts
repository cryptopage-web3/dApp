/* eslint-disable @typescript-eslint/no-unused-vars */
export const accountLeftSidebarInit = (): void => {
  if ($('.profile-menu-wrap').is('.profile-menu-wrap')) {
    const sidebar = new (window as any).StickySidebar('.profile-menu-wrap', {
      topSpacing: 20,
      bottomSpacing: 20,
      containerSelector: '.profile-left2',
      innerWrapperSelector: '.profile-menu-wrap',
      resizeSensor: true,
    });
  }

  if ($('.night-mode-link').is('.night-mode-link')) {
    $('.night-mode-link').on('click', function (event) {
      event.preventDefault();
      $(this).toggleClass('night-mode-active');
    });
  }
};
