export const copyToClipboard = (text: string): void => {
  const tempInput = $('<input>');
  tempInput.prop('readonly', true);
  tempInput.css({
    position: 'absolute',
    left: '-9999px',
  });

  $('body').append(tempInput);
  tempInput.val(text).select();
  document.execCommand('copy');

  tempInput.remove();
};
