export const shortToken = (tokenId: string): string => {
  return String(parseInt(tokenId.slice(-10)));
};
