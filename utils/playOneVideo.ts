export const playOneVideoInit = (targetElem: HTMLVideoElement) => {
  $(targetElem).on('play', function () {
    $('video').each(function () {
      const elem = this as HTMLVideoElement;

      if (elem !== targetElem && elem.pause) {
        elem.pause();
      }
    });
  });
};
