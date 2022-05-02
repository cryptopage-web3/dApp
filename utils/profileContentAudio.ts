/* eslint-disable @typescript-eslint/no-unused-vars */
export const profileContentAudioInit = (): void => {
  if ($('.post-audio-item').is('.post-audio-item')) {
    const audio = new (window as any).GreenAudioPlayer('.post-audio-item', {
      showTooltips: true,
      showDownloadButton: false,
      enableKeystrokes: true,
    });
  }
};
