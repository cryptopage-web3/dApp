export const playOneVideoInit = (
  targetElem: HTMLVideoElement | HTMLAudioElement,
) => {
  $(targetElem).on('play', function () {
    $('video').each(function () {
      const elem = this as HTMLVideoElement;

      if (elem !== targetElem && elem.pause) {
        elem.pause();
      }
    });

    $('audio').each(function () {
      const elem = this as HTMLAudioElement;

      if (elem !== targetElem && elem.pause) {
        elem.pause();
      }
    });
  });
};
