export const popoverNftMainField = (targetEl: any): void => {
  ($(targetEl) as any).popover({
    title: 'Start creating content right now from this line',
    placement: 'bottom',
    trigger: 'manual',
    template: `
      <div class="popover ui-popover ui-popover_nft" role="tooltip">
        <div class="ui-popover-close"></div>
        <div class="arrow ui-popover-arrow"></div>
        <h3 class="popover-header ui-popover-header"></h3>
      </div>
    `,
  });

  ($(targetEl) as any).popover('show');

  $('.ui-popover-close').on('click', function () {
    ($(targetEl) as any).popover('hide');
  });
};
