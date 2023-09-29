import { EAttachmentType, INft, INftServer } from '~/types';
import { getCryptedText } from '~/utils/getCryptedText';
import { normalizeAmountToFront } from '~/utils/normalizeAmount';

export function nftResAdapter(data: INftServer): INft {
  const { isEncrypted, attachments } = data;

  const encryptedImage = isEncrypted
    ? attachments?.find(({ type }) => type === EAttachmentType.encryptedImage)
    : null;
  const encryptedText = isEncrypted
    ? attachments?.find(({ type }) => type === EAttachmentType.encryptedText)
    : null;

  return {
    collectionName: data.collectionName,
    contractAddress: data.contractAddress,
    date: data.date,
    description: data.description || '',
    contentUrl:
      encryptedImage &&
      typeof encryptedImage.data !== 'string' &&
      'bluredImageUrl' in encryptedImage.data
        ? encryptedImage.data.bluredImageUrl
        : data.contentUrl,
    encryptedText: encryptedText ? getCryptedText(encryptedText.id) : undefined,
    name: data.name || '',
    symbol: data.symbol,
    tokenId: data.tokenId,
    attributes: data.attributes || [],
    attachments: data.attachments || [],
    comments: data.comments,

    isEncrypted: data.isEncrypted,
    accessPrice: normalizeAmountToFront(parseFloat(data.payAmount || '0')),
    accessDuration: parseFloat(data.minimalPeriod || '0'),
  };
}
