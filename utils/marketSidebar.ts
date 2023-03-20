/* eslint-disable @typescript-eslint/no-unused-vars */
export const marketSidebarInit = (): any => {
  if (!$('.market-sidebar-wrap').is('.market-sidebar-wrap')) {
    return null;
  }

  const height = $('#header').height() || 0;

  const sidebar2 = new (window as any).StickySidebar('.market-sidebar-wrap', {
    topSpacing: height + 1,
    bottomSpacing: 20,
    containerSelector: '.market-main-right',
    innerWrapperSelector: '.market-sidebar-wrap',
    resizeSensor: true,
  });

  return sidebar2;
};
