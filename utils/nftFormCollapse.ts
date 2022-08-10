export const collapseInit = (elem: HTMLAnchorElement): void => {
  $(elem).on('click', function (event) {
    event.preventDefault();

    if (
      !$(this)
        .closest('.modal-creat-collapse')
        .find('.modal-creat-collapse-body')
        .is(':visible')
    ) {
      $(this).addClass('active');
      $(this)
        .closest('.modal-creat-collapse')
        .find('.modal-creat-collapse-body')
        .slideDown(300);
    } else {
      $(this).removeClass('active');
      $(this)
        .closest('.modal-creat-collapse')
        .find('.modal-creat-collapse-body')
        .slideUp(300);
    }
  });
};
