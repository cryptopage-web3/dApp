import { ZERO_ADDRESS } from '~/constants';
import { INftTransaction } from '~/types';

export const getNftFromAddress = (nft: INftTransaction): string => {
  return nft.creator && nft.creator !== ZERO_ADDRESS
    ? nft.creator
    : nft.from && nft.from !== ZERO_ADDRESS
    ? nft.from
    : nft.to;
};
