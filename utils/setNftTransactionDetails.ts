import { INftTransaction, INftTransactionDetailsResponse } from '~/types';

export const setNftTransactionDetails = (
  nft: INftTransaction,
  data: INftTransactionDetailsResponse,
): INftTransaction => {
  return {
    ...nft,
    hasDetails: true,
    date: data.date,
    chain: data.chain,
    name: data.name,
    description: data.description,
    contentUrl: data.contentUrl,
    attributes: data.attributes,
    isEncrypted: data.isEncrypted,
    accessPrice: data.accessPrice,
    accessDuration: data.accessDuration,
    comments: data.comments,
  };
};
