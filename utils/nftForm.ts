export const nftFormInit = (): void => {
  // if ($('.form-creat-focus-js').is('.form-creat-focus-js')) {
  /* $('.form-creat-focus-js').blur(function () {
      if (String($(this).val()).trim() === '') {
        $(this).closest('.form-creat').removeClass('input--filled');
        $(this)
          .closest('.form-creat')
          .find('.form-creat-textarea-wrap')
          .slideUp(300);
      }
    }); */
  /* $('.form-creat-focus-js').focus(function () {
      $(this).closest('.form-creat').addClass('input--filled');
      $(this)
        .closest('.form-creat')
        .find('.form-creat-textarea-wrap')
        .slideDown(300);
    }); */
  /* $('.form-creat-cancel-js').on('click', function (event) {
      event.preventDefault();

      $('.form-creat').removeClass('input--filled');
      $('.form-creat').find('.form-creat-textarea-wrap').slideUp(300);
    }); */
  /* $('.form-creat-focus-js').each(function () {
      if (String($(this).val()).trim() !== '') {
        $(this).closest('.form-creat').addClass('input--filled');
        $(this)
          .closest('.form-creat')
          .find('.form-creat-textarea-wrap')
          .slideDown(300);
      } else {
        $(this).closest('.form-creat').removeClass('input--filled');
        $(this)
          .closest('.form-creat')
          .find('.form-creat-textarea-wrap')
          .slideUp(300);
      }
    }); */
  // }

  /* if ($('.form-creat-input-js').is('.form-creat-input-js')) {
    $('.form-creat-input-js').on('keyup', function () {
      let all_fill = true;
      if (String($(this).val()).trim().length > 0) {
        $('.form-creat-input-js')
          .not($(this))
          .each(function () {
            if (String($(this).val()).trim().length === 0) {
              all_fill = false;
            }
          });
        if (all_fill) {
          $('.form-creat__plus').removeClass('disabled');
          $('.form-creat__plus').addClass('btn-blue');
        }
      }
    });
    $('.form-creat-input-js').blur(function () {
      if (String($(this).val()).trim() === '') {
        $('.form-creat__plus').addClass('disabled');
        $('.form-creat__plus').removeClass('btn-blue');
      }
    });
  } */
  /* 
  if ($('.modal-creat-collapse-link').is('.modal-creat-collapse-link')) {
    $('.modal-creat-collapse-link').on('click', function (event) {
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
  }
 */
  /* if ($('.modal-creat-input-js').is('.modal-creat-input-js')) {
    $('.modal-creat-input-js').on('keyup', function () {
      if (String($(this).val()).trim().length > 0) {
        $('.form-creat-avatar').slideDown(300);
        $('.modal-creat-text-content').slideDown(300);
        $('.btn_modal-creat').removeClass('disabled');
        $('.btn_modal-creat').addClass('btn-blue_button');
      }
    });
    $('.modal-creat-input-js').blur(function () {
      if (String($(this).val()).trim() === '') {
        $('.form-creat-avatar').slideUp(300);
        $('.modal-creat-text-content').slideUp(300);
        $('.btn_modal-creat').addClass('disabled');
        $('.btn_modal-creat').removeClass('btn-blue_button');
      }
    });
  } */

  /* if ($('.form-creat-avatar__close').is('.form-creat-avatar__close')) {
    $('.form-creat-avatar__close').on('click', function (event) {
      event.preventDefault();
      $('.form-creat-avatar').slideUp(300);
      $('.modal-creat-text-content').slideUp(300);
      $('.modal-creat-input-js').val('');
      $('.btn_modal-creat').addClass('disabled');
      $('.btn_modal-creat').removeClass('btn-blue_button');
    });
  } */
  /* 
  if ($('.modal-creat-add-input-js').is('.modal-creat-add-input-js')) {
    $('.modal-creat-add-input-js').on('keyup', function () {
      let all_fill = true;
      if (String($(this).val()).trim().length > 0) {
        $(this)
          .closest('.modal-creat-add-wrap')
          .find('.modal-creat-add-input-js')
          .not($(this))
          .each(function () {
            if (String($(this).val()).trim().length === 0) {
              all_fill = false;
            }
          });
        if (all_fill) {
          $(this)
            .closest('.modal-creat-add')
            .find('.modal-creat-add__close')
            .addClass('active');
          $(this)
            .closest('.modal-creat-add')
            .find('.modal-creat-add__close')
            .removeClass('disabled');
          $(this)
            .closest('.modal-creat-add-wrap')
            .find('.btn')
            .addClass('btn-blue_button');
          $(this)
            .closest('.modal-creat-add-wrap')
            .find('.btn')
            .removeClass('disabled');
        }
      }
    });
    $('.modal-creat-add-input-js').blur(function () {
      if (String($(this).val()).trim() === '') {
        $(this)
          .closest('.modal-creat-add')
          .find('.modal-creat-add__close')
          .removeClass('active');
        $(this)
          .closest('.modal-creat-add')
          .find('.modal-creat-add__close')
          .addClass('disabled');
        $(this)
          .closest('.modal-creat-add-wrap')
          .find('.btn')
          .removeClass('btn-blue_button');
        $(this)
          .closest('.modal-creat-add-wrap')
          .find('.btn')
          .addClass('disabled');
      }
    });
  }
 */
  /* if ($('.modal-creat-add__close').is('.modal-creat-add__close')) {
    $(document).on('click', '.modal-creat-add__close.active', function (event) {
      event.preventDefault();
      $(this).closest('.modal-creat-add').find('.global-input').val('');
      $(this)
        .closest('.modal-creat-add')
        .find('.modal-creat-add__close')
        .removeClass('active');
      $(this)
        .closest('.modal-creat-add')
        .find('.modal-creat-add__close')
        .addClass('disabled');
      $(this)
        .closest('.modal-creat-add')
        .find('.btn')
        .removeClass('btn-blue_button');
      $(this).closest('.modal-creat-add').find('.btn').addClass('disabled');
    });
  } */

  /* if ($('.modal-creat-add__btn1').is('.modal-creat-add__btn1')) {
    $('.modal-creat-add__btn1').on('click', function () {
      const state = $(this)
        .closest('.modal-creat-add-wrap')
        .find('input[name="type"]')
        .val();
      const name = $(this)
        .closest('.modal-creat-add-wrap')
        .find('input[name="name"]')
        .val();
      const html_el =
        "<div class='modal-creat-item1'><span>" +
        state +
        ': ' +
        name +
        "</span><a href='#'><img src='" +
        require(`@/assets/img/modal-creat-item1_img.svg`) +
        "' alt=''></a></div>";
      $(this)
        .closest('.modal-creat-add')
        .find('.modal-creat-add-cont')
        .append(html_el);
      $(this).closest('.modal-creat-add-wrap').find('.global-input').val('');
      $(this)
        .closest('.modal-creat-add')
        .find('.modal-creat-add__close')
        .removeClass('active');
      $(this)
        .closest('.modal-creat-add')
        .find('.modal-creat-add__close')
        .addClass('disabled');
      $(this)
        .closest('.modal-creat-add')
        .find('.btn')
        .removeClass('btn-blue_button');
      $(this).closest('.modal-creat-add').find('.btn').addClass('disabled');
    });
  } */

  /* if ($('.modal-creat-add__btn2').is('.modal-creat-add__btn2')) {
    $('.modal-creat-add__btn2').on('click', function () {
      const name = $(this)
        .closest('.modal-creat-add-wrap')
        .find('input[name="name"]')
        .val();
      const from = $(this)
        .closest('.modal-creat-add-wrap')
        .find('input[name="from"]')
        .val();
      const to = $(this)
        .closest('.modal-creat-add-wrap')
        .find('input[name="to"]')
        .val();
      const html_el =
        "<div class='modal-creat-item1'><span>" +
        name +
        ': ' +
        from +
        ' of ' +
        to +
        "</span><a href='#'><img src='" +
        require(`@/assets/img/modal-creat-item1_img.svg`) +
        "' alt=''></a></div>";
      $(this)
        .closest('.modal-creat-add')
        .find('.modal-creat-add-cont')
        .append(html_el);
      $(this).closest('.modal-creat-add-wrap').find('.global-input').val('');
      $(this)
        .closest('.modal-creat-add')
        .find('.modal-creat-add__close')
        .removeClass('active');
      $(this)
        .closest('.modal-creat-add')
        .find('.modal-creat-add__close')
        .addClass('disabled');
      $(this)
        .closest('.modal-creat-add')
        .find('.btn')
        .removeClass('btn-blue_button');
      $(this).closest('.modal-creat-add').find('.btn').addClass('disabled');
    });
  } */

  if ($('.modal-creat-add__btn3').is('.modal-creat-add__btn3')) {
    $('.modal-creat-add__btn3').on('click', function () {
      const name = $(this)
        .closest('.modal-creat-add-wrap')
        .find('input[name="name"]')
        .val();
      const from = $(this)
        .closest('.modal-creat-add-wrap')
        .find('input[name="from"]')
        .val();
      const to = $(this)
        .closest('.modal-creat-add-wrap')
        .find('input[name="to"]')
        .val();
      const procentNum = (Number(from) / Number(to)) * 100;
      const procent = procentNum + '%';
      const html_el =
        "<div class='modal-creat-item2'><div class='modal-creat-item2__left'><div class='modal-creat-item2__top'><span>" +
        name +
        '</span><span>' +
        from +
        ' of ' +
        to +
        "</span></div><div class='modal-creat-item2__progress'><div style='width:" +
        procent +
        ";'></div></div></div><a href='#'><img src='" +
        require(`@/assets/img/modal-creat-item1_img.svg`) +
        "' alt=''></a></div>";
      $(this)
        .closest('.modal-creat-add')
        .find('.modal-creat-add-cont')
        .append(html_el);
      $(this).closest('.modal-creat-add-wrap').find('.global-input').val('');
      $(this)
        .closest('.modal-creat-add')
        .find('.modal-creat-add__close')
        .removeClass('active');
      $(this)
        .closest('.modal-creat-add')
        .find('.modal-creat-add__close')
        .addClass('disabled');
      $(this)
        .closest('.modal-creat-add')
        .find('.btn')
        .removeClass('btn-blue_button');
      $(this).closest('.modal-creat-add').find('.btn').addClass('disabled');
    });
  }

  $(document).on('click', '.modal-creat-item1 a', function (event) {
    event.preventDefault();
    $(this).closest('.modal-creat-item1').remove();
  });
  $(document).on('click', '.modal-creat-item2 a', function (event) {
    event.preventDefault();
    $(this).closest('.modal-creat-item2').remove();
  });

  if ($('.form-creat-files-item').is('.form-creat-files-item')) {
    $('.form-creat-files-item__close').on('click', function (event) {
      event.preventDefault();
      $(this).closest('.form-creat-files-item').remove();
    });
  }
};
