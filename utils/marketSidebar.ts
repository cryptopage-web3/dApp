/* eslint-disable @typescript-eslint/no-unused-vars */
export const marketSidebarInit = (): any => {
  if (!$('.market-sidebar-wrap').is('.market-sidebar-wrap')) {
    return null;
  }

  const sidebar2 = new (window as any).StickySidebar('.market-sidebar-wrap', {
    topSpacing: 115.8,
    bottomSpacing: 20,
    containerSelector: '.market-main-right',
    innerWrapperSelector: '.market-sidebar-wrap',
    resizeSensor: true,
  });

  return sidebar2;
};
