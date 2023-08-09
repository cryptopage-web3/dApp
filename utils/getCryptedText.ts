export const getCryptedText = (text: string): string => {
  return text
    .split('')
    .map((char) => char.charCodeAt(0).toString(4))
    .join('0010');
};
