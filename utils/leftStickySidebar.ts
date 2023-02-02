/* eslint-disable @typescript-eslint/no-unused-vars */
export const leftStickySidebarInit = (): any => {
  if (!$('.profile-menu-wrap').is('.profile-menu-wrap')) {
    return null;
  }

  const height = $('#header').height() || 0;

  const sidebar = new (window as any).StickySidebar('.profile-menu-wrap', {
    topSpacing: height + 1,
    bottomSpacing: 20,
    containerSelector: '.profile-left2',
    innerWrapperSelector: '.profile-menu-wrap',
    resizeSensor: true,
  });

  return sidebar;
};
