/* eslint-disable @typescript-eslint/no-unused-vars */
export const marketSidebarInit = (): void => {
  if ($('.market-sidebar-wrap').is('.market-sidebar-wrap')) {
    const sidebar2 = new (window as any).StickySidebar('.market-sidebar-wrap', {
      topSpacing: 20,
      bottomSpacing: 20,
      containerSelector: '.market-main-right',
      innerWrapperSelector: '.market-sidebar-wrap',
      resizeSensor: true,
    });
  }
};
