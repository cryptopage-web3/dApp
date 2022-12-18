interface IParams {
  title: string;
  content: string;
  onClose?: () => void;
}

export const popoverHintInit = (targetEl: any, params: IParams): void => {
  ($(targetEl) as any).popover({
    title: params.title,
    content: params.content,
    placement: () => {
      if (Number($(window).width()) < 1000) {
        return 'bottom';
      }

      return 'right';
    },
    trigger: 'manual',
    template: `
      <div class="popover ui-popover" role="tooltip">
        <div class="ui-popover-close"></div>
        <div class="arrow ui-popover-arrow"></div>
        <h3 class="popover-header ui-popover-header"></h3>
        <div class="popover-body ui-popover-body"></div>
      </div>
    `,
  });

  ($(targetEl) as any).popover('show');

  $('.ui-popover-close').on('click', function () {
    params.onClose && params.onClose();

    ($(targetEl) as any).popover('hide');
  });
};

export const popoverHintDestroy = (targetEl: any): void => {
  ($(targetEl) as any).popover('dispose');
};
