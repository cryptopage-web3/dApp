export const buildFileFromDataURL = (
  dataURL: string,
  filename: string,
): File | null => {
  const arr = dataURL.split(',');

  if (arr.length !== 2) {
    return null;
  }

  const mime = arr[0].match(/:(.*?);/)?.[1] || '';

  if (!mime) {
    return null;
  }

  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
