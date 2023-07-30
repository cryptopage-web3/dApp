import { INft, INftServer } from '~/types';
import { normalizeAmountToFront } from '~/utils/normalizeAmount';

export function nftResAdapter(data: INftServer): INft {
  return {
    collectionName: data.collectionName,
    contractAddress: data.contractAddress,
    date: data.date,
    description: data.description || '',
    contentUrl: data.contentUrl,
    name: data.name || '',
    symbol: data.symbol,
    tokenId: data.tokenId,
    attributes: data.attributes || [],
    comments: data.comments,

    isEncrypted: data.isEncrypted,
    accessPrice: normalizeAmountToFront(parseFloat(data.payAmount || '0')),
    accessDuration: parseFloat(data.minimalPeriod || '0'),
  };
}
