export const headerStickyInit = (): void => {
  const header = document.getElementById('header');

  if (!header) {
    return;
  }

  const sticky = header.offsetTop;

  $(window).on('scroll', myFunction);

  function myFunction() {
    if (!header) {
      return;
    }

    if (window.pageYOffset > sticky) {
      header.classList.add('sticky');
      $('body').addClass('header-fixed');
    } else {
      header.classList.remove('sticky');
      $('body').removeClass('header-fixed');
    }
  }
};
