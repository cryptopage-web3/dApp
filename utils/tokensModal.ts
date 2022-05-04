export const tokensModalInit = (): void => {
  if ($('#tokens-modal').is('#tokens-modal')) {
    $('#tokens-modal .tokens-input-init').on('keyup', function () {
      const search = $(this).val() as string;
      if (search.length > 0) {
        $(this)
          .closest('.profile-nfts-modal__form')
          .find('.btn-blue')
          .removeClass('disabled');
        $(this)
          .closest('.profile-nfts-modal__form')
          .find('.btn-blue')
          .removeAttr('disabled');
      } else {
        $(this)
          .closest('.profile-nfts-modal__form')
          .find('.btn-blue')
          .addClass('disabled');
        $(this)
          .closest('.profile-nfts-modal__form')
          .find('.btn-blue')
          .attr('disabled');
      }
    });
  }
};
